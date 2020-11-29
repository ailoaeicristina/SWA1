
export function reduce(state, action) {
    switch (action.type) {
        case 'togglePoll':
            return state.togglePoll()
        case 'updateMinSeverityLevel':
            const { minSeverityLevel } = action
            return state.updateMinSeverityLevel(minSeverityLevel)
        case 'updateWarnings':
            const { data } = action
            return state.updateWarnings(data)
        default:
            return state
    }
}
