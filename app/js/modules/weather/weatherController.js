'use strict';

angular.module('weather')

.controller('weatherCtrl',
    function ($scope, $timeout, $state, weatherService) {
        // Openweathermap.org API key:
        // 6bfdd42cc8b00106162eeedf9ed7456b

        function getWeather(locationInfo, coordinates) {
            var params = {
                units: 'metric',
                appid: '6bfdd42cc8b00106162eeedf9ed7456b'
            }

            if(coordinates) {
                params.lat = locationInfo.lat;
                params.lon = locationInfo.lon;
                $scope.city = locationInfo.name;
            }
            else {
                params.q = locationInfo;
                $scope.city = locationInfo;
            }

            weatherService.getWeather(params).then(function(weatherData) {
                $scope.currentTemp = weatherData.main.temp;
                $scope.weather = weatherData.weather[0].main;

                $scope.test = weatherData;
            }, function(error) {
                // ooops
            });
        };

        if($scope.random) {
            getWeather(weatherService.getRandomLocation(), $scope.random);
        }
        else {
            getWeather($scope.city);
        }

        // $timeout(function() {
        //     $state.go('app.hof');
        // }, 3000);
});