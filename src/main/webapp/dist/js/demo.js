var app = angular.module("demo",[]);

app.factory('restService', function($http) {
       
    var baseUrl = 'http://localhost:8080/NBCourse/';
    
    return {
          getLoads: function() {
              return $http.get(baseUrl + 'api/course');
          },
          deleteItem: function(item) {
            return $http.delete(baseUrl + 'api/course/' +item.id);
          },
          addItem: function(item) {
              var id = item.id +5;
              return $http.post(baseUrl + 'api/course/',{"id":id ,"name":item.name,"duratrion": item.duratrion,"fee": item.fee});
                
          }
        };
    
    
});



app.controller('DemoCtrl', function($scope,restService){
    
    $scope.show = false;
    init();
    function init()
    {
        restService.getLoads().success(function(data){
           $scope.items = data; 
        });
    }
    
    
    $scope.deleteItem = function(item)
    {
        restService.deleteItem(item).success(function(data)
        {
            $scope.items = data; 
            init();
        });
    }
    
    
    $scope.createItem = function(item)
    {
          // console.log(item);
           
        
           
        restService.addItem(item).success(function(data){
        
                $scope.items = data;
                init();
        });
    }
    
    $scope.addItem = function()
    {
         $scope.show =! $scope.show;  
    }
    
    
    
    
});
