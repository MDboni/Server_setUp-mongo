import axios from 'axios';
import { create } from 'zustand';

export const CartStore = create((set) => ({

  isCartSubmit: false,

  // 🛒 Cart Form State
  CartForm: { productID: "", color: "", size: "" },
  CartFormChange: (name, value) => {
    set((state) => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },

  // 🛍️ Add or Update Cart Item
CartSaveOrUpdateRequest: async (PostBody, productID, quantity, isUpdate = false) => {
  try {
    set({ isCartSubmit: true });

    const PostBodyData = {
      productID: productID,
      qty: parseInt(quantity),
      color: PostBody.color || "",
      size: PostBody.size || "",
    };

    const url = isUpdate
      ? `/api/UpdateCartListControler`
      : `/api/createCartListControler`;

    const res = await axios.post(url, PostBodyData, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data["status"] === "success") {
      return true;
    } else {
      console.warn("CartSaveOrUpdate failed:", res.data);
      return false;
    }
  } catch (error) {
    console.error("CartSaveOrUpdate Error:", error.response?.data || error);
    return false;
  } finally {
    set({ isCartSubmit: false });
  }
},


  // 🛒 Cart Data State
  CartList: null,
  CartCount: 0,
  CartTotal: 0,
  CartVatTotal: 0,
  CartPayableTotal: 0,

  // 🧮 Load Cart List
  CartListRequest: async () => {
  try {
   const res = await axios.get("/api/CartistControler", {
    headers: { user_id: localStorage.getItem("user_id") } 
});

    const data = res.data["data"] || [];

    // 💰 Total Calculation
    let total = 0;
    data.forEach((item) => {
      const price = item.product.discount
        ? parseInt(item.product.discountPrice)
        : parseInt(item.product.price);
      total += parseInt(item.qty) * price;
    });

    const vat = total * 0.05;
    const payable = total + vat;

    // ✅ একবারে সব set
    set({
      CartList: data,
      CartCount: data.length,
      CartTotal: total,
      CartVatTotal: vat,
      CartPayableTotal: payable,
    });

    return true;
  } catch (error) {
    console.error("CartListRequest Error:", error);
    return false;
  }
}

}));
