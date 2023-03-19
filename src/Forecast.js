import React from "react";
import FormatDate from "./FormatDate";
import "./Forecast.css";

export default function Forecast(props) {
  let icon = `/images/${props.data.weather[0].icon}.png`;

  if (props.title === "Hourly") {
    return (
      <div className="Forecast">
        <div className="d-flex flex-column align-center justify-content-center ">
          <p>
            <FormatDate hourly={props.data.dt} tz={props.tz} />
          </p>
          <div>
            <img src={icon} alt="" width="52px" className="forecastIcons" />
          </div>

          <p>{Math.round(props.data.temp)}°</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Forecast">
        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column align-center justify-content-center">
            <p>
              <FormatDate daily={props.data.dt} />
            </p>
            <div>
              <img src={icon} alt="" width="52px" className="forecastIcons" />
            </div>

            <p>
              {Math.round(props.data.temp.max)}°{"   "}
              <span className="mintemp">
                {Math.round(props.data.temp.min)}°
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
