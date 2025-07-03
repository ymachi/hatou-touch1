import express from "express";
import userRouter from "./userRouter.js";
import boxRouter from "./boxRouter.js";
import orderRouter from "./orderRouter.js";
import estimateRouter from "./estimateRouter.js";
import contactRouter from "./contactRouter.js";
import galleryRouter from "./galleryRouter.js"
import commentRouter from "./commentRouter.js"

const router = express.Router();

// j'appelle mes routes
router.use("/users", userRouter);
router.use("/boxs", boxRouter);
router.use("/orders", orderRouter);
router.use("/estimates", estimateRouter);
router.use("/contacts", contactRouter);
router.use("/gallery", galleryRouter);
router.use("/avis", commentRouter)
export default router;
