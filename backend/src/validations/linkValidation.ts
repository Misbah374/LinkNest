import { z } from "zod";

export const linkSchema = z.object({
  categoryId: z.string().min(1, "Category ID required"),
  name: z.string().min(1, "Name required"),
  originalURL: z.string().url("Invalid URL")
});