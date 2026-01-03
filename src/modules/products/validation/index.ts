import z from "zod";

export const createProductZodSchema = z
  .object({
    title: z
      .string({ error: "Title must be string" })
      .nonempty("Title is required")
      .min(1, { message: "Title must have minimum 2 characters long" }),
    brand: z
      .string({ error: "Brand must be string" })
      .nonempty("Brand is required")
      .min(1, { message: "Brand must have minimum 2 characters long" }),
    price: z.coerce
      .number({ error: "Price is required" })
      .nonnegative("Price must be a positive number")
      .min(1, { message: "Minimum price should be 1" }),
    sellingPrice: z.coerce
      .number({ error: "Selling price is required" })
      .nonnegative("Selling price must be a positive number")
      .min(1, { message: "Minimum Selling price should be 1" }),
    description: z
      .string({ error: "Description must be string" })
      .nonempty("Description is required")
      .min(1, { message: "Description must have minimum 2 characters long" }),
    keyBenefits: z.string({ error: "Key benefits must be string" }).optional(),
    howToUse: z.string({ error: "How To Use must be string" }).optional(),
    ingredients: z.string({ error: "ingredients must be string" }).optional(),
    otherInformation: z
      .string({ error: "otherInformation must be string" })
      .optional(),
    category: z.object({
      name: z.string().nonempty("Category name is required"),
      value: z.string().nonempty("Category value is required"),
    }),
    subCategory: z
      .object({
        name: z.string().optional(),
        value: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.sellingPrice < data.price, {
    message: "Selling price must be less than Price",
    path: ["sellingPrice"],
  });

export const updateProductZodSchema = z.object({
  title: z.string("Title should be a string").optional(),
  brand: z.string("Brand should be a string").optional(),
  description: z.string("Description should be a string").optional(),
  price: z.coerce
    .number("Price should be a number")
    .min(1, "Price must be greater than 0")
    .optional(),
  sellingPrice: z.coerce
    .number("Selling price should be a number")
    .min(1)
    .optional(),
  category: z.string("Category should be a string").optional(),
});
