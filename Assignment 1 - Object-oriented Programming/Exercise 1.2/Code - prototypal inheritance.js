class ConverterHelper {
    static convertToF = (val) => Math.round((val * 1.8 + 32) * 10) / 10
    static convertToC = (val) => Math.round((val - 32) / 1.8 * 10) / 10

    static convertToInches = (val) => Math.round(val / 25.4 * 100) / 100
    static convertToMM = (val) => Math.round(val * 25.4 * 100) / 100

    static convertToMPH = (val) => Math.round(val * 2.236936 * 100) / 100
    static convertToMS = (val) => Math.round(val * 0.44704 * 100) / 100
}

class EventContext {
    constructor(time, place, type, unit) {
        this.time = time
        this.place = place
        this.type = type
        this.unit = unit
    }

    getTime() { return this.time }
    getPlace() { return this.place }
    getType() { return this.type }

    getUnit() { return this.unit }
    setUnit(val) { this.unit = val }
}

class WeatherData extends EventContext {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit)
        this.value = value
    }

    getValue() { return this.value }
    setValue(val) { this.value = val }
}

class WeatherPrediction extends EventContext {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit)
        this.to = to
        this.from = from
    }

    getTo() { return this.to }
    setTo(val) { this.to = val }

    getFrom() { return this.from }
    setFrom(val) { this.from = val }

    matches(data) {
        if ((data.type != this.type) || (data.unit != this.unit)) {
            return false
        }
        else {
            return data.value >= this.from && data.value <= this.to
        }
    }
}

//#region Temperature
class Temperature extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value)
    }

    convertToF() {
        if (super.getUnit() === "C") {
            super.setValue(ConverterHelper.convertToF(this.value))
            super.setUnit("F")
        }
    }

    convertToC() {
        if (super.getUnit() === "F") {
            super.setValue(ConverterHelper.convertToC(this.value))
            super.setUnit("C")
        }
    }
}

class TemperaturePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit, to, from)
    }

    convertToF() {
        if (super.getUnit() === "C") {
            super.setTo(ConverterHelper.convertToF(this.to))
            super.setFrom(ConverterHelper.convertToF(this.from))
            super.setUnit("F")
        }
    }

    convertToC() {
        if (super.getUnit() === "F") {
            super.setTo(ConverterHelper.convertToF(this.to))
            super.setFrom(ConverterHelper.convertToF(this.from))
            super.setUnit("C")
        }
    }
}
//#endregion

//#region Precipitation
class Precipitation extends WeatherData {
    constructor(time, place, type, unit, value, precipitationType) {
        super(time, place, type, unit, value)
        this.precipitationType = precipitationType
    }

    convertToInches() {
        if (super.getUnit() === "MM") {
            super.setValue(ConverterHelper.convertToInches(this.value))
            super.setUnit("Inches")
        }
    }

    convertToMM() {
        if (super.getUnit() === "Inches") {
            super.setValue(ConverterHelper.convertToMM(this.value))
            super.setUnit("MM")
        }
    }
}

class PrecipitationPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, types) {
        super(time, place, type, unit, to, from)
        this.types = types
    }

    matches(data) {
        return super.matches(data) && this.types.includes(data.precipitationType)
    }

    convertToInches() {
        if (super.getUnit() === "MM") {
            super.setTo(ConverterHelper.convertToInches(this.to))
            super.setFrom(ConverterHelper.convertToInches(this.from))
            super.setUnit("Inches")
        }
    }

    convertToMM() {
        if (super.getUnit() === "Inches") {
            super.setTo(ConverterHelper.convertToMM(this.to))
            super.setFrom(ConverterHelper.convertToMM(this.from))
            super.setUnit("MM")
        }
    }
}
//#endregion

//#region Wind
class Wind extends WeatherData {
    constructor(time, place, type, unit, value, direction) {
        super(time, place, type, unit, value)
        this.direction = direction
    }

    convertToMPH() {
        if (super.getUnit() === "MS") {
            super.setValue(ConverterHelper.convertToMPH(this.value))
            super.setUnit("MPH")
        }
    }

    convertToMS() {
        if (super.getUnit() === "MPH") {
            super.setValue(ConverterHelper.convertToMS(this.value))
            super.setUnit("MS")
        }
    }
}

class WindPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, directions) {
        super(time, place, type, unit, to, from)
        this.directions = directions
    }

    matches(data) {
        return super.matches(data) && this.directions.includes(data.direction)
    }

    convertToMPH() {
        if (super.getUnit() === "MS") {
            super.setTo(ConverterHelper.convertToMPH(this.to))
            super.setFrom(ConverterHelper.convertToMPH(this.From))
            super.setUnit("MPH")
        }
    }

    convertToMS() {
        if (super.getUnit() === "MPH") {
            super.setTo(ConverterHelper.convertToMS(this.to))
            super.setFrom(ConverterHelper.convertToMS(this.from))
            super.setUnit("MS")
        }
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

    contains(d) { return d >= fromDate && d <= toDate }
}

//#region WeatherHistory, WeatherForecast
class Weather {
    constructor(data) {
        this.data = data
    }

    _place = ""
    _type = ""
    _period = ""

    getCurrectPlace() { return this._place }
    setCurrentPlace(place) { this._place = place }
    clearCurrentPlace() { this.setCurrentPlace("") }

    getCurrectType() { return this._type }
    setCurrentType(type) { this._type = type }
    clearCurrentType() { this.setCurrentType("") }

    getCurrectPeriod() { return this._period }
    setCurrentPeriod(period) { this._period = period }
    clearCurrentPeriod() { this.setCurrentPeriod("") }

    convertToUSUnit() {
        this.data.forEach((d) => {
            switch (d.type) {
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

    convertToInternationalUnit() {
        this.data.forEach((d) => {
            switch (d.type) {
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

    add(_data) { this.data = [this.data, ..._data] }
    getData() {
        let dataCopy = [...this.data]

        if (this._place != "") {
            dataCopy = dataCopy.filter(d => d.place === this._place)
        }

        if (this._type != "") {
            dataCopy = dataCopy.filter(d => d.type === this._type)
        }

        if (this._period != "") {
            dataCopy = dataCopy.filter(d => this._period.contains(d.time))
        }

        return dataCopy
    }
}

class WeatherHistory extends Weather{
    constructor(name) {
        super(name)
    }
}

class WeatherForecast extends Weather {
    constructor(name) {
        super(name)
    }
}
//#endregion

//#region TEST

// Weather Data
const temperature1 = new Temperature(new Date(2020, 8, 20), "Horsens", "temperature", "C", 15)
const temperature2 = new Temperature(new Date(2020, 8, 20), "Vejle", "temperature", "C", 13)
const temperature3 = new Temperature(new Date(2020, 8, 21), "Horsens", "temperature", "F", 55)
const temperatureArray = [temperature1, temperature2, temperature3]

const precipitation1 = new Precipitation(new Date(2020, 8, 20), "Horsens", "precipitation", "MM", 30, "rain")
const precipitation2 = new Precipitation(new Date(2020, 8, 20), "Vejle", "precipitation", "MM", 35, "rain")
const precipitation3 = new Precipitation(new Date(2020, 8, 21), "Horsens", "precipitation", "Inches", 70, "rain")
const precipitationArray = [precipitation1, precipitation2, precipitation3]

const wind1 = new Wind(new Date(2020, 8, 20), "Horsens", "wind", "MS", 12, "S")
const wind2 = new Wind(new Date(2020, 8, 20), "Vejle", "wind", "MS", 20, "W")
const wind3 = new Wind(new Date(2020, 8, 21), "Horsens", "wind", "MPH", 40, "N")
const windArray = [wind1, wind2, wind3]

const cloudcoverage1 = new CloudCoverage(new Date(2020, 8, 20), "Horsens", "cloudcoverage", "Okta", 12)
const cloudcoverage2 = new CloudCoverage(new Date(2020, 8, 20), "Vejle", "cloudcoverage", "Okta", 20)
const cloudcoverage3 = new CloudCoverage(new Date(2020, 8, 21), "Horsens", "cloudcoverage", "Okta", 40)
const cloudcoverageArray = [cloudcoverage1, cloudcoverage2, cloudcoverage3]

const weatherHistory = new WeatherHistory([...temperatureArray, ...precipitationArray, ...windArray, ...cloudcoverageArray])

// Weather Prediction
const temperaturePrediction = new TemperaturePrediction(new Date(2020, 8, 20), "Horsens", "temperature", "C", 20, 13)
const precipitationPrediction = new PrecipitationPrediction(new Date(2020, 8, 21), "Horsens", "precipitation", "Inches", 20, 13, ["snow", "rain"])
const windPrediction = new WindPrediction(new Date(2020, 8, 20), "Vejle", "wind", "MS", 30, 13, ["W", "E"])
const cloudCoveragePrediction = new CloudCoveragePrediction(new Date(2020, 8, 20), "Horsens", "cloudcoverage", "Okta", 15, 5)

const weatherForecast = new WeatherForecast([temperaturePrediction, precipitationPrediction, windPrediction, cloudCoveragePrediction])

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


