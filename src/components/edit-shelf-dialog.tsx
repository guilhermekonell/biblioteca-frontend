import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Dialog,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { EditShelfSchema, EditShelfType, ShelfType } from "@/types/shelf.types";
import { ShelfService } from "@/api/shelf.api";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useState } from "react";

const shelfService = new ShelfService();

type props = {
  shelf: ShelfType;
  fetchData: () => void;
};

export function EditShelfDialog({ shelf, fetchData }: props) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditShelfType>({
    resolver: zodResolver(EditShelfSchema),
    defaultValues: shelf,
  });

  async function handleEditShelf(data: EditShelfType) {
    await shelfService
      .update(data)
      .then(() => {
        toast.success("Estante atualizada!", {
          description: "Sua estante foi atualizada com sucesso.",
        });
        fetchData();
        setOpen(false);
      })
      .catch(() => {
        toast.error("Houve algum erro!", {
          description: "Não foi possível executar esta ação.",
        });
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="mr-2">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar estante</DialogTitle>
          <DialogDescription>Edite uma estante</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditShelf)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
