import { z } from "zod";

const BookShelfSchema = z.object({
  id: z
    .string({ required_error: "Estante é obrigatório" })
    .min(1, "Estante é obrigatório"),
  name: z.string().optional(),
  code: z.string().toUpperCase().optional(),
});

export const BookSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  publishingCompany: z
    .string({ required_error: "Editora é obrigatório" })
    .min(1, "Editora é obrigatório"),
  shelf: BookShelfSchema,
  created_at: z.date(),
  updated_at: z.date(),
});

export type BookType = z.infer<typeof BookSchema>;

export const CreateBookSchema = BookSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type CreateBookType = z.infer<typeof CreateBookSchema>;

export const EditBookSchema = BookSchema.omit({
  created_at: true,
  updated_at: true,
});

export type EditBookType = z.infer<typeof EditBookSchema>;

export const BooksFilterSchema = z.object({
  name: z.string(),
  publishingCompany: z.string(),
});

export type BooksFilterType = z.infer<typeof BooksFilterSchema>;
