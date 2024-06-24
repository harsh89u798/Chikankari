import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
 
export function VideoGallery() {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
 
  return (
    <>
      <Card
        className="h-1/2 w-1/2 my-20 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <video
        autoPlay muted loop
          alt="nature"
          className="h-full w-full object-cover object-center"
          src="https://firebasestorage.googleapis.com/v0/b/boss-storage.appspot.com/o/VN20240405_043911.mp4?alt=media&token=5cdef15e-b29e-4770-b18f-bc13f34c47df"
        />
      </Card>
       <Dialog size="lg" open={open} handler={handleOpen}>
     
        <DialogBody>
          <video
          autoPlay muted={open} loop controls
            alt="nature"
            className="h-[48rem] w-full rounded-lg object-cover object-center"
            src="https://firebasestorage.googleapis.com/v0/b/boss-storage.appspot.com/o/VN20240405_043911.mp4?alt=media&token=5cdef15e-b29e-4770-b18f-bc13f34c47df"
          />
        </DialogBody>
  
      </Dialog>
    </>
  );
}