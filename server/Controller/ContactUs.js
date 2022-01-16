const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const ContactUs = require("../Model/ContactUs");
const mongoose = require("mongoose");

const contactusCtrl = {
  //Get
  //api/newsletter
  getAll: AsyncErrorHandler(async (req, res) => {
    const contactInfo = await ContactUs.find({}).sort({ createdAt: -1 });
    const totalCount = await ContactUs.countDocuments();
    if (contactInfo.length === 0) {
      res.status(200).json({ msg: "Empty contact list" });
    } else {
      res.status(200).json({ totalItems: totalCount, contactInfo });
    }
  }),
  //post
  //api/newsletter
  create: AsyncErrorHandler(async (req, res, next) => {
    const { name, email, contactReason } = req.body;
    if (!name && !email && !contactReason)
      return next(new ErrorHandler("provide all the required fields", 404));

    const contactInfo = new ContactUs({
      name,
      email,
      contactReason,
    });
    await contactInfo
      .save()
      .then((data) =>
        res
          .status(201)
          .json({ data, message: "contactus created successfully" })
      )
      .catch((err) => res.status(400).json({ message: "faild" }));
  }),
  //delete
  //api/newsletter
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No contactus found with id:${req.params.id}`, 404)
      );
    }
    await ContactUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
};
module.exports = contactusCtrl;
