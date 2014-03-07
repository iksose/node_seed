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
        },
        getMovies: function(){
            return $http.get("/movies")
        },
        saveMovie: function(obj){
            return $http.post("/movies", obj)
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


    //MOVIES on MONGOOSE :

    $scope.movieList = [];

    wineFactory.getMovies().success(handleSuccess2)

    function handleSuccess2(data, status){
        console.log(data, status)
        $scope.movieList = data;
    }

    $scope.movieModel = {
        title: "",
        rating: "XXX"
    }
    $scope.AddMovie = function(){
        console.log("ADDING", $scope.movieModel )
        wineFactory.saveMovie($scope.movieModel).
            success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("SUCCESS", status, data.error)
            }).
            error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("ERROR", status, data.ErrorMsg)
            });
    }
    

});