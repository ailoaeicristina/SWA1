export default store => ({ type, ...params }) => {
    switch (type) {
        case 'update':
            const { text } = params
            store({ type, ...params, text })
            break;

        default:
    }
}