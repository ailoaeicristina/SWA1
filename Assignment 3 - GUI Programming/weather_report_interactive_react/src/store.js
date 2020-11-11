export default (init_model, view, renderer) => {
    let model = init_model

    function reducer(action, model) {
        switch (action.type) {
            case 'updatePlace':
                const { place } = action
                return model.updatePlace(place)
            case 'updateStartDate':
                const { startDate } = action
                return model.updateStartDate(startDate)
            case 'updateEndDate':
                const { endDate } = action
                return model.updateEndDate(endDate)
            case 'updateViewMode':
                const { viewMode } = action
                return model.updateViewMode(viewMode)
            case 'addHistoricalRecord':
                const { record } = action
                return model.addHistoricalRecord(record)
            case 'refreshPredictionsClicked':
                const { refreshedPredictions } = action
                return model.refreshPredictions(refreshedPredictions)
            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}