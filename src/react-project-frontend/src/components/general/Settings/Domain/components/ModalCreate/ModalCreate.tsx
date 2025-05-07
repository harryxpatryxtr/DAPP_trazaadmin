import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";

type ModalCreateProps = {
  setNewData: (data: any) => void;
  setOpen: (open: boolean) => void;
};
const formSchema = z.object({
  dominio: z
    .string()
    .regex(/^[A-Za-z_]*$/, {
      message: "Solo se permiten letras y guiones bajos (sin números)"
    })
    .refine((data) => data.length > 0, {
      message: "Este campo es requerido"
    }),
  description: z.string().refine((data) => data.length > 0, {
    message: "Este campo es requerido"
  })
});

export const ModalCreate = ({ setNewData, setOpen }: ModalCreateProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dominio: "",
      description: ""
    }
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    setNewData(data);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Dominio
          </Label>
          <FormControl className="col-span-3">
            <Input placeholder="" {...form.register("dominio")} />
          </FormControl>
          {form.formState.errors.dominio && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              {form.formState.errors.dominio.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-x-4">
          <Label htmlFor="name" className="text-right">
            Descripcion
          </Label>
          <Textarea
            id="name"
            defaultValue={""}
            className="col-span-3"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              {form.formState.errors.description.message}
            </span>
          )}
        </div>
        <Button type="submit">Crear</Button>
      </form>
    </Form>
  );
};
