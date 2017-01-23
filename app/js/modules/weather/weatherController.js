'use strict';

angular.module('weather')

.controller('weatherCtrl',
    function ($scope, weatherService) {
        // Openweathermap.org API key:
        // 6bfdd42cc8b00106162eeedf9ed7456b

        function getWeather() {
            var params = {
                id: '3067696', // Prague
                units: 'metric',
                appid: '6bfdd42cc8b00106162eeedf9ed7456b'
            }

            weatherService.getWeather(params).then(function(weatherData) {
                $scope.currentTemp = weatherData.main.temp;
                $scope.weather = weatherData.weather[0].main;
            }, function(error) {
                // ooops
            });
        };

        getWeather();
});