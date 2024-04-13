import { Dispatch, SetStateAction, useCallback } from "react";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

type FileUploaderProps = {
    onFieldChange: (value: string) => void ;
    setFiles: Dispatch<SetStateAction<File[]>>
    imageUrl: string;
}


export default function FileUploader({ onFieldChange, imageUrl, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // acceptedFiles.splice(0, acceptedFiles.length)
    setFiles( acceptedFiles );
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    // <div className="wrapper border cursor-pointer flex rounded-2xl overflow-hidden relative">
    <div className="relative">
    <div {...getRootProps()} className={` h-full items-center rounded-2xl overflow-hidden  ${ !imageUrl ? "w-full" : "w-auto"} `} >
        
        <input {...getInputProps()} className="w-full" />
        
        { !imageUrl ? (
          <div className="flex-center flex-col py-5 text-grey-500">
                <span className="">Drag image file here</span>
                <p className="p-medium-12 mb-2">SVG, PNG, JPG</p>
                <Button type="button" className="rounded-full">
                    Select from computer
                </Button>
            </div>
            ) : (
              <span className="h-full w-full flex flex-1 justify-center items-center">
              <Image src={imageUrl} width={200} height={200}  alt='event hero' className="w-auto h-full object-cover object-center" />
                
            </span>
            )}
    </div>
    {/* { imageUrl && (
      <Button className="bg-[#ff000067] focus:bg-[#FF0000] hover:bg-[#FF0000] px-[10px] py-[5px] h-auto ml-[20px] max-w-[30px] top-[10px] right-[10px] absolute z-10" type="button" value="X" aria-label="remove event main image" onClick={()=>{ setFiles([]) }} >X</Button>
      )} */}
    </div>
  );
}


