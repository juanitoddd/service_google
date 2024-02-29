import { Request, Response, Router } from "express";
import { authorize } from "src/controllers/auth";
import { listCalendars } from "src/controllers/calendar";
import { listMajors } from "src/controllers/sheets";
import { gRequest } from "src/types/express";
const router = Router();

router.get("/", async (req: gRequest, res: Response) => {
  console.log("🚀 ~ req:", req.locals);
  res.json({ service: "service [google] is active" });
});

router.get("/calendars", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const calendars = await listCalendars(req.locals.auth);
    res.json({ service: "service [google] is active", calendars });
  } else res.json({ status: "auth not possible" });
});

router.get("/sheets", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const majors = await listMajors(req.locals.auth);
    res.json({ service: "service [google] is active", majors });
  } else res.json({ status: "auth not possible" });
});

export default router;
