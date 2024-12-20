import api from "./api";

export const invest_Withdraw = async (formData) => {
  try {
    const response = await api.put("/userControll/investWithdrawn", formData);
    return response.data;
  } catch (error) {
    console.log("error--", error);
  }
};

export const get_invest_Withdraw = async (id) => {
  try {
    const response = await api.get(`/userControll/${id}`);
    return response.data;
  } catch (error) {
    console.log("error--", error);
  }
};
