import { ShelfService } from "@/api/shelf.api";
import { CreateShelfDialog } from "@/components/create-shelf-dialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { EditShelfDialog } from "@/components/edit-shelf-dialog";
import { ShelfFilters } from "@/components/shelf-filters";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShelfType, ShelfsFilterType } from "@/types/shelf.types";
import { RefreshCw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const shelfService = new ShelfService();

export function Shelf() {
  const [shelfs, setShelfs] = useState<ShelfType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await shelfService.listAll().then(({ data }) => {
      setShelfs(data);
    });
  }

  async function handleDeleteShelf(id: string) {
    await shelfService
      .delete(id)
      .then(() => {
        toast.success("Estante excluída!", {
          description: "Sua estante foi excluída com sucesso.",
        });
        fetchData();
      })
      .catch(() => {
        toast.error("Houve algum erro!", {
          description: "Não foi possível executar esta ação.",
        });
      });
  }

  async function handleFilterShelfs(data: ShelfsFilterType) {
    await shelfService.listAll(data).then(({ data }) => {
      setShelfs(data);
    });
  }

  return (
    <div className="p-6 w-[800px] mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Estantes</h1>
      <div className="flex items-center justify-between">
        <ShelfFilters handleFilterShelfs={handleFilterShelfs} />

        <div>
          <Button
            className="mr-2"
            variant="outline"
            onClick={() => fetchData()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <CreateShelfDialog fetchData={fetchData} />
        </div>
      </div>
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shelfs.map((shelf) => {
              return (
                <TableRow key={shelf.id}>
                  <TableCell>{shelf.name}</TableCell>
                  <TableCell>{shelf.code}</TableCell>
                  <TableCell className="text-right">
                    <EditShelfDialog shelf={shelf} fetchData={fetchData} />
                    <DeleteDialog
                      handleAction={() => handleDeleteShelf(shelf.id)}
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
