import { BASE_URL } from "../../env";
import axios from "axios";

export const postGroupChat = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("access"));
    console.log(token.token, "- post chat ");
    axios.post(`${BASE_URL}/createChat`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
