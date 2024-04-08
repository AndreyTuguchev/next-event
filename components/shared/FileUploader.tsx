import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/lib/uploadthing";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
    onFieldChange: (value: string) => void ;
    imageUrl: string;
    setNewFiles: Dispatch<SetStateAction<File[]>>;
    formSubmitted: boolean;
    setNewFilesUploaded: (value: boolean) => void ;
}

// export default function FileUploader({ onFieldChange, imageUrl, setFiles }: FileUploaderProps){

//     return <></>
// }







 
// export default function FileUploader({ onFieldChange, imageUrl }: FileUploaderProps) {
//   const [files, setFiles] = useState<File[]>([]);
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//   }, []);
 
//   const { startUpload, permittedFileInfo } = useUploadThing(
//     "imageUploader",
//     {
//       onClientUploadComplete: () => {
//         alert("uploaded successfully!");
//       },
//       onUploadError: () => {
//         alert("error occurred while uploading");
//       },
//       onUploadBegin: () => {
//         alert("upload has begun");
//       },
//     },
//   );
 
//   const fileTypes = permittedFileInfo?.config
//     ? Object.keys(permittedFileInfo?.config)
//     : [];
 
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
//   });
 
//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <div>
//         {files.length > 0 && (
//           <button onClick={() => startUpload(files)}>
//             Upload {files.length} files
//           </button>
//         )}
//       </div>
//       Drop files here!
//     </div>
//   );
// }











export default function FileUploader({ onFieldChange, imageUrl, setNewFiles, formSubmitted, setNewFilesUploaded }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);
 
  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        console.log("uploaded successfully!");
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
      },
      onUploadBegin: () => {
        console.log("upload has begun");
      },
    },
  );
 
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });



  useEffect(() => {
    if ( true === formSubmitted ){
        startUpload(files);
    }
  }, [formSubmitted]) // eslint-disable-line
 
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




























// import { UploadDropzone } from "@uploadthing/react";
// import { OurFileRouter } from "@/app/api/uploadthing/core";
 

 
// export const OurUploadDropzone = () => (
//   <UploadDropzone<OurFileRouter>
//     endpoint="imageUploader"
//     onClientUploadComplete={(res) => {
//       // Do something with the response
//       console.log("Files: ", res);
//       alert("Upload Completed");
//     }}
//     onUploadError={(error: Error) => {
//       alert(`ERROR! ${error.message}`);
//     }}
//     onUploadBegin={(name) => {
//       // Do something once upload begins
//       console.log("Uploading: ", name);
//     }}
//   />
// );