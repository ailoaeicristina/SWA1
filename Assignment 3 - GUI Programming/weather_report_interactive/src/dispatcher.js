export default store => async ({ type, ...params }) => {
    switch (type) {
        case 'updatePlace':
            const { place } = params
            store({ type, ...params, place })
            break;
        case 'updateStartDate':
            const { startDate } = params
            store({ type, ...params, startDate })
            break;
        case 'updateEndDate':
            const { endDate } = params
            store({ type, ...params, endDate })
            break;
        case 'updateViewMode':
            const { viewMode } = params
            store({ type, ...params, viewMode })
            break;
        case 'addHistoricalRecord':
            const { record } = params
            store({ type, ...params, record })
            break;
        case 'refreshPredictionsClicked':
            const refreshedPredictions = await fetch('http://localhost:8080/forecast').then(res => res.json())
            store({ type, ...params, refreshedPredictions })
            break;
        default:
    }
}