const getCityLocation = async (city, username) => {
    try {
      const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=1&username=${username}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.postalCodes || data.postalCodes.length === 0) {
        return { msg: "City Not Found, Please Make sure the Spelling", error: true };
      }      
      const { placeName, lat, lng } = data.postalCodes[0];
      return { lat: lat, lng: lng, city: placeName };
    } catch (error) {
      return {
        msg: error.message || "An error occurred",
        error: true,
      };
    }
  };

  module.exports = { getCityLocation };
  