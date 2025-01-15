const express = require("express");
const app = require("express")();
const cors = require("cors");

const influencerRouters = require("./routes/influencerRoutes");

app.use(cors())
app.use(express.json());


// Routes
app.use("/api/influencer", influencerRouters);

module.exports = app;