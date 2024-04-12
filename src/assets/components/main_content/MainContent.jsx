import React, { useEffect } from "react";
import GaugeChart from "./GaugeChart";
import { useUserInputContext } from "../../../context/UserInputContext";
import { useToggle } from "../../../context/ToggleThemeContext";
import CardSkeleton from "../Skeleton/CardSkeleton";
const MainContent = () => {
  const {
    weather,
    data,
    setData,
    extraDetails,
    setExtraDetails,
    weatherTypeToggle,
    handleWeatherTypeToggle,
  } = useUserInputContext();
  const { theme, toggleTheme } = useToggle();
  useEffect(() => {
    if (Array.isArray(weather.forecast?.forecastday)) {
      setData(_ => {
        const newData = weather?.forecast?.forecastday?.map(day => {
          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return {
            dayName: dayName.substring(0, 3),
            avgtemp_c: day?.day?.avgtemp_c,
            icon: day?.day?.condition.icon,
            avgtemp_f: day?.day?.avgtemp_f,
          };
        });
        return [...newData];
      });
      setExtraDetails({
        uv: weather.forecast.forecastday[0]?.day?.uv,
        sunrise: weather.forecast.forecastday[0]?.astro.sunrise,
        sunset: weather.forecast.forecastday[0]?.astro.sunset,
        air_quality: weather.current?.air_quality?.pm10,
        avgtemp_c: weather.forecast?.forecastday[0]?.day?.avgtemp_c,
        avgtemp_f: weather.forecast?.forecastday[0]?.day?.avgtemp_f,
        avgvis_km: weather.forecast?.forecastday[0]?.day?.avgvis_km,
      });
    }
  }, [weather]);

  return (
    <>
      <section className="w-full rounded-r-[2.5rem]  bg-[#f6f6f8] dark:bg-[#343434] dark:text-white h-auto  2xl:h-[800px]  max-xl:rounded-2xl  lg:pb-5 px-10 max-xl:p-5 ">
        <section className="flex pt-5 pr-3 h-7">
          <section className="ml-auto flex items-center mt-5 gap-3 ">
            <section>
              {theme ? (
                <img
                  src="/icon-sun.svg"
                  className="cursor-pointer"
                  alt="sun-icon"
                  onClick={toggleTheme}
                />
              ) : (
                <img
                  src="/icon-moon.svg"
                  className="cursor-pointer h-7"
                  alt="moon-icon"
                  onClick={toggleTheme}
                />
              )}
            </section>
            <section
              onClick={handleWeatherTypeToggle}
              className={`w-10 h-10  cursor-pointer hover:bg-[#28231d] hover:text-white ${
                weatherTypeToggle === "celcius"
                  ? "bg-[#28231d] text-white"
                  : "bg-white text-black"
              }   rounded-full flex items-center justify-center text-lg `}
            >
              &#x2103;
            </section>
            <section
              onClick={handleWeatherTypeToggle}
              className={`w-10 h-10  cursor-pointer hover:bg-[#28231d] hover:text-white ${
                weatherTypeToggle === "fareinheit"
                  ? "bg-[#28231d] text-white"
                  : "bg-white text-black"
              }   rounded-full flex items-center justify-center text-lg `}
            >
              &#8457;
            </section>
          </section>
        </section>

        <section className="grid lg:grid-cols-7 gap-5  mt-14 xl:grid-cols-7 max-sm:grid-cols-2  md:grid-cols-4">
          {data.map((item, index) => {
            return (
              <section
                key={index}
                className="rounded-xl bg-white dark:bg-[#27272a] py-2 text-center flex flex-col items-center justify-center select-none"
              >
                <h1>{item.dayName}</h1>
                <img src={item.icon} alt="" />
                <h1>
                  {weatherTypeToggle === "celcius"
                    ? `${item.avgtemp_c} \u2103`
                    : `${item.avgtemp_f} \u2109`}
                </h1>
              </section>
            );
          })}
        </section>

        <section className="mt-10 select-none  ">
          <h1 className="text-xl "> Today's Highlights</h1>
          <section className="grid 2xl:grid-cols-3 gap-5 mt-5 lg:grid-cols-3 md:grid-cols-2  2xl:h-full ">
            <section className="rounded-xl    bg-white dark:bg-[#27272a]  pt-3   h-full  2xl:h-[230px]">
              <span className="text-[#a8a8a8] ml-5 "> Uv Index</span>

              <GaugeChart setValue={extraDetails?.uv} />
            </section>
            <section className="rounded-xl py-5      bg-white dark:bg-[#27272a]  h-full flex flex-col justify-between  2xl:h-[230px] 2xl:text-2xl px-6 ">
              <span className="text-[#a8a8a8]">Wind Status</span>
              <h1 className="text-6xl mt-5">
                {weather?.current?.wind_kph}
                <span className="text-lg">km/h </span>
              </h1>
              <br />
              <section className="flex items-center gap-3">
                <img src="compass-svgrepo-com.svg" className="h-7 w-7" alt="" />
                <span> {weather?.current?.wind_dir}</span>
              </section>
            </section>
            <section className="rounded-xl  py-5     bg-white dark:bg-[#27272a]  h-full  2xl:h-[230px]  px-6">
              <span className="text-[#a8a8a8]">Sunrise & Sunset</span>
              <section className="flex items-center gap-3 my-5 2xl:text-2xl font-semibold">
                <img
                  src="arrow-up-circle-svgrepo-com(1).svg"
                  alt=""
                  className="h-10 w-10 2xl:h-14 2xl:w-14"
                />
                <h1> {extraDetails?.sunrise} </h1>
              </section>
              <section className="flex items-center gap-3 2xl:text-2xl font-semibold">
                <img
                  src="arrow-down-circle-svgrepo-com(1).svg"
                  alt=""
                  className="h-10 w-10 2xl:h-14 2xl:w-14"
                />
                <h1> {extraDetails?.sunset}</h1>
              </section>
            </section>
            <section className="rounded-xl  flex flex-col justify-between relative w-full   bg-white dark:bg-[#27272a] py-5 2xl:h-[200px] h-[200px]  px-6">
              <span className="text-[#a8a8a8]">Humidity</span>
              <h1 className="text-5xl ">
                {weather?.current?.humidity}
                <span className="text-3xl">% </span>
              </h1>
              <h1 className="text-[#a8a8a8]">
                {getHumidityClassification(weather?.current?.humidity)}
              </h1>
              <section className="absolute  bottom-1/2 translate-y-5 -right-5">
                <div className="w-[150px] h-10 relative  -rotate-90 rounded-full border border-[#f3ecec]">
                  <div className="w-7  circle h-7 absolute  bottom-1  left-2  bg-[#4050d2] rounded-full"></div>
                </div>
              </section>
            </section>
            <section className=" rounded-xl flex justify-between flex-col   bg-white dark:bg-[#27272a] py-5 h-[200px]  2xl:h-[200px]  px-6">
              <span className="text-[#a8a8a8]">Visibility</span>
              <h1 className="text-5xl ">
                {extraDetails?.avgvis_km} <span className="text-2xl"> km </span>
              </h1>
              <span className="text-[#a8a8a8]">
                {getVisibilityClassification(extraDetails?.avgvis_km)}
              </span>
            </section>
            <section className="rounded-xl flex justify-between relative flex-col  bg-white dark:bg-[#27272a] py-5 h-[200px]   2xl:h-[200px]  px-6">
              <section className="flex justify-between   h-full flex-col">
                <span className="text-[#a8a8a8]">Air Quality</span>
                <h1 className="text-5xl ">{extraDetails?.air_quality} </h1>
                <span className="text-[#a8a8a8] line-clamp-1">
                  {getAirQualityClassification(extraDetails?.air_quality)}
                </span>
              </section>
              <section className="absolute  bottom-1/2 translate-y-2 -right-5">
                <div className="w-[120px] h-10 relative  -rotate-90 rounded-full border border-[#f3ecec]">
                  <div className="w-7  circle h-7 absolute  bottom-1  right-5  bg-[#4050d2] rounded-full"></div>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default MainContent;

const getHumidityClassification = humidity => {
  if (humidity <= 50) {
    return "Low 😔";
  } else if (humidity > 50 && humidity <= 70) {
    return "Normal 🙂";
  } else {
    return "High 😃";
  }
};

const getVisibilityClassification = visibility => {
  if (visibility <= 1) {
    return "Low 😔";
  } else if (visibility > 5 && visibility <= 10) {
    return "Normal 🙂";
  } else {
    return "High 😃";
  }
};

const getAirQualityClassification = pm10Value => {
  if (pm10Value <= 50) {
    return "Normal (Minimal Impact)";
  } else if (pm10Value > 50 && pm10Value <= 100) {
    return "Moderate (May cause discomfort for some people)";
  } else if (pm10Value > 100 && pm10Value <= 150) {
    return "Unhealthy for Sensitive Groups (Affects people with heart or lung problems)";
  } else if (pm10Value > 150 && pm10Value <= 200) {
    return "Unhealthy (Everyone may begin to experience health effects)";
  } else if (pm10Value > 200 && pm10Value <= 300) {
    return "Very Unhealthy (Health warnings of serious effects)";
  } else {
    return "Hazardous (Emergency conditions)";
  }
};
