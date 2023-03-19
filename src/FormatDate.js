import React from "react";

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

export default function FormatDate(props) {
  if (props.sun) {
    let d = new Date(props.sun * 1000);
    let localTime = d.getTime();
    let localOffset = new Date().getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let city = utc + 1000 * props.tz;
    let suntime = new Date(city);

    let hour = suntime.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = suntime.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return (
      <span>
        {hour}:{minutes}
      </span>
    );
  } else if (props.daily) {
    let daily = new Date(props.daily * 1000);

    let weekday = days[daily.getDay()];

    return <span>{weekday}</span>;
  } else if (props.hourly) {
    // let hourly = new Date(props.hourly * 1000);
    let d = new Date(props.hourly * 1000);
    let localTime = d.getTime();
    let localOffset = new Date().getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let city = utc + 1000 * props.tz;
    let time = new Date(city);
    let hour = time.getHours();
    if (hour < 12) {
      hour = `${hour} AM`;
    } else {
      hour = `${hour} PM`;
    }
    return <span>{hour}</span>;
  } else {
    let now = new Date(props.update * 1000);
    let localTime = now.getTime();
    let localOffset = new Date().getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let city = utc + 1000 * props.tz;
    let message = new Date(city);
    let hour = message.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = message.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hour < 19 && hour > 5) {
      hour = `May you have a blessed day`;
    } else {
      hour = `Have a wonderful night darling`;
    }
    return <span>{hour}</span>;
  }
}
