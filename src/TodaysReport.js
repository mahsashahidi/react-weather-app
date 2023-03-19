import React from "react";
import FormatDate from "./FormatDate";
import "./TodaysReport.css";

import {
  UilTemperatureThreeQuarter,
  UilWind,
  UilTear,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

export default function TodaysReport(props) {
  return (
    <div className="TodaysReport">
      <h1 className="mt-4 mb-5 pt-3">
        {props.data.city}, {props.data.country}
      </h1>
      <div className="d-flex flex-row justify-content-center mainInfo">
        <div>
          <img
            src={props.data.icon}
            alt=""
            width="90px"
            className="mt-3 me-2"
          />
        </div>

        <h2 className="fs-1 mx-5 fw-bold ">{props.data.temperature}°</h2>
        <div className="d-flex flex-column ms-2 justify-content-center">
          <span className="d-flex flex-row justify-content-center mb-1">
            <UilTemperatureThreeQuarter />
            <p>
              Feels like{" "}
              <span className="fw-bold">{props.data.feelslike}°</span>
            </p>
          </span>
          <span className="d-flex flex-row justify-content-center mb-1">
            <UilWind />
            <p>
              Wind <span className="fw-bold">{props.data.wind}</span>km/h
            </p>
          </span>
          <span className="d-flex flex-row justify-content-center mb-1">
            <UilTear />
            <p>
              Humidity <span className="fw-bold">{props.data.humidity}</span>%
            </p>
          </span>
        </div>
      </div>
      <p className="text-capitalize mt-3 mb-4 fs-5">{props.data.desc}</p>
      <div className="d-flex flex-row justify-content-center mb-4 message">
        <p>
          <strong>
            <FormatDate update={props.data.date} tz={props.data.tz} />
          </strong>
        </p>
      </div>
      <div className="d-flex flex-row justify-content-center ms-3 me-3 hilow">
        <UilArrowUp />
        <p className="d-flex flex-row">
          High: <span>{props.data.tempMax}°</span>
        </p>
        <span className="partition">|</span>
        <UilArrowDown />
        <p className="d-flex flex-row">
          Low: <span>{props.data.tempMin}°</span>
        </p>
        <span className="partition">|</span>
        <UilSun />
        <p className="d-flex flex-row">
          Rise:<span>&nbsp;</span>
          <span className="d-flex flex-row">
            <FormatDate sun={props.data.sunrise} tz={props.data.tz} /> AM
          </span>
        </p>
        <p className="partition">|</p>
        <UilSunset />
        <p className="d-flex flex-row">
          Set:<span>&nbsp;</span>
          <span className="d-flex flex-row">
            <FormatDate sun={props.data.sunset} tz={props.data.tz} /> PM
          </span>
        </p>
      </div>
    </div>
  );
}
