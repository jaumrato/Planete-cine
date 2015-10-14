var app=angular.module("Application",["ngRoute"]);app.config(function($routeProvider){$routeProvider.when("/",{templateUrl:"templates/home.html",controller:"homeCtrl"}).when("/theaters",{templateUrl:"templates/theaters.html",controller:"theatersCtrl"}).when("/movies",{templateUrl:"templates/movies.html",controller:"moviesCtrl",resolve:{haveToRefresh:function(Model){return-1===Model.previousLocation.indexOf("/movieDetails/")}}}).when("/showtimes/:theaterCode",{templateUrl:"templates/showtimes.html",controller:"showtimesCtrl",resolve:{haveToRefresh:function(Model){return-1===Model.previousLocation.indexOf("/movieDetails/")},back:function(Model){return Model.previousLocation.indexOf("/movieDetails/")>-1?"#/":Model.previousLocation}}}).when("/showtimesByTheater/:searchMode/:movieCode",{templateUrl:"templates/showtimesByTheater.html",controller:"showtimesByTheaterCtrl"}).when("/movieDetails/:movieCode",{templateUrl:"templates/movieDetails.html",controller:"movieDetailsCtrl",resolve:{displayShowtimesButtons:function(Model){return-1===Model.previousLocation.indexOf("/showtimes/")},back:function(Model){return Model.previousLocation.indexOf("/showtimesByTheater/")>-1?"#/movies":Model.previousLocation}}}).otherwise({redirectTo:"/"})});
app.controller("homeCtrl",function($scope,Model){$scope.model=Model});
app.controller("mainCtrl",function($scope,Model,Service,$window){$scope.model=Model,$scope.$on("$locationChangeStart",function(event,current,previous){Model.previousLocation=previous}),$scope.online=navigator.onLine,$window.addEventListener("offline",function(){$scope.$apply(function(){$scope.online=!1})},!1),$window.addEventListener("online",function(){$scope.$apply(function(){$scope.online=!0})},!1),Service.getApiKey()});
app.controller("movieDetailsCtrl",function($scope,MovieDetails,Model,displayShowtimesButtons,back,$routeParams,$location,Loader,Notifier){$scope.model=Model,$scope.displayShowtimesButtons=displayShowtimesButtons,$scope.back=back,$scope.code=$routeParams.movieCode,$scope.getMovieDetails=function(){Loader.show("Chargement des informations"),MovieDetails.getMovieDetails($scope.code).then(MovieDetails.handleMovieDetails.bind(MovieDetails),function(err){Notifier.show({title:"Une erreur est survenue",message:"Impossible de récupérer les informations concernant ce film.",close:function(){$location.path($scope.back)},retry:$scope.getMovieDetails})})["finally"](function(){Loader.hide()})},$scope.getMovieDetails()});
app.controller("moviesCtrl",function($scope,Movies,Model,haveToRefresh,$location,Loader,Notifier){$scope.model=Model,$scope.getMoviesList=function(){Loader.show("Chargement des films"),Movies.getMoviesList().then(function(resp){Movies.handleMoviesList(resp.data.feed.movie)},function(err){Notifier.show({title:"Une erreur est survenue",message:"Impossible de récupérer la liste des films actuellement en salle.",close:$location.path.bind($location,"/#/"),retry:$scope.getMoviesList})})["finally"](function(){Loader.hide()})},haveToRefresh&&$scope.getMoviesList()});
app.controller("showtimesCtrl",function($scope,$routeParams,haveToRefresh,back,Service,Showtimes,Model,Loader,Notifier,$location){$scope.model=Model,$scope.back=back,$scope.isFavorite=Model.userSettings.favoriteTheaters.map(function(theater){return theater.code}).indexOf($routeParams.theaterCode)>-1,$scope.toggleFavorite=function(){if($scope.isFavorite){var index=Model.userSettings.favoriteTheaters.map(function(theater){return theater.code}).indexOf($routeParams.theaterCode);Model.userSettings.favoriteTheaters.splice(index,1)}else Model.userSettings.favoriteTheaters.push(Model.currentTheater);$scope.isFavorite=!$scope.isFavorite,Service.saveUserSettings()},$scope.getShowtimeList=function(){Loader.show("Chargement des séances"),Showtimes.getShowtimeList($routeParams.theaterCode).then(function(resp){Model.currentTheater=resp.data.feed.theaterShowtimes[0].place.theater,Showtimes.handleShowtimesList(resp.data.feed.theaterShowtimes[0].movieShowtimes||[])},function(err){Notifier.show({title:"Une erreur est survenue",message:"Impossible de récupérer la liste des séances de ce cinéma.",close:$location.path.bind($location,"/#/"),retry:$scope.getShowtimeList})})["finally"](function(){Loader.hide()})},haveToRefresh&&$scope.getShowtimeList($routeParams.theaterCode)});
app.controller("showtimesByTheaterCtrl",function($scope,$routeParams,Model,ShowtimesByTheater,$location,Loader,Notifier){$scope.model=Model,$scope.searchMode=$routeParams.searchMode,$scope.geolocationSearch=function(){try{navigator.geolocation.getCurrentPosition($scope.onSuccessGeolocation,$scope.onErrorGeolocation,Model.geolocationParams)}catch(err){$scope.onErrorGeolocation()}},$scope.onSuccessGeolocation=function(position){$scope.search($routeParams.movieCode,$routeParams.searchMode,position.coords)},$scope.onErrorGeolocation=function(){Notifier.show({title:"Activation du GPS",message:"La recherche géolocalisée nécessite l'activation du GPS.",close:function(){$location.path("movieDetails")},retry:$scope.geolocationSearch})},$scope.search=function(code,mode,position){Loader.show("Chargement des séances"),ShowtimesByTheater.getShowtimeList(code,mode,position).then(ShowtimesByTheater.handleShowtimesList.bind(ShowtimesByTheater),function(){Notifier.show({title:"Une erreur est survenue",message:"Impossible de récupérer la liste des séances correspondant à ce film.",close:function(){$location.path("movieDetails")},retry:$scope.search.bind($scope,code,mode,position)})})["finally"](function(){Loader.hide()})},"gps"===$routeParams.searchMode?$scope.geolocationSearch():"favorites"===$routeParams.searchMode&&$scope.search($routeParams.movieCode,$routeParams.searchMode,{})});
app.controller("theatersCtrl",function($scope,Model,Theaters,Loader,Notifier){$scope.model=Model,$scope.geolocationSearch=function(){try{navigator.geolocation.getCurrentPosition($scope.onSuccessGeolocation,$scope.onErrorGeolocation,Model.geolocationParams)}catch(err){$scope.onErrorGeolocation()}},$scope.onSuccessGeolocation=function(position){$scope.search("gps",position.coords)},$scope.onErrorGeolocation=function(){Notifier.show({title:"Activation du GPS",message:"La recherche géolocalisée nécessite l'activation du GPS.",retry:$scope.geolocationSearch})},$scope.onKeyPress=function(e){13===e.charCode&&$scope.search("text",Model.searchTheaterText)},$scope.search=function(mode,search){Loader.show("Chargement des cinémas"),Theaters.search(mode,search).then(function(resp){Theaters.handleTheatersList(resp.data.feed.theater)},function(err){Notifier.show({title:"Une erreur est survenue",message:"Impossible de récupérer la liste des cinémas correspondant à votre recherche.",retry:$scope.search.bind($scope,mode,search)})})["finally"](function(){Loader.hide()})}});
app.factory("Loader",function(Model){return{show:function(message){Model.loader.message=message,Model.loader.isVisible=!0},hide:function(){Model.loader.message="",Model.loader.isVisible=!1}}});
app.factory("Model",function(){return{BASE_URL:"http://api.allocine.fr/rest/v3",API_KEY:null,moviesShowtimesForATheater:null,movieDetails:null,movieShowtimesByTheaters:{},nowShowingMovies:null,previousLocation:"/#/",online:!1,loader:{isVisible:!1,message:"Chargement ..."},currentTheater:null,notifier:{isVisible:!1,title:"",message:"",onRetry:function(){},onClose:function(){}},userSettings:JSON.parse(localStorage.userSettings||JSON.stringify({favoriteTheaters:[]})),geolocationParams:{maximumAge:0,timeout:1e3,enableHighAccuracy:!0}}});
app.factory("MovieDetails",function($http,Model,Service){return{getMovieDetails:function(code){return $http.get(Model.BASE_URL+"/movie",Service.getParams({mediafmt:"mp4-lc",profile:"medium",code:code,striptags:"synopsis,synopsisshort"}))},handleMovieDetails:function(resp){Model.movieDetails=resp.data.movie,Model.movieDetails.trailer&&Model.movieDetails.trailer.code&&this.getTrailer(Model.movieDetails.trailer.code)},getTrailer:function(code){$http.get(Model.BASE_URL+"/media",Service.getParams({mediafmt:"mp4-lc",profile:"medium",code:code})).then(function(resp){try{Model.movieDetails.trailer.url=resp.data.media.rendition[0].href,resp.data.media.thumbnail&&resp.data.media.thumbnail.href&&(Model.movieDetails.trailer.thumbnail=resp.data.media.thumbnail.href)}catch(err){Model.movieDetails.trailer.url=void 0}})}}});
app.factory("Movies",function($http,Model,Service){return{getMoviesList:function(){return $http.get(Model.BASE_URL+"/movielist",Service.getParams({count:50,filter:"nowshowing",order:"toprank"}))},handleMoviesList:function(movies){Model.nowShowingMovies=movies.map(function(movie){return movie.poster&&movie.poster.href&&(movie.poster.href=movie.poster.href),movie})}}});
app.factory("Notifier",function(Model){return{reset:function(){Model.notifier.isVisible=!1,Model.notifier.title="",Model.notifier.message=""},show:function(o){Model.notifier.title=o.title||"",Model.notifier.message=o.message||"",Model.notifier.onRetry=function(){this.reset(),"function"==typeof o.retry&&o.retry()}.bind(this),Model.notifier.onClose=function(){this.reset(),"function"==typeof o.close&&o.close()}.bind(this),Model.notifier.isVisible=!0}}});
app.service("Service",function($http,Model){this.saveUserSettings=function(){localStorage.userSettings=angular.toJson(Model.userSettings)},this.getParams=function(o){return{params:angular.extend({partner:Model.API_KEY,format:"json"},o)}},this.getApiKey=function(){$http.get("https://dl.dropboxusercontent.com/u/54254237/key.json").then(function(resp){Model.API_KEY=resp.data.key},function(err){})},this.getShowtimeVersion=function(movie){var version="Français"===movie.version.$?"VF":"VOSTFR";return movie.screenFormat&&"3D"===movie.screenFormat.$&&(version+=" 3D"),version}});
app.factory("Showtimes",function($http,Model,Service){return{getShowtimeList:function(code){return $http.get(Model.BASE_URL+"/showtimelist",Service.getParams({profile:"medium",theaters:code}))},handleShowtimesList:function(movies){var out={};Model.showtimesDays=[],movies.forEach(function(movie){movie.scr.forEach(function(day){-1===Model.showtimesDays.indexOf(day.d)&&Model.showtimesDays.push(day.d),out[day.d]=out[day.d]||{},void 0===out[day.d][movie.onShow.movie.title]&&(movie.onShow.movie.poster=movie.onShow.movie.poster||{href:""},out[day.d][movie.onShow.movie.title]={showtimes:{},title:movie.onShow.movie.title,code:movie.onShow.movie.code,thumbnail:movie.onShow.movie.poster.href,runtime:movie.onShow.movie.runtime});var version=Service.getShowtimeVersion(movie);out[day.d][movie.onShow.movie.title].showtimes[version]=day.t})}),Model.showtimesDays.sort(),Model.currentDay=Model.showtimesDays[0],Model.moviesShowtimesForATheater=out}}});
app.factory("ShowtimesByTheater",function($http,Model,Service){return{getShowtimeList:function(movieCode,mode,position){var params={favorites:{count:30,movie:movieCode,theaters:Model.userSettings.favoriteTheaters.map(function(theater){return theater.code}).join(",")},gps:{count:30,movie:movieCode,radius:30,lat:position.latitude,"long":position.longitude}};return $http.get(Model.BASE_URL+"/showtimelist",Service.getParams(params[mode]))},handleShowtimesList:function(resp){var out={};Model.showtimesDays=[],resp.data.feed.theaterShowtimes.forEach(function(item){item.movieShowtimes=item.movieShowtimes||[],item.movieShowtimes.forEach(function(movie){movie.scr.forEach(function(day){-1===Model.showtimesDays.indexOf(day.d)&&Model.showtimesDays.push(day.d),out[day.d]=out[day.d]||{},void 0===out[day.d][item.place.theater.code]&&(out[day.d][item.place.theater.code]=item.place.theater,out[day.d][item.place.theater.code].showtimes={}),out[day.d][item.place.theater.code].showtimes[Service.getShowtimeVersion(movie)]=day.t})});for(var day in out){var theatersList=[];for(var code in out[day])theatersList.push(out[day][code]);out[day]=theatersList}Model.currentDay=Model.showtimesDays[0],Model.movieShowtimesByTheaters=out})}}});
app.factory("Theaters",function($http,Model,Service){return{search:function(mode,search){var params={text:{location:search,count:50},gps:{radius:30,count:50,lat:search.latitude,"long":search.longitude}};return $http.get(Model.BASE_URL+"/theaterlist",Service.getParams(params[mode]))},handleTheatersList:function(theaters){Model.theaters=theaters}}});
app.directive("autofocus",function(){return{restrict:"A",link:function($scope,elements){elements[0].focus()}}});
app.directive("loader",function(){return{restrict:"E",replace:!0,templateUrl:"templates/loader.html",controller:function($scope,Model){$scope.model=Model}}});
app.directive("notifier",function(){return{restrict:"E",replace:!0,templateUrl:"templates/notifier.html",controller:function($scope,Model){$scope.model=Model}}});
app.directive("videoPlayer",function(Model){return{restrict:"E",replace:!0,template:'<video controls="controls"></video>',link:function($scope,$elements,$controller,$attr){var video=$elements[0],source=document.createElement("source");source.src=Model.movieDetails.trailer.url,source.type="video/mp4",video.appendChild(source),Model.movieDetails.trailer.thumbnail&&(video.poster=Model.movieDetails.trailer.thumbnail.replace("/videothumbnails","/r_720_x/videothumbnails")),video.style.display="inline"}}});
app.filter("formatDay",function(){return function(input){return moment(input,"YYYY-MM-DD").format("dddd DD MMMM")}}).filter("formatRuntime",function(){return function(input){var hours=Math.floor(input/3600),minutes=Math.floor((input-3600*hours)/60);return 10>hours&&(hours="0"+hours),10>minutes&&(minutes="0"+minutes),hours+"h"+minutes}}).filter("formatRelease",function(){return function(input){return"Sortie en salle "+moment(input,"YYYY-MM-DD").fromNow()}}).filter("formatRating",function(){return function(input){return input>4.5?"★★★★★":input>3.5?"★★★★☆":input>2.5?"★★★☆☆":input>1.5?"★★☆☆☆":input>.5?"★☆☆☆☆":"☆☆☆☆☆"}}).filter("formatGenres",function(){return function(input){return input.map(function(genre){return genre.$}).join(", ")}}).filter("formatDistance",function(){return function(input){return input?1>input?1e3*input+" m":input.toFixed(2)+" km":"Distance inconnue"}}).filter("resizePoster",function(){return function(input,size){return input?input.replace("/pictures","/r_"+size+"_x/pictures"):""}}).filter("resizeTheaters",function(){return function(input,size){return input?(input=input.replace("/pictures","/r_"+size+"_x/pictures"),input=input.replace("/medias","/r_"+size+"_x/medias")):""}});