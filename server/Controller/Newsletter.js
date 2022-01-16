const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const Newsletter = require("../Model/Newsletter");
const mongoose = require("mongoose");

const newsletterCtrl = {
  //Get
  //api/newsletter
  getAll: AsyncErrorHandler(async (req, res) => {
    const newsletter = await Newsletter.find({}).sort({createdAt: -1});
    const totalCount = await Newsletter.countDocuments();
    if (newsletter.length === 0) {
      res.status(200).json({ msg: "Empty newsletter list" });
    } else {
      res.status(200).json({ totalItems: totalCount, newsletter });
    }
  }),
  //post
  //api/newsletter
  create: AsyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email)
      return next(new ErrorHandler("provide a valid email address", 404));
    const newsletter = new Newsletter({
      email,
    });
    await newsletter
      .save()
      .then((data) =>
        res
          .status(201)
          .json({ data, message: "newsletter created successfully" })
      )
      .catch((err) => res.status(400).json({ message: "faild" }));
  }),
  //delete
  //api/newsletter
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No newsletter found with id:${req.params.id}`, 404)
      );
    }
    await Newsletter.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
};
module.exports = newsletterCtrl;
