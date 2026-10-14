import { convertToFahrenheit } from "./helpers.js";

// weather object for storing data
const weatherObj = {
  weatherData: {},
  unit: "",
};

// Unpack to get only the desired data
function cleanData(
  {
    resolvedAddress,
    currentConditions: { conditions, temp, icon },
    description,
  },
  unit,
) {
  if (unit === "F") {
    temp = convertToFahrenheit(temp);
  } else {
    temp = Math.round(temp);
  }

  const cleanedData = {
    resolvedAddress,
    conditions,
    description,
    temp,
    icon,
    unit,
  };

  weatherObj.weatherData = cleanData;

  return cleanedData;
}

function getWeatherData(location, unit = "C") {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=add:address,add:aqius,remove:datetimeEpoch,remove:dew,remove:feelslikemax,remove:feelslikemin,remove:moonphase,remove:precip,remove:precipcover,remove:pressure,remove:severerisk,remove:snow,remove:snowdepth,remove:solarenergy,remove:solarradiation,remove:sunriseEpoch,remove:sunsetEpoch,remove:uvindex,remove:winddir,remove:windgust&key=MZDPUAKUL8Z5RZGHY5AZV7U99&contentType=json`,
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => cleanData(result, unit));
}

export { getWeatherData, weatherObj };
