import { Request, Response, Router } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ service: "service [google] is active" });
});

export default router;
