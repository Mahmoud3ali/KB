import express, { Request, Response } from "express";
import polygonService from "../services/polygon";
import { getErrorMessage } from "../utils";

class PolygonController {
  public path = "/polygon";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}s`, this.list);
    this.router.post(`${this.path}`, this.create);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  public list = async (req: Request, res: Response) => {
    try {
      const polygons = await polygonService.list();
      return res.status(200).send({ data: polygons });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const polygon = await polygonService.create(req.body);
      return res.status(200).send({ data: polygon });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const polygon = await polygonService.update(req.params.id, req.body);
      return res.status(200).send({ data: polygon });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const polygon = await polygonService.delete(req.params.id);
      return res.status(200).send({ data: polygon });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };
}

export default new PolygonController();
