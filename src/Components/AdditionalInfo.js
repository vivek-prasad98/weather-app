import { useState, useEffect } from 'react'
export default function AdditionalInfo (props) {
  let date = new Date(props.current.dt * 1000).toDateString()
  const { sunrise, sunset } = props.current
  let iconurl = `http://openweathermap.org/img/wn/${
    props.current.weather[props.current.weather.length - 1].icon
  }@4x.png`
  let [dayTime, updateDayTime] = useState([])
  useEffect(() => {
    showSearchData()
    updateDayTime([
      new Date(sunrise * 1000).toLocaleTimeString().slice(0, 4) + ' AM',
      new Date(sunset * 1000).toLocaleTimeString().slice(0, 4) + ' PM'
    ])
    // console.clear()
  }, [props.city])
  useEffect(() => {
    showSearchData()
    // console.clear()
  }, [props.searchData])

  function showSearchData () {
    let searchBar = document.querySelector('#searchBar')
    let searchResult = document.querySelector('#searchResult')
    let top = searchBar.getBoundingClientRect().bottom
    let width = searchBar.getBoundingClientRect().width
    searchResult.style.top = `${top + 7}px`
    searchResult.style.width = `${width}px`
    // console.log(props.searchData)
    if (props.searchData) {
      searchResult.classList.remove('h-0')
      searchResult.classList.add('h-auto', 'py-3', 'px-4')
    } else {
      searchResult.classList.remove('h-auto', 'py-3', 'px-4')
      searchResult.classList.add('h-0')
    }
  }
  // console.log(props.timezone)

  function showCities () {
    let totalCitiesAvailable = []
    if (props.cities) {
      let data = props.cities.data
      for (let x of data) {
        totalCitiesAvailable.push(
          <li
            className='hover:bg-gray-400'
            onClick={() => {
              props.loadData(x.lat, x.lon, x.name, x.country)
            }}
          >
            <p className='w-full flex justify-between my-4 pointer cursor-pointer'>
              <span className='text-base font-bold'>{x.name}</span> {'  '}
              <span className='text-sm'>{x.country}</span>
            </p>
          </li>
        )
      }
      // return <li>{data}</li>
    }
    return totalCitiesAvailable
  }

  return (
    <div className='Additional hidden xl:inline-block flex-grow flex justify-start pl-6 2xl:pl-12 pr-6 2xl:pr-12 items-start pt-8 2xl:pt-16 backdrop-filter backdrop-blur-xl '>
      <ul className='w-full'>
        <li
          className='-mt-2 mb-12 w-full flex overflow-hidden pr-32 relative'
          style={{ borderRadius: '3px' }}
          id='searchBar'
        >
          <div className='flex mr-32 bg-gray-200'>
            <input
              type='text'
              className='bg-transparent w-full text-xs 2xl:text-sm py-2 px-2 outline-none text-gray-600'
              placeholder='Search another location '
              onChange={props.onchange}
            />
            <button className='absolute h-full text-xs px-4 bg-yellow-500 right-0'>
              Search
            </button>
          </div>
        </li>
        <li
          className=' fixed bg-gray-200 text-gray-700 w-4/5 shadow-2xl text-sm overflow-hidden'
          style={{
            borderRadius: '3px',
            transition: 'all 0.5s ease-in-out'
          }}
          id='searchResult'
        >
          <ul>{showCities()}</ul>
        </li>
        <li>
          <h1 className='text-lg 2xl:text-2xl text-gray-200'>
            {/* <span className='block text-sm text-gray-400'>Timezone : </span> */}
            <span>{props.timezone}</span>
          </h1>
        </li>
        <li className='text-3xl -mt-1 2xl:text-4xl mt-4'>{date}</li>
        <li className='flex justify-around w-full '>
          <img src={iconurl} />
        </li>
        <li className='flex justify-around w-full '>
          <section className='flex flex-col items-start w-1/2 '>
            <span className='text-xs 2xl:text-sm block text-gray-400'>
              Sunrise
            </span>
            <span className='text-sm 2xl:text-base'>{dayTime[0]}</span>
          </section>
          <section className='flex flex-col items-end w-1/2'>
            <span className='text-xs 2xl:text-sm block text-gray-400'>
              Sunset
            </span>
            <span className='text-sm 2xl:text-base'>{dayTime[1]}</span>
          </section>
        </li>
        <li className='border-t border-gray-400 mt-3 2xl:mt-12 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            Feels like:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.current.feels_like}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            Humidity:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.current.humidity}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            pressure:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.current.pressure}{' '}
          </section>
        </li>
        <li className='mt-0 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            Wind Speed:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.current.wind_speed}{' '}
          </section>
        </li>
        <li className='mt-1 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            Dew Point:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.daily[0].dew_point}{' '}
          </section>
        </li>
        <li className='mt-1 2xl:mt-6 text-base 2xl:text-xl text-gray-300 flex justify-around w-full pt-6'>
          <section className='items-start w-1/2 text-sm 2xl:text-base'>
            Clouds:{' '}
          </section>
          <section className='text-right w-1/2 text-sm 2xl:text-base'>
            {props.daily[0].clouds} %
          </section>
        </li>
      </ul>
    </div>
  )
}
