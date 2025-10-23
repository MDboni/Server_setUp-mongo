import axios from "axios";
import { create } from "zustand";

const FeatureStoreZustin = create((set) => ({
  // ===== Feature Store =====
  FeatureStore: null,

  FeatureListRequest: async () => {
    try {
      const res = await axios.get("/api/FeaturesList");
      if (res.data.status === "success") {
        set({ FeatureStore: res.data.data });
      }
    } catch (error) {
      console.error("FeatureListRequest Error:", error.message);
    }
  },
}));

export default FeatureStoreZustin;
