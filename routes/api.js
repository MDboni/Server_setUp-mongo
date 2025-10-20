import express from "express";
const router = express.Router();
import *as ProductController from '../app/controller/ProductController.js'
import *as UserController from '../app/controller/UserController.js'


router.get('/ProductBrandList', ProductController.ProductBrandList)
router.get('/ProductCategoryList', ProductController.ProductCategoryList)
router.get('/ProductSliderList', ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID', ProductController.ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList)
router.post('/ProductListByFilter', ProductController.ProductListByFilter)

// user service 

router.get('/UserOTP/:email', UserController.UserOTP )




export default router;