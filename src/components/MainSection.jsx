import React, {useRef} from 'react'; 
import Direction from "../assets/direction.png";
import openWeather from "../assets/OpenWeather.png";
import "./css/MainSection.css";

const MainSection = ({weatherData}) => {

  
  //draggable slider feature
  const divRef = useRef(null);

  let isDown;
  let startX;    //cursor starting position when slider div is first time clicked
  let scrollLeft;  //the starting position of scrollbar from left side when we start dragging the slider
  

  function handleMouseDown(e) {
    if( divRef.current.scrollWidth==divRef.current.clientWidth) return ;             //this checks if the div is scrollable so the mechanism only apply when it does.

    divRef.current.classList.add("active");
    isDown = true;
    startX = e.pageX - divRef.current.offsetLeft;  //current starting horizontal position of the cursor inside the slider div by substracting the left side offeset of slider div from cursor's horizontal position on page
    scrollLeft = divRef.current.scrollLeft;
  }

  function handleMouseLeave(){
    divRef.current.classList.remove("active");
    isDown = false;
  }

  function handleMouseUp(){
    divRef.current.classList.remove("active");
    isDown = false;
  }

  function handleMouseMove(e){
    if( divRef.current.scrollWidth==divRef.current.clientWidth) return ;
    if(!isDown) return ; 

    e.preventDefault();

    let x = e.pageX - divRef.current.offsetLeft;  //cursor position after mouse is moved
    let walk = (x - startX)*1.5;                  //diff between cursor starting position and position after mouse is moved(drag)
    divRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleMouseOver() {
    if(divRef.current.scrollWidth>divRef.current.clientWidth) {
      divRef.current.classList.add("overflow");
    }else {
      divRef.current.classList.remove("overflow")
    }
  }






  //air condition according to aq index
  
  var aqi; 

    switch (weatherData.aqi.aq_index) {
      case 1 :
        aqi = "Good"
        break;
      
      case 2 :
        aqi = "Fair";
        break;

      case 3 :
        aqi = "Moderate";
        break;

      case 4 :
        aqi = "Poor";
        break;
      
      case 5 :
        aqi = "Very Poor";
        break;
      
      default:
        break;
    }



    
    
    
    

  
  return (
    <section className="mainSection">

      {/* Highlights */}
      <div className='highlights-container box'>
          <h2>Today Highlights</h2>
          <div className="Highlights">
            <div className='box aqi-card'>
              <div className="aqi">
                <div>Air Quality</div>
                <div data-aqi-value={weatherData.aqi.aq_index}>{aqi}</div>
              </div>
              <div className="aqi-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wind hl-icon" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/></svg>
                <div className='pollutant'>
                  <div>PM2.5</div>
                  <div className='md-text'>{weatherData.aqi.pm2_5}</div>
                </div>
                <div className='pollutant'>
                  <div>SO2</div>
                  <div className='md-text'>{weatherData.aqi.so2}</div>
                </div>
                <div className='pollutant'>
                  <div>NO2</div>
                  <div className='md-text'>{weatherData.aqi.no2}</div>
                </div>
                <div className='pollutant'>
                  <div>O3</div>
                  <div className='md-text'>{weatherData.aqi.o3}</div>
                </div>
              </div>
            </div>

            <div className='box sun-card'>
              <div>Sunrise & Sunset</div>
              <div>
                <div className="sunrise-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun hl-icon" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>
                  <div className='s-time'>
                    <div>Sunrise</div>
                    <div className='md-text'>{weatherData.currentWeather.sunrise_time}</div> 
                  </div>
                </div>
                <div className="sunset-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars hl-icon" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg>
                  <div className='s-time'>
                    <div>Sunset</div>
                    <div className='md-text'>{weatherData.currentWeather.sunset_time}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='additionalInfo'>
              <div className="humidity box">
                <div>Humidity</div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moisture hl-icon" viewBox="0 0 16 16"><path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/></svg>
                  <div className='md-text'>{weatherData.currentWeather.humidity}<span style={{fontSize:"0.8em"}}>%</span></div>
                </div>
              </div>
              <div className="pressure box">
                  <div>Pressure</div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-water hl-icon" viewBox="0 0 16 16"><path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65"/></svg>
                    <div className='md-text'>
                      <span>{weatherData.currentWeather.pressure}</span><span style={{fontSize:"0.8em"}}>hPa</span></div>
                  </div>
              </div>
            </div>
              <div className='additionalInfo'>
                <div className="visibility box">
                  <div>Visibility</div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye hl-icon" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>
                      <div className='md-text'>{weatherData.currentWeather.visibility}<span style={{fontSize:"0.8em"}}>km</span></div>
                    </div>
                </div>
              <div className="feels-like box">
                <div>Feels like</div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-thermometer-half hl-icon" viewBox="0 0 16 16"><path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/><path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/></svg>
                    <div className='md-text'><span>{weatherData.currentWeather.feels_like}</span><span style={{fontSize:"0.8em"}}>&deg;c</span></div>
                  </div>
              </div>
            </div>
          </div> 
      </div>


      {/* Hourly forecast temperature and wind speed*/}
      <div className="hourly-forecast">
            <h2>Today At</h2>
            <div 
              ref={divRef}
              onMouseDown={handleMouseDown} 
              onMouseLeave={handleMouseLeave} 
              onMouseUp={handleMouseUp} 
              onMouseMove={handleMouseMove}
              onMouseOver= {handleMouseOver}
            >
              <ul className='hf-cards-list'>
              {weatherData.hourly_forecast.map((hf,index)=> {
                return (
                  <li className='hf-card box' key={index}>
                          <div>{hf.time}</div>
                          <img className="hf-icon ht" src={`https://openweathermap.org/img/wn/${hf.iconCode}@4x.png`} draggable="false" title={hf.description}></img>
                          <div><span>{hf.temp}</span>&deg;</div>
                  </li>
                )
              })}
              </ul>

              <ul className='hf-cards-list'>
                {weatherData.hourly_forecast.map((hf,index)=> {
                  return (
                    <li className='hf-card box' key={index}>
                      <div>{hf.time}</div>
                      <img className="hf-icon" src={Direction} draggable="false" style={{transform: `rotate(${hf.wind.deg}deg)`}} title={`${hf.wind.deg}°`}></img>
                      <div>
                        <span>{hf.wind.speed.toFixed(1)}</span> 
                        <span style={{opacity:"0.7",fontSize:"smaller"}}> km/h</span>
                      </div>
                    </li>
                  )
                })}
              </ul>

            </div>
      </div>



      {/* Footer */}

      <footer className="footer">
      <div>
          <a href="https://openweathermap.org/" target='_blank'>
            <img src={openWeather}  alt="OpenWeather logo" />
          </a>
          <p>Weather data provided by&nbsp;
            <a href="https://openweathermap.org/" target='_blank'>OpenWeather</a>
          </p>
        </div>
        
        <div>
          UI :&nbsp;<a href="https://www.youtube.com/watch?v=QMwyNnjAils" target='_blank'>codewithsadeeYT</a>
        </div>

        
      </footer>
      
    </section>
  )
}

export default MainSection

