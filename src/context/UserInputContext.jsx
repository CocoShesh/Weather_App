import { createContext, useState, useContext, useEffect } from "react";
import { getCurrentWeather } from "../Api/CurrentWeather";
const UserInputContext = createContext();
import toast from "react-hot-toast";
export const useUserInputContext = () => {
  return useContext(UserInputContext);
};
export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [weather, setWeather] = useState([]);
  const [data, setData] = useState([]);
  const [extraDetails, setExtraDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherTypeToggle, setWeatherTypeToggle] = useState("celcius");

  const handleUserInput = e => {
    if (e.key === "Enter") {
      setUserInput(e.target.value);
    }
  };

  const handleWeatherTypeToggle = () => {
    setWeatherTypeToggle(prev =>
      prev === "celcius" ? "fareinheit" : "celcius"
    );
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        if (userInput !== "") {
          const response = await getCurrentWeather(userInput);
          setWeather(response);
        } else {
          const response = await getCurrentWeather("Manila");
          setWeather(response);
        }
      } catch (error) {
        toast(" No matching location found.", {
          icon: "🙇",
        });
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [userInput]);
  return (
    <UserInputContext.Provider
      value={{
        handleUserInput,
        userInput,
        weather,
        data,
        setData,
        extraDetails,
        setExtraDetails,
        weatherTypeToggle,
        handleWeatherTypeToggle,
        isLoading,
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
};
