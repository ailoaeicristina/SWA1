export default store => async ({ type, ...params }) => {
    switch (type) {
        case 'updatePlace':
            const { text } = params
            store({ type, ...params, text })
            break;

        default:
    }
}