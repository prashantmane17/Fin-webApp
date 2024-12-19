import api from "./api";

export const addLoanDetails = async (loanInfo) => {
  try {
    const response = await api.post("/loan/sendUserLoan", loanInfo);
    return response.data;
  } catch (error) {
    console.log("error:----", error);
  }
};

export const loadLoanData = async (id) => {
  try {
    const response = await api.get(`/loan/getLoanDetails/${id}`);
    return response.data;
  } catch (error) {
    console.log("error:----", error);
  }
};
