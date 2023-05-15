import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
// import { exit } from 'node:process';
import cors from "cors";
const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
// Create a new multer instance with the 'single' option, which will only allow one file to be uploaded at a time.
// Create a new storage object that will save the files with their extensions.
const storageEngine = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  });

//initializing multer
const upload = multer({
    storage: storageEngine,
  });
// Create a new route that uses the `upload` middleware to handle file uploads.
app.post("/upload", upload.single("image"), (req, res) => {

 const path = req.file.originalname;
 console.log(path) 
if (req.file) {
    res.send({
    message: "File uploaded successfully.",
    path: path,
  });
  } else {
    res.status(400).send("Please upload a valid image");
  }
});




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ dest:"./uploads/" });
// app.post("/api/upload", upload.single("file"), function (req,res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});