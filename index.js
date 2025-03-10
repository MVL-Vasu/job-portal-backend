
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 3001;
import express from "express";
import cors from"cors";
import { clerkMiddleware } from "@clerk/express"
import getConnection from"./utils/getConnection.js";
import clerkWebhooks from"./controllers/webhooks.js";
import connectCloudinary from "./config/cloudinary.js";

import companyRoutes from "./routes/companyRoutes.js"
import JobRoutes from "./routes/JobRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

getConnection();
await connectCloudinary();

app.get("/", (req, res) => {
     res.send("Backend Working")
});

// app.post("/add-job", async (req, res) => {


//      try {

//           const job = new Jobs(req.body)
//           await job.save();

//           res.status(200).json({ success: true, message: "Job Posted successfully" });

//      } catch (e) {

//           res.status(500).json({success: false, error : e, message : "Job Posting failed" });

//      }

// });

// app.post("/get-all-jobs", async (req, res) => {

//      try {
          
//           const jobs =  await Jobs.find();
//           res.status(200).json({ success: true, message: "Job Fetched Successfully", jobs : jobs });

//      } catch (e) {

//           res.status(404).json({success: false, error : e, message : "Failed to Fetch Jobs"});
//           console.log(e);

//      }

// });

app.post("/webhooks", clerkWebhooks);

app.use("/api/company", companyRoutes)

app.use("/api/job", JobRoutes)

app.use("/api/users/",userRoutes);

app.listen(PORT, () => {

     console.log("listening on port " + PORT);

})