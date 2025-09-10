import z from "zod";

export const createProductZodSchema = z.object({
  title: z.string("Title should be a string").nonempty("Title is required"),
  brand: z.string("Brand should be a string").nonempty("Brand is required"),
  description: z
    .string("Description should be a string")
    .nonempty("Description is required"),
  price: z.coerce
    .number("Price should be a number")
    .min(1, "Price is required"),
  sellingPrice: z.coerce
    .number("Selling price should be a number")
    .min(1, "Selling price is required"),
  category: z
    .string("Category should be a string")
    .nonempty("Category is required"),
});
