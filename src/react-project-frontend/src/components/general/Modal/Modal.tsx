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

export function Modal({
  data,
  trigger,
  subTitle,
  title,
  setOpen,
  open,
  className
}: // handleSubmit
{
  data: any;
  trigger: any;
  subTitle?: string;
  title?: string;
  setOpen?: () => void;
  open?: boolean;
  className?: string;
}) {
  //classname por defecto
  const defaultClassName = "sm:max-w-[425px]";
  const initialClassName = "max-h-[90vh] overflow-y-auto";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${className || defaultClassName} ${initialClassName}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        {data}
      </DialogContent>
    </Dialog>
  );
}
