import axios from "axios";
import { create } from "zustand";

const ZusanStore = create((set)=>{
    FeatureSroe : null 
    FeatureListRequest: async()=>{
        try {
            const res = await axios.get('/api/FeaturesList')
            if(res.data.status==='success'){
                set({FeatureSroe:res.data.data})
            }
        } catch (error) {
            set({error:error.message})
        }
    }

    BrandStore : null 
    BrandListRequest : async()=>{
        try {
            const res = await axios.get('/api/ProductBrandList')
            if(res.data.status==='success'){
                set({BrandStore:res.data.data})
            }
        } catch (error) {
            set({error:error.message})
        }
    }

    CategoryStore : null 
    CategoryListRequest : async()=>{
        try {
            const res = await axios.get('/api/ProductCategoryList')
            if(res.data.status==='success'){
                set({CategoryStore:res.data.data})
            }
        } catch (error) {
            set({error:error.message})
        }
    }

    SliderStore : null 
    SliderListRequest : async()=>{
        try {
            const res = await axios.get('/api/ProductSliderList')
            if(res.data.status==='success'){
                set({SliderStore:res.data.data})
            }
        } catch (error) {
            set({error:error.message})
        }
    }


    ListByRemarkStore : null 
    ListByRemarkRequest : async()=>{
        try {
            const res = await axios.get(`/api/ProductListByRemark/${Remark}`)
            if(res.data.status==='success'){
                set({ListByRemarkStore:res.data.data})
            }
        } catch (error) {
            set({error:error.message})
        }
    }




})

export default ZusanStore