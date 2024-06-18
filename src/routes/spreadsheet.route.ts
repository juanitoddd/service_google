import { Request, Response, Router } from "express";
import { getSpreadsheet, updateSpreadsheet } from "src/controllers/sheets";
import { gRequest } from "src/types/express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ service: "service [google] is active" });
});

router.get("/:id/:range", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const spreadsheetId = req.params.id;
    const range = req.params.range;
    const values = await getSpreadsheet(req.locals.auth, spreadsheetId, range);
    res.json({ values });
  } else res.json({ status: "auth not possible" });
});

router.get("/update/:id/:range", async (req: gRequest, res: Response) => {
  if (req.locals.auth) {
    const spreadsheetId = req.params.id;
    const range = req.params.range;
    // TODO: Pass values to be updated
    let values = [
      ["foo", "bar"],
      // Additional rows ...
    ];
    const resource = {
      values,
    };
    const updatedCells = await updateSpreadsheet(
      req.locals.auth,
      spreadsheetId,
      range,
      resource
    );
    res.json({ updated: updatedCells });
  } else res.json({ status: "auth not possible" });
});

export default router;
