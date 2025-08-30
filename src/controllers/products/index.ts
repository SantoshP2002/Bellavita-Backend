import { Request, Response } from "express";
import productModel from "../../models/products";

// CREATE PRODUCT
const createProduct = async (req: Request, res: Response) => {
  try {
     const newProduct = new productModel(req.body);
     const product = await newProduct.save();
    res.status(201).json({ message: "Product Create Successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET ALL PRODUCT
const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.status(201).json({ message: "Get All Product Successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findById(req.params.id);
    res
      .status(201)
      .json({ message: "Get Single Product ByID Successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
