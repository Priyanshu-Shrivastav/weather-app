

export const api_url_generator = (searchedCity) => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${api_key}`;

    return api_url;
}

export const weather_icon_fetch = (icon) => {
    let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return icon_url;
}