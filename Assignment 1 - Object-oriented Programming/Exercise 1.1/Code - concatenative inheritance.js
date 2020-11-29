function Event(options) {
    const time = () => options.time
    const place = () => options.place

    return { time, place }
}

function DataType(options) {
    const type = () => options.type
    const unit = () => options.unit

    return { type, unit }
}

function WeatherData(options) {
    const value = () => options.value

    return { value }
}

function WeatherPrediction(options) {
    const matches = (data) => {
        if ((data.type() != options.type) || (data.unit() != options.unit)) {
            return false
        }
        else {
            return data.value() >= from() && data.value() <= to()
        }
    }

    const to = () => options.to
    const from = () => options.from

    return { matches, to, from }
}

//#region Temperature
function TemperatureBase(options) {
    const conToF = (val) => Math.round((val * 1.8 + 32) * 10) / 10
    const conToC = (val) => Math.round(((val - 32) / 1.8) * 10) / 10

    const convertToF = () => {
        if (options.unit === "C") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToF(options.value)
            }
            else {
                options.to = conToF(options.to)
                options.from = conToF(options.from)
            }

            options.unit = "F"
        }
    }

    const convertToC = () => {
        if (options.unit === "F") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToC(options.value)
            }
            else {
                options.to = conToC(options.to)
                options.from = conToC(options.from)
            }

            options.unit = "C"
        }
    }

    return { convertToF, convertToC }
}

function Temperature(time, place, unit, value) {
    const options = {
        time, place, type: "temperature", unit, value
    }

    return { ...Event(options), ...DataType(options), ...WeatherData(options), ...TemperatureBase(options) }
}

function TemperaturePrediction(time, place, unit, to, from) {
    const options = {
        time, place, type: "temperature", unit, to, from
    }

    return { ...Event(options), ...DataType(options), ...WeatherPrediction(options), ...TemperatureBase(options) }
}
//#endregion

//#region  Precipitation
function PrecipitationBase(options) {
    const conToInches = (val) => Math.round(val / 25.4 * 100) / 100
    const conToMM = (val) => Math.round(val * 25.4 * 100) / 100

    const convertToInches = () => {
        if (options.unit === "MM") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToInches(options.value)
            }
            else {
                options.to = conToInches(options.to)
                options.from = conToInches(options.from)
            }

            options.unit = "Inches"
        }
    }

    const convertToMM = () => {
        if (options.unit === "Inches") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToMM(options.value)
            }
            else {
                options.to = conToMM(options.to)
                options.from = conToMM(options.from)
            }

            options.unit = "MM"
        }
    }

    return { convertToInches, convertToMM }
}

function Precipitation(time, place, unit, value, precipType) {
    const options = {
        time, place, type: "precipitation", unit, value
    }

    const precipitationType = () => precipType

    return { ...Event(options), ...DataType(options), ...WeatherData(options), ...PrecipitationBase(options), precipitationType }
}

function PrecipitationPrediction(time, place, unit, to, from, precipTypes) {
    const options = {
        time, place, type: "precipitation", unit, to, from
    }

    const types = () => precipTypes

    const matches = (data) => {
        if ((data.type() != options.type) || (data.unit() != options.unit)) {
            return false
        }
        else {
            return data.value() >= from && data.value() <= to && types().includes(data.precipitationType())
        }
    }

    return { ...Event(options), ...DataType(options), ...WeatherPrediction(options), ...PrecipitationBase(options), types, matches }
}
//#endregion

//#region Wind
function WindBase(options) {
    const conToMPH = (val) => val * 2.236936
    const conToMS = (val) => val * 0.44704

    const convertToMPH = () => {
        if (options.unit === "MS") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToMPH(options.value)
            }
            else {
                options.to = conToMPH(options.to)
                options.from = conToMPH(options.from)
            }

            options.unit = "MPH"
        }
    }

    const convertToMS = () => {
        if (options.unit === "MPH") {
            if (options.to === undefined || options.from === undefined) {
                options.value = conToMS(options.value)
            }
            else {
                options.to = conToMS(options.to)
                options.from = conToMS(options.from)
            }

            options.unit = "MS"
        }
    }

    return { convertToMPH, convertToMS }
}

function Wind(time, place, unit, value, dir) {
    const options = {
        time, place, type: "wind", unit, value
    }

    const direction = () => dir

    return { ...Event(options), ...DataType(options), ...WeatherData(options), ...WindBase(options), direction }
}

function WindPrediction(time, place, unit, to, from, dirs) {
    const options = {
        time, place, type: "wind", unit, to, from
    }

    const directions = () => dirs

    const matches = (data) => {
        if ((data.type() != options.type) || (data.unit() != options.unit)) {
            return false
        }
        else {
            return data.value() >= from && data.value() <= to && directions().includes(data.direction())
        }
    }

    return { ...Event(options), ...DataType(options), ...WeatherPrediction(options), ...WindBase(options), directions, matches }
}
//#endregion

//#region CloudCoverage
function CloudCoverage(time, place, unit, value) {
    const options = {
        time, place, type: "cloudcoverage", unit, value
    }

    return { ...Event(options), ...DataType(options), ...WeatherData(options) }
}

function CloudCoveragePrediction(time, place, unit, to, from) {
    const options = {
        time, place, type: "cloudcoverage", unit, to, from
    }

    return { ...Event(options), ...DataType(options), ...WeatherPrediction(options) }
}
//#endregion

function DateInterval(fromDate, toDate) {
    const from = () => fromDate
    const to = () => toDate
    const contains = (d) => d >= fromDate && d <= toDate

    return { from, to, contains }
}

//#region WeatherHistory, WeatherForecast
function Weather(data) {
    let _place = ""
    let _type = ""
    let _period = ""

    const getCurrectPlace = () => _place
    const setCurrentPlace = (place) => { _place = place }
    const clearCurrentPlace = setCurrentPlace("")

    const getCurrectType = () => _type
    const setCurrentType = (type) => { _type = type }
    const clearCurrentType = setCurrentType("")

    const getCurrectPeriod = () => _period
    const setCurrentPeriod = (period) => { _period = period }
    const clearCurrentPeriod = setCurrentPeriod("")

    const convertToUSUnit = () => {
        data.forEach((d) => {
            switch (d.type()) {
                case "temperature":
                    d.convertToF()
                    break
                case "precipitation":
                    d.convertToInches()
                    break
                case "wind":
                    d.convertToMPH()
                    break
            }
        })
    }

    const convertToInternationalUnit = () => {
        data.forEach((d) => {
            switch (d.type()) {
                case "temperature":
                    d.convertToC()
                    break
                case "precipitation":
                    d.convertToMM()
                    break
                case "wind":
                    d.convertToMS()
                    break
            }
        })
    }

    const add = (_data) => { data = [data, ..._data] }
    const getData = () => {
        let dataCopy = [...data]
        if (_place != "") {
            dataCopy = dataCopy.filter(d => d.place() === _place)
        }

        if (_type != "") {
            dataCopy = dataCopy.filter(d => d.type() === _type)
        }

        if (_period != "") {
            dataCopy = dataCopy.filter(d => _period.contains(d.time()))
        }

        return dataCopy
    }

    return {
        getCurrectPlace, setCurrentPlace, clearCurrentPlace, getCurrectType, setCurrentType, clearCurrentType,
        getCurrectPeriod, setCurrentPeriod, clearCurrentPeriod, convertToUSUnit, convertToInternationalUnit, add, getData
    }
}

function WeatherHistory(data) {
    return { ...Weather(data) }
}

function WeatherForecast(data) {
    return { ...Weather(data) }
}
//#endregion

//#region TEST

// Weather Data
const temperature1 = Temperature(new Date(2020, 8, 20), "Horsens", "C", 15)
const temperature2 = Temperature(new Date(2020, 8, 20), "Vejle", "C", 13)
const temperature3 = Temperature(new Date(2020, 8, 21), "Horsens", "F", 55)
const temperatureArray = [temperature1, temperature2, temperature3]

const precipitation1 = Precipitation(new Date(2020, 8, 20), "Horsens", "MM", 30, "rain")
const precipitation2 = Precipitation(new Date(2020, 8, 20), "Vejle", "MM", 35, "rain")
const precipitation3 = Precipitation(new Date(2020, 8, 21), "Horsens", "Inches", 70, "rain")
const precipitationArray = [precipitation1, precipitation2, precipitation3]

const wind1 = Wind(new Date(2020, 8, 20), "Horsens", "MS", 12, "S")
const wind2 = Wind(new Date(2020, 8, 20), "Vejle", "MS", 20, "W")
const wind3 = Wind(new Date(2020, 8, 21), "Horsens", "MPH", 40, "N")
const windArray = [wind1, wind2, wind3]

const cloudcoverage1 = CloudCoverage(new Date(2020, 8, 20), "Horsens", "Okta", 12)
const cloudcoverage2 = CloudCoverage(new Date(2020, 8, 20), "Vejle", "Okta", 20)
const cloudcoverage3 = CloudCoverage(new Date(2020, 8, 21), "Horsens", "Okta", 40)
const cloudcoverageArray = [cloudcoverage1, cloudcoverage2, cloudcoverage3]

const weatherHistory = WeatherHistory([...temperatureArray, ...precipitationArray, ...windArray, ...cloudcoverageArray])

// Weather Prediction
const temperaturePrediction = TemperaturePrediction(new Date(2020, 8, 20), "Horsens", "C", 20, 13)
const precipitationPrediction = PrecipitationPrediction(new Date(2020, 8, 21), "Horsens", "Inches", 20, 13, ["snow", "rain"])
const windPrediction = WindPrediction(new Date(2020, 8, 20), "Vejle", "MS", 30, 13, ["W", "E"])
const cloudCoveragePrediction = CloudCoveragePrediction(new Date(2020, 8, 20), "Horsens", "Okta", 15, 5)

const weatherForecast = WeatherForecast([temperaturePrediction, precipitationPrediction, windPrediction, cloudCoveragePrediction])

const DataToString = (dataArray) => {
    dataArray.forEach(element =>
        console.log(ElementToString(element))
    );
}

const ElementToString = (element) => {
    let result = `Time: ${element.time()}, Place: ${element.place()}, Type: ${element.type()}, Unit: ${element.unit()}, `

    if (element.value === undefined) {
        result += `To: ${element.to()}, From: ${element.from()}, `
    }
    else {
        result += `Value: ${element.value()}, `
    }

    if (element.precipitationType != undefined) {
        result += `Precipitation type: ${element.precipitationType()}`
    }

    if (element.types != undefined) {
        result += `Types: ${element.types()}`
    }

    if (element.direction != undefined) {
        result += `Direction: ${element.direction()}`
    }

    if (element.directions != undefined) {
        result += `Directions: ${element.directions()}`
    }

    return result
}

// Print Weather History
console.log("Weather History data")
DataToString(weatherHistory.getData())
console.log()

// Filter by place
console.log("Filtering by place = Vejle")
weatherHistory.setCurrentPlace("Vejle")
DataToString(weatherHistory.getData())
console.log()

// Convert units to US
console.log("Convert units to US")
weatherHistory.convertToUSUnit()
DataToString(weatherHistory.getData())
console.log()

// Convert units to International
console.log("Convert units to Intenational")
weatherHistory.convertToInternationalUnit()
DataToString(weatherHistory.getData())
console.log()

// Print Weather Forecast
console.log("Weather Forecast data")
DataToString(weatherForecast.getData())
console.log()

// Check if Temperature Prediction matches a record of Temperature Data
console.log("Check if Temperature Prediction matches a record of Temperature Data")
console.log(ElementToString(temperature1))
console.log(ElementToString(temperaturePrediction))
console.log(temperaturePrediction.matches(temperature1))
console.log()

// Check if Wind Prediction matches a record of Wind Data
console.log("Check if Wind Prediction matches a record of Wind Data")
console.log(ElementToString(wind2))
console.log(ElementToString(windPrediction))
console.log(windPrediction.matches(wind2))
console.log()

//#endregion