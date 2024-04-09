import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/lib/uploadthing";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
    onFieldChange: (value: string) => void ;
    submitButton: boolean;
    setNewFilesUploaded: (value: boolean) => void ;
    setUploadedImageUrl: (value: string) => void;
}



export default function FileUploader({ onFieldChange,  setUploadedImageUrl, submitButton, setNewFilesUploaded }: FileUploaderProps) {
  const [ files, setFiles ] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles( acceptedFiles.splice(0, acceptedFiles.length) );
    // onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);
 
  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        console.log("uploaded successfully!");
        setNewFilesUploaded(true);
        
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
      },
      onUploadBegin: () => {
        console.log("upload has begun");
      },
    },
  );
 

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  useEffect(() => {
    console.log('submitButton in useEffect =', submitButton)
    if ( true === submitButton ){
        startUpload(files).then( (uploadedImage) => {
           if(uploadedImage && uploadedImage[0]?.url) setUploadedImageUrl(uploadedImage[0]?.url);
        })
    }

  }, [submitButton]) // eslint-disable-line
 
  return (
    <div className="wrapper border cursor-pointer flex rounded-2xl">
        <span {...getRootProps()} className={` h-full items-center ${files.length == 0 ? "w-full" : "w-auto"} `}>
        <input {...getInputProps()} className="w-full"/>
        
        { files.length == 0 ? (
            <div className="flex-center flex-col py-5 text-grey-500">
                <span className="">Drag image file here</span>
                <p className="p-medium-12 mb-2">SVG, PNG, JPG</p>
                <Button type="button" className="rounded-full">
                    Select from computer
                </Button>
            </div>
            ) : (
            <span>
                {files[0].name} 
            </span>
            )}
        </span>
        {files.length > 0 && (
            <Button className="bg-[#ff000067] focus:bg-[#FF0000] hover:bg-[#FF0000] px-[10px] py-[5px] h-auto ml-[20px] max-w-[30px]" type="button" value="X" aria-label="remove event main image" onClick={()=>{ setFiles([]) }} >X</Button>
        )}
    </div>
  );
}


