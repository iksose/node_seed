myApp.factory('wineFactory', function($http){
    return {
        getList: function() {
            return $http.get('../Apps', { 
                type : 'getSource',
                ID    : 'TP001'
            });
        },
        updateSeesions: function(){
        	return "Ha"
        },
        addApplication:function(obj){
            console.log("Add Application from Factory....", obj)
            return $http.put('../Apps/Insert', obj)
        },
        GetAppErrorRowsSinceLastRequest: function(obj, time){
            return $http.get("../errors/refresh/"+obj.AppName+
                "/"+obj.AppVersion+"/" + time)

        },
        getWines: function(){
            return $http.get("/wines")
        }
    };
});

myApp.controller("dbController" ,function ($scope, $state, wineFactory) {
    console.log("Hello from List Controller")
    
    $scope.wineList = [];

    wineFactory.getWines().success(handleSuccess)

    function handleSuccess(data, status){
        console.log(data, status)
        $scope.wineList = data;
    }

});