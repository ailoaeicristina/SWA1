import React from 'react'
import { useHistory } from "react-router-dom";
import styling from './index.css'

function HomeButton() {
    const history = useHistory();
  
    function redirect() {
      history.push("/home");
    }
  
    return (
      <button type="button" onClick={redirect}>
        Go home
      </button>
    );
  }

/* export default dispatcher => () => (
    

    <div id='base'>
        <div>
            <button className="btn" onClick={redirect}>
                Historical data
            </button>
        </div>

        <div>
            <button className="btn" onClick={redirect}>
                Predictive data
            </button>
        </div>
    </div>

    /*     <div id='base'>
            <input
                type="text"
                placeholder="Type something..."
                onChange={(event) => dispatcher()({ type: 'update', text: event.target.value })}
            />
            <div>{model.text}</div>
        </div> 
) */