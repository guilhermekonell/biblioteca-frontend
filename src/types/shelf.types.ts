import { z } from "zod";

export const ShelfSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome é obrigatório"),
  code: z
    .string({ required_error: "O código é obrigatório" })
    .min(1, "O código deve conter no mínimo 1 caractere")
    .max(2, "O código deve conter no máximo 2 caracteres")
    .toUpperCase(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ShelfType = z.infer<typeof ShelfSchema>;

export const CreateShelfSchema = ShelfSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type CreateShelfType = z.infer<typeof CreateShelfSchema>;

export const EditShelfSchema = ShelfSchema.omit({
  created_at: true,
  updated_at: true,
});

export type EditShelfType = z.infer<typeof EditShelfSchema>;

export const ShelfsFilterSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export type ShelfsFilterType = z.infer<typeof ShelfsFilterSchema>;
