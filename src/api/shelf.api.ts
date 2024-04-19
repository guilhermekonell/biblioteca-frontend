import {
  CreateShelfType,
  EditShelfType,
  ShelfType,
  ShelfsFilterType,
} from "@/types/shelf.types";
import { axiosClient } from "./axios";

export class ShelfService {
  async listAll(filters?: ShelfsFilterType) {
    return await axiosClient.get<ShelfType[]>("/shelf", {
      params: { ...filters },
    });
  }

  async listById(id: string) {
    return await axiosClient.get<ShelfType>(`/shelf/${id}`);
  }

  async create({ code, name }: CreateShelfType) {
    return await axiosClient.post<ShelfType>("/shelf", {
      code,
      name,
    });
  }

  async update({ id, name, code }: EditShelfType) {
    return await axiosClient.put<ShelfType>(`/shelf/${id}`, {
      name,
      code,
    });
  }

  async delete(id: string) {
    return await axiosClient.delete(`/shelf/${id}`);
  }
}
