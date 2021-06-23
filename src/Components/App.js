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
    backgroundAttachment: 'fixed',
    minHeight: '700px'
  }

  let [weatherdata, updateData] = useState(null)
  let [loading, updateLoading] = useState(false)
  let [currentLocale, updateLocale] = useState(['ranchi', 'IN'])
  let [searchData, updateSearchData] = useState(false)
  let [totalCities, updateCities] = useState(null)
  let previouCity = 'ranchi'
  useEffect(() => {
    getCoordinates()
  }, [])
  function getCoordinates (city) {
    const ApiKey = '87b2ef091f67ac5219079055027addc8'
    let params = []
    if (city) {
      params = {
        q: city,
        appid: ApiKey
      }
    } else {
      params = {
        q: currentLocale[0],
        appid: ApiKey
      }
    }

    async function fetchLocation () {
      await axios
        .get(`https://api.openweathermap.org/geo/1.0/direct`, { params })
        .then(response => {
          const lat = response.data[0].lat
          const lon = response.data[0].lon
          previouCity = response.data[0].name
          // console.log(response)
          getWeatherCondition(
            lat,
            lon,
            response.data[0].name,
            response.data[0].country
          )
        })
        .catch(error => {
          console.log(error)
        })
    }
    fetchLocation()
  }
  async function getWeatherCondition (lat, lon, name, country) {
    const ApiKey = '87b2ef091f67ac5219079055027addc8'
    const params = {
      lat: lat,
      lon: lon,
      appid: ApiKey,
      units: 'metric'
    }
    let weatherData = await axios
      .get('https://api.openweathermap.org/data/2.5/onecall', { params })
      .then(response => {
        updateData(response)
        updateLocale([name, country])
        updateLoading(true)
      })
  }

  function getCities (value) {
    const ApiKey = '87b2ef091f67ac5219079055027addc8'
    let params = {
      q: value,
      limit: 10,
      appid: ApiKey
    }
    async function fetchLocation () {
      await axios
        .get(`https://api.openweathermap.org/geo/1.0/direct`, { params })
        .then(response => {
          updateCities(response)
        })
        .catch(error => {
          console.log('Error occured : ', error)
        })
    }
    fetchLocation()
  }

  let interval
  let count = true
  function handleChange (e) {
    if (count) updateSearchData(true)
    if (interval) clearTimeout(interval)
    interval = setTimeout(() => {
      count = false
      getCities(e.target.value)
    }, 1000)
  }


  function loadData (lat, lon, name, country) {
    console.log(lat, lon, name, country)
    updateSearchData(false)
    getWeatherCondition(lat, lon, name, country)
    console.log('clicked!!!')
  }

  function handleSearch () {
    let inputData = document.querySelector('#searchValue').value
    console.log(inputData)
    if (inputData.length > 3) getCoordinates(inputData)
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
            city={currentLocale[0]}
            country={currentLocale[1]}
            search={handleSearch}
          />
          <Additional
            current={weatherdata.data.current}
            daily={weatherdata.data.daily}
            timezone={weatherdata.data.timezone}
            onchange={handleChange}
            city={currentLocale[0]}
            searchData={searchData}
            cities={totalCities}
            loadData={loadData}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default App
