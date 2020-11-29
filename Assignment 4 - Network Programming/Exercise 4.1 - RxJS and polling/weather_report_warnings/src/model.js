const model = (warnings, pollEnabled, minSeverityLevel, lastPolled, observable) => {
    console.log(warnings)
    console.log(pollEnabled)
    console.log(minSeverityLevel)
    console.log(lastPolled)
    
    let highestSeverityLevel = warnings.map(record => record.severity).reduce((prev, curr) => prev >= curr ? prev : curr)
    let severityLevels = Array.from({length: highestSeverityLevel}, (x, i) => i + 1).map(sl => ({value : sl.toString(), label: sl.toString()}))
    
    let pollTextOnOff = pollEnabled  ? 'Turn off warnings' : 'Turn on warnings'






    //let recordsCopy = records
    warnings = warnings.filter(r => r.severity >= minSeverityLevel)




    //let severityLevels = [...new Set(recordsCopy.map(r => r.severity))].sort().map(sl => ({value : sl.toString(), label: sl.toString()}))
    const updateMinSeverityLevel = newMinSeverityLevel => model(warnings, pollEnabled, newMinSeverityLevel, lastPolled, observable)
    const togglePoll = () => {
        console.log("togglePoll")
        return model(warnings, !pollEnabled, minSeverityLevel, lastPolled, observable)
    }
    const updateWarnings = newData => {
        return model(newData.warnings, pollEnabled, minSeverityLevel, newData.time, observable)
    };

    let temperatureWarnings = warnings.filter(r => r.prediction.type === 'temperature')
    let precipitationWarnings = warnings.filter(r => r.prediction.type === 'precipitation')
    let windSpeedWarnings = warnings.filter(r => r.prediction.type === 'wind speed')
    let cloudCoverageWarnings = warnings.filter(r => r.prediction.type === 'cloud coverage')

    return {
        warnings, lastPolled, pollEnabled, pollTextOnOff, severityLevels, minSeverityLevel, updateMinSeverityLevel, togglePoll, updateWarnings,
        temperatureWarnings, precipitationWarnings, windSpeedWarnings, cloudCoverageWarnings
    }
}

export default model