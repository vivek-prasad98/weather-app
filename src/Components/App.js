import './../Assets/CSS/App.css'
import WeatherInfo from './WeatherInfo'
import Additional from './AdditionalInfo'
import Loading from './Loading'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Bg from './../Assets/Images/bg5.jpg'

function App () {
  const homepageBgimage = {
    background: `url(${Bg})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  let [weatherdata, updateData] = useState(null)
  let [loading, updateLoading] = useState(false)
  useEffect(() => {
    const ApiKey = '87b2ef091f67ac5219079055027addc8'
    const params = {
      q: 'ranchi',
      appid: ApiKey
    }
    async function fetchLocation () {
      let geolocation = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct`,
        { params }
      )
      // console.log(geolocation.data[0].lon)
      const lat = geolocation.data[0].lat
      const lon = geolocation.data[0].lon
      getWeatherCondition(lat, lon, ApiKey)
    }
    fetchLocation()
  }, [])
  async function getWeatherCondition (lat, lon, Key) {
    const params = {
      lat: lat,
      lon: lon,
      appid: Key,
      units: 'metric'
    }
    let weatherData = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      { params }
    )
    updateData(weatherData)
    updateLoading(true)
  }

  function handleChange (e) {
    // console.log(e)
    let flag = false
    let Interval = setInterval(() => {
      if (!flag) {
        clearInterval(Interval)
        flag = false
      }
      console.log(e)
      flag = true
    }, 500)
  }
  // console.log('stateWeatherData : ', weatherdata)
  return (
    <div
      className='App flex flex-wrap backdrop-filter backdrop-blur-2xl'
      style={homepageBgimage}
    >
      {loading ? (
        <>
          <WeatherInfo
            current={weatherdata.data.current}
            daily={weatherdata.data.daily}
            hourly={weatherdata.data.hourly}
          />
          <Additional
            current={weatherdata.data.current}
            daily={weatherdata.data.daily}
            timezone={weatherdata.data.timezone}
            onchange={handleChange}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default App
