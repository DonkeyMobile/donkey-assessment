import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import postRoutes from "./routes/postRoutes";

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/posts", postRoutes);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.status(500).json({ message: "Internal server error", error: isProduction ? undefined : err.message });
  });

  return app;
}
