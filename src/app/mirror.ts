import { Request, Response } from "express";

function mirror(req:Request, res:Response): void{
    res.send(req.url);
}

export {mirror};