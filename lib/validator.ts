import { z } from "zod"


export const eventFormSchema = z.object({
    title: z.string().min(3, {
      message: "Title must be at least 2 characters.",
    }),
    
    description: z.string().min(3, {
      message: "Description must be at least 2 characters.",
    }).max(400, {
        message: "Description must be at less than 400 characters.",
    }),

    location: z.string().min(3, {
        message: "Location must be at least 2 characters.",
      }).max(400, {
        message: "Location must be at less than 400 characters.",
    }),
  
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
    
})

export const eventImageSchema = z.object({
    imageUrl: z.string().url(),
})

export const eventSchemaWithImage = eventFormSchema.merge(eventImageSchema);
