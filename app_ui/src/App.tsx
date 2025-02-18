import { useState } from 'react'
import './App.css'
import api from './api'

function App() {
  const [q,setQ] = useState<string>("")
  const [aqi,setAQI] = useState<string>("no")
  const [name,setName] = useState<string>("")
  const [country,setCountry] = useState<string>("")
  const [localTime,setLocalTime] = useState<string>("")
  const [lastUpdated,setLastUpdated] = useState<string>("")
  const [tempC,setTempC] = useState<string>("")
  const [tempF,setTempF] = useState<string>("")
  const [isDay,setIsDay] = useState<string>("")
  const [condition,setCondition] = useState<string>("")
  const [wind,setWind] = useState<string>("")
  const [humidity,setHumidity] = useState<string>("")
  const [cloud,setCloud] = useState<string>("")
  const [co,setCo] = useState<string>("")
  const [no2,setNo2] = useState<string>("")
  const [o3,setO3] = useState<string>("")
  const [so2,setSo2] = useState<string>("")
  const [pm2_5,setPm2_5] = useState<string>("")
  const [pm10,setPm10] = useState<string>("")
  const [display,setDisplay] = useState<number>(0)
  const [error,setError] = useState<string|null>(null)

  const GetWeather = async () => {
    setError(null)
    if(q===""){
      setError("Must Enter a City Name")
      return
    }
    try{
      const response = await api.post("/weather",{q:q})
      if(response.status===200){
        setName(response.data.name)
        setCountry(response.data.country)
        setLocalTime(response.data.localtime)
        setLastUpdated(response.data.last_updated)
        setTempC(response.data.temp_c)
        setTempF(response.data.temp_f)
        setIsDay(response.data.is_day)
        setCondition(response.data.condition)
        setWind(response.data.wind)
        setHumidity(response.data.humidity)
        setCloud(response.data.cloud)
        setCo(response.data.co)
        setNo2(response.data.no2)
        setO3(response.data.o3)
        setSo2(response.data.so2)
        setPm2_5(response.data.pm2_5)
        setPm10(response.data.pm10)
        setDisplay(1)
      }
    }catch(error:any){
      console.error(error)
      if(error.response){
        setError("Couldnt get data")
      }else{
        setError("City Not Found")
      }
    }
  }

  const GoBack = () => {
    setError(null)
    setQ("")
    setAQI("no")
    setDisplay(0)
  }

  return (
    <div className='min-h-screen min-w-screen bg-blue-200'>
      <h1 className='text-center pt-15 text-6xl pb-3'><span className='rounded-full bg-yellow-300 px-3 border-3 py-1 border-amber-600'>Weather App</span></h1>
      {display===0 &&
        <div className='mt-20 py-10 border-3 border-green-600 w-[80%] mx-auto pl-5 rounded-md bg-gray-200'>
          <div className=' mb-3 text-xl pb-5'>
            <label>Enter City Name: </label>
            <input type='text' className='border-2 rounded-lg bg-white pl-2 pr-1 text-lg' onChange={(e)=>setQ(e.target.value)}/>
          </div>
          <div className='text-xl'>
            <label>Include Air Quality Index ? </label>
            <span className='border-2 rounded bg-white'>
              <select value={aqi} onChange={(e)=>setAQI(e.target.value)}>
                <option value="yes" className='text-lg bg-white'>Yes</option>
                <option value="no" className='text-lg bg-white'>No</option>
              </select>
            </span>
          </div>
          <div className='flex justify-center mt-10'>
            <button className='cursor-pointer text-xl font-semibold rounded-md bg-yellow-300 p-2 border-2' onClick={GetWeather}>Get Weather</button>
          </div>
          <div className='text-center font-bold pt-2 text-red-500'>{error}</div>
        </div>
      }
      {display===1 && 
        <div>
          <div className='rounded-md mt-20 bg-gray-200 pt-5 mx-10 border-3 border-green-600'>
            <div className='flex justify-between px-5'>
              <p className='text-xl font-bold'>City: <span className='border-3 bg-white p-1 border-amber-600'>{name}</span></p>
              <p className='text-xl font-bold'>Country: <span className='border-3 bg-white p-1 border-amber-600'>{country}</span></p>
              <p className='text-xl font-bold'>Local Time: <span className='border-3 bg-white p-1 border-amber-600'>{localTime}</span></p>
              <p className='text-xl font-bold'>Last Updated At: <span className='border-3 bg-white p-1 border-amber-600'>{lastUpdated}</span></p>
            </div>
            <div className='mt-5 border-t pt-5'>
              <div className='flex justify-between px-5'>
                <p className='text-lg font-semibold'>Day/Night: <span className='border-3 bg-white p-1 border-amber-600'>{isDay==="0"?"Night":"Day"}</span></p>
                <p className='text-lg font-semibold'>Temperature(°C): <span className='border-3 bg-white p-1 border-amber-600'>{tempC}</span></p>
                <p className='text-lg font-semibold'>Temperature(°F): <span className='border-3 bg-white p-1 border-amber-600'>{tempF}</span></p>
                <p className='text-lg font-semibold'>Weather: <span className='border-3 bg-white p-1 border-amber-600'>{condition}</span></p>
              </div>
              <div className='flex justify-between px-5 mt-10 pb-10'>
                <p className='text-lg font-semibold'>Wind Speed: <span className='border-3 bg-white p-1 border-amber-600'>{wind}</span></p>
                <p className='text-lg font-semibold'>Cloud: <span className='border-3 bg-white p-1 border-amber-600'>{cloud}</span></p>
                <p className='text-lg font-semibold'>Humidity: <span className='border-3 bg-white p-1 border-amber-600'>{humidity}</span></p>
              </div>
            </div>
            {aqi==="yes" &&
              <div className='mt-5 border-t pt-5'>
              <h1 className='text-center text-xl font-bold mb-10'>Air Quality Index:</h1>
              <div className='flex justify-between px-5'>
                <p className='text-lg font-semibold'>co: <span className='border-3 bg-white p-1 border-amber-600'>{co}</span></p>
                <p className='text-lg font-semibold'>no2: <span className='border-3 bg-white p-1 border-amber-600'>{no2}</span></p>
                <p className='text-lg font-semibold'>o3: <span className='border-3 bg-white p-1 border-amber-600'>{o3}</span></p>
              </div>
              <div className='flex justify-between px-5 mt-10 pb-10'>
                <p className='text-lg font-semibold'>so2: <span className='border-3 bg-white p-1 border-amber-600'>{so2}</span></p>
                <p className='text-lg font-semibold'>pm2_5: <span className='border-3 bg-white p-1 border-amber-600'>{pm2_5}</span></p>
                <p className='text-lg font-semibold'>pm10: <span className='border-3 bg-white p-1 border-amber-600'>{pm10}</span></p>
              </div>
            </div>
            }
          </div>
          <div className='flex justify-center mt-10 pb-10'>
            <button className='border-2 px-5 bg-yellow-300 font-semibold text-3xl cursor-pointer rounded-full border-amber-600 ' onClick={GoBack}>Back</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App
