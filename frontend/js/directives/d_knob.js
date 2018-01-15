angular.module('pms.directive')
.directive('knob',['$timeout', function ($timeout) {
return {
        restrict: 'EA',
        replace: true,
        template: '<input value="{{ knobData }}"/>',
        scope: {
            knobData: '=',
            knobMax: '=',
            knobReadonly: '=',
            knobOptions: '&',
        },
        link: function($scope, $element) {  
            // console.log('sdffdg');
                $scope.knobOptions = function(){
                  $scope.options = {
                  unit: "%",
                  readOnly: true,
                  subText: {
                    enabled: true,
                    text: 'Revenue',
                    color: 'gray',
                    font: 'auto'
                  },
                  trackWidth: 40,
                  barWidth: 25,
                  trackColor: '#656D7F',
                  barColor: '#2CC185'
                };
            }
            var knobInit = $scope.knobOptions() || { 'max': $scope.knobMax, 'readOnly': $scope.knobReadonly };
            // var knobInit = $scope.knobOptions() || { 'max': $scope.knobMax, 'readOnly': $scope.knobReadonly };

            knobInit.release = function(newValue) {
                $timeout(function() {
                    $scope.knobData = newValue;
                    $scope.$apply();
                }, 0, false);
            };

            $scope.$watch('knobData', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    $($element).val(newValue).change();
                }
            });

            $scope.$watch('knobMax', function (newValue) {
                $scope.knobMax = newValue;
            });

            $scope.$watch('knobReadonly', function (newValue) {
                $scope.knobReadonly = newValue;
            });

            $($element).val($scope.knobData).knob(knobInit);
        }
    };
}]);
