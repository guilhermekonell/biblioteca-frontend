import {
  BookType,
  BooksFilterType,
  CreateBookType,
  EditBookType,
} from "@/types/book.types";
import { axiosClient } from "./axios";

export class BookService {
  async listAll(filters?: BooksFilterType) {
    return await axiosClient.get<BookType[]>("/book", {
      params: { ...filters },
    });
  }

  async listById(id: string) {
    return await axiosClient.get<BookType>(`/book/${id}`);
  }

  async create({
    name,
    description,
    publishingCompany,
    shelf,
  }: CreateBookType) {
    return await axiosClient.post<BookType>("/book", {
      name,
      description,
      publishingCompany,
      shelf,
    });
  }

  async update({
    id,
    name,
    description,
    publishingCompany,
    shelf,
  }: EditBookType) {
    return await axiosClient.put<BookType>(`/book/${id}`, {
      name,
      description,
      publishingCompany,
      shelf,
    });
  }

  async delete(id: string) {
    return await axiosClient.delete(`/book/${id}`);
  }
}
