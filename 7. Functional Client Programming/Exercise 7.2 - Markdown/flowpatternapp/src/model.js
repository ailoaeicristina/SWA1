const model = (text) => {
    const updateText = newText => model(newText)
    return { text, updateText }
}

export default model