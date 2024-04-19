import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BooksFilterType, BooksFilterSchema } from "@/types/book.types";

type props = {
  handleFilterBooks: (data: BooksFilterType) => void;
};

export function BookFilters({ handleFilterBooks }: props) {
  const { register, handleSubmit } = useForm<BooksFilterType>({
    resolver: zodResolver(BooksFilterSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleFilterBooks)}
      className="flex items-center gap-2"
    >
      <Input placeholder="Nome do livro" {...register("name")} />
      <Input
        placeholder="Editora do livro"
        {...register("publishingCompany")}
      />

      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
