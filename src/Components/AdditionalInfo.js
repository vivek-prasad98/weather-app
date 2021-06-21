import { useState, useEffect } from 'react'
export default function AdditionalInfo (props) {
  console.log(props.daily)
  let date = new Date(props.current.dt * 1000).toDateString()

  const { sunrise, sunset } = props.current
  let iconurl = `http://openweathermap.org/img/wn/${props.current.weather[0].icon}@4x.png`
  let [dayTime, updateDayTime] = useState([])
  useEffect(() => {
    updateDayTime([
      new Date(sunrise * 1000).toLocaleTimeString().slice(0, 4) + ' AM',
      new Date(sunset * 1000).toLocaleTimeString().slice(0, 4) + ' PM'
    ])
  }, [])

  console.log(props.timezone)

  return (
    <div className='Additional flex-grow flex justify-start pl-12 pr-12 items-start pt-16 backdrop-filter backdrop-blur-lg'>
      <ul className='w-full'>
        <li>
          <h1 className='text-2xl text-gray-300'>
            {/* <span className='block text-sm text-gray-400'>Timezone : </span> */}
            <span>{props.timezone}</span>
          </h1>
        </li>
        <li className='text-5xl mt-4'>{date}</li>
        <li className='flex justify-around w-full '>
          <img src={iconurl} />
        </li>
        <li className='flex justify-around w-full '>
          <section className='flex flex-col items-center '>
            <span className='text-sm block text-gray-400'>Sunrise</span>
            <span className='text-xl'>{dayTime[0]}</span>
          </section>
          <section className='flex flex-col items-center'>
            <span className='text-sm block text-gray-400'>Sunset</span>
            <span className='text-xl'>{dayTime[1]}</span>
          </section>
        </li>
        <li className='border-t border-gray-600 mt-12 text-xl text-gray-400 flex justify-around w-full pt-6'>
          <section>Feels like: </section>
          <section>{props.current.feels_like} </section>
        </li>
        <li className='mt-6 text-xl text-gray-400 flex justify-around w-full pt-6'>
          <section>Humidity: </section>
          <section>{props.current.humidity} </section>
        </li>
        <li className='mt-6 text-xl text-gray-400 flex justify-around w-full pt-6'>
          <section>pressure: </section>
          <section>{props.current.pressure} </section>
        </li>
        <li className='mt-6 text-xl text-gray-400 flex justify-around w-full pt-6'>
          <section>Wind Speed: </section>
          <section>{props.current.wind_speed} </section>
        </li>
        <li className='mt-6 text-xl text-gray-400 flex justify-around w-full pt-6'>
          <section>Rain: </section>
          <section>{props.daily[0].rain} </section>
        </li>
        <li className='fixed right-4 bottom-4 w-full px-12'>
          <input
            type='text'
            className='border-b border-gray-600 bg-transparent w-full text-lg p-3 outline-none'
            placeholder='Search another location '
            onChange={props.onchange}
          />
        </li>
      </ul>
    </div>
  )
}
