const getWeatherData = async (location) => {

    const latitude = location.split(",")[0];
    const longtitude = location.split(",")[1];

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const api_url = [
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`,   //currentweather
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longtitude}&appid=${apiKey}`,           //airpollution
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longtitude}&limit=1&appid=${apiKey}`,          //coordinates to city name
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`   //5day-3hour forecast
    ]



    //unix timestamp to normal time converter function
    function getTime(unix) {
        var normal_time = new Date(unix * 1000).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        if (normal_time[0] == "0") {
            normal_time = normal_time.substring(1);
        }
        return normal_time;
    }

    //unix timestamp to normal DATE
    function getDate(unix) {
        const d = new Date(unix * 1000);
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var normal_date = {
            date: d.getDate(),
            month: month[d.getMonth()].substring(0, 3),
            weekday: weekday[d.getDay()],
        }
        return normal_date;
    }






    //API fetching
    try {

        var data = await Promise.all(           //array of all api's response in json format
            api_url.map((url) => { return fetch(url, { signal: AbortSignal.timeout(5000) }) })       //5s timeout if response takes too long
        )
            .then((response) => {
                return Promise.all(response.map(res => {
                    if (!res.ok) {                                                   //handling api errors
                        throw new Error(`something went wrong. (${res.status})`)
                    }
                    return res.json()
                }
                ))
            }
            );

    } catch (err) {
        throw err;
    }



    var cw_data = {        //currentweather
        currentTemp: Math.floor(data[0].main.temp),
        iconCode: data[0].weather[0].icon,
        weather: data[0].weather[0].main,
        sunrise_time: getTime(data[0].sys.sunrise).toUpperCase(),
        sunset_time: getTime(data[0].sys.sunset).toUpperCase(),
        humidity: data[0].main.humidity,
        pressure: data[0].main.pressure,
        visibility: Math.round((data[0].visibility / 1000) * 10) / 10,
        feels_like: Math.floor(data[0].main.feels_like)
    };



    var aqi_data = {       //air pollution
        aq_index: data[1].list[0].main.aqi,
        pm2_5: data[1].list[0].components.pm2_5.toFixed(1),
        so2: data[1].list[0].components.so2.toFixed(1),
        no2: data[1].list[0].components.no2.toFixed(1),
        o3: data[1].list[0].components.o3.toFixed(1)
    };




    //location
    if (typeof data[2][0].state == "string") {  //checking if has state
        var city = data[2][0].name + ", " + data[2][0].state + `(${data[2][0].country})`;
    } else {
        var city = data[2][0].name + ", " + data[2][0].country;
    }





    const forecastArr = [];

    data[3].list.forEach((f) => {                //forecast info
        forecastArr.push({
            time: getTime(f.dt),
            temp: Math.floor(f.main.temp),
            date: getDate(f.dt),
            wind: f.wind,
            iconCode: f.weather[0].icon,
            description: f.weather[0].description
        })
    });


    //hourly forecast upto 8 times
    const hourly_forecast = forecastArr.slice(0, 8);

    //daily forecast upto 5 days      //to get daily forecast for 5days or more we have to remove or deduplicate objects with same date(different hour) and extract unique dates
    var daily_forecast = forecastArr.filter((item, index, self) =>
        index === self.findIndex((f) => (            //this conditions only returns(or returns true for) objects that are occured first in the group of duplicate value(in terms of date value) gr
            f.date.date == item.date.date           //Code snippet from [CORE ui] - https://coreui.io/blog/how-to-get-unique-values-from-a-javascript-array/    
        ))
    );
    daily_forecast = daily_forecast.slice(0, 5);  //5 day only











    //All required weather data 

    var weatherData = {
        currentWeather: cw_data,

        aqi: aqi_data,

        location: city,

        hourly_forecast: hourly_forecast,
        daily_forecast: daily_forecast,
    };


    return weatherData;





}

export default getWeatherData;