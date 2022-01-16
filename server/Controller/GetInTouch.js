const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const GetInTouch = require("../Model/GetInTouch");
const mongoose = require("mongoose");

const GetInTouchCtrl = {
  //Get
  //api/newsletter
  getAll: AsyncErrorHandler(async (req, res) => {
    const contactInfo = await GetInTouch.find({}).sort({ createdAt: -1 });
    const totalCount = await GetInTouch.countDocuments();
    if (contactInfo.length === 0) {
      res.status(200).json({ msg: "Empty contact list" });
    } else {
      res.status(200).json({ totalItems: totalCount, contactInfo });
    }
  }),
  //post
  //api/newsletter
  create: AsyncErrorHandler(async (req, res, next) => {
    const {
      firstName,
      lastName,
      businessEmail,
      services,
      companyName,
      contactReason,
      agreeForNotifiedFromUs,
    } = req.body;
    if (
      !firstName &&
      !lastName &&
      !businessEmail &&
      !services &&
      !companyName &&
      !contactReason
    )
      return next(new ErrorHandler("provide all the required fields", 404));

    const contactInfo = new GetInTouch({
      firstName,
      lastName,
      businessEmail,
      services,
      companyName,
      contactReason,
      agreeForNotifiedFromUs,
    });
    await contactInfo
      .save()
      .then((data) =>
        res
          .status(201)
          .json({ data, message: "GetInTouch created successfully" })
      )
      .catch((err) => res.status(400).json({ message: "faild" }));
  }),
  //delete
  //api/newsletter
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No GetInTouch found with id:${req.params.id}`, 404)
      );
    }
    await GetInTouch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
};
module.exports = GetInTouchCtrl;
