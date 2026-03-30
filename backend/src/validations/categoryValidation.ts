import { z } from "zod";

export const categorySchema = z.object({
  displayName: z.string().min(1, "Display name required")
});