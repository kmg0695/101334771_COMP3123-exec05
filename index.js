import express, { Router } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import user from "./user.json" assert { type: "json" };

const app = express();
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/home", (req, res) => {
  res.sendFile(`${__dirname}/home.html`);
});

router.get("/profile", (req, res) => {
  res.send(user);
});

router.get("/login", (req, res) => {
  try {
    if (!req.query.username && !req.query.password) {
      return res.status(400).json({
        status: false,
        message: "Enter a username and password",
        date: new Date(),
      });
    } else if (!req.query.username) {
      return res.status(400).json({
        status: false,
        message: "Enter a username",
        date: new Date(),
      });
    } else if (!req.query.password) {
      return res.status(400).json({
        status: false,
        message: "Enter a password",
        date: new Date(),
      });
    } else if (req.query.username != user.username) {
      return res.status(400).json({
        status: false,
        message: "User name is invalid",
        date: new Date(),
      });
    } else if (req.query.password != user.password) {
      return res.status(400).json({
        status: false,
        message: "Password is invalid",
        date: new Date(),
      });
    } else if (
      req.query.username === user.username &&
      req.query.password === user.password
    ) {
      return res.status(200).json({
        status: true,
        message: "User is valid",
        date: new Date(),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error has occured",
      error: error,
    });
  }
});

router.get("/logout", (req, res) => {
  res.send(`<b>${req.query.username} successfully logged out</b>`);
});

app.use("/", router);

app.listen(process.env.PORT || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
