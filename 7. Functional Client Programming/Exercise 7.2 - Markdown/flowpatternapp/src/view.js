import React from 'react'

export default dispatcher => (model) => (
    <div id='base'>
        <input
            type="text"
            placeholder="Type something..."
            onChange={(event) => dispatcher()({ type: 'update', text: event.target.value })}
        />
        <div>{model.text}</div>
    </div>
)