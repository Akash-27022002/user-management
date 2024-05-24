const { Router } = require("express");
const { getUser, updatePassword, updateUser, deleteAccount, updateUserProfile } = require("../controllers");
const { upload } = require("../utils");
const userRouter = Router();

userRouter.route("/:id")
    .get(getUser)
    .post(updatePassword)
    .patch(updateUser)
    .delete(deleteAccount)

userRouter.route('/u/:id')
    .patch(upload.single("image"), updateUserProfile)

module.exports = userRouter;
