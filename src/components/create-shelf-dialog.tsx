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
import { CreateShelfSchema, CreateShelfType } from "@/types/shelf.types";
import { ShelfService } from "@/api/shelf.api";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const shelfService = new ShelfService();

type props = {
  fetchData: () => void;
};

export function CreateShelfDialog({ fetchData }: props) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateShelfType>({
    resolver: zodResolver(CreateShelfSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  async function handleCreateShelf(data: CreateShelfType) {
    await shelfService
      .create(data)
      .then(() => {
        toast.success("Estante criada!", {
          description: "Sua estante foi criada com sucesso.",
        });
        form.reset();
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
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova estante</DialogTitle>
          <DialogDescription>Crie uma nova estante</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateShelf)}
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
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
