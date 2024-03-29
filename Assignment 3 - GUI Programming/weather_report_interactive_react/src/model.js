const model = (historicals, predictions, place, startDate, endDate, viewMode) => {

    let historicalVisibility = viewMode === "historical" ? 'block' : 'none'
    let predictiveVisibility = viewMode === "predictive" ? 'block' : 'none'

    let records = viewMode === "historical" ? historicals : predictions

    const places = place === 'All' ? ['Horsens', 'Aarhus', 'Copenhagen'] : [place]
    records = records.filter(r => place === 'All' || r.place === place)
    records = records.filter(r => Date.parse(r.time) >= startDate.getTime())
    records = records.filter(r => Date.parse(r.time) <= endDate.getTime())

    const updatePlace = newPlace => model(historicals, predictions, newPlace, startDate, endDate, viewMode)
    const updateStartDate = newStartDate => model(historicals, predictions, place, newStartDate, endDate, viewMode)
    const updateEndDate = newEndDate => model(historicals, predictions, place, startDate, newEndDate, viewMode)
    const updateViewMode = newViewMode => model(historicals, predictions, place, startDate, endDate, newViewMode)

    const addHistoricalRecord = newRecord => model(historicals.concat(newRecord), predictions, place, startDate, endDate, viewMode)
    const refreshPredictions = refreshPredictions => model(historicals, refreshPredictions, place, startDate, endDate, viewMode)

    //#region get historical data
    // Minimum temperatures for the date interval
    let minTemperatures = []
    let minTemp
    places.forEach(p => {
        minTemp = records.filter(r => r.place === p).filter(r => r.type === "temperature").reduce((acc, v) => acc.value < v.value ? acc : v, { value: null })
        if (minTemp !== null)
            minTemperatures.push(minTemp)
    });

    // Maximum temperatures for the date interval
    let maxTemperatures = []
    let maxTemp
    places.forEach(p => {
        maxTemp = records.filter(r => r.place === p).filter(r => r.type === "temperature").reduce((acc, v) => acc.value > v.value ? acc : v, { value: null })
        if (maxTemp !== null)
            maxTemperatures.push(maxTemp)
    });

    // Total precipitation for the date interval
    let totalPrecipitations = []
    let totalPrecip, totalPrecipForCity, totalPrecipFirstObj
    places.forEach(p => {
        totalPrecipForCity = records.filter(r => r.place === p).filter(r => r.type === "precipitation")
        totalPrecipFirstObj = totalPrecipForCity[0]
        totalPrecip = totalPrecipForCity.reduce((acc, v) => acc + v.value, 0)
        if (totalPrecip !== 0)
            totalPrecipitations.push({ total: totalPrecip, unit: totalPrecipFirstObj.unit, place: p, })
    });

    // Average wind speed for the date interval
    let avgWindSpeed = []
    let avgWS, avgWSForCity, avgWSFirstObj
    places.forEach(p => {
        avgWSForCity = records.filter(r => r.place === p).filter(r => r.type === "wind speed")
        if (avgWSForCity.length === 0)
            return
        avgWSFirstObj = avgWSForCity[0]
        avgWS = avgWSForCity.reduce((acc, v) => acc + v.value, 0) / avgWSForCity.length
        if (avgWS !== 0)
            avgWindSpeed.push({ average: avgWS, unit: avgWSFirstObj.unit, place: p })
    });

    // Dominant wind direction for the date interval
    let dominantWindDirection = []
    let dominantWD
    places.forEach(p => {
        dominantWD = records.filter(r => r.place === p).filter(r => r.type === "wind speed").map(d => d.direction).reduce(
            (acc, v, i, arr) => (arr.filter(val => val === acc).length >= arr.filter(val => val === v).length ? acc : v), null)
        if (dominantWD !== null)
            dominantWindDirection.push({ direction: dominantWD, place: p })
    });

    // Average wind speed for the date interval
    let avgCloudCoverage = []
    let avgCC, avgCCForCity, avgCCFirstObj
    places.forEach(p => {
        avgCCForCity = records.filter(r => r.place === p).filter(r => r.type === "cloud coverage")
        if (avgCCForCity.length === 0)
            return
        avgCCFirstObj = avgCCForCity[0]
        avgCC = avgCCForCity.reduce((acc, v) => acc + v.value, 0) / avgCCForCity.length
        if (avgCC !== 0)
            avgCloudCoverage.push({ average: avgCC, unit: avgCCFirstObj.unit, place: p })
    });
    //#endregion

    //#region get predictive data
    const temperaturePredictions = records.filter(r => r.type === "temperature")
    const precipitationPredictions = records.filter(r => r.type === "precipitation")
    const windSpeedPredictions = records.filter(r => r.type === "wind speed")
    const cloudCoveragePredictions = records.filter(r => r.type === "cloud coverage")
    //#endregion

    return {
        place, startDate, endDate, viewMode, updatePlace, updateStartDate, updateEndDate, updateViewMode, addHistoricalRecord, refreshPredictions,
        historicalVisibility, predictiveVisibility, minTemperatures, maxTemperatures, totalPrecipitations, avgWindSpeed, dominantWindDirection, avgCloudCoverage,
        temperaturePredictions, precipitationPredictions, windSpeedPredictions, cloudCoveragePredictions
    }
}

export default model