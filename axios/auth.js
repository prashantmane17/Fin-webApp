import api from "./api";

export const addOwners = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.log("error:----", error);
  }
};

export const verifyOwner = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.log("error:---", error);
  }
};
// export const sessionUser = async () => {
//   try {
//     const response = await api.get("/auth/session");
//     return response.data;
//   } catch (error) {
//     console.log("error:---", error);
//   }
// };
