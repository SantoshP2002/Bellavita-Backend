import { Response } from "express";
import { AuthorizedRequest } from "../../../types";
import { Order } from "../schema";
import { Product } from "../../products/models";

export const getAdminOrderController = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const adminID = req.user?._id;

  // Admin ke konse konse  product hai (find )
  const adminProduct = await Product.find({ createdBy: adminID }, { _id: 1 });

  // jo admin products ke ids hai usko map kar
  const productIds = adminProduct.map((p) => p._id);

  const orders = await Order.find({
    "products.product": { $in: productIds },
  })
    .populate("user", "email role name")
    .populate("products.product", "title createdBy")
    .lean();

  res.success(200, "Get Admin Orders Successfully", { orders });
};
