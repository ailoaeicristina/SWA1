export default (init_model, view, renderer) => {
    let model = init_model

    function reducer(action, model) {
        switch (action.type) {
            case 'updateMinSeverityLevel':
                const { minSeverityLevel } = action
                return model.updateMinSeverityLevel(minSeverityLevel)
            case 'updateWarningsStatusClicked':
                const { refreshedWarnings } = action
                return model.refreshWarnings(refreshedWarnings)
            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}