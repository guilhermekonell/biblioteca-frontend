import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShelfsFilterType, ShelfsFilterSchema } from "@/types/shelf.types";

type props = {
  handleFilterShelfs: (data: ShelfsFilterType) => void;
};

export function ShelfFilters({ handleFilterShelfs }: props) {
  const { register, handleSubmit } = useForm<ShelfsFilterType>({
    resolver: zodResolver(ShelfsFilterSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleFilterShelfs)}
      className="flex items-center gap-2"
    >
      <Input placeholder="Nome da estante" {...register("name")} />
      <Input placeholder="Código da estante" {...register("code")} />

      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
