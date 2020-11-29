export default store => async ({ type, ...params }) => {
    switch (type) {
        case 'updateMinSeverityLevel':
            const { minSeverityLevel } = params
            store({ type, ...params, minSeverityLevel })
            break;
        case 'updateWarningsStatusClicked':
            const refreshedWarnings = await fetch('http://localhost:8080/warnings').then(res => res.json())
            store({ type, ...params, refreshedWarnings })
            break;
        default:
    }
}