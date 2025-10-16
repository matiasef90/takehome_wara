const {
    createAssetController,
    getAllAssetsController,
    getAssetByIdController,
    updateAssetController,
    deleteAssetController,
    getAllAssets,
    getAssetById,
    createAsset,
    updateAsset,
    deleteAsset
} = require("../controller/assets.controller")
const express = require("express")
const router = express.Router()
router.get("/", getAllAssetsController({getAllAssets}))
router.get("/:id", getAssetByIdController({getAssetById}))
router.post("/", createAssetController({createAsset}))
router.put("/:id", updateAssetController({updateAsset}))
router.delete("/:id", deleteAssetController({deleteAsset}))
module.exports = router