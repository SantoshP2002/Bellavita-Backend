import z from "zod";

export const quantityZodSchema = z.object({
  quantity: z.coerce
    .number("Quantity should be a number")
    .min(1, "Quantity must be 1")
    .max(5, "Quantity must be less than or equal to 5"),
});
