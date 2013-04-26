angular.module('YouTube', ['ngResource']);

function YouTubeCtrl ($scope, $resource) {

    $scope.youtube = $resource('http://gdata.youtube.com/feeds/api/:action',
        {action:'videos', q:'bachata', format:'5', fields:'entry(id,title,media:group(media:thumbnail,media:player))', alt:'json', callback:'JSON_CALLBACK'},
        {get: {method:'JSONP'}}
    );

    $scope.doSearch = function () {
        // $scope.youtubeResult = $scope.youtube.get({q:$scope.searchTerm});
         
        $scope.videos = [];
        $scope.youtube.get({q:$scope.searchTerm}, function (result) {
            angular.forEach(result.feed.entry, function (video) {
                var videoId = video.id.$t.substring(video.id.$t.lastIndexOf('/')+1);
                $scope.videos.push(videoId);
            });
        });

        $scope.player = new YT.Player('ytplayer', {
            height: '390',
            width: '640',
            events: {
                'onReady': onPlayerReady
            }
        });
    };

  function onPlayerReady () {
      // $scope.player.loadPlaylist({list:'PLDU66RN0jeSpHdIcFvAVozv6j1OiEiis5'})
      $scope.player.loadPlaylist({playlist:$scope.videos})
  }
};


