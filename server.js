// API development / Mern Stack <=> server.js

import express from "express";
import path from "path";
import posts from "./routes/posts.js";
const port = process.env.PORT || 8000;

const app = express(); // routes and middleware

// const express = require("express");
// const path = require("path");
// const posts = require("./routes/posts");

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for form data

// Routes
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Command to watch for file changes: node --watch server.js
// Command to watch with preserve output: node --watch --watch-preserve-output server.js
