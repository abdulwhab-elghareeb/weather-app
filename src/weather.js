// Unpack to get only the desired data
function cleanData({resolvedAddress, currentConditions: {conditions, temp}}){
    return {
        resolvedAddress,
        conditions,
        temp
    }
}


function getWeatherData(location) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&elements=add:address,add:aqius,remove:datetimeEpoch,remove:dew,remove:feelslikemax,remove:feelslikemin,remove:moonphase,remove:precip,remove:precipcover,remove:pressure,remove:severerisk,remove:snow,remove:snowdepth,remove:solarenergy,remove:solarradiation,remove:sunriseEpoch,remove:sunsetEpoch,remove:uvindex,remove:winddir,remove:windgust&key=MZDPUAKUL8Z5RZGHY5AZV7U99&contentType=json`,
  )
    .then((result) => result.json())
    .then((result) => console.log(cleanData(result)));
}

export { getWeatherData }