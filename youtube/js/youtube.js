angular.module('YouTube', ['ngResource']);

function YouTubeCtrl ($scope, $resource) {

    $scope.youtube = $resource('http://gdata.youtube.com/feeds/api/:action',
        {
            action:'videos', 
            q:'bachata', 
            format:'5', 
            fields:'entry(id,title,media:group(media:thumbnail,media:player))', 
            alt:'json', 
            callback:'JSON_CALLBACK'
        },
        {get: {method:'JSONP'}}
    );

    $scope.player = new YT.Player('ytplayer', {
        height: '390',
        width: '640',
        events: {
            'onReady': onPlayerReady
        }
    });

    $scope.playerReady = false;

    $scope.doSearch = function () {
        $scope.videos = [];
        $scope.player.stopVideo();

        $scope.youtube.get({q:$scope.searchTerm}, function (result) {            
            angular.forEach(result.feed.entry, function (video) {
                var videoId = video.id.$t.substring(video.id.$t.lastIndexOf('/')+1);
                $scope.videos.push(videoId);
            });
            if ($scope.playerReady) {
                $scope.player.loadPlaylist({playlist:$scope.videos});
            };
        });
   };

  function onPlayerReady () {
    $scope.playerReady = true;
  };
};


