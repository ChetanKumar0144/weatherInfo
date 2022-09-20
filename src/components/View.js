// import React, { useState } from 'react'
import './View.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Input.css';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsWind, BsCloudsFill } from "react-icons/bs";
import { WiSunset, WiHumidity } from "react-icons/wi";
import { IoCloudDownloadSharp } from "react-icons/io5";


const View = () => {
    const [city, setCity] = useState("delhi");
    const [search, setSearch] = useState(false);

    const [temp, setTemp]=useState("");
    const [humidity, setHumidity]=useState("");
    const [pressure, setPressure]=useState("");
    const [speed, setSpeed]=useState("");
    const [sunset, setSunset]=useState("");
    const [name, setName]=useState("");
    const [country, setCountry]=useState("");
    const [weatherMood, setWeatherMood]=useState("");
    const changeCity = (val) => {
        setCity(val.target.value);
        setSearch(false);
    }
    if (search) {
        var url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=836be8eb7cc275d3189385a067f8813e`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi&appid=836be8eb7cc275d3189385a067f8813e`;
    }

    useEffect(() => {

        axios.get(url)
            .then((resp) => {
                console.log(resp.data);
                const {temp,humidity,pressure} = resp.data.main;
                const {speed} = resp.data.wind;
                const {country,sunset} = resp.data.sys;
                const {name} = resp.data;
                const {main:weatherMood} = resp.data.weather[0];
                
                setTemp(temp);
                setHumidity(humidity);
                setPressure(pressure);
                setSpeed(speed);
                setSunset(sunset);
                setName(name);
                setCountry(country);
                setWeatherMood(weatherMood);
            })
            .catch((error) => console.log(error));
    }, [url])

    let sec = sunset;
    let date = new Date(sec*1000);
    let Time = `${date.getHours()}:${date.getMinutes()}`

    return (
        <div className='view'>
            <div className='main-input'>
                <input type="text" name="" id="" onChange={changeCity} placeholder='search city name' />
                <button type='search' onClick={() => setSearch(true)} >Search</button>
            </div>
            <div className='main-div'>
                {/* logo */}
                <div className="logo">
                    <h1> <span><TiWeatherPartlySunny /></span> WeatherInfo</h1>
                </div>

                {/* information about city */}
                <div className="city-info">
                    <div className="temp">
                        <h2>{temp}&deg;C</h2>
                        <p>Temperature</p>
                    </div>
                    <div className="city-detail">
                        <h1> <BsCloudsFill /> {weatherMood}</h1>
                        <p><span>{name}</span>,<span>{country}</span></p>
                    </div>
                    <div className="date-time">
                        <h2> {new Date().toLocaleString()}</h2>
                    </div>
                </div>

                {/* information about weather */}
                <div className="weather">
                    <div className="speed">
                        <div className="icon">
                            <WiSunset />
                        </div>
                        <div className="speed-info">
                            <p>{Time}</p>
                            <h4>Sunset</h4>
                        </div>
                    </div>
                    <div className="speed">
                        <div className="icon">
                            <WiHumidity />
                        </div>
                        <div className="speed-info">
                            <p>{humidity}%</p>
                            <h4>Humidity</h4>
                        </div>
                    </div>
                    <div className="speed">
                        <div className="icon">
                            <IoCloudDownloadSharp />
                        </div>
                        <div className="speed-info">
                            <p>{pressure} MM</p>
                            <h4>Pressure</h4>
                        </div>
                    </div>
                    <div className="speed">
                        <div className="icon">
                            <BsWind />
                        </div>
                        <div className="speed-info">
                            <p>{speed} KMPH</p>
                            <h4>Wind</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <p>This page is designed and developed by <span>Chetan Kumar</span></p>
            </div>
        </div>
    )
}
export default View;