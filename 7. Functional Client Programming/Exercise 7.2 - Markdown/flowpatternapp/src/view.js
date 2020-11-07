import React from 'react'

export default dispatcher => model => (
    <div id='base'>
        <button onClick = {() => dispatcher()({type:'update'})}>Hire</button>
        <div>{model.text}</div>
    </div>
)