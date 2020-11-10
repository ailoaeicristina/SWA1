import React from 'react'

function NewRecord() {

    return (
        <div>
            <h4>Add a historical record</h4>
            <div>
                <p className="fields">Type</p>
                <Select className="selector" defaultInputValue={model.record.type} options={typeOptions} />
                <p>Place</p>
                <Select className="selector" options={options} />
                <p>Value</p>
                <input type="text" />
                <p>Time</p>
                <DatePicker className="datePicker" value={newDate} format="dd-MM-yyyy" onChange={(event) => newDate = event} />
            </div>
            <button onClick={() => dispatcher()({ type: 'addHistoricalRecord', record: {} })}>Add record</button>
        </div>
    );
}

export default NewRecord;