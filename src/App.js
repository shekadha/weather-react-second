import React, { useState } from "react";

import "./App.css";
import axios from "axios";

export default function App(props) {
  let [city, setCity] = useState(props.city);
  let [weather, setWeather] = useState({});
  function formatTime(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let currentyear = date.getFullYear();
    let currentDay = days[date.getDay()];
    let currentMonth = Months[date.getMonth()];
    let todaydate = date.getDate();
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    let time = `${currentDay}(${todaydate}) ${hour}:${minute}`;
    return time;
  }

  function showTemperature(response) {
    console.log(response.data);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      city: response.data.name,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c5f0e59acac64258bb92ed027d20c68f&units=metric`;
    axios.get(url).then(showTemperature);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let now = new Date();

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="card border-2 border-primary rounded-4" id="total">
            <div className="card-body mb-2">
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-7">
                    <div className="from-group ms-3">
                      <input
                        type="search"
                        placeholder="Enter the city name"
                        className="form-control p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 w-100"
                        autoComplete="off"
                        onChange={updateCity}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <input
                      type="submit"
                      value="Search"
                      className="btn text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 p-3 w-100"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="row m-3 mt-0 text-primary-emphasis bg-primary-subtle rounded-3 p-3">
              <img src="" />
              <div className="col-6 s-2">
                <div className="card mb-1 mt-3 rounded-4">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={weather.icon}
                        alt="Weather icon"
                        className="img-fluid rounded-start mt-4"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mt-2">
                          <span className="temperature">
                            {" "}
                            {weather.temperature}
                          </span>
                          <span id="units">
                            <a href="#" className="active">
                              °C
                            </a>{" "}
                            |<a href="#">°F</a>
                          </span>
                        </h5>
                        <p className="card-text mt-3">
                          Humidity:
                          <span> {weather.humidity} </span>
                          %
                          <br />
                          Wind:
                          <span> {weather.wind}</span> km/h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-3 mt-3 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title" id="city">
                      {weather.city}
                    </h5>
                    <p className="card-text">
                      Last updated: <span id="date">{formatTime(now)}</span>
                      <br />
                      Description:{" "}
                      <span id="description">{weather.description}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-2 m-4">
                <div className="col-2">
                  <p className="emoji">
                    Fri
                    <br />
                    ☁️
                    <br />
                    <span className="temp">9° -6°</span>
                  </p>
                </div>

                <div className="col-2">
                  <p className="emoji">
                    Sat
                    <br />
                    ☀️
                    <br />
                    <span className="temp"> 10° -7° </span>
                  </p>
                </div>
                <div className="col-2">
                  <p className="emoji">
                    Sun
                    <br />
                    ☀️
                    <br />
                    <span className="temp"> 9° -7° </span>
                  </p>
                </div>
                <div className="col-2">
                  <p className="emoji">
                    Mon
                    <br />
                    ⛅️
                    <br />
                    <span className="temp"> 9° -3° </span>
                  </p>
                </div>
                <div className="col-2">
                  <p className="emoji">
                    Tue
                    <br />
                    🌧
                    <br />
                    <span className="temp"> 4° -2° </span>
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>
          <a
            href="https://github.com/shekadha/second-react"
            target="_blank"
            rel="noreferrer"
          >
            Open source code
          </a>
          by Shekoufeh Adhami
        </div>

        <script src="src/index.js"></script>
      </header>
    </div>
  );
}
