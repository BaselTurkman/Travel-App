const getWeather = async (latitude, longitude, days, key) => {
    if (days < 0) {
        const errorMsg = {
            message: "Please Enter a Valid Day",
            error: true
        };
        return errorMsg;
    }
    let weatherData = {};
    try {
        if (days >= 0 && days <= 7) {
            const response = await fetch(`http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&units=M&key=${key}`);
            const data = await response.json();
            const { weather, temp } = data.data[0];
            const {description} = weather;
            weatherData = { description, temp };
        } else if (days > 7) {
            const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=M&days=${days}&key=${key}`);
            const data = await response.json();
            const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
            const {description} = weather;
            weatherData = { description, temp, app_max_temp, app_min_temp };
        }
    } catch (error) {
        return { error: true, message: "An error occurred while fetching weather data" };
    }
    return weatherData;
};

module.exports = { getWeather };
