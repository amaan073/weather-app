import React from 'react';
import "./css/SideSection.css";

const SideSection = ({weatherData}) => {

  //date configuration
  const d= new Date();

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  let date = weekday[d.getDay()]+", "+d.getDate()+" "+month[d.getMonth()].substring(0,3);



    return (
    <section className='sideSection'>

        {/* CURRENT WEATHER */}

        <div className="currentWeatherBox box">

            <h2>Now</h2>

            <div className='currTempBox'>
                <h1 className='currTemp'>
                    <span>{weatherData.currentWeather.currentTemp}</span><span style={{fontSize:"0.8em"}}>&deg;c</span>
                </h1>
                <div className='currWeatherIcon'>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.currentWeather.iconCode}@4x.png`} alt="current weather icon" />
                </div>
            </div>

            <p>{weatherData.currentWeather.weather}</p>

            <hr/>

            <div className="meta">
                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/></svg>
                        <div>{date}</div>
                    </li>
                    <li>
                        <svg style={{marginLeft:"-2.2px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>
                        <div>{weatherData.location}</div>
                    </li>
                </ul>
            </div>

        </div>







        {/* DAILY FORECAST 5DAYS */}


        <div className="daily-forecast">

            <h2>5 Days Forecast</h2>

            <div className='df-card box'>
                <ul className='df-list'>
                    
                {weatherData.daily_forecast.map((df,index) => {
                    return (
                        <li key={index}>
                            <div className='df-info'>
                                <img src={`https://openweathermap.org/img/wn/${df.iconCode}@2x.png`} alt="daily weather icon" width={25} height={25} title={df.description}/>
                                <h2 style={{ fontWeight: "500" }}>{df.temp}&deg;</h2>
                            </div>
                            <p>{df.date.date} {df.date.month}</p>
                            <p>{df.date.weekday.slice(0,3)}</p>
                        </li>
                    )
                })}

                </ul>
            </div>

        </div>


        

        

    </section>
  )
}

export default SideSection