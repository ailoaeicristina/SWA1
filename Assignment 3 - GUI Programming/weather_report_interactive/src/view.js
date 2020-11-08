import React from 'react'
import Select from 'react-select'
import DatePicker from 'react-date-picker'
import { RadioGroup, RadioButton } from 'react-radio-buttons'

function toggleHistoricalData() {
    var data = document.getElementById("historicalData");
    console.log("here")

    if (data.style.display === "none") {
        data.style.display = "block";
    } else {
        data.style.display = "none";
    }
}

const options = [
    { value: 'Horsens', label: 'Horsens' },
    { value: 'Aarhus', label: 'Aarhus' },
    { value: 'Copenhagen', label: 'Copenhagen' }
]

const startDate = new Date()
const endDate = new Date()

export default dispatcher => () => (
    <div id='base'>
        <h4>Place</h4>
        <div className="select">
            <Select options={options} isClearable onChange={(event) => dispatcher()({ type: 'updatePlace', text: event.target.value })} />
        </div>

        <h4>From Date</h4>
        <DatePicker />
        <DatePicker selected={endDate} />

        <h4>Type of data</h4>
        <RadioGroup horizontal value="historical">
            <RadioButton value="historical">
                Historical data
            </RadioButton>
            <RadioButton value="predictive">
                Predictive data
            </RadioButton>
        </RadioGroup>

        {/*          <div id='base'>
            <input
                type="text"
                placeholder="Type something..."
                onChange={(event) => dispatcher()({ type: 'update', text: event.target.value })}
            />
            <div>{model.text}</div> */}
    </div>
)