import api from "./api";

export const addLoanDetails = async (loanInfo) => {
  try {
    const response = await api.post("/loan/sendUserLoan", loanInfo);
    return response.data;
  } catch (error) {
    console.log("error:----", error);
  }
};
