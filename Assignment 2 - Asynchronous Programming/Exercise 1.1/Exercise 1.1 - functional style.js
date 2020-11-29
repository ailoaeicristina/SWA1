class ConverterHelper {
    static convertToF(val) { return Math.round((val * 1.8 + 32) * 10) / 10 }
    static convertToC(val) { return Math.round((val - 32) / 1.8 * 10) / 10 }

    static convertToInches(val) { return Math.round(val / 25.4 * 100) / 100 }
    static convertToMM(val) { return Math.round(val * 25.4 * 100) / 100 }

    static convertToMPH(val) { return Math.round(val * 2.236936 * 100) / 100 }
    static convertToMS(val) { return Math.round(val * 0.44704 * 100) / 100 }
}

class EventContext {
    constructor(time, place, type, unit) {
        this.time = time
        this.place = place
        this.type = type
        this.unit = unit
    }

    getTime() { return this.time }
    setTime(val) { return new EventContext(val, this.place, this.type, this.unit) }

    getPlace() { return this.place }
    setPlace(val) { return new EventContext(this.time, val, this.type, this.unit) }

    getType() { return this.type }
    setType(val) { return new EventContext(this.time, this.place, val, this.unit) }

    getUnit() { return this.unit }
    setUnit(val) { return new EventContext(this.time, this.place, this.type, val) }
}

//#region WeatherData and WeatherPrediction
class WeatherData extends EventContext {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit)
        this.value = value
    }

    getValue() { return this.value }
    setValue(val) { return new WeatherData(this.time, this.place, this.type, this.unit, val) }
}

class WeatherPrediction extends EventContext {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit)
        this.to = to
        this.from = from
    }

    getTo() { return this.to }
    setTo(val) { return new WeatherPrediction(this.time, this.place, this.type, this.unit, val, this.from) }

    getFrom() { return this.from }
    setFrom(val) { return new WeatherPrediction(this.time, this.place, this.type, this.unit, this.to, val) }

    matches(data) {
        if ((data.type != this.type) || (data.unit != this.unit))
            return false
        else
            return data.value >= this.from && data.value <= this.to
    }
}
//#endregion

//#region Temperature
class Temperature extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value)
    }

    convertToF() {
        if (this.unit === "C")
            return new Temperature(this.time, this.place, this.type, "F", ConverterHelper.convertToF(this.value))
        else
            return new Temperature(this.time, this.place, this.type, this.unit, this.value)
    }

    convertToC() {
        if (this.unit === "F")
            return new Temperature(this.time, this.place, this.type, "C", ConverterHelper.convertToC(this.value))
        else
            return new Temperature(this.time, this.place, this.type, this.unit, this.value)
    }
}

class TemperaturePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit, to, from)
    }

    convertToF() {
        if (this.unit === "C")
            return new TemperaturePrediction(this.time, this.place, this.type, "F", ConverterHelper.convertToF(this.to), ConverterHelper.convertToF(this.from))
        else
            return new TemperaturePrediction(this.time, this.place, this.type, this.unit, this.to, this.from)
    }

    convertToC() {
        if (this.unit === "F")
            return new TemperaturePrediction(this.time, this.place, this.type, "C", ConverterHelper.convertToC(this.to), ConverterHelper.convertToC(this.from))
        else
            return new TemperaturePrediction(this.time, this.place, this.type, this.unit, this.to, this.from)
    }
}
//#endregion

//#region Precipitation
class Precipitation extends WeatherData {
    constructor(time, place, type, unit, value, precipitationType) {
        super(time, place, type, unit, value)
        this.precipitationType = precipitationType
    }

    getPrecipitationType() { return this.precipitationType }
    setPrecipitationType(val) { return new Precipitation(this.time, this.place, this.type, this.unit, this.value, val) }

    convertToInches() {
        if (super.getUnit() === "MM")
            return new Precipitation(this.time, this.place, this.type, "Inches", ConverterHelper.convertToInches(this.value), this.precipitationType)
        else
            return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
    }

    convertToMM() {
        if (super.getUnit() === "Inches")
            return new Precipitation(this.time, this.place, this.type, "MM", ConverterHelper.convertToMM(this.value), this.precipitationType)
        else
            return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
    }
}

class PrecipitationPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, types) {
        super(time, place, type, unit, to, from)
        this.types = [...types]
    }

    getTypes() { return [...this.types] }
    setTypes(val) { return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.to, this.from, val) }

    matches(data) {
        return super.matches(data) && this.types.includes(data.precipitationType)
    }

    convertToInches() {
        if (super.getUnit() === "MM")
            return new PrecipitationPrediction(this.time, this.place, this.type, "Inches", ConverterHelper.convertToInches(this.to), ConverterHelper.convertToInches(this.from), this.types)
        else
            return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.to, this.from, this.types)
    }

    convertToMM() {
        if (super.getUnit() === "Inches")
            return new PrecipitationPrediction(this.time, this.place, this.type, "MM", ConverterHelper.convertToMM(this.to), ConverterHelper.convertToMM(this.from), this.types)
        else
            return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.to, this.from, this.types)
    }
}
//#endregion

//#region Wind
class Wind extends WeatherData {
    constructor(time, place, type, unit, value, direction) {
        super(time, place, type, unit, value)
        this.direction = direction
    }

    getDirection() { return this.direction }
    setDirection(val) { return new Wind(this.time, this.place, this.type, this.unit, this.value, val) }

    convertToMPH() {
        if (super.getUnit() === "MS")
            return new Wind(this.time, this.place, this.type, "MPH", ConverterHelper.convertToMPH(this.value), this.direction)
        else
            return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
    }

    convertToMS() {
        if (super.getUnit() === "MPH")
            return new Wind(this.time, this.place, this.type, "MS", ConverterHelper.convertToMS(this.value), this.direction)
        else
            return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
    }
}

class WindPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, directions) {
        super(time, place, type, unit, to, from)
        this.directions = [...directions]
    }

    getDirections() { return [...this.directions] }
    setDirections(val) { return new WindPrediction(this.time, this.place, this.unit, this.to, this.from, val) }

    matches(data) {
        return super.matches(data) && this.directions.includes(data.direction)
    }

    convertToMPH() {
        if (super.getUnit() === "MS")
            return new WindPrediction(this.time, this.place, this.type, "MPH", ConverterHelper.convertToMPH(this.to), ConverterHelper.convertToMPH(this.from), this.directions)
        else
            return new WindPrediction(this.time, this.place, this.type, this.unit, this.to, this.from, this.directions)
    }

    convertToMS() {
        if (super.getUnit() === "MPH")
            return new WindPrediction(this.time, this.place, this.type, "MS", ConverterHelper.convertToMS(this.to), ConverterHelper.convertToMS(this.from), this.directions)
        else
            return new WindPrediction(this.time, this.place, this.type, this.unit, this.value, this.directions)
    }
}
//#endregion

//#region CloudCoverage
class CloudCoverage extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value)
    }
}

class CloudCoveragePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit, to, from)
    }
}
//#endregion

class DateInterval {
    constructor(fromDate, toDate) {
        this.fromDate = fromDate
        this.toDate = toDate
    }

    getFromDate() { return this.fromDate }
    setFromDate(val) { return new DateInterval(val, this.toDate) }

    getToDate() { return this.toDate }
    setToDate(val) { return new DateInterval(this.fromDate, val) }

    contains(d) { return d >= this.fromDate && d <= this.toDate }
}

//#region WeatherHistory and WeatherForecast
class WeatherHistory {
    constructor(data) {
        this.data = [...data]
    }

    forPlace(place) { return new WeatherHistory(this.data.filter(d => d.place === place)) }
    forType(type) { return new WeatherHistory(this.data.filter(d => d.type === type)) }
    forPeriod(period) { return new WeatherHistory(this.data.filter(d => period.contains(d.time))) }
    including(data) { return new WeatherHistory([this.data, ...data]) }

    convertToUsUnits() {
        return new WeatherHistory(this.data.map(d => {
            switch (d.type) {
                case "temperature":
                    return d.convertToF()
                case "precipitation":
                    return d.convertToInches()
                case "wind":
                    return d.convertToMPH()
                case "cloudcoverage":
                    return new CloudCoverage(d.time, d.place, d.type, d.unit, d.value)
            }
        }
        ))
    }

    convertToInternationalUnits() {
        return new WeatherHistory(this.data.map(d => {
            switch (d.type) {
                case "temperature":
                    return d.convertToC()
                case "precipitation":
                    return d.convertToMM()
                case "wind":
                    return d.convertToMS()
                case "cloudcoverage":
                    return new CloudCoverage(d.time, d.place, d.type, d.unit, d.value)
            }
        }))
    }

    lowestValue() {
        if (this.data.length === 0)
            return undefined

        if (this.data.map(d => d.type).filter((value, index, self) =>
            self.indexOf(value) === index).length !== 1)
            return undefined

        return this.data.reduce((acc, v) => acc < v.value ? acc : v.value, this.data[0].value)
    }

    getData() { return [...this.data] }
}

class WeatherForecast {
    constructor(data) {
        this.data = [...data]
    }

    forPlace(place) { return new WeatherForecast(this.data.filter(d => d.place === place)) }
    forType(type) { return new WeatherForecast(this.data.filter(d => d.type === type)) }
    forPeriod(period) { return new WeatherForecast(this.data.filter(d => period.contains(d.time))) }
    including(data) { return new WeatherForecast([this.data, ...data]) }

    convertToUsUnits() {
        return new WeatherForecast(this.data.map(d => {
            switch (d.type) {
                case "temperature":
                    return d.convertToF()
                case "precipitation":
                    return d.convertToInches()
                case "wind":
                    return d.convertToMPH()
                case "cloudcoverage":
                    return new CloudCoverage(d.time, d.place, d.type, d.unit, d.to, d.from)
            }
        }
        ))
    }

    convertToInternationalUnits() {
        return new WeatherForecast(this.data.map(d => {
            switch (d.type) {
                case "temperature":
                    return d.convertToC()
                case "precipitation":
                    return d.convertToMM()
                case "wind":
                    return d.convertToMS()
                case "cloudcoverage":
                    return new CloudCoverage(d.time, d.place, d.type, d.to, d.from)
            }
        }))
    }

    averageValue(f) {
        if (this.data.length === 0)
            return undefined

        if (this.data.map(d => d.type).filter((value, index, self) =>
            self.indexOf(value) === index).length !== 1)
            return undefined

        const sum = this.data.reduce((acc, v) => acc + f(v), 0)
        return sum / this.data.length
    }

    averageFromValue() { return this.averageValue(d => d.from) }
    averageToValue() { return this.averageValue(d => d.to) }

    getData() { return [...this.data] }
}
//#endregion

//#region TEST
// Weather Data
const temperature1 = new Temperature(new Date(2020, 8, 20), "Horsens", "temperature", "C", 15)
const temperature2 = new Temperature(new Date(2020, 8, 20), "Vejle", "temperature", "C", 13)
const temperature3 = new Temperature(new Date(2020, 8, 21), "Horsens", "temperature", "C", 20)
const temperatureArray = [temperature1, temperature2, temperature3]

const precipitation1 = new Precipitation(new Date(2020, 8, 20), "Horsens", "precipitation", "MM", 30, "rain")
const precipitation2 = new Precipitation(new Date(2020, 8, 20), "Vejle", "precipitation", "MM", 35, "rain")
const precipitation3 = new Precipitation(new Date(2020, 8, 21), "Horsens", "precipitation", "MM", 24, "rain")
const precipitationArray = [precipitation1, precipitation2, precipitation3]

const wind1 = new Wind(new Date(2020, 8, 20), "Horsens", "wind", "MS", 12, "S")
const wind2 = new Wind(new Date(2020, 8, 20), "Vejle", "wind", "MS", 20, "W")
const wind3 = new Wind(new Date(2020, 8, 21), "Horsens", "wind", "MS", 26, "N")
const windArray = [wind1, wind2, wind3]

const cloudcoverage1 = new CloudCoverage(new Date(2020, 8, 20), "Horsens", "cloudcoverage", "Okta", 12)
const cloudcoverage2 = new CloudCoverage(new Date(2020, 8, 20), "Vejle", "cloudcoverage", "Okta", 20)
const cloudcoverage3 = new CloudCoverage(new Date(2020, 8, 21), "Horsens", "cloudcoverage", "Okta", 40)
const cloudcoverageArray = [cloudcoverage1, cloudcoverage2, cloudcoverage3]

const weatherHistory = new WeatherHistory([...temperatureArray, ...precipitationArray, ...windArray, ...cloudcoverageArray])

// Weather Prediction
const temperaturePrediction = new TemperaturePrediction(new Date(2020, 8, 20), "Horsens", "temperature", "C", 20, 13)
const precipitationPrediction1 = new PrecipitationPrediction(new Date(2020, 8, 21), "Horsens", "precipitation", "Inches", 20, 13, ["snow", "rain"])
const precipitationPrediction2 = new PrecipitationPrediction(new Date(2020, 8, 23), "Horsens", "precipitation", "Inches", 15, 11, ["snow", "rain"])
const windPrediction = new WindPrediction(new Date(2020, 8, 20), "Vejle", "wind", "MS", 30, 13, ["W", "E"])
const cloudCoveragePrediction = new CloudCoveragePrediction(new Date(2020, 8, 20), "Horsens", "cloudcoverage", "Okta", 15, 5)

const weatherForecast = new WeatherForecast([temperaturePrediction, precipitationPrediction1, precipitationPrediction2, windPrediction, cloudCoveragePrediction])

const DataToString = (dataArray) => {
    dataArray.forEach(element =>
        console.log(ElementToString(element))
    );
}

const ElementToString = (element) => {
    let result = `Time: ${element.time}, Place: ${element.place}, Type: ${element.type}, Unit: ${element.unit}, `

    if (element.value === undefined) {
        result += `To: ${element.to}, From: ${element.from}, `
    }
    else {
        result += `Value: ${element.value}, `
    }

    if (element.precipitationType != undefined) {
        result += `Precipitation type: ${element.precipitationType}`
    }

    if (element.types != undefined) {
        result += `Types: ${element.types}`
    }

    if (element.direction != undefined) {
        result += `Direction: ${element.direction}`
    }

    if (element.directions != undefined) {
        result += `Directions: ${element.directions}`
    }

    return result
}

// Print Weather History
console.log("Weather History data")
DataToString(weatherHistory.getData())
console.log()

// Filter by place
console.log("Filtering by place = Vejle")
whByPlace = weatherHistory.forPlace("Vejle")
DataToString(whByPlace.getData())
console.log()

// Convert units to US
console.log("Convert units to US")
whUnitsToUs = weatherHistory.convertToUsUnits()
DataToString(whUnitsToUs.getData())
console.log()

// Convert units to International
console.log("Convert units to International")
whUnitsToInternational = weatherHistory.convertToInternationalUnits()
DataToString(whUnitsToInternational.getData())
console.log()

// Lowest value undefined
console.log("Lowest value undefined")
lowest = weatherHistory.lowestValue()
console.log(lowest)
console.log()

// Lowest value for type temperature
console.log("Lowest value for type temperature")
lowest = weatherHistory.forType("temperature").lowestValue()
console.log(lowest)
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

// Average from value for precipitation forecast
console.log("Average from value for precipitation forecast")
avgFrom = weatherForecast.forType("precipitation").averageFromValue()
console.log(avgFrom)
console.log()

//#endregion