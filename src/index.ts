import express from "express";
import { json } from "body-parser";
import { router } from "./post/routes.config";

const app = express();
app.use(json());
app.use(router);


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})