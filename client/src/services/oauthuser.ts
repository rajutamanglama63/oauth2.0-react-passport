import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getOauthUser = async () => {
  try {
    // {withCredentials: true} -- this option will pass cookies related stuff to server
    const response = await axios.get(`${baseUrl}/getauthuser`, {
      withCredentials: true,
    });
    console.log("user-data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`, {
      withCredentials: true,
    });
    if (response.data === "done") {
      window.location.href = "/";
    }
  } catch (error) {
    console.log("logout error: ", error);
  }
};
