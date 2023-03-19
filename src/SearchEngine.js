import React, { useState, useEffect } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import "./SearchEngine.css";
import TodaysReport from "./TodaysReport";
import ForecastDataFetch from "./ForcastDataFetch";
import axios from "axios";

let apiKey = "bd3bb6534458ba51b48c49f5155745b6";

export default function SearchEngine(props) {
  let [city, setCity] = useState(props.default);
  let [dayInfo, setDayInfo] = useState({ ready: false });
  let [unit, setUnit] = useState("metric");
  let [bg, setBg] = useState(null);

  function weatherReport(response) {
    let d = new Date(response.data.dt * 1000);
    let localOffset = new Date().getTimezoneOffset() * 60000;
    let localTime = d.getTime();
    let utc = localTime + localOffset;
    let city = utc + 1000 * response.data.timezone;
    let finalTime = new Date(city);
    let hour = finalTime.getHours();

    putBg(hour);

    setDayInfo({
      ready: true,
      coords: response.data.coord,
      city: response.data.name,
      country: response.data.sys.country,
      icon: `/images/${response.data.weather[0].icon}.png`,
      date: response.data.dt,
      tz: response.data.timezone,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      temperature: Math.round(response.data.main.temp),
      tempMax: Math.round(response.data.main.temp_max),
      tempMin: Math.round(response.data.main.temp_min),
      feelslike: Math.round(response.data.main.feels_like),
      wind: Math.round(response.data.wind.speed),
      humidity: Math.round(response.data.main.humidity),
      desc: response.data.weather[0].description,
    });
  }
  function putBg(hour) {
    if (hour <= 16 && hour >= 6) {
      setBg({
        backgroundImage: `url("/images/day.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      });
    } else if (hour <= 19 && hour >= 17) {
      setBg({
        backgroundImage: `url("/images/evening.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      });
    } else {
      setBg({
        backgroundImage: `url("/images/night.jpeg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      });
    }
  }
  function search() {
    let weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(weatherurl).then(weatherReport);
  }

  function handleSearch(event) {
    event.preventDefault();
    search();
  }

  function handleTypedCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function handleImperial(event) {
    event.preventDefault();
    if (event.target.name !== unit) {
      setUnit("imperial");
    }
  }
  function handleCelsius(event) {
    event.preventDefault();
    if (event.target.name !== unit) {
      setUnit("metric");
    }
  }
  useEffect(() => {
    search();
  }, [unit]);
  if (dayInfo.ready) {
    return (
      <div
        style={bg}
        className="SearchEngine py-4 px-3 text-white justify-content-md-center rounded-3"
      >
        <div className="d-flex justify-content-center flex-row text-secondary align-items">
          <div className="searchBox border rounded-2 w-20">
            <form
              onSubmit={handleSearch}
              className="d-flex justify-content-center flex-row"
            >
              <input
                onChange={handleTypedCity}
                type="text"
                placeholder="Search"
                autoComplete="off"
                autoFocus="off"
                className=" text-light border-0 text-capitalize inputClass w-100"
              />
              <button type="submit" className="justify-content-end">
                <UilSearch color={"rgb(179,179,179)"} />
              </button>
            </form>
          </div>

          <div className="d-flex justify-content-end flex-row">
            <button
              name="metric"
              className="unitStyle pe-2 ms-1 me-1"
              onClick={handleCelsius}
            >
              °C
            </button>{" "}
            <button
              name="imperial"
              className="unitStyle"
              onClick={handleImperial}
            >
              °F
            </button>
          </div>
        </div>
        <TodaysReport data={dayInfo} />
        <ForecastDataFetch data={dayInfo.coords} unit={unit} tz={dayInfo.tz} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
