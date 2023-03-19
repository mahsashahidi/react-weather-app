import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";

const forecastApiKey = "97c2f6a3b34509ac62090edc5d18d949";
export default function ForecastDataFetch(props) {
  let [fetched, setFetched] = useState(false);
  let [hourlyForecast, setHourlyForecast] = useState(null);
  let [dailyForecast, setDailyForecast] = useState(null);
  let timezone_offset = props.tz;

  function handleForecast(response) {
    setHourlyForecast(response.data.hourly);
    setDailyForecast(response.data.daily);
    setFetched(true);
  }
  function fetch() {
    let lat = props.data.lat;
    let long = props.data.lon;
    let unit = props.unit;

    let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${forecastApiKey}&units=${unit}`;
    axios.get(forecastUrl).then(handleForecast);
  }

  useEffect(() => {
    setFetched(false);
  }, [props.data]);

  if (fetched) {
    return (
      <div>
        <h2 className="fs-4 text-start ms-4 mt-3">Hourly</h2>
        <hr />
        <div className="d-flex flex-row justify-content-around">
          {hourlyForecast.map(function (hourlyData, index) {
            if (index < 5) {
              return (
                <div key={index}>
                  <Forecast
                    data={hourlyData}
                    title="Hourly"
                    tz={timezone_offset}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <h2 className="fs-4 text-start ms-4 mt-3">Daily</h2>
        <hr />
        <div className="d-flex flex-row justify-content-around">
          {dailyForecast.map(function (dailyData, index) {
            if (index < 5) {
              return (
                <div key={index}>
                  <Forecast data={dailyData} title="Daily" />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    fetch();
    return null;
  }
}
