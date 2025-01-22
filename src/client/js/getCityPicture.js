const getCityPicture = async (city) => {
    const response = await fetch("http://localhost:8000/getCityPicture", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            city
        })
    });
    const data = await response.json();
    return data;
}
export { getCityPicture };