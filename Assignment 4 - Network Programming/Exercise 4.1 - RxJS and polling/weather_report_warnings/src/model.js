const model = (warnings, warningsONOFF, minSeverityLevel) => {
    let records = [...warnings.warnings]
    let recordsCopy = records
    records = records.filter(r => r.severity >= minSeverityLevel)

    let warningsTextONOFF = warningsONOFF === 'ON' ? 'Turn off warnings' : 'Turn on warnings'

    let severityLevels = [...new Set(recordsCopy.map(r => r.severity))].sort().map(sl => ({value : sl.toString(), label: sl.toString()}))
    const updateMinSeverityLevel = newMinSeverityLevel => model(warnings, warningsONOFF, newMinSeverityLevel)

    const refreshWarnings = refreshedWarnings => {
        if (warningsONOFF === 'ON') {
            return model(warnings, 'OFF')
        }
        else if (warningsONOFF === 'OFF') {
            return model(refreshedWarnings, 'ON')
        }
    }

    let lastUpdated = warnings.time
    let temperatureWarnings = records.filter(r => r.prediction.type === 'temperature')
    let precipitationWarnings = records.filter(r => r.prediction.type === 'precipitation')
    let windSpeedWarnings = records.filter(r => r.prediction.type === 'wind speed')
    let cloudCoverageWarnings = records.filter(r => r.prediction.type === 'cloud coverage')

    return {
        records, warningsTextONOFF, severityLevels, minSeverityLevel, lastUpdated, updateMinSeverityLevel, refreshWarnings,
        temperatureWarnings, precipitationWarnings, windSpeedWarnings, cloudCoverageWarnings
    }
}

export default model