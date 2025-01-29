import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function Modal({
  data,
  trigger,
  subTitle,
  title,
  setOpen,
  open
}: // handleSubmit
{
  data: any;
  trigger: any;
  subTitle?: string;
  title?: string;
  setOpen?: () => void;
  open?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        {data}
      </DialogContent>
    </Dialog>
  );
}
