"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.action"
import { IEvent } from "@/lib/database/models/event.model"
import { Switch } from "@/components/ui/switch"



type EventFormProps = {
    userRole: string;
    userId: string;
    type: "Create" | "Update";
    event?: IEvent,
    eventId?: string;
    isWebsiteAdmin?: boolean;
}



export default function EventForm( { userId, userRole, type, event, eventId, isWebsiteAdmin=false } : EventFormProps ){

    const [ files, setFiles ] = useState<File[]>([]);
    const { startUpload } = useUploadThing( "imageUploader" );
    const [ notificationAlertState, setNotificationAlertState] = useState("");

    
    const initialValues = event && type === 'Update' ? 
                        {...event,
                            startDateTime: new Date(event.startDateTime),
                            endDateTime: new Date(event.endDateTime),
                        } : 
                        eventDefaultValues;

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    });

    const router = useRouter();


  

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {

        // console.log('form submitted')
        // console.log('files =', files);

        let uploadedImageUrl = values.imageUrl;

        if(files.length > 0) {
            const uploadedImages = await startUpload(files)
        
            if(!uploadedImages) {
                return
            }
        
            uploadedImageUrl = uploadedImages[0].url
        }

        if ( true === values.isFree ){
            values.price = '0';
        }
        
        if ( Number(values.price) == 0 ){
            values.isFree = true;
            values.price = '0';
        }
        
        values.price = parseInt(values.price, 10).toString();

        if( 'Create' === type ) {
            try {
              const newEvent = await createEvent({
                event: { ...values, imageUrl: uploadedImageUrl },
                userId,
                path: '/profile'
              });

              if ( newEvent?.toString().startsWith("Error") || newEvent?.toString().startsWith("Alert") ){
                setNotificationAlertState(newEvent?.toString());
                return;
              }
      
              if(newEvent) {
                form.reset();
                router.push(`/events/${newEvent._id}`)
              }
            } catch (error) {
            //   console.log(error);
            }
        }


        if( 'Update' === type ) {

            if( !eventId) {
                router.back();
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`,
                    isWebsiteAdmin
                  })
      
              if( updatedEvent ) {
                form.reset();
                router.push(`/events/${updatedEvent._id}`)
              }
            } catch (error) {
            //   console.log(error);
            }
        }

        // console.log(values)
        // console.log(values.imageUrl)
      }

      


    return (
        <Form {...form}>
        <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-5 mb-[200px] relative pt-[30px]">

            {  
                notificationAlertState?.startsWith("Error") ?
                <FormSubmitionAlert alertText={notificationAlertState} customCssClass="text-[#f00]" /> 
                : 
                notificationAlertState?.startsWith("Alert") || notificationAlertState?.startsWith("Unknown") ? 
                <FormSubmitionAlert alertText={notificationAlertState} customCssClass="text-[#ff9b00]" /> 
                :
                notificationAlertState?.startsWith("Success") && 
                <FormSubmitionAlert alertText={notificationAlertState} customCssClass="text-[#1200ff]" />
            }
            
            {isWebsiteAdmin && 
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="isApproved"
                    render={({ field }) => (
                    <FormItem >
                        <FormControl>
                            <div className="flex items-center">
                                <Switch onCheckedChange={field.onChange} checked={field.value}  className="form-switch mr-2 border-2 border-primary-500 !pb-[2px] h-7 items-centers  " />
                                <label htmlFor="isApproved" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{field.value ? "Event Approved" : "Pending Approval"}</label>
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            }



            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <Input placeholder="Event Title" {...field} className="input-field" />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />

                
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <Dropdown onChangeHandler={field.onChange} value={field.value} userRole={userRole} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl className="h-72">
                            <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                    <FormItem className="w-full cursor-pointer">
                        <FormControl className="h-72">
                            <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image width={24} height={24} src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/location-grey.svg`} alt="location icon" />
                                <Input placeholder="Event Location or Online" {...field} className="input-field" />
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image width={24} height={24} src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/calendar.svg`} alt="calendar icon" className="filter-grey" />
                                <p className="ml-3 whitespace-nowrap text-grey-500">Start Date:</p>
                                <DatePicker 
                                    selected={field.value} 
                                    onChange={(date:Date) => field.onChange(date)} 
                                    showTimeSelect
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    wrapperClassName="datePicker"
                                />
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image width={24} height={24} src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/calendar.svg`} alt="calendar icon" className="filter-grey" />
                                <p className="ml-3 whitespace-nowrap text-grey-500">End Date:</p>
                                <DatePicker 
                                    selected={field.value} 
                                    onChange={(date:Date) => field.onChange(date)} 
                                    showTimeSelect
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    wrapperClassName="datePicker"
                                />
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image width={24} height={24} src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/dollar.svg`} alt="dollar icon" className="filter-grey" />
                                <Input type="number" placeholder="price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 " />
                                <FormField
                                    control={form.control}
                                    name="isFree"
                                    render={({ field }) => (
                                    <FormItem >
                                        <FormControl>
                                            <div className="flex items-center">
                                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                <Checkbox id="isFree" onCheckedChange={field.onChange} checked={field.value} className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                            </div>
                                        </FormControl>
                                        
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />
            
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                    <FormItem className="w-full ">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image width={24} height={24} src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/link.svg`} alt="link icon" />
                                <Input placeholder="URL" {...field} className="input-field" />
                            </div>
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
                />

            </div>

          <Button type="submit" size="lg"
          disabled={form.formState.isSubmitting}
          className="col-span-2 w-full button" >
            {form.formState.isSubmitting ? "Submitting Event..." : `${type} Event`}
          </Button>
        </form>
      </Form>
    )
}



export function FormSubmitionAlert( { alertText, customCssClass } : {alertText: string, customCssClass: string} ){

    return (
        <span className={`absolute top-[-38px] md:top-[-27px] flex justify-center text-center w-full p-2 ${customCssClass}`}>
            {alertText}
        </span>
    )
}