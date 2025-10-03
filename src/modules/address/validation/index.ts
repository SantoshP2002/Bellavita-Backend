import z from "zod";
import { ALLOW_COUNTRIES } from "../constants";

export const addZodSchema = z.object({
  address: z
    .string("address must be a string")
    .min(3)
    .nonempty("address must be required"),
  landmark: z
    .string("landmark bust be string")
    .min(2)
    .nonempty("landmark must be required")
    .optional()
  ,
  city: z
    .string("city must be Required")
    .min(2)
    .nonempty("city must be required"),
  state: z
    .string("state must be a required")
    .min(2)
    .nonempty("state must be required"),
  pinCode: z.string("pincode must be a required").min(6).max(6),
  country: z.enum(ALLOW_COUNTRIES),
  altPhoneNumber: z
    .string("alternate Phone Number must be a string")
    .min(10)
    .max(10)
    .nonempty("alternate Phone Number is required")
    .optional()
  ,
  phoneNumber: z
    .string("phone Number must be string")
    .min(10)
    .max(10)
    .nonempty("Phone Number is required"),
  firstName: z
    .string("First Name must be a string")
    .min(2, "First Name must be a required minimum 2")
    .max(20, "First Name is less than 20 characters")
    .nonempty("First Name is required"),
  lastName: z
    .string("Last Name must be a string")
    .min(2, "Last Name must be a required minimum 2")
    .max(20, "Last Name is less than 20 characters")
    .nonempty("Last Name is required"),
  email: z
    .email("Email should be a valid email address")
    .nonempty("email is required")
    .trim()
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/,
      "please provide a valid email address, like example@domain.com"
    ),
});

export const updateZodSchema = addZodSchema.partial()
