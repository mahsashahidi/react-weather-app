import "./App.css";
import SearchEngine from "./SearchEngine";

export default function App() {
  return (
    <div className="App container my-4 pb-5 pt-4 text-light">
      <SearchEngine default="Tokyo" />
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
}
