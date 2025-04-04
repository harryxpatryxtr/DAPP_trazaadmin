import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import { z } from "zod";
type ModalCreateProps = {
  setNewData: (data: Inputs) => void;
  setOpen: (open: boolean) => void;
};

type Inputs = {
  typeUser: string;
  description: string;
};

const formSchema = z.object({
  typeUser: z
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
      typeUser: "",
      description: ""
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
            Tipo de Usuario
          </Label>
          <FormControl className="col-span-3">
            <Input id="name" defaultValue={""} {...form.register("typeUser")} />
          </FormControl>
          {form.formState.errors.typeUser && (
            <span className="text-red-500 col-span-4 text-xs text-right">
              {form.formState.errors.typeUser.message}
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
              {...form.register("description")}
            />
          </FormControl>
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
