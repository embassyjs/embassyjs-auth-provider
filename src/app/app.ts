import express from "express";
import bodyParser from "body-parser";
import endpoint from "../core/endpoint";
import { mirror } from "./mirror";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use("/",endpoint);
app.use("/", mirror);


export default app;
