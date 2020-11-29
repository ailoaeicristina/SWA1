const model = (warnings, pollEnabled, minSeverityLevel, lastPolled) => {
    console.log(warnings)
    
    let highestSeverityLevel = warnings.map(record => record.severity).reduce((prev, curr) => prev >= curr ? prev : curr)
    let severityLevels = Array.from({length: highestSeverityLevel}, (x, i) => i + 1).map(sl => ({value : sl.toString(), label: sl.toString()}))
    
    let pollTextOnOff = pollEnabled  ? 'Turn off warnings' : 'Turn on warnings'

    warnings = warnings.filter(r => r.severity >= minSeverityLevel)
    
    const updateMinSeverityLevel = newMinSeverityLevel => model(warnings, pollEnabled, newMinSeverityLevel, lastPolled)
    const togglePoll = () => {
        return model(warnings, !pollEnabled, minSeverityLevel, lastPolled)
    }
    const updateWarnings = newData => {
        console.log(newData)
        return model(newData.warnings, pollEnabled, minSeverityLevel, newData.time)
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