import express from "express";
import cors from "cors";
import ConnectDB from "./src/db/connection.js";

const app = express();

const Port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import route from "./src/routes/user.route.js";
app.use("/api", route);

ConnectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((Err) => {
    console.log(Err.message);
  });
