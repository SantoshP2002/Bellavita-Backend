import z from "zod";

export const loginZodSchema = z.object({
  email: z
    .email("Email should be a valid email address")
    .nonempty("email is required")
    .trim()
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/,
      "please provide a valid email address, like example@domain.com"
    ),
  password: z
    .string("password should be a string")
    .nonempty("password is required")
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password may not exceed 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])(?=\S.*$).{6,20}$/,
      "Password must be 6–20 characters long, include at least one uppercase letter, one lowercase letter, one number, one special character, and must not contain spaces"
    ),
});

export const registerZodSchema = loginZodSchema
  .extend({
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
    confirmPassword: z
      .string("Confirm password should be a string")
      .nonempty("Confirm password is required")
      .trim()
      .min(6, "Confirm password must be at least 6 characters long")
      .max(20, "Confirm password may not exceed 20 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])(?=\S.*$).{6,20}$/,
        "Confirm Password must be 6–20 characters long, include at least one uppercase letter, one lowercase letter, one number, one special character, and must not contain spaces"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
