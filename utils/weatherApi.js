import axios from "axios";

const weatherAPi = async (location = false) => {
    const apiKey = 'bfc2f2f12952363b062ebaf94a5fc5e5'
  if (location) {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );

    const climateDescription = result.data.weather[0].description.replace(
      /^"|"$/g,
      ""
    );
    const temperature = JSON.stringify(
      Math.round(result.data.main.temp - 273.15) + "°c"
    ).replace(/^"|"$/g, "");

    const climate = {
        climateDescription,
        temperature
    }
    return climate;
  }
};

export default weatherAPi