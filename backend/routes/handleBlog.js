const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");
const Orderhistory = require("../models/orderHistory");
const BlogCommentSchema = require("../models/blogComment");
const BlogSchema = require("../models/blogData");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwtVerificationMid");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/addBlog", upload.single("blogImage"), (req, res) => {
  if (req.file) {
    let fileType = req.file.mimetype.split("/")[1];
    let newFilename = req.file.filename + "." + fileType;
    fs.rename(
      path.resolve(process.cwd(), `uploads/${req.file.filename}`),
      path.resolve(process.cwd(), `uploads/${newFilename}`),
      (data) => {
        console.log("File Uploaded");
      }
    );

    const newBlog = new BlogSchema({
      title: req.body.title,
      content: req.body.content,
      authorID: req.body.authorID,
      blogImage: newFilename,
      blogtag: req.body.blogtag,
    });

    newBlog
      .save()
      .then((response) => {
        res.status(200).json({ message: "Blog Saved SuccessFully" });
      })
      .catch((err) => {
        console.log(err, "err blog");
        res
          .status(300)
          .json({ message: "Something went wring in saving the Blog" });
      });
  } else {
    const newBlog = new BlogSchema({
      title: req.body.title,
      content: req.body.content,
      authorID: req.body.authorID,
      blogtag: req.body.blogtag,
    });

    newBlog
      .save()
      .then((response) => {
        res.status(200).json({ message: "Blog Saved SuccessFully" });
      })
      .catch((err) => {
        console.log(err, "err blog");
        res
          .status(300)
          .json({ message: "Something went wring in saving the Blog" });
      });
  }
});

router.get("/getAllBlog", (req, res) => {
  BlogSchema.find()
    .populate("authorID")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log(err, "err in Getting Blogs");
      res
        .status(300)
        .json({ message: "Something went Wrong in fetvhing All Blogs." });
    });
});

router.post("/getAllDisplayBlog", (req, res) => {
  BlogSchema.find({ approveByAdmin: true })
    .populate("authorID")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      res
        .status(300)
        .json({ message: "Sometinh went Wrong in fetching Blogs" });
    });
});

router.post("/getBlogById", (req, res) => {
  BlogSchema.findOne({ _id: req.body.blogID })
    .populate("authorID")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log("err in Getting Blog", err);
      res
        .status(300)
        .json({ message: "Something went Wrong in Fetching Blog" });
    });
});

router.post("/approveBlog", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    console.log("Approveing");
    BlogSchema.updateOne(
      { _id: req.body.blogID },
      {
        $set: {
          approveByAdmin: true,
        },
      }
    )
      .then((response) => {
        res.status(200).json({ message: "Blog Approved" });
      })
      .catch((err) => {
        res
          .status(300)
          .json({ message: "Something went wrong in approving Blog" });
      });
  });
});

router.post("/deleteBlog", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    BlogSchema.deleteOne({ _id: req.body.blogID })
      .then((response) => {
        res.status(200).json({ message: "BLog Deletedd Successfully" });
      })
      .catch((err) => {
        res
          .status(300)
          .json({ message: "Something went wring in deleting the BLog" });
      });
  });
});

router.post("/getThisBlog", (req, res) => {
  BlogSchema.findOne({ _id: req.body.blogID })
    .populate("authorID")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      res.status(300).json({ message: "Fail to fetch this Blog" });
    });
});

router.post("/likeBlog", (req, res) => {
  BlogSchema.findOne({ _id: req.body.blogID })
    .then((response) => {
      if (response?.likes?.includes(req.body.userID)) {
        res.status(200).json({ message: "Post Already liked" });
      } else {
        BlogSchema.updateOne(
          { _id: req.body.blogID },
          {
            $push: {
              likes: [req.body.userID],
            },
          }
        )
          .then((result) => {
            res.status(200).json({ message: "Blog Liked Successfully" });
          })
          .catch((err) => {
            res
              .status(300)
              .json({ message: "something went wring in liking the Blog" });
          });
      }
    })
    .catch((err) => {
      res
        .status(300)
        .json({ message: "Something Went Wrong in like Blog route" });
    });
});

router.post("/unlikeBlog", (req, res) => {
  BlogSchema.findOne({ _id: req.body.blogID })
    .then((response) => {
      likeArr = response.likes;
      const newLikeArr = likeArr.filter((item) => {
        if (req.body.userID != item) {
          return item;
        }
      });
      BlogSchema.updateOne(
        { _id: req.body.blogID },
        {
          $set: {
            likes: newLikeArr,
          },
        }
      )
        .then((result) => {
          res.status(200).json({ message: "Blog Unlike Successfuly" });
        })
        .catch((err) => {
          res
            .status(300)
            .josn({ message: "Something went wrong in unliking blog" });
        });
    })
    .catch((err) => {
      res.status(300).json({ message: "Something went wrong unlike Route" });
    });
});

router.post("/addComment", (req, res) => {
  const newblogComment = new BlogCommentSchema({
    blogID: req.body.blogID,
    userID: req.body.userID,
    comment: req.body.comment,
  });

  newblogComment
    .save()
    .then((response) => {
      res.status(200).json({ message: "comment Posted" });
    })
    .catch((err) => {
      res.status(300).json({ message: "comment Not Posted" });
    });
});

router.post("/fetchComment", (req, res) => {
  BlogCommentSchema.find({ blogID: req.body.blogID })
    .populate("userID")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      res.status(300).josn({ message: "Commnet not fetch" });
    });
});
module.exports = router;
