import { NextFunction, Request, Response } from "express";
import path from "path";

export const notFound = (
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  const acceptedType = req.accepts(["html", "json", "text"]);

  if (acceptedType === "html") {
    // If client wants HTML
    res.status(404).sendFile(path.resolve("public", "404.html"));
  } else if (acceptedType === "json") {
    // If client wants JSON (Postman, Axios etc.)
    res.status(404).json({
      success: false,
      error: true,
      message: `Cannot find ${req.originalUrl} on this server`,
      statusCode: 404,
    });
  } else if (acceptedType === "text") {
    // If client wants plain text
    res
      .status(404)
      .type("txt")
      .send(`Cannot find ${req.originalUrl} on this server`);
  } else {
    // Default case, in case no accepted format matches
    res.status(404).json({
      success: false,
      error: true,
      message: `Cannot find ${req.originalUrl} on this server`,
      statusCode: 404,
    });
  }
};
