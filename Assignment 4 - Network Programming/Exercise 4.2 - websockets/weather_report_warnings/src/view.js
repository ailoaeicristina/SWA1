import React from 'react'
import Select from 'react-select'
import DataTable from 'react-data-table-component';
import './view.css';

const View = ({ state, dispatch }) => (
    <div id='base' >
        <h2>Warnings</h2>
        <button className="btn" onClick={() => dispatch({ type: 'togglePoll', state: state })}>{state.pollTextOnOff}</button>

        <h4>Minimal severity level</h4>
        <Select className="selector" defaultInputValue={state.minSeverityLevel} options={state.severityLevels}
            onChange={(event) => dispatch({ type: 'updateMinSeverityLevel', minSeverityLevel: event.value })} />

        <h4>Changes in warnings</h4>

        <h4>Current warnings (last updated: {state.lastPolled})</h4>
        <DataTable title="Temperature warnings" data={state.temperatureWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' },
            { name: 'place', selector: 'prediction.place' }, { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }]} />
        <DataTable title="Precipitations warnings" data={state.precipitationWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' }, { name: 'place', selector: 'prediction.place' },
            { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }, { name: 'precipitation_types', selector: 'prediction.precipitation_types' }]} />
        <DataTable title="Wind speed warnings" data={state.windSpeedWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' }, { name: 'place', selector: 'prediction.place' },
            { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }, { name: 'directions', selector: 'prediction.directions' }]} />
        <DataTable title="Cloud coverage warnings" data={state.cloudCoverageWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' },
            { name: 'place', selector: 'prediction.place' }, { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }]} />
    </div>
)


export const create_view = dispatch => state => <View state={state} dispatch={dispatch} />