const getCity = async () => {
    const response = await fetch("http://localhost:8000/getCity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            city: city.value
        })
    });
    const data = await response.json();
    return data;
}
export { getCity };