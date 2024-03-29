import React from "react";
import { GrFormSearch } from "react-icons/gr";
import { LuCrosshair } from "react-icons/lu";
import { MdCloudQueue } from "react-icons/md";
import { GiHeavyRain } from "react-icons/gi";
import { useUserInputContext } from "../../../context/UserInputContext";
import { useToggle } from "../../../context/ToggleThemeContext";
const Sidebar = () => {
  const { handleUserInput, weather, extraDetails, weatherTypeToggle } =
    useUserInputContext();

  const { theme } = useToggle();
  const lastUpdatedDate = new Date(weather?.current?.last_updated);
  const dayName = new Date(lastUpdatedDate).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const todayTime = lastUpdatedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <aside
        className={`w-[450px] h-[700px] 2xl:h-[800px] max-xl:w-full max-xl:rounded-2xl p-8 max-lg:p-5 select-none ${
          theme === "dark" ? "bg-[#27272a] text-white" : "bg-white"
        }  flex flex-col justify-between  lg:h-auto rounded-l-[2.5rem] `}
      >
        <section>
          <section className="flex justify-between items-center">
            <section className="relative">
              <input
                type="text"
                placeholder="Search for places..."
                className={`w-full h-10 pl-8 placeholder:font-bold ${
                  theme === "dark"
                    ? "bg-[#27272a] text-white"
                    : "bg-transparent"
                }  outline-none text-[#696969]  font-semibold `}
                onKeyPress={handleUserInput}
              />
              <GrFormSearch className="absolute top-2 left-1   text-2xl" />
            </section>
            <section
              className={`w-fit h-fit   ${
                theme === "dark" ? "bg-[#27272a] text-white" : "bg-[#f6f6f8]"
              } p-2 rounded-full text-lg `}
            >
              <LuCrosshair />{" "}
            </section>
          </section>
          <img
            src="patchy-rain.png"
            alt=""
            className="h-[250px] w-full object-contain my-5"
          />
          <h1 className="text-6xl my-5">
            {weatherTypeToggle === "celcius" ? (
              <span>
                {extraDetails.avgtemp_c}
                <span className="text-3xl"> &#8451; </span>
              </span>
            ) : (
              <span>
                {extraDetails.avgtemp_f}
                <span className="text-3xl"> &#8457;</span>
              </span>
            )}
          </h1>

          <span>
            {dayName}, {todayTime}
          </span>
          <span className="flex items-center gap-3 mt-5">
            <MdCloudQueue /> {weather?.current?.condition?.text}
          </span>
          <span className="flex items-center gap-3 ">
            <GiHeavyRain className="text-[#0d21c6]" /> Rain - {""}
            {weather.forecast?.forecastday[0]?.day?.daily_chance_of_rain}%
          </span>
        </section>

        <div className="h-[150px]  max-lg:mt-5  bg-city-bg  bg-no-repeat bg-cover text-center  flex items-center justify-center text-white text-lg font-semibold rounded-lg">
          {`${weather?.location?.name} , ${weather?.location?.country}`}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
