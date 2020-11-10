import React from 'react'
import Select from 'react-select'

function NewRecord(props) {

    const placeOptions = [
        { value: 'Horsens', label: 'Horsens' },
        { value: 'Aarhus', label: 'Aarhus' },
        { value: 'Copenhagen', label: 'Copenhagen' }
    ]

    const typeOptions = [
        { value: 'temperature', label: 'temperature' },
        { value: 'precipitation', label: 'precipitation' },
        { value: 'wind speed', label: 'wind speed' },
        { value: 'cloud coverage', label: 'cloud coverage' }
    ]

    let recordPlace = 'Horsens'
    let recordType = 'temperature'
    let recordTime = new Date()
    let recordValue, recordPrecipitationType, recordDirection

    function getNewRecord() {
        let dateTime = new Date(recordTime)
        let newRecord = { place: recordPlace, type: recordType, value: recordValue, time: dateTime.toISOString() }

        switch (recordType) {
            case 'temperature':
                newRecord['unit'] = 'C'
                break;
            case 'precipitation':
                newRecord['precipitation_type'] = recordPrecipitationType
                newRecord['unit'] = 'mm'
                break;
            case 'wind speed':
                newRecord['direction'] = recordDirection
                newRecord['unit'] = 'm/s'
                break;
            case 'cloud coverage':
                newRecord['unit'] = '%'
                break;
        }
        return newRecord
    }

    return (
        <div>
            <h4>Add a historical record</h4>
            <div>
                <p>Place</p>
                <Select className="selector" options={placeOptions} defaultInputValue={recordPlace} onChange={(event) => recordPlace = event.value} />

                <p className="fields">Type</p>
                <Select className="selector" options={typeOptions} defaultInputValue={recordType} onChange={(event) => recordType = event.value} />

                <p className="fields">Value (metric unit)</p>
                <input type="text" onChange={(event) => recordValue = event.target.value} />

                <p className="fields">Time</p>
                <input type="datetime-local" onChange={(event) => recordTime = event.target.value} />

                <p className="fields">Precipitation type</p>
                <input type="text" onChange={(event) => recordPrecipitationType = event.target.value} />

                <p className="fields">Direction</p>
                <input type="text" onChange={(event) => recordDirection = event.target.value} />
            </div>
            <button onClick={() => props.dispatcher()({ type: 'addHistoricalRecord', record: getNewRecord() })}>Add record</button>
        </div>
    );
}

export default NewRecord;