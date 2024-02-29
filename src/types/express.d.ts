import { NextFunction, Request, Response } from "express";

export interface gRequest extends Request {
  locals: Record<string, any>;
}
