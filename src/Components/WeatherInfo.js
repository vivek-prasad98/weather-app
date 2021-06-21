import React, { useEffect, useState } from 'react'

export default function WeatherInfo (props) {
  const { sunrise, sunset } = props.current
  let [dayTime, updateDayTime] = useState([])
  let iconurl = `http://openweathermap.org/img/wn/${props.current.weather[0].icon}@4x.png`
  //   console.log(iconurl)
  useEffect(() => {
    // console.log('Info Props : ', props.current)
    // console.log('UseEffect of WeatherInfo')
    // console.log(props.current.sunrise)
    updateDayTime([
      new Date(sunrise * 1000).toLocaleTimeString().slice(0, 4) + ' AM',
      new Date(sunset * 1000).toLocaleTimeString().slice(0, 4) + ' PM'
    ])
  }, [])

  function dailyList (weather) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    let listData = weather.map((day, index) => {
      let url = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
      let today = new Date(day.dt * 1000).getDay()
      if (index > 5) return
      return (
        <li className='m-2 p-5 backdrop-filter backdrop-blur-2xl text-left flex-grow'>
          <img src={url} alt='condition' />
          <p>{days[today]}</p>
          <h2 className='whitespace-nowrap capitalize text-sm'>
            {day.weather[0].description}
          </h2>
          <p>
            {parseInt(day.temp.min)}&#186; - {parseInt(day.temp.max)}&#186;
          </p>
        </li>
      )
    })
    return listData
  }
  function hourlyList (weather) {
    let listData = weather.map((day, index) => {
      let url = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`
      let today = new Date(day.dt * 1000).toLocaleTimeString()
      if (index === 0) {
        return (
          <li className='m-4 text-center flex-grow'>
            <p className='text-7xl'>{parseInt(day.temp)}&#186;</p>
          </li>
        )
      }
      if (index > 5) return
      return (
        <li className='m-4 text-center flex-grow'>
          <p className='text-sm'>
            {today.slice(0, 4)} {today.slice(-2)}
          </p>
          <p className='text-4xl my-0'>{parseInt(day.temp)}&#186;</p>
          <h2 className='whitespace-nowrap capitalize text-sm whitespace-nowrap'>
            <img
              src={url}
              alt='condition'
              className='inline'
              style={{ width: '30px', height: '30px' }}
            />
            <span>{day.weather[0].description}</span>
          </h2>
        </li>
      )
    })
    return listData
  }

  return (
    <div className='weather flex-grow flex items-center pl-24 relative'>
      <ul className='text-center'>
        <li className='fixed top-12'>
          <div className='hourlyForecast'>
            <ul className='flex text-lg mb-'>{hourlyList(props.hourly)}</ul>
          </div>
        </li>
        <li className='text-center flex flex-col items-center'>
          <div className='capitalize'>
            {props.current.weather[0].description}
          </div>
          <div className='flex items-center text-6xl 2xl:text-9xl w-full justify-center text-center'>
            <span className='font-bold'>
              {parseInt(props.current.temp)}&#186;C
            </span>
            <img src={iconurl} alt='condition' />
          </div>
          {/* <div className='relative flex justify-around'>
            <section className='flex flex-col items-center'>
              <span className='text-sm block text-gray-400'>Sunrise</span>
              <span className='text-xl'>{dayTime[0]}</span>
            </section>
            <section className='flex flex-col items-center'>
              <span className='text-sm block text-gray-400'>Sunset</span>
              <span className='text-xl'>{dayTime[1]}</span>
            </section>
          </div> */}
        </li>
        <li className='flex justify-start mt-24 fixed bottom-12'>
          <div className='daysForecast'>
            <ul className='flex text-lg'>{dailyList(props.daily)}</ul>
          </div>
        </li>
      </ul>
    </div>
  )
}
