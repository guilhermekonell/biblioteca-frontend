import { BookService } from "@/api/book.api";
import { ShelfService } from "@/api/shelf.api";
import { BookFilters } from "@/components/book-filters";
import { CreateBookDialog } from "@/components/create-book-dialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { EditBookDialog } from "@/components/edit-book-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookType, BooksFilterType } from "@/types/book.types";
import { ShelfType } from "@/types/shelf.types";
import { RefreshCw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const bookService = new BookService();
const shelfService = new ShelfService();

export function Book() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [shelfs, setShelfs] = useState<ShelfType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await bookService.listAll().then(({ data }) => {
      setBooks(data);
    });

    await shelfService.listAll().then(({ data }) => {
      setShelfs(data);
    });
  }

  async function handleDeleteBook(id: string) {
    await bookService
      .delete(id)
      .then(() => {
        toast.success("Livro excluído!", {
          description: "Seu livro foi excluído com sucesso.",
        });
        fetchData();
      })
      .catch(() => {
        toast.error("Houve algum erro!", {
          description: "Não foi possível executar esta ação.",
        });
      });
  }

  async function handleFilterBooks(data: BooksFilterType) {
    await bookService.listAll(data).then(({ data }) => {
      setBooks(data);
    });
  }

  return (
    <div className="p-6 w-[800px] mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Livros</h1>
      <div className="flex items-center justify-between">
        <BookFilters handleFilterBooks={handleFilterBooks} />

        <div>
          <Button
            className="mr-2"
            variant="outline"
            onClick={() => fetchData()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <CreateBookDialog
            fetchData={fetchData}
            shelfs={shelfs}
          ></CreateBookDialog>
        </div>
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Editora</TableHead>
              <TableHead>Código da estante</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow key={book.id}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.publishingCompany}</TableCell>
                  <TableCell>{book.shelf.code}</TableCell>
                  <TableCell className="text-right">
                    <EditBookDialog
                      book={book}
                      fetchData={fetchData}
                      shelfs={shelfs}
                    />
                    <DeleteDialog
                      handleAction={() => handleDeleteBook(book.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </DeleteDialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
