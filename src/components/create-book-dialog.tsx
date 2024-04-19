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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CreateBookSchema, CreateBookType } from "@/types/book.types";
import { useState } from "react";
import { BookService } from "@/api/book.api";
import { toast } from "sonner";
import { ShelfType } from "@/types/shelf.types";
import { PlusCircle } from "lucide-react";

const bookService = new BookService();

type props = {
  fetchData: () => void;
  shelfs: ShelfType[];
};

export function CreateBookDialog({ fetchData, shelfs }: props) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateBookType>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      name: "",
      description: "",
      publishingCompany: "",
      shelf: {
        id: "",
      },
    },
  });

  async function handleCreateBook(data: CreateBookType) {
    await bookService
      .create(data)
      .then(() => {
        toast.success("Livro criado!", {
          description: "Seu livro foi criado com sucesso.",
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
          <DialogTitle>Novo Livro</DialogTitle>
          <DialogDescription>Crie um novo livro</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateBook)}
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
              name="publishingCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Editora</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shelf.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estante</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma estante" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shelfs.map((shelf) => {
                        return (
                          <SelectItem key={shelf.id} value={shelf.id}>
                            {shelf.name} - {shelf.code}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
