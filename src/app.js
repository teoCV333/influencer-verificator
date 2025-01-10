const express = require("express");
const app = require("express")();

const influencerRouters = require("./routes/influencerRoutes");

app.use(express.json());

// Routes
app.use("/api/influencer", influencerRouters);

module.exports = app;