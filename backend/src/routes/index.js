const { Router } = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const middleware = require("../middleware/verifyAuth");
const router = Router();

router.use("/auth", authRouter);
authRouter.use(middleware.decodeToken)
router.use("/user", userRouter);

module.exports = router;