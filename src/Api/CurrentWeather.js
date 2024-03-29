import axios from "axios";
const baseURL = import.meta.env.VITE_APP_BASE_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;

export const getCurrentWeather = async place => {
  try {
    let config = {
      method: "get",
      url: `${baseURL}?key=${apiKey}&q=${place}&days=7&aqi=yes&alerts=yes`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
