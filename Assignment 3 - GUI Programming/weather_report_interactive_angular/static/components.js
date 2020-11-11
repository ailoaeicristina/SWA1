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
    console.log("Look here", $model)
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
    console.log("Look here", $model)
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
    console.log("Look here", $model)
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
    console.log("Look here", $model)
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
    console.log("Look here", $model)
  }]
})

module.component('temperaturepredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='temperaturepredictions_data'>
        <tr ng-repeat="temperaturepredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{temperaturepredictions.from}}</td>
            <td>{{temperaturepredictions.to}}</td>
            <td>{{temperaturepredictions.type}}</td>
            <td>{{temperaturepredictions.unit}}</td>
            <td>{{temperaturepredictions.time}}</td>
            <td>{{temperaturepredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
    console.log("Look here", $model)
  }]
})

module.component('precipitationpredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Precipitation types</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='precipitationpredictions_data'>
        <tr ng-repeat="precipitationpredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{precipitationpredictions.from}}</td>
            <td>{{precipitationpredictions.to}}</td>
            <td>{{precipitationpredictions.precipitation_types}}</td>
            <td>{{precipitationpredictions.type}}</td>
            <td>{{precipitationpredictions.unit}}</td>
            <td>{{precipitationpredictions.time}}</td>
            <td>{{precipitationpredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
    console.log("Look here", $model)
  }]
})

module.component('windspeedpredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Directions</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='windspeedpredictions_data'>
        <tr ng-repeat="windspeedpredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{windspeedpredictions.from}}</td>
            <td>{{windspeedpredictions.to}}</td>
            <td>{{windspeedpredictions.directions}}</td>
            <td>{{windspeedpredictions.type}}</td>
            <td>{{windspeedpredictions.unit}}</td>
            <td>{{windspeedpredictions.time}}</td>
            <td>{{windspeedpredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
    console.log("Look here", $model)
  }]
})

module.component('cloudcoveragepredictionsTable', {
  bindings: { attribute: '@' },
  template: `<table>
    <thead><tr><td>From</td><td>To</td><td>Type</td><td>Unit</td><td>Time</td><td>Place</td></tr></thead>
    <tbody id='cloudcoveragepredictions_data'>
        <tr ng-repeat="cloudcoveragepredictions in $ctrl.model[$ctrl.attribute]">
            <td>{{cloudcoveragepredictions.from}}</td>
            <td>{{cloudcoveragepredictions.to}}</td>
            <td>{{cloudcoveragepredictions.type}}</td>
            <td>{{cloudcoveragepredictions.unit}}</td>
            <td>{{cloudcoveragepredictions.time}}</td>
            <td>{{cloudcoveragepredictions.place}}</td>
        </tr>
    </tbody>
  </table>`,
  controller: ['$model', '$scope', function ($model, $scope) {
    this.model = $model
    console.log("Look here", $model)
  }]
})

module.controller('WeatherReportController', function ($scope, $model, $http) {
  $scope.model = $model
  console.log($scope.model)
  let aModel
  $http.get('http://localhost:8080/data')
    .then(({ data: data }) => {
      $http.get('http://localhost:8080/forecast')
        .then(({ data: forecast }) => {
          aModel = model(data, forecast, $scope.model.place, $scope.model.startDate, $scope.model.endDate, $scope.model.viewMode)
          $scope.model.historicals = aModel.historicals
          $scope.model.predictions = aModel.predictions
          $scope.model.minTemperatures = aModel.minTemperatures
          $scope.model.maxTemperatures = aModel.maxTemperatures
          $scope.model.totalPrecipitations = aModel.totalPrecipitations
          $scope.model.avgWindSpeed = aModel.avgWindSpeed
          $scope.model.dominantWindDirection = aModel.dominantWindDirection
          $scope.model.avgCloudCoverage = aModel.avgCloudCoverage
          $scope.model.temperaturePredictions = aModel.temperaturePredictions
          $scope.model.precipitationPredictions = aModel.precipitationPredictions
          $scope.model.windspeedPredictions = aModel.windspeedPredictions
          $scope.model.cloudcoveragePredictions = aModel.cloudcoveragePredictions
        })
    })
    .catch(console.err)
  console.log($scope.model)
})
