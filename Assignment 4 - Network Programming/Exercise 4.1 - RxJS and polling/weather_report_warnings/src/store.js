export default (init_model, view, renderer) => {
    let model = init_model


    function reducer(action, model) {
        switch (action.type) {
            case 'togglePoll':
                return model.togglePoll()
            case 'updateMinSeverityLevel':
                const { minSeverityLevel } = action
                return model.updateMinSeverityLevel(minSeverityLevel)
            case 'updateWarnings':
                const { data } = action
                return model.updateWarnings(data)
            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}