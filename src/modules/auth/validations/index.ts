import z from "zod";

export const registerZodSchema = z.object({
  firstName: z
    .string("First name should be a string")
    .nonempty("First name is required")
    .trim()
    .toLowerCase()
    .min(2, "First name must be at least 2 characters long")
    .max(30, "First name may not exceed 30 characters")
    .regex(
      /^(?!.*\d)(?!.* {2})([A-Za-z]+( [A-Za-z]+)*)$/,
      "First name cannot contain numbers or more than one space or special characters or symbols"
    ),
  lastName: z
    .string("Last name should be a string")
    .nonempty("Last name is required")
    .trim()
    .toLowerCase()
    .min(2, "Last name must be at least 2 characters long")
    .max(30, "Last name may not exceed 30 characters")
    .regex(
      /^(?!.*\d)(?!.* {2})([A-Za-z]+( [A-Za-z]+)*)$/,
      "Last name cannot contain numbers or more than one space or special characters or symbols"
    ),
});
