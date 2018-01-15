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

angular.module('pms.directive')
.directive('scrollableTable',["$timeout", function($timeout){


  var link =   function(scope,elem,attrs){

    var root_elem   =   $(elem);

    //Give Id to all the elem and Head
    var table   =   $(elem).find('table');

    // console.log($(elem).find('table'));
    var max_index_count   =   0;

    var table_head  =   $(table).find('thead tr');
    $.each(table_head,function(){
        var me    =   this;
        var count      =  1;
        var not_fixed   =   $(me).find('th:not([fixed])');
        $.each(not_fixed,function(){
          $(this).attr('index-count',count);
          count++;
        });
        if(count > max_index_count){
          max_index_count   =   count;
        }
    });

    //hinding the index > coulm count
    var coulumn_count   = 10;
    if(attrs.columncount != undefined){
      coulumn_count   =   attrs.columncount;
    }
    var offset = 0;
    var last_offset   =   max_index_count-coulumn_count;
    // console.log(scope.tabledata);
    $(elem).prepend('<div class="text-right"><div class="btn-group nex_vid" style="margin-bottom:5px;" offset="'+offset+'">'+
          '<button type="button" class="btn btn-default prev" style="width:80px;display:none;" disabled> <i class="fa fa-chevron-left" aria-hidden="true"></i> Previous</button>'+
          '<button type="button" class="btn btn-default next" style="width:80px;display:none;">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></button>'+
          '</div></div>');

    scope.$watch('tabledata',function(){
      $timeout(function(){
        var table_body_root  =   $(table).find('tbody');
        // console.log(table);
        $.each(table_body_root,function(){
          var tb  =   this;
          var table_body    = $(tb).find('tr');
          $.each(table_body,function(){
            // console.log(this);
              var me    =   this;
              var count      =  1;
              var not_fixed   =   $(me).find('td:not([fixed]),th:not([fixed])');
              // console.log(not_fixed);
              $.each(not_fixed,function(){
                $(this).attr('index-count',count);
                count++;
              });
              if(count > max_index_count){
                max_index_count   =   count;
              }
          });
        });


        var tables_index  =   $(elem).find('table td[index-count],table th[index-count]');



        $.each(tables_index,function(){
          var index_attr  =   $(this).attr('index-count');
          if(parseInt(index_attr) <= coulumn_count){
              $(this).css('display','table-cell');
          } else {
            $(this).css('display','none');
          }
        });
        // console.log(coulumn_count);


        last_offset   =   max_index_count-coulumn_count;
        if(last_offset <= 0){
          $(elem).find('.nex_vid .next').prop('disabled','disabled');
        } else {
          $(elem).find('.nex_vid .next').removeProp('disabled');
        }
      },100);
    });

    function  updateOffset(new_offset){
      console.log(new_offset);
      var tables_index  =   $(elem).find('table td[index-count],table th[index-count]');

      $.each(tables_index,function(){
        var index_attr  =   $(this).attr('index-count');

        if(parseInt(index_attr) >= (parseInt(new_offset)+1) && parseInt(index_attr) <= (parseInt(new_offset)+1 + parseInt(coulumn_count))){
            $(this).css('display','table-cell');
        } else {
            $(this).css('display','none');
        }
      });

      var last_offset   =   max_index_count-coulumn_count;
      if(new_offset == 0){
        $(elem).find('.nex_vid .prev').prop('disabled','disabled');
      } else {
        $(elem).find('.nex_vid .prev').prop('disabled',false);
      }

      if(new_offset == last_offset){
        $(elem).find('.nex_vid .next').prop('disabled','disabled');
      } else {
        $(elem).find('.nex_vid .next').prop('disabled',false);
      }

    }

    $(elem).find('.nex_vid .next').click(function(){
      offset  =   offset+1;
      if(offset > last_offset){
        offset  =   last_offset;
      }
      updateOffset(offset);
    });

    $(elem).find('.nex_vid .prev').click(function(){
      offset  =   offset-1;
      if(offset < 0){
        offset  =   0;
      }
      updateOffset(offset);
    });
  };

  return {
    scope:{
      'tabledata':'=tabledata'
    },
    link:link
  }
}]);
