angular.module('pms.directive')
.directive('noScrollbar', ['$rootScope',
      function ($rootScope) {  

        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                // Get scrollbar width if necessary
                if (!$rootScope.scrollbarWidth) {
                    var scrollDiv = document.createElement("div");
                    scrollDiv.className = "scrollbar-measurer";
                    document.body.appendChild(scrollDiv);
                    $rootScope.scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    document.body.removeChild(scrollDiv);
                }

                // Add padding to the right side
                element.css('padding-right', parseInt(element.css('padding-right')) + $rootScope.scrollbarWidth);
            }
        };

      }
    ]);
