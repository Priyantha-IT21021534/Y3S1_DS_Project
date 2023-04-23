const express = require("express");
const router = express.Router();
const reviews = require("../model/review");
const reviewController= require("../controllers/reviewController");



router.post("/addReview",reviewController.addReview);
router.get("/getReviews",reviewController.getAllReviews);
router.get("/getId/:id",reviewController.getById);
router.put("/updateReview/:id",reviewController.updateReview);
router.delete("/deleteReview/:id",reviewController.deleteReview);

module.exports = router;