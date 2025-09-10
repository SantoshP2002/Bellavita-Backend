import { Request, Response } from "express";
import { Product } from "../models";
import { AppError } from "../../../classes";

export const deleteProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    res.success(200, "Product deleted successfully", { product });
}