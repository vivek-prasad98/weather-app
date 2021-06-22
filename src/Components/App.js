import './../Assets/CSS/App.css'
import WeatherInfo from './WeatherInfo'
import Additional from './AdditionalInfo'
import Loading from './Loading'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Bg from './../Assets/Images/bg1.jpg'

function App () {
  const homepageBgimage = {
    background: `url(${Bg})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  }

  let [weatherdata, updateData] = useState(null)
  let [loading, updateLoading] = useState(false)
  let [currentCity, updateCity] = useState('ranchi')
  let previouCity = 'ranchi'
  useEffect(() => {
    const ApiKey = '87b2ef091f67ac5219079055027addc8'
    const params = {
      q: currentCity,
      appid: ApiKey
    }
    async function fetchLocation () {
      await axios
        .get(`http://api.openweathermap.org/geo/1.0/direct`, { params })
        .then(response => {
          const lat = response.data[0].lat
          const lon = response.data[0].lon
          previouCity = response.data[0].name
          console.log(previouCity)
          getWeatherCondition(lat, lon, ApiKey)
        })
        .catch(error => {
          console.log(error)
        })
      // console.log(geolocation.data[0].lon)
    }
    fetchLocation()
  }, [currentCity])
  async function getWeatherCondition (lat, lon, Key) {
    const params = {
      lat: lat,
      lon: lon,
      appid: Key,
      units: 'metric'
    }
    let weatherData = await axios
      .get('https://api.openweathermap.org/data/2.5/onecall', { params })
      .then(response => {
        updateData(response)
        updateLoading(true)
      })
  }

  let interval
  // let prevCity = 'ranchi'
  function handleChange (e) {
    // console.log(e)
    if (interval) clearTimeout(interval)
    interval = setTimeout(() => {
      console.log(e.target.value)
      if (e.target.value.length < 3) updateCity(previouCity)
      else {
        updateCity(e.target.value)
      }
    }, 1000)
  }

  function handleSearch () {
    let inputData = document.querySelector('#searchValue').value
    console.log(inputData)
    if (inputData.length > 3) updateCity(inputData)
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
            city={currentCity}
            search={handleSearch}
          />
          <Additional
            current={weatherdata.data.current}
            daily={weatherdata.data.daily}
            timezone={weatherdata.data.timezone}
            onchange={handleChange}
            city={currentCity}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default App
