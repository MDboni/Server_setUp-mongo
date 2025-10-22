import CartModel from "../model/CartModel.js"
import mongoose from "mongoose";
import ProfileModel from "../model/ProfileModel.js";
import InvoiceModel from "../model/InvoiceModel.js";
import InvoiceProductModel from "../model/InvoiceProductModel.js";
import PaymentSettingModel from "../model/PaymentSettingModel.js";
import FormData from "form-data";
import axios from "axios";
const ObjectId = mongoose.Types.ObjectId;


export const CreateInvoiceService = async(req) =>{

    const user_id = new ObjectId(req.headers.user_id)
    const email = (req.headers.email)

    // 1 Calculate Total Paybale & vat ..........................

    const matchStage = {$match:{userID:user_id}}
    const JoinStageProduct ={$lookup:{ from:'products', localField:'productID', foreignField:'_id' , as:'product'}}
    let unwindStage={$unwind:"$product"}
    const CartProducts = await CartModel.aggregate([matchStage,JoinStageProduct,unwindStage])


    let totalAmmount = 0 ;
    CartProducts.forEach((item)=>{
        let price ;
        if (item.product.discount === true && item.product.discountPrice){
            price= parseFloat(item['product']['discountPrice'])
        }else{
            price=parseFloat(item['product']['price'])
        }
        totalAmmount += parseFloat(item['qty']*price)
    })

    let vat = totalAmmount* 0.05
    let Paybale = totalAmmount+vat 

    // step 2 Prepare  Customer Details & Shipping Details================================================

    const Profile = await ProfileModel.aggregate([matchStage])
    const cus_details=`Name:${Profile[0]['cus_name']}, Email:${email}, Address:${Profile[0]['cus_add']}, Phone:${Profile[0]['cus_phone']}`;
    const ship_details=`Name:${Profile[0]['ship_name']}, City:${Profile[0]['ship_city']}, Address:${Profile[0]['ship_add']}, Phone:${Profile[0]['ship_phone']}`;

    //step 3 Transaction & other .............................

    let tran_id =Math.floor(10000000+Math.random()*90000000);
    let val_id=0;
    let delivery_status="pending"
    let payment_status="pending"

    // Step 04: Create Invoice ============================

    const createInvoice = await InvoiceModel.create({
        userID:user_id,
        payable:Paybale,
        cus_details:cus_details,
        ship_details:ship_details,
        tran_id:tran_id,
        val_id:val_id,
        payment_status:payment_status,
        delivery_status:delivery_status,
        total:totalAmmount,
        vat:vat,
    })

//    Step 05: Create Invoice Product  .=======================

     let invoice_id = createInvoice['_id']

    CartProducts.forEach(async(item)=>{
        await InvoiceProductModel.create({
            userID:user_id,
            productID:item['productID'],
            invoiceID:invoice_id,
            qty:item['qty'],
            price:item['product']['discount']?item['product']['discountPrice']:item['product']['price'],
            color:item['color'],
            size:item['size']
        })
     })

    //  Step 06: Remove Carts ================

    await CartModel.deleteMany({userID:user_id})

    // step 7 SSL payment ..............========

    const PaymentSettings=await PaymentSettingModel.find();

    const form = new FormData()
    form.append('store_id',PaymentSettings[0]['store_id'])
    form.append('store_passwd',PaymentSettings[0]['store_passwd'])
    form.append('total_amount',Paybale.toString())
    form.append('currency',PaymentSettings[0]['currency'])
    form.append('tran_id',tran_id)

    form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
    form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
    form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
    form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

    form.append('cus_name',Profile[0]['cus_name'])
    form.append('cus_email',email)
    form.append('cus_add1',Profile[0]['cus_add'])
    form.append('cus_add2',Profile[0]['cus_add'])
    form.append('cus_city',Profile[0]['cus_city'])
    form.append('cus_state',Profile[0]['cus_state'])
    form.append('cus_postcode',Profile[0]['cus_postcode'])
    form.append('cus_country',Profile[0]['cus_country'])
    form.append('cus_phone',Profile[0]['cus_phone'])
    form.append('cus_fax',Profile[0]['cus_phone'])

    form.append('shipping_method',"YES")
    form.append('ship_name',Profile[0]['ship_name'])
    form.append('ship_add1',Profile[0]['ship_add'])
    form.append('ship_add2',Profile[0]['ship_add'])
    form.append('ship_city',Profile[0]['ship_city'])
    form.append('ship_state',Profile[0]['ship_state'])
    form.append('ship_country',Profile[0]['ship_country'])
    form.append('ship_postcode',Profile[0]['ship_postcode'])

    form.append('product_name','According Invoice')
    form.append('product_category','According Invoice')
    form.append('product_profile','According Invoice')
    form.append('product_amount','According Invoice')

    let SSLRes=await axios.post(PaymentSettings[0]['init_url'],form);

    return {status:"success",data: SSLRes.data}
}


export const PaymentSuccessService = async(req)=>{
    try {
        const trxID = req.params.trxID ;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"})
        return {status:"success"}
    } catch (error) {
     return {status:"fail", message:"Something Went Wrong", error:error.message}

    }
}


export const PaymentFailService = async(req)=>{
    try {
        const trxID=req.params.trxID;
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"});
        return {status:"fail"}
    } catch (error) {
        return {status:"fail", message:"Something Went Wrong", error:error.message}
    }
}

export const PaymentCancelService = async(req)=>{
    try {
        const trxID=req.params.trxID;
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"});
        return {status:"cancel"}
    } catch (error) {
        return {status:"fail", message:"Something Went Wrong", error:error.message}
    }
}


export const PaymentIPNService = async(req)=>{
    try {
        const trxID=req.params.trxID;
        let status=req.body['status'];
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:status});
        return {status:"success"}
    } catch (error) {
        return {status:"fail", message:"Something Went Wrong", error:error.message}
    }
}


export const InvoiceListService = async(req)=>{
    try {
        const user_id=req.headers.user_id;
        let invoice=await InvoiceModel.find({userID:user_id});
        return {status:"success",data: invoice}
    } catch (error) {
        return {status:"fail", message:"Something Went Wrong", error:error.message}
    }
}


export const InvoiceProductListService = async(req)=>{
    try {

       let user_id=new ObjectId(req.headers.user_id);
       let invoice_id=new ObjectId(req.params.invoice_id);

       let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
       let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
       let unwindStage={$unwind:"$product"}

       let products=await InvoiceProductModel.aggregate([
           matchStage,
           JoinStageProduct,
           unwindStage
       ])

        return {status:"success",data: products}
    } catch (error) {
        return {status:"fail", message:"Something Went Wrong", error:error.message}
    }
}


