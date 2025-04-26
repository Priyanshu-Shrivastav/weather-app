import React, { useEffect, useState } from "react";
import sunny from "../../assets/sunny.svg";
import humidity from "../../assets/humidity.svg";
import windy from "../../assets/cloudy-windy.svg";
// import URL from "../../Utils";
import "./weather.css";

const Weather = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState("delhi");
  const [inputCity, setInputCity] = useState("");
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=11b06a1f1abc4a18b7e686b19932f556`;
  const temp = data?.main?.temp - 273.15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);

        if (!response.ok || data.cod === "404") {
          setError("City not found");
          setData(null);
        } else {
          setData(data);
          setError(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();  
  }, [searchedCity]);

  const search = (e) => {
    e.preventDefault();
    setSearchedCity(inputCity);
  };

  console.log(`${searchedCity} <------`);

  return (
    <div className="weather">
      <div className="weather-wrapper">
        <div className="search-box">
          <input
            type="search"
            name=""
            id="search-input"
            placeholder="Search by city.."
            onChange={(e) => setInputCity(e.target.value)}
            value={inputCity}
          />
          <button className="search-btn" onClick={search}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>
        <div className="weather-info">
          <div className="weather-img">
            <img src={sunny} alt="" />
          </div>

          {error && <p className="error-div"> {error} </p>}

          <div className="location">
            {!error && <h1 className="temp">{temp.toFixed(2)}°C</h1>}  
            {!error && <h2 className="city">{data?.name || "Delhi"}</h2>} 
          </div>
          <div className="weather-footer">
            <div className="left">
              <div className="icon">
                <img src={humidity} alt="" />
              </div>
              <div className="humidity-col">
                <span className="value">{data?.main?.humidity}%</span>
                <span className="humidity">Humidity</span>
              </div>
            </div>
            <div className="right">
              <div className="icon">
                <img src={windy} alt="" />
              </div>
              <div className="windy-col">
                <span className="value">{data?.wind?.speed} Km/h</span>
                <span className="humidity">Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
