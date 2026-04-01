const Router = require("express").Router();
const httpstatusConstant = require("../constant/httpstatus.constant");
const authRoutes = require("./auth.route");

Router.get("/health", (req, res) => {
  return res.status(httpstatusConstant.OK).json({
    success: true,
    message: "Health check successful",
    timestamp: new Date().toISOString(),
  });
});

Router.use("/auth", authRoutes);

const criteria3Routes = require("./criterion3.route"); // Pehle import karein
Router.use("/criteria3", criteria3Routes);             // Phir use karein

module.exports = Router;
