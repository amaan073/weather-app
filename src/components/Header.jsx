import React, { useState, useRef } from 'react';
import searchCity from './api/searchCity.js';
import getWeatherData from "./api/getWeatherData.js";
import "./css/Header.css";

const Header = ({setWeatherData,setIsLoading}) => {

  const [isActive, setIsActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);



  //open and close searchBar in screens smaller then 786px
  function handleSearchView() {
    setIsActive(true);
  }
  function handleExitBtn() {
    setIsActive(false);
  }



  //searchResult show and hide
  function handleFocus(e) {
    setIsVisible(true);
  }
  const documentRef = useRef(document); 
  documentRef.current.addEventListener("click", (e) => {
    if(e.target.closest(".searchBar")) return ;
    setIsVisible(false);
  });





  //search feature
  async function handleChange(e) {
    if(e.target.value =="") {   /*empty searchInput*/
      setSearchResult([]);
      return;
    }
    setIsSearching(true);

    //Error handle
    try {
      const resultArr = await searchCity(e.target.value);
      setSearchResult(resultArr);
    } catch (error) {
      console.log(error.message);
      if(error.message == "Failed to fetch") {alert("Could not search! check your internet.")}
      if(error.message == "signal timed out") {alert("Signal timed out! check your internet.")}
      setSearchResult([]);
    }

    setIsSearching(false);
  }

  




  //get weather data for search result
  async function handleClick(e) {
    setIsActive(false);  /*mobile search view collapse */
    setIsLoading(true);   /*weather data loading animation*/ 
    setIsVisible(false); //hide the result list

    var location = e.currentTarget.getAttribute("data-location");

    try {
      var weatherData = await getWeatherData(location);
      setWeatherData(weatherData);
    } catch (e) {
      alert(e.message);
    }
    
    setIsLoading(false);  
  }






  //getweatherData of CurrentLocation
  function handleCurrentLocation(e) {
    //geolocation api
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError,{timeout:2000});
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    async function showPosition(pos) {
      setIsLoading(true);
      const location = pos.coords.latitude+","+pos.coords.longitude;
      try {
        var weatherData = await getWeatherData(location);
        setWeatherData(weatherData);
      } catch (e) {
        alert(e.message);
      }
      setIsLoading(false);
    }

    function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
          case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
          case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
          case error.UNKNOWN_ERROR:
             alert("An unknown error occurred.")
              break;
      }
    }
  }








  
  return (
    <header> 
    
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-fog2-fill" viewBox="0 0 16 16"><path fill="white" d="M8.5 3a5 5 0 0 1 4.905 4.027A3 3 0 0 1 13 13h-1.5a.5.5 0 0 0 0-1H1.05a3.5 3.5 0 0 1-.713-1H9.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 0-1H7.5a.5.5 0 0 0 0-1H.337a3.5 3.5 0 0 1 3.57-1.977A5 5 0 0 1 8.5 3"/></svg>
          <span>Weather</span> 
        </div>

        <div className={`searchBar${isActive ? " active" : ""}${isSearching ? " searching" :""}`}>

            <div className="searchInput" onChange={(e)=>handleChange(e)} onFocus={(e)=>handleFocus(e)}
            >
              <button onClick={handleExitBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-box-arrow-left arrow-icon" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/><path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/></svg>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
              <input type="search" name="Search" placeholder='Search city...' autoComplete="off"/>
            </div>

            <div className={`searchResult${isVisible ? " visible" : ""}`} >
              <ul>
                {searchResult.map((result, index)=>{
                  return (
                    <li onClick={(e)=>handleClick(e)} data-location={result.lat+","+result.lon} key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>
                      <p>{result.name},
                        <span>
                          {typeof result.state != "string" ? " "+result.country : " "+result.state+`(${result.country})`} 
                        </span>
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>

        </div>


        <div className="search-view-btn" onClick={handleSearchView}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
        </div>


        <div className="currentLocationBox" onClick={(e)=>handleCurrentLocation(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-crosshair2" viewBox="0 0 16 16"><path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/></svg>
          <span>Current Location</span>
        </div>


        
    </header>
    
  )
}

export default Header;