import { useState, useEffect } from 'react'
export default function AdditionalInfo (props) {
  let date = new Date(props.current.dt * 1000).toDateString()

  const { sunrise, sunset } = props.current
  let iconurl = `http://openweathermap.org/img/wn/${
    props.current.weather[props.current.weather.length - 1].icon
  }@4x.png`
  let [dayTime, updateDayTime] = useState([])
  useEffect(() => {
    // console.log('additional Info')
    updateDayTime([
      new Date(sunrise * 1000).toLocaleTimeString().slice(0, 4) + ' AM',
      new Date(sunset * 1000).toLocaleTimeString().slice(0, 4) + ' PM'
    ])
    console.clear()
  }, [props.city])

  // console.log(props.timezone)

  return (
    <div className='Additional hidden xl:inline-block flex-grow flex justify-start pl-6 2xl:pl-12 pr-6 2xl:pr-12 items-start pt-8 2xl:pt-16 backdrop-filter backdrop-blur-xl '>
      <ul className='w-full'>
        <li>
          <h1 className='text-lg 2xl:text-2xl text-gray-200'>
            {/* <span className='block text-sm text-gray-400'>Timezone : </span> */}
            <span>{props.timezone}</span>
          </h1>
        </li>
        <li className='text-3xl -mt-1 2xl:text-5xl mt-4'>{date}</li>
        <li className='flex justify-around w-full '>
          <img src={iconurl} />
        </li>
        <li className='flex justify-around w-full '>
          <section className='flex flex-col items-start w-1/2 '>
            <span className='text-sm block text-gray-400'>Sunrise</span>
            <span className='text-lg'>{dayTime[0]}</span>
          </section>
          <section className='flex flex-col items-end w-1/2'>
            <span className='text-sm block text-gray-400'>Sunset</span>
            <span className='text-lg'>{dayTime[1]}</span>
          </section>
        </li>
        <li className='border-t border-gray-400 mt-3 2xl:mt-12 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2'>Feels like: </section>
          <section className='text-right w-1/2'>
            {props.current.feels_like}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2'>Humidity: </section>
          <section className='text-right w-1/2'>
            {props.current.humidity}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2'>pressure: </section>
          <section className='text-right w-1/2'>
            {props.current.pressure}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2'>Wind Speed: </section>
          <section className='text-right w-1/2'>
            {props.current.wind_speed}{' '}
          </section>
        </li>
        <li className='mt-1 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2'>Rain: </section>
          <section className='text-right w-1/2'>{props.daily[0].rain} </section>
        </li>
        <li className='fixed right-0 bottom-4 w-full px-6'>
          <input
            type='text'
            className='border-b border-gray-600 bg-transparent w-full text-base py-3 outline-none'
            placeholder='Search another location '
            onChange={props.onchange}
          />
        </li>
      </ul>
    </div>
  )
}
