//handling uncaught exceptions, if something is undefined/uncaught then this will handled
process.on("uncaughtException", (err) => {
  console.log(
    `server is shutting down due to uncaught exception: ${err.message} ${err.stack}`
  );
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//app initialization
const app = express();
//require db
const connect = require("./config/db");
connect();

//body-parser
// Also you can increase your request in nginx configuration

// server{
//  location / {
//         client_max_body_size       xxm;
//         client_body_buffer_size    xxm;
//   }
// }
app.use(express.json({ limit: 100000000 }));
app.use(express.urlencoded({ limit: 100000000,extended: true, parameterLimit:50000000 }));
//cookieParser
app.use(cookieParser());

//cors
app.use(cors());

//destructure env object
let { SERVER_DEV_NAME } = process.env;

app.get("/", (req, res) => {
  res
    .status(200)
    .send(`${SERVER_DEV_NAME} is running the server at port: ${PORT}`);
});

// Routes
app.use("/api/blogs", require("./Routes/Blogs"));
app.use("/api/newsletter", require("./Routes/Newsletter"));
app.use("/api/contactus", require("./Routes/ContactUs"));
app.use("/api/getintouch", require("./Routes/GetInTouch"));
app.use("/api/booksession", require("./Routes/BookASession"));
app.use("/api/carrer", require("./Routes/CarrerPortal"));

let PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`server is running at port ${PORT}`)
);

//unhandled promise rejection handling
process.on("unhandledRejection", (err) => {
  console.log(
    "shutting down server due to unhandled promise rejection. Error: " +
      err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
