import React, { useEffect } from 'react'

function createUniqueKey (n) {
  let hashString =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let key = []
  for (let i = 1; i <= n; ++i) {
    key.push(hashString[Math.floor(Math.random() * hashString.length)])
  }
  return key.join('')
}

export default function WeatherInfo (props) {
  let iconurl = `http://openweathermap.org/img/wn/${
    props.current.weather[props.current.weather.length - 1].icon
  }@4x.png`
  useEffect(() => {
    // position = document.querySelector('#temp').getBoundingClientRect().top
    // console.log(height)
  })
  function handleFocus (e) {
    if (window.innerWidth < 540) {
      let tempVariable = document.querySelector('#temp')
      setTimeout(() => {
        tempVariable.setAttribute('style', 'margin-top:140px')
      }, 100)
    }
  }
  function handleBlur (e) {
    if (window.innerWidth < 540) {
      let tempVariable = document.querySelector('#temp')
      setTimeout(() => {
        tempVariable.removeAttribute('style')
      }, 100)
    }
  }
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
      const width = window.innerWidth
      let url = ''
      if (width < 1536)
        url = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`
      else
        url = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
      let today = new Date(day.dt * 1000).getDay()
      if (index > 6) return
      return (
        <li
          className='m-2 p-2 2xl:p-5 backdrop-filter backdrop-blur-2xl text-left min-w-1/4 md:min-w-2/5 2xl:min-w-2/5 w-44 block rounded-2xl'
          key={createUniqueKey(7)}
          // style={{ width: '500px' }}
        >
          <img src={url} alt='condition' />
          <p className='text-base 2xl:text-xl'>{days[today]}</p>
          <h2 className='whitespace-nowrap capitalize text-xs md:text-sm 2xl:text-base'>
            {day.weather[0].description}
          </h2>
          <p className='text-xs xl:text-sm'>
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
          <li className='m-4 text-center flex-grow' key={createUniqueKey(7)}>
            <p className='text-4xl xl:text-5xl 2xl:text-7xl'>
              {parseInt(day.temp)}&#186;
            </p>
          </li>
        )
      }
      if (index > 7) return
      return (
        <li
          className='ml-7 mr-7 text-center flex-grow'
          key={createUniqueKey(6)}
        >
          <p className='text-sm'>
            {today.slice(0, 4)} {today.slice(-2)}
          </p>
          <p className='xl:text-3xl 2xl:text-4xl my-0'>
            {parseInt(day.temp)}&#186;
          </p>
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
    <div className='weather flex-grow flex items-center md:pl-24 relative w-full box-border h-screen'>
      <ul className='text-center relative w-11/12'>
        <li className='bg-gray-100 xl:hidden fixed flex w-4/5 left-1/2 transform py-1 box-border -translate-x-1/2 top-4 box-border shadow-2xl rounded-sm overflow-hidden'>
          <input
            type='text'
            class='bg-gray-100 text-gray-700 text-sm py-1 pl-2 outline-none border-0'
            placeholder='Search another location...'
            id='searchValue'
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            class='bg-yellow-600 absolute right-0 top-0 px-4 h-full text-base text-white'
            onClick={props.search}
          >
            Search
          </button>
        </li>
        <li className='fixed left-8 2xl:left-14 top-24 xl:top-12 w-11/12 xl:w-2/3 box-border'>
          <ul className='hourlyForecast flex text-lg overflow-x-scroll overflow-conatiner-1 box-border'>
            {hourlyList(props.hourly)}
          </ul>
        </li>
        <li
          className='text-center flex flex-col items-center md:-mt-24'
          id='temp'
        >
          <div className='capitalize xl:text-2xl -mb-8 xl:-mb-8 2xl:-mb-1 xl:text-3xl ml-5 md:ml-0'>
            {props.current.weather[0].description}
          </div>
          <div className='flex items-center ml-24 md:ml-0 text-5xl md:text-7xl 2xl:text-9xl justify-center text-center'>
            <span className='font-bold'>
              {parseInt(props.current.temp)}&#186;C
            </span>
            <img src={iconurl} alt='condition' />
          </div>
          <div className='capitalize text-3xl md:text-4xl font-bold -mt-8 md:-mt-6 2xl:-mt-1 -ml-24 md:-ml-20 whitespace-nowrap'>
            {props.city}, {props.country}
          </div>
        </li>
        <li className='flex justify-start bottom-7 md:bottom-4  left-8 2xl:left-14 2xl:mt-24 w-11/12 xl:w-2/3 fixed 2xl:bottom-12'>
          <div className='daysForecast w-full'>
            <ul className='overflow-conatiner-1 flex text-lg flex-nowrap flex-row w-full overflow-x-scroll'>
              {dailyList(props.daily)}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  )
}
