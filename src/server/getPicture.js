const getPicture = async (city, key) => {
    const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`);
    const data = await response.json();
    const image = data.hits[0] ? data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
    return { image };
};

module.exports = { getPicture };
