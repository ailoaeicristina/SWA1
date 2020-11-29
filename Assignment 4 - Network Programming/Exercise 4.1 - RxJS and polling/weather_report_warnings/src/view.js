import React from 'react'
import Select from 'react-select'
import DataTable from 'react-data-table-component';
import './view.css';

export default dispatcher => (model) => (
    <div id='base'>
        <h2>Warnings</h2>
        <button className="btn" onClick={() => dispatcher()({ type: 'updateWarningsStatusClicked' })}>{model.warningsTextONOFF}</button>

        <h4>Minimal severity level</h4>
        <Select className="selector" defaultInputValue={model.minSeverityLevel} options={model.severityLevels}
            onChange={(event) => dispatcher()({ type: 'updateMinSeverityLevel', minSeverityLevel: event.value })} />
<div>{model.secutiyLevels}</div>
        <h4>Changes in warnings</h4>

        <h4>Current warnings (last updated: {model.lastUpdated})</h4>
        <DataTable title="Temperature warnings" data={model.temperatureWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' },
            { name: 'place', selector: 'prediction.place' }, { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }]} />
        <DataTable title="Precipitations warnings" data={model.precipitationWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' }, { name: 'place', selector: 'prediction.place' },
            { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }, { name: 'precipitation_types', selector: 'prediction.precipitation_types' }]} />
        <DataTable title="Wind speed warnings" data={model.windSpeedWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' }, { name: 'place', selector: 'prediction.place' },
            { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }, { name: 'directions', selector: 'prediction.directions' }]} />
        <DataTable title="Cloud coverage warnings" data={model.cloudCoverageWarnings}
            columns={[{ name: 'id', selector: 'id' }, { name: 'severity', selector: 'severity' }, { name: 'time', selector: 'prediction.time' },
            { name: 'place', selector: 'prediction.place' }, { name: 'from', selector: 'prediction.from' }, { name: 'to', selector: 'prediction.to' }, { name: 'unit', selector: 'prediction.unit' }]} />
    </div>
)