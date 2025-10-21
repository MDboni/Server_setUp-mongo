import express from "express";
const router = express.Router();
import *as ProductController from '../app/controller/ProductController.js'
import *as UserController from '../app/controller/UserController.js'
import *as WishListController from '../app/controller/WishListController.js'
import *as CartListController from '../app/controller/CartListController.js'
import  AuthMiddleware from '../app/middlewares/AuthMiddleware.js'


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

router.get('/UserOTP/:email',UserController.UserOTP )
router.get('/VerifyOtpControler/:email/:otp', UserController.VerifyOtpController )
router.get('/UserLogOut', AuthMiddleware ,    UserController.UserLogOut )
router.post('/CreateProfile', AuthMiddleware ,    UserController.CreateProfile )
router.post('/UpdateProfile', AuthMiddleware ,    UserController.UpdateProfile )
router.get('/ReadProfileControler', AuthMiddleware ,    UserController.ReadProfileControler )


// wish list ...........

router.post('/createWishListControler', AuthMiddleware ,    WishListController.createWishListControler )
router.post('/UpdateWishListControler', AuthMiddleware ,    WishListController.UpdateWishListControler )
router.delete('/RemoveWishListControler', AuthMiddleware ,    WishListController.RemoveWishListControler )
router.get('/WishListControler', AuthMiddleware ,    WishListController.WishListControler )

// Cart list ....................
router.post('/createCartListControler', AuthMiddleware ,    CartListController.createCartListControler )
router.post('/UpdateCartListControler', AuthMiddleware ,    CartListController.UpdateCartListControler )
router.delete('/RemoveCartListControler', AuthMiddleware ,    CartListController.RemoveCartListControler )
router.get('/CartistControler', AuthMiddleware ,    CartListController.CartistControler )






export default router;