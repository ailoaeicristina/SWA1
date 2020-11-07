export default (init_model, view, renderer) => {
    let state = init_model

    function reducer(action, state) {
        switch (action.type) {
            case 'update':
                const { text } = action
                return state.updateText(text)
    
            default:
                return state
        }
    }

    return action => {
        state = reducer(action, state)
        renderer(view(state))
    }
}