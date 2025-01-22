const getWeather = async (longitude, latitude, remainingDays) => {
    const response = await fetch("http://localhost:8000/getWeather", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lat: latitude,
            lng: longitude,
            remainingDays
        })
    });
    const data = await response.json();
    return data;
}

export { getWeather };