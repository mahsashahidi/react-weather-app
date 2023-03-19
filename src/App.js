import "./App.css";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import { useState } from "react";

let firstApikey = "2c6e4bcc0062a8147bf033412baaac1b";

export default function App() {
  let [defaultCity, setDefaultCity] = useState(null);
  function firstCityName(response) {
    setDefaultCity(response.data[0].name);
  }
  function realtimePose(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiurl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${firstApikey}`;
    axios.get(apiurl).then(firstCityName);
  }

  if (defaultCity) {
    return (
      <div className="App container my-4 pb-5 pt-4 text-light">
        <SearchEngine default={defaultCity} />
        <footer>
          This project was coded by{" "}
          <a
            href="https://mahsa-shahidi.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mahsa Shahidi
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/mahsashahidi/react-weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>
        </footer>
      </div>
    );
  } else {
    navigator.geolocation.getCurrentPosition(realtimePose);

    return null;
  }
}
