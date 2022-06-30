const express = require("express");
var cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const signinRoute = require("./routes/signinRoute");
const findUserRoute = require("./routes/findUserRoute");
const addProduct = require("./routes/Addproduct");
const deleteProduct = require("./routes/DeleteProduct");
const editProduct = require("./routes/EditProduct");
const featureProductRoute = require("./routes/FeatureProductRoute");
const latestProductRoute = require("./routes/LatestProductRoute");
const topCategoryRoute = require("./routes/TopCategoryRoute");
const manageUserRoute = require("./routes/manageUser");
const fetchAllProduct = require("./routes/FetchAllProduct");
const homePageProductRourte = require("./routes/HomePageProductRoute");
const userDataManageRoute = require("./routes/UserDataManage");
const forgotPasswordRoute = require("./routes/ForgotPassword");
const mongoDbProduct = require("./routes/mongoDbProduct");
const productPage = require("./routes/ProductPage");
const razorpayRoute = require("./routes/Razorpay");
const productRating = require("./routes/ProductRating");
const contactus = require("./routes/contactus");
const handleBlog = require("./routes/handleBlog");

const path = require("path");
const app = express();

app.use("/static", express.static(path.resolve("uploads")));

app.use(cors());
app.use("/login", loginRoute);
app.use("/signin", signinRoute);
app.use("/findUser", findUserRoute);
app.use("/addproduct", addProduct);
app.use("/fetchProduct", fetchAllProduct);
app.use("/deleteProduct", deleteProduct);
app.use("/editProduct", editProduct);
app.use("/featureproduct", featureProductRoute);
app.use("/latestproduct", latestProductRoute);
app.use("/topcategory", topCategoryRoute);
app.use("/manageUser", manageUserRoute);
app.use("/homepageproduct", homePageProductRourte);
app.use("/userDataManage", userDataManageRoute);
app.use("/forgotPassword", forgotPasswordRoute);
app.use("/productPage", productPage);
app.use("/thisProd", mongoDbProduct);
app.use("/razorpay", razorpayRoute);
app.use("/productRating", productRating);
app.use("/contactus", contactus);
app.use("/handleBlog", handleBlog);

app.listen(3001, () => {
  console.log("Server running on 3001");
});
