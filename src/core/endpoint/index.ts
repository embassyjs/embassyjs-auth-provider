import express from "express";

import configuration from "./configuration";

const router = express.Router();
const routerContext = "/oauth2" || process.env["ROUTER_CONTEXT"];

router.use(routerContext, configuration);

export default router;