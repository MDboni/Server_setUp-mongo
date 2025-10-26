import { create } from "zustand";
import { getEmail, setEmail } from "../utility/utility";
import Cookies from "js-cookie";
import axios from "axios";

export const UserStore = create((set,get)=>({

    token: Cookies.get('token') || "", 
    isLogin: () => !!get().token,

    isFormSubmit : false ,

    LoginFromData:{email:""},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFromData:{
                ...state.LoginFromData,
                [name]:value
            }
        }))
    } , 

    UserOtpRequest : async(email) =>{
        set({isFormSubmit:true})
        let res = await axios(`/api/UserOTP/${email}`)
        setEmail(email)
        set({isFormSubmit:false})
        return res.data.status === 'success'
    } ,


     OTPFormData:{otp:""},
     OTPFormOnChange:(name,value)=>{
        set((state)=>({
            OTPFormData:{
                ...state.OTPFormData ,
                [name]:value
            } 
        }))
     } ,

   VeriFyOtpRequest: async (otp) => {
    const email = getEmail(); 
    if (!email || !otp) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`/api/VerifyOtpControler/${email}/${otp}`);
    set({ isFormSubmit: false });
    if(res.data.status){
        const token = res.data.token ;
        if(token){
            Cookies.set('token',token , { expires: 7, secure: true, sameSite: 'Lax' }) ;
            set({ token })
        }
        return true ; 
    }
    return false ;
  },

  ResendOtpRequest: async () => {
    const email = getEmail();
    if (!email) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`/api/UserOTP/${email}`);
    set({ isFormSubmit: false });
    return res.data.status === "success";
  },
  

    UserLogoutRequest: async () => {
        const token = Cookies.get("token");
        if (!token) return false;

        try {
            set({ isFormSubmit: true });
            const res = await axios.get(`/api/UserLogOut`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true, 
        });

            set({ isFormSubmit: false });

            if (res.data.status === "success") {
            Cookies.remove("token");
            set({ token: "" });
            return true;
            }
            return false;
        } catch (error) {
            console.error("Logout failed:", error);
            set({ isFormSubmit: false });
            return false;
        }
} ,



// Profile data api =============================================


    ProfileForm:{cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""},
    ProfileChange:(name,value)=>{
        set((state)=>({
            ProfileForm:{
                ...state.ProfileForm ,
                [name]:value
            } 
        }))
     } ,


     ProfileDetails:null,
     ProfileDetailsRequest:async()=>{
        try {
            const res = await axios.get('/api/ReadProfileControler');
            if(res.data['data'].length>0){
                set({ProfileDetails:res.data['data'][0]})
                set({ProfileForm:res.data['data'][0]})
            }else{
                 set({ProfileDetails:[]})
            }
        } catch (error) {
               unauthorized(e.response.status)

        }
     },


     ProfileSaveRequest:async(PostBody)=>{
        try {
            set({ProfileDetails:null})
            let res=await axios.post(`/api/UpdateProfile`,PostBody);
            return res.data['status'] === "success";
        }catch (e) {
            unauthorized(e.response.status)
        }
    }



    
}))
