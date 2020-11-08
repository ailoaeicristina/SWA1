export default (init_model, view, renderer) => {
    let model = init_model

    function reducer(action, model) {
        switch (action.type) {
            case 'update':
                const { text } = action
                return model.updateText(text)
    
            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}