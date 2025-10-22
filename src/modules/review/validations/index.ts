import z from "zod";

export const createReviewZodSchema = z.object({
  rating: z
    .number("Rating must be Required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be maximum 5"),

  title: z
    .string("tile must be Required")
    .min(2, "Title must be at least 2 characters long")
    .trim(),
});

export const updateReviewZodSchema = createReviewZodSchema.partial().extend({
  productTitle: z.string().min(2).trim().optional(),
  removedImages: z.array(z.string().trim()).optional().default([]),
});
