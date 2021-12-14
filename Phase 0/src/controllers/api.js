"use strict";

var express = require("express");
const router = express.Router({ mergeParams: true });
var arrayRotationController = require("./array-rotation");
var searchElementController = require("./search-element");
var arrayRearrangeController = require("./array-rearrange");
var sortingAlgorithmController = require("./sorting-algorithm");
var orderStatisticsController = require("./order-statistics");
var rangeQueriesController = require("./range-queries");
// import remarkController =require( "./remark";



/**
 * List of API.
 * @route /api
 */
router.use("/arrayRotation", arrayRotationController);
router.use("/searchElement", searchElementController);
router.use("/arrayRearrange", arrayRearrangeController);
router.use("/sortingAlgorithm", sortingAlgorithmController);
router.use("/orderStatistics", orderStatisticsController);
router.use("/rangeQueries", rangeQueriesController);
// router.use("/remark", remarkController);


module.exports = router;
