import express from "express";
import Utils from "./Routers/utils";
const app = express();
import { initData } from "./util/getList";
const port = 3000;

app.use("/util", Utils);

initData().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
// app.listen(port, () => {
//   console.log(`Timezones by location application is running on port ${port}.`);
// });
