import { convertToFahrenheit } from "./helpers.js";

// Unpack to get the desired data
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
  return cleanedData;
}

async function getWeatherData(location, unit = "C") {
  const fetchedData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=add:address,add:aqius,remove:datetimeEpoch,remove:dew,remove:feelslikemax,remove:feelslikemin,remove:moonphase,remove:precip,remove:precipcover,remove:pressure,remove:severerisk,remove:snow,remove:snowdepth,remove:solarenergy,remove:solarradiation,remove:sunriseEpoch,remove:sunsetEpoch,remove:uvindex,remove:winddir,remove:windgust&key=MZDPUAKUL8Z5RZGHY5AZV7U99&contentType=json`,
  );

  if (!fetchedData.ok) {
    throw new Error("Invalid location");
  }

  const weatherDataObj = await fetchedData.json();
  return cleanData(weatherDataObj, unit);
}

export { getWeatherData };
