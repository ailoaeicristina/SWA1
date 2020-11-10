import React from 'react'
import Select from 'react-select'
import DatePicker from 'react-date-picker'
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import DataTable from 'react-data-table-component';
import './view.css';
import NewRecord from './NewRecordComponent/NewRecord';

const options = [
    { value: 'All', label: 'All' },
    { value: 'Horsens', label: 'Horsens' },
    { value: 'Aarhus', label: 'Aarhus' },
    { value: 'Copenhagen', label: 'Copenhagen' }
]

export default dispatcher => (model) => (
    <div id='base'>
        <h4>Place</h4>
        <Select className="selector" defaultInputValue={model.place} options={options} onChange={(event) => dispatcher()({ type: 'updatePlace', place: event.value })} />

        <h4>Start Date &emsp; &emsp; &emsp; &emsp; &emsp; End Date</h4>
        <DatePicker className="datePicker" format="dd-MM-yyyy" value={model.startDate} onChange={(event) => dispatcher()({ type: 'updateStartDate', startDate: event })} />
        <DatePicker className="datePicker" format="dd-MM-yyyy" value={model.endDate} onChange={(event) => dispatcher()({ type: 'updateEndDate', endDate: event })} />

        <h4>View mode</h4>
        <div className="radioGroup">
            <RadioGroup horizontal value={model.viewMode} onChange={(event) => dispatcher()({ type: 'updateViewMode', viewMode: event })}>
                <RadioButton value="historical">Historical data</RadioButton>
                <RadioButton value="predictive">Predictive data</RadioButton>
            </RadioGroup>
        </div>

        {/* View Mode - historical */}
        <div className="historical" style={{ display: model.historicalVisibility }}>
            <DataTable title="Minimum temperatures for the date interval" data={model.minTemperatures}
                columns={[{ name: 'value', selector: 'value' }, { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Maximum temperatures for the date interval" data={model.maxTemperatures}
                columns={[{ name: 'value', selector: 'value' }, { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Total precipitations for the date interval" data={model.totalPrecipitations}
                columns={[{ name: 'total', selector: 'total' }, { name: 'unit', selector: 'unit' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Average wind speed for the date interval" data={model.avgWindSpeed}
                columns={[{ name: 'average', selector: 'average' }, { name: 'unit', selector: 'unit' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Dominant wind direction for the date interval" data={model.dominantWindDirection}
                columns={[{ name: 'direction', selector: 'direction' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Average cloud coverage for the date interval" data={model.avgCloudCoverage}
                columns={[{ name: 'average', selector: 'average' }, { name: 'unit', selector: 'unit' }, { name: 'place', selector: 'place' }]} />

            <div className="record">
                <NewRecord dispatcher={dispatcher}></NewRecord>
            </div>
        </div>

        {/* View Mode - predictive */}
        <div className="predictive" style={{ display: model.predictiveVisibility }}>
            <button onClick={() => dispatcher()({ type: 'refreshPredictionsClicked' })}>Refresh predictions</button>
            <DataTable title="Temperature predictions" data={model.temperaturePredictions}
                columns={[{ name: 'from', selector: 'from' }, { name: 'to', selector: 'to' }, { name: 'type', selector: 'type' },
                { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Precipitations predictions" data={model.precipitationPredictions}
                columns={[{ name: 'from', selector: 'from' }, { name: 'to', selector: 'to' }, { name: 'precipitation_types', selector: 'precipitation_types' },
                { name: 'type', selector: 'type' }, { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Wind speed predictions" data={model.windSpeedPredictions}
                columns={[{ name: 'from', selector: 'from' }, { name: 'to', selector: 'to' }, { name: 'directions', selector: 'directions' },
                { name: 'type', selector: 'type' }, { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
            <DataTable title="Cloud coverage predictions" data={model.cloudCoveragePredictions}
                columns={[{ name: 'from', selector: 'from' }, { name: 'to', selector: 'to' }, { name: 'type', selector: 'type' },
                { name: 'unit', selector: 'unit' }, { name: 'time', selector: 'time' }, { name: 'place', selector: 'place' }]} />
        </div>
    </div>
)