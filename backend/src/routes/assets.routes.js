const { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset } = require("../controller/assets.controller")
const express = require("express")
const router = express.Router()

router.get("/", getAllAssets)
router.get("/:id", getAssetById)
router.post("/", createAsset)
router.put("/:id", updateAsset)
router.delete("/:id", deleteAsset)
module.exports = router