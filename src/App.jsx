import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SideSection from './components/SideSection';
import MainSection from './components/MainSection';
import getWeatherData from './components/api/getWeatherData';
import "./App.css";

const App = () => {
  

  
  //fetching default weather data
  useEffect(()=>{
    async function getDefaultData() {

      const coord = "19.0785451,72.878176";   //mumbai co-ordinates
      
      try {
        var res = await getWeatherData(coord);
        setWeatherData(res);
      } catch (e) {
        setError(e.message);
      }
    
    }
    getDefaultData();
  },[]);
  

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  


  if(weatherData) {
    return (
      <div className={`App${isLoading ? " loading" : ""}`}>
        <Header setWeatherData={setWeatherData} setIsLoading={setIsLoading}/>
        <main>
          <SideSection weatherData={weatherData}/>
          <MainSection weatherData={weatherData}/>
        </main>
      </div>
    )
  }

  else if(error) {
    return (
      <div className='error'>
        <span>&#128549;{error}</span>
      </div>
    )
  }

  else {
    return (<div className='App loading'></div>)
  }
}

export default App