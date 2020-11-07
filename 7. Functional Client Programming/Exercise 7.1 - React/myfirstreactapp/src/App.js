import React, { useState } from 'react';

function App() {

  const [name, setName] = useState("World");

  const handleInputChange = (event) => {
    if (event.target.value === "")
      setName("World")
    else
      setName(event.target.value)
  }

  return (
    <div>
      <div>Hello {name}</div>
      <input
        type="text"
        placeholder="Type your name here..."
        onChange={handleInputChange}
      />
    </div>
  );
}

export default App;
