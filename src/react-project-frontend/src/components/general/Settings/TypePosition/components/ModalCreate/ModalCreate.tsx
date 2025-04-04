import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl } from "@/components/ui/form";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";

type ModalCreateProps = {
  setNewData: (data: Inputs) => void;
  setOpen: (open: boolean) => void;
};

type Inputs = {
  typeCargo: string;
  descriptionTypeCargo: string;
};

const formSchema = z.object({
  typeCargo: z
    .string()
    .regex(/^[A-Za-z_]*$/, {
      message: "Solo se permiten letras y guiones bajos (sin números)"
    })
    .refine((data) => data.length > 0, {
      message: "Este campo es requerido"
    }),
  descriptionTypeCargo: z.string().refine((data) => data.length > 0, {
    message: "Este campo es requerido"
  })
});
export const ModalCreate = ({ setNewData, setOpen }: ModalCreateProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeCargo: "",
      descriptionTypeCargo: ""
    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewData(data);
    setOpen(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Tipo de Cargo
          </Label>
          <FormControl className="col-span-3">
            <Input
              id="name"
              defaultValue={""}
              {...form.register("typeCargo")}
            />
          </FormControl>
          {form.formState.errors.typeCargo && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              {form.formState.errors.typeCargo.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <FormControl className="col-span-3">
            <Textarea
              id="name"
              defaultValue={""}
              {...form.register("descriptionTypeCargo")}
            />
          </FormControl>
          {form.formState.errors.descriptionTypeCargo && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              {form.formState.errors.descriptionTypeCargo.message}
            </span>
          )}
        </div>
        <Button type="submit">Crear</Button>
      </form>
    </Form>
  );
};
