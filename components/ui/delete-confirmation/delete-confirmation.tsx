"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { deleteEvent } from "@/lib/actions/event.action";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const [deleteEventState, setDeleteEventState] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "cursor-pointer flex flex-col right-2 overflow-hidden rounded-xl  shaodw-sm gap-4 transition-all z-10",
        !deleteEventState && "absolute top-14 bg-white"
      )}
    >
      <span
        className={cn("p-3", deleteEventState && `!hidden`)}
        onClick={() => {
          setDeleteEventState(true);
        }}
      >
        <Image
          src={`/assets/icons/delete.svg`}
          alt="edit"
          width={20}
          height={20}
        />
      </span>

      {deleteEventState && (
        <>
          <span className="absolute backdrop-blur w-full h-full left-0 top-0 bg-[#00000092] flex items-center p-10 text-center z-10"></span>
          <span className="text-white absolute w-full h-full left-0 top-0 flex flex-col items-center justify-center p-10 text-center z-20">
            <div className="w-full">
              Are You Sure You Want To Delete This Event?
            </div>
            <div className="w-full flex justify-evenly mt-5">
              <Button
                variant="destructive"
                onClick={() =>
                  startTransition(async () => {
                    await deleteEvent({ eventId, path: pathname });
                  })
                }
              >
                Yes
              </Button>
              <Button
                className="bg-[#2aa523] hover:bg-[#3ea839b5]"
                onClick={() => {
                  setDeleteEventState(false);
                }}
              >
                No
              </Button>
            </div>
          </span>
        </>
      )}
    </div>
  );
};

export default DeleteConfirmation;
