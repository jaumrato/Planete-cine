var app=angular.module("Application",["ngRoute"]);app.config(function($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"templates/home.html",controller:"homeCtrl"}).when("/theaters",{templateUrl:"templates/theaters.html",controller:"theatersCtrl"}).when("/movies",{templateUrl:"templates/movies.html",controller:"moviesCtrl"}).when("/showtimes/:theaterCode",{templateUrl:"templates/showtimes.html",controller:"showtimesCtrl"}).when("/showtimesByTheater/:movieCode",{templateUrl:"templates/showtimesByTheater.html",controller:"showtimesByTheaterCtrl"}).when("/movieDetails/:movieCode",{templateUrl:"templates/movieDetails.html",controller:"movieDetailsCtrl"}).otherwise({redirectTo:"/"})}),getConnection=function(){var connection;return connection=0==navigator.connection.type||"none"==navigator.connection.type?!1:!0},window.addEventListener("load",function(){angular.bootstrap(document.body,["Application"])},!1);
app.controller("homeCtrl",function($scope,Service){$scope.model=Service.model,$scope.state="home",$scope.model.previousView="home",$scope.setCurrentTheater=function(theater){Service.setCurrentTheater(theater)}});
app.controller("movieDetailsCtrl",function($scope,Service,$routeParams){$scope.model=Service.model,$scope.state="movie-details",$scope.model.previousView="movieDetails",Service.getMovieDetails()});
app.controller("moviesCtrl",function($scope,Service){$scope.model=Service.model,$scope.state="movies","showtimesByTheater"!==$scope.model.previousView&&Service.getNowShowingMovies(),$scope.model.previousView="movies"});
app.controller("showtimesCtrl",function($scope,$routeParams,Service){$scope.model=Service.model,"movieDetails"!==$scope.model.previousView&&Service.getShowtimeList($routeParams.theaterCode),$scope.isFavoriteTheater=function(){var out=!1;return $scope.model.userSettings.favoriteTheaters.forEach(function(theater){theater.code===$routeParams.theaterCode&&(out=!0)}),out},$scope.addInFavoriteTheaters=function(){$scope.model.userSettings.favoriteTheaters.push($scope.model.currentTheater),Service.saveUserSettings()},$scope.nextDay=function(){$scope.model.currentDay+=1},$scope.prevDay=function(){$scope.model.currentDay-=1},$scope.removeFromFavoriteTheaters=function(){$scope.model.userSettings.favoriteTheaters.forEach(function(theater,index){theater.code===$routeParams.theaterCode&&$scope.model.userSettings.favoriteTheaters.splice(index,1)}),Service.saveUserSettings()}});
app.controller("showtimesByTheaterCtrl",function($scope,$routeParams,Service){$scope.model=Service.model,$scope.model.movieShowtimesByTheaters={},$scope.model.previousView="showtimesByTheater",$scope.getShowtimesListForAMovie=function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition?navigator.geolocation.getCurrentPosition($scope.onSuccessGeolocation,$scope.onErrorGeolocation,{maximumAge:0,timeout:1e3,enableHighAccuracy:!0}):$scope.onErrorGeolocation()},$scope.onSuccessGeolocation=function(position){$scope.model.position={latitude:position.coords.latitude,longitude:position.coords.longitude},Service.getShowtimesListForAMovie($routeParams.movieCode)},$scope.onErrorGeolocation=function(){var message="L'activation du GPS est nécessaire afin de trouver les cinémas proposant ce film autour de vous.",title="Activation du GPS",buttonLabels=["Réessayer","Annuler"];navigator.notification.confirm(message,function(index){1===index&&$scope.getShowtimesListForAMovie()},title,buttonLabels)},$scope.nextDay=function(){$scope.model.currentDay+=1},$scope.prevDay=function(){$scope.model.currentDay-=1},$scope.getShowtimesListForAMovie()});
app.controller("theatersCtrl",function($scope,Service){$scope.model=Service.model,$scope.model.previousView="theaters",$scope.state="theaters",$scope.launchTheaterSearchByGeolocation=function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition?navigator.geolocation.getCurrentPosition($scope.onSuccessGeolocation,$scope.onErrorGeolocation,{maximumAge:0,timeout:1e3,enableHighAccuracy:!0}):$scope.onErrorGeolocation()},$scope.onSuccessGeolocation=function(position){$scope.model.position={latitude:position.coords.latitude,longitude:position.coords.longitude},Service.getTheatersByGeolocation()},$scope.onErrorGeolocation=function(){var message="La recherche géolocalisée nécessite l'activation du GPS.",title="Activation du GPS",buttonLabels=["Réessayer","Annuler"];navigator.notification.confirm(message,function(index){1===index&&$scope.launchTheaterSearchByGeolocation()},title,buttonLabels)},$scope.onKeyPress=function(e){13===e.charCode&&Service.getTheaters()},$scope.launchTheaterSearch=function(){Service.getTheaters()}});
app.service("Service",function($http,$routeParams){this.baseURL="http://api.allocine.fr/rest/v3",this.saveUserSettings=function(){localStorage.userSettings=angular.toJson(this.model.userSettings)},this.showLoader=function(message){this.model.loader.message=message,this.model.loader.status=!0},this.hideLoader=function(){this.model.loader.message="",this.model.loader.status=!1},this.getMovieDetails=function(){return this.showLoader("Chargement des informations"),$http.get(this.baseURL+"/movie",{params:{partner:"YW5kcm9pZC12M3M",format:"json",mediafmt:"mp4-lc",profile:"medium",code:$routeParams.movieCode,striptags:"synopsis,synopsisshort"}}).then(function(resp){resp.data.movie.helpfulPositiveReview=resp.data.movie.helpfulPositiveReview||[],resp.data.movie.helpfulNegativeReview=resp.data.movie.helpfulNegativeReview||[],this.model.movieDetails.synopsis=resp.data.movie.synopsis,this.model.movieDetails.castMember=resp.data.movie.castMember,this.model.movieDetails.positiveReview=resp.data.movie.helpfulPositiveReview[0],this.model.movieDetails.negativeReview=resp.data.movie.helpfulNegativeReview[0],this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getTrailer=function(){return $http.get(this.baseURL+"/media",{params:{partner:"YW5kcm9pZC12M3M",format:"json",mediafmt:"mp4-lc",profile:"medium",code:this.model.movieDetails.trailer.code}}).then(function(resp){resp.data.media&&(this.model.movieDetails.trailer.url=resp.data.media.rendition[0].href)}.bind(this),function(){})},this.getTheatersByGeolocation=function(){this.showLoader("Chargement des cinémas"),$http.get(this.baseURL+"/theaterlist",{params:{partner:"YW5kcm9pZC12M3M",format:"json",radius:30,lat:this.model.position.latitude,"long":this.model.position.longitude,count:30}}).then(function(resp){this.model.theaters=resp.data.feed.theater,this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getTheaters=function(){this.showLoader("Chargement des cinémas"),$http.get(this.baseURL+"/theaterlist",{params:{partner:"YW5kcm9pZC12M3M",format:"json",count:30,location:this.model.searchTheaterText}}).then(function(resp){this.model.theaters=resp.data.feed.theater,this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getShowtimesListForAMovie=function(code){this.showLoader("Chargement des séances"),$http.get(this.baseURL+"/showtimelist",{params:{partner:"YW5kcm9pZC12M3M",format:"json",radius:30,count:30,lat:this.model.position.latitude,"long":this.model.position.longitude,movie:code}}).then(function(resp){this.handleMovieShowtimesListByTheaters(resp.data.feed.theaterShowtimes),this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getNowShowingMovies=function(){this.showLoader("Chargement des films"),$http.get(this.baseURL+"/movielist",{params:{partner:"YW5kcm9pZC12M3M",format:"json",count:50,filter:"nowshowing",order:"toprank"}}).then(function(resp){this.model.nowShowingMovies=resp.data.feed.movie.map(function(movie){return movie.poster&&movie.poster.href&&(movie.poster.href=movie.poster.href.replace("/pictures","/r_60_x/pictures")),movie}),this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getShowtimeList=function(code){this.showLoader("Chargement des séances"),$http.get(this.baseURL+"/showtimelist",{params:{partner:"YW5kcm9pZC12M3M",profile:"medium",format:"json",theaters:code}}).then(function(resp){this.model.currentTheater=resp.data.feed.theaterShowtimes[0].place.theater,this.handleShowtimesList(resp.data.feed.theaterShowtimes[0].movieShowtimes),this.hideLoader()}.bind(this),function(){this.hideLoader()}.bind(this))},this.getShowtimeVersion=function(movie){var version="Français"===movie.version.$?"VF":"VOSTFR";return movie.screenFormat&&"3D"===movie.screenFormat.$&&(version+=" 3D"),version},this.handleMovieShowtimesListByTheaters=function(theaters){var out={};this.model.currentDay=0,this.model.showtimesDays=[],theaters.forEach(function(item){item.movieShowtimes.forEach(function(movie){movie.scr.forEach(function(day){-1===this.model.showtimesDays.indexOf(day.d)&&this.model.showtimesDays.push(day.d),out[day.d]=out[day.d]||{},void 0===out[day.d][item.place.theater.code]&&(out[day.d][item.place.theater.code]=item.place.theater,out[day.d][item.place.theater.code].showtimes={}),out[day.d][item.place.theater.code].showtimes[this.getShowtimeVersion(movie)]=day.t}.bind(this))}.bind(this));for(var day in out){var theatersList=[];for(var code in out[day])theatersList.push(out[day][code]);out[day]=theatersList}this.model.movieShowtimesByTheaters=out}.bind(this))},this.handleShowtimesList=function(movies){var out={};this.model.currentDay=0,this.model.showtimesDays=[],movies.forEach(function(movie){movie.scr.forEach(function(day){-1===this.model.showtimesDays.indexOf(day.d)&&this.model.showtimesDays.push(day.d),out[day.d]=out[day.d]||{},void 0===out[day.d][movie.onShow.movie.title]&&(movie.onShow.movie.poster=movie.onShow.movie.poster||{},movie.onShow.movie.trailer=movie.onShow.movie.trailer||{},out[day.d][movie.onShow.movie.title]={showtimes:{},title:movie.onShow.movie.title,casting:movie.onShow.movie.castingShort,code:movie.onShow.movie.code,genres:movie.onShow.movie.genre,thumbnail:movie.onShow.movie.poster.href.replace("/pictures","/r_60_x/pictures"),runtime:movie.onShow.movie.runtime,ratings:movie.onShow.movie.statistics,trailer:movie.onShow.movie.trailer});var version=this.getShowtimeVersion(movie);out[day.d][movie.onShow.movie.title].showtimes[version]=day.t}.bind(this))}.bind(this)),this.model.showtimesDays.sort(),this.model.moviesShowtimesForATheater=out},localStorage.userSettings=localStorage.userSettings||JSON.stringify({favoriteTheaters:[]}),this.model={moviesShowtimesForATheater:null,movieDetails:{},loader:{status:!1,messsage:""},userSettings:JSON.parse(localStorage.userSettings)}});
app.directive("autofocus",function(){return{restrict:"A",link:function($scope,elements){elements[0].focus()}}});
app.directive("loader",function(){return{restrict:"E",replace:!0,templateUrl:"templates/loader.html",controller:function($scope,Service){$scope.model=Service.model}}});
app.directive("videoPlayer",function(Service){return{restrict:"E",replace:!0,template:'<video controls="controls"></video>',link:function($scope,$elements,$controller,$attr){Service.getTrailer().then(function(){var video=$elements[0],source=document.createElement("source");source.src=$scope.model.movieDetails.trailer.url,source.type="video/mp4",video.appendChild(source),video.addEventListener("canplay",function(){video.style.display="inline"})})}}});
app.filter("formatDay",function(){return function(input){return moment(input,"YYYY-MM-DD").format("ddd DD MMM")}}).filter("formatRuntime",function(){return function(input){if(!input)return"Durée inconnue";var hours=Math.floor(input/3600),minutes=Math.floor((input-3600*hours)/60);return 10>hours&&(hours="0"+hours),10>minutes&&(minutes="0"+minutes),hours+"h"+minutes}}).filter("formatRelease",function(){return function(input){return"Sortie en salle "+moment(input,"YYYY-MM-DD").fromNow()}}).filter("formatRating",function(){return function(input){return input>4.5?"★★★★★":input>3.5?"★★★★☆":input>2.5?"★★★☆☆":input>1.5?"★★☆☆☆":input>.5?"★☆☆☆☆":"☆☆☆☆☆"}}).filter("formatGenres",function(){return function(input){return input.map(function(genre){return genre.$}).join(", ")}}).filter("formatDistance",function(){return function(input){return 1>input?1e3*input+" m":input.toFixed(2)+" km"}});