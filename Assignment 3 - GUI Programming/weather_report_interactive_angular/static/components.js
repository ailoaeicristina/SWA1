import model from './model.js'

const module = angular.module('weatherReportApp', [])

var d = new Date()
d.setDate(d.getDate() - 5)
module.value('$model', { historicals: [], predictions: [], place: 'All', startDate: d, endDate: new Date(), viewMode: 'historical' })

module.component('temperatureTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>Value</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='temperature_data'>
        <tr ng-repeat="temperature in $ctrl.model[$ctrl.attribute]">
            <td>{{temperature.value}}</td>
            <td>{{temperature.unit}}</td>
            <td>{{temperature.time}}</td>
            <td>{{temperature.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('precipitationTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>Total</td><td>Unit</td><td>Place</td></tr></thead>
    <tbody id='precipitation_data'>
        <tr ng-repeat="precipitation_data in $ctrl.model[$ctrl.attribute]">
            <td>{{precipitation_data.total}}</td>
            <td>{{precipitation_data.unit}}</td>
            <td>{{precipitation_data.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('windspeedTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>Average</td><td>Unit</td><td>Place</td></tr></thead>
    <tbody id='windspeed_data'>
        <tr ng-repeat="windspeed in $ctrl.model[$ctrl.attribute]">
            <td>{{windspeed.average}}</td>
            <td>{{windspeed.unit}}</td>
            <td>{{windspeed.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('winddirectionTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>Direction</td><td>Place</td></tr></thead>
    <tbody id='winddirection_data'>
        <tr ng-repeat="winddirection in $ctrl.model[$ctrl.attribute]">
            <td>{{winddirection.direction}}</td>
            <td>{{winddirection.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('cloudcoverageTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>Average</td><td>Unit</td><td>Place</td></tr></thead>
    <tbody id='cloudcoverage_data'>
        <tr ng-repeat="temperature in $ctrl.model[$ctrl.attribute]">
            <td>{{cloudcoverage.average}}</td>
            <td>{{cloudcoverage.unit}}</td>
            <td>{{cloudcoverage.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('temperaturepredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='temperaturepredictions_data'>
        <tr ng-repeat="temperaturepredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{temperaturepredictions.from}}</td>
            <td>{{temperaturepredictions.to}}</td>
            <td>{{temperaturepredictions.unit}}</td>
            <td>{{temperaturepredictions.time}}</td>
            <td>{{temperaturepredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('precipitationpredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Precipitation types</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='precipitationpredictions_data'>
        <tr ng-repeat="precipitationpredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{precipitationpredictions.from}}</td>
            <td>{{precipitationpredictions.to}}</td>
            <td>{{precipitationpredictions.precipitation_types}}</td>
            <td>{{precipitationpredictions.unit}}</td>
            <td>{{precipitationpredictions.time}}</td>
            <td>{{precipitationpredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('windspeedpredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Directions</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='windspeedpredictions_data'>
        <tr ng-repeat="windspeedpredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{windspeedpredictions.from}}</td>
            <td>{{windspeedpredictions.to}}</td>
            <td>{{windspeedpredictions.directions}}</td>
            <td>{{windspeedpredictions.unit}}</td>
            <td>{{windspeedpredictions.time}}</td>
            <td>{{windspeedpredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.component('cloudcoveragepredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='cloudcoveragepredictions_data'>
        <tr ng-repeat="cloudcoveragepredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{cloudcoveragepredictions.from}}</td>
            <td>{{cloudcoveragepredictions.to}}</td>
            <td>{{cloudcoveragepredictions.unit}}</td>
            <td>{{cloudcoveragepredictions.time}}</td>
            <td>{{cloudcoveragepredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
  }]
})

module.controller('WeatherReportController', function ($scope, $model, $http) {
  $scope.model = $model
  let aModel

  $http.get('http://localhost:8080/data')
    .then(({ data: data }) => {
      $http.get('http://localhost:8080/forecast')
        .then(({ data: forecast }) => {
          aModel = model(data, forecast, $scope.model.place, $scope.model.startDate, $scope.model.endDate, $scope.model.viewMode)
          updateViewModelFromModel($scope.model, aModel)
        })
    })
    .catch(console.err)

  $scope.updateModel = () => {
    let aModel = model($scope.model.historicals, $scope.model.predictions, $scope.model.place, $scope.model.startDate, $scope.model.endDate, $scope.model.viewMode)
    updateViewModelFromModel($scope.model, aModel)
  }

  $scope.refreshPredictions = () => {
    $http.get('http://localhost:8080/forecast')
      .then(({ data: forecast }) => {
        aModel = model($scope.model.historicals, forecast, $scope.model.place, $scope.model.startDate, $scope.model.endDate, $scope.model.viewMode)
        updateViewModelFromModel($scope.model, aModel)
      })
      .catch(console.err)
  }

  $scope.addHistoricalRecord = () => {
    console.log("adding record")
  }
})

function updateViewModelFromModel(model, newModel) {
  model.historicals = newModel.historicals
  model.predictions = newModel.predictions
  model.minTemperatures = newModel.minTemperatures
  model.maxTemperatures = newModel.maxTemperatures
  model.totalPrecipitations = newModel.totalPrecipitations
  model.avgWindSpeed = newModel.avgWindSpeed
  model.dominantWindDirection = newModel.dominantWindDirection
  model.avgCloudCoverage = newModel.avgCloudCoverage
  model.temperaturePredictions = newModel.temperaturePredictions
  model.precipitationPredictions = newModel.precipitationPredictions
  model.windSpeedPredictions = newModel.windSpeedPredictions
  model.cloudCoveragePredictions = newModel.cloudCoveragePredictions
}
