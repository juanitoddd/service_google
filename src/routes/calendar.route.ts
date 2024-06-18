import { Request, Response, Router } from "express";
import {
  getCalendar,
  getEvents,
  listCalendars,
} from "src/controllers/calendar";
import { gRequest } from "src/types/express";
const router = Router();

router.get("/", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const calendars = await listCalendars(req.locals.auth);
    res.json({ service: "service [google] is active", calendars });
  } else res.json({ status: "auth not possible" });
});

router.get("/:id", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const id = req.params.id;
    const calendar = await getCalendar(req.locals.auth, id);
    res.json({ service: "service [google] is active", calendar });
  } else res.json({ status: "auth not possible" });
});

router.get("/events/:id", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const id = req.params.id;
    const events = await getEvents(req.locals.auth, id);
    res.json({ service: "service [google] is active", events });
  } else res.json({ status: "auth not possible" });
});

export default router;
