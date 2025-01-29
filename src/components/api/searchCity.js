
const searchCity = async (cityName) => {

    
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

    try {
        const response = await fetch(url, { signal : AbortSignal.timeout(5000)})   //5s timeout
            .then((res)=> {
                if(!res.ok) {
                    throw new Error(`something went wrong. (${res.status})`);
                }
                return res.json();
            }) ;

        return response
        
    } catch (error) {
        throw error;
    }
}


export default searchCity