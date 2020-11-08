const model = (records, place, fromDate, toDate) => {

    let latestTime = records.reduce((acc, v) => acc.time > v.time ? acc.time : v.time);

    const latestTemperatures = () => records.filter(d => d.time === latestTime).filter(d => d.type === "temperature")

    return { latestTemperatures }
}

export default model