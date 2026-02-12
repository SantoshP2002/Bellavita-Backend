import { Request, Response } from "express";
import { NewsroomModel } from "../models";
import { AppError } from "../../../classes";

// Get All Newsroom Controller
export const getNewsroomController = async (_req: Request, res: Response) => {
    const newsroom = await NewsroomModel.find().sort({ createdAt: -1 });

    if (!newsroom) {
        throw new AppError("No newsroom found", 404);
    }

    res.success(200, "Get Newsroom successfully", { newsroom });
}

// Get Newsroom By ID Controller
export const getNewsroomBydController = async (req: Request, res: Response) => { 
    const { id } = req.params;
    const newsroom = await NewsroomModel.findById(id)

    if (!newsroom) {
        throw new AppError("Newsroom not found by ID", 404);
    }

    res.success(200, "Get Newsroom by ID successfully", { newsroom });
}