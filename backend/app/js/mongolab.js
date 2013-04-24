// This is a module for cloud persistence in mongolab.com
var mongo = angular.module('mongolab', ['ngResource']);

mongo.factory('Project', function ($resource) {

	var Project = $resource('https://api.mongolab.com/api/1/databases' +
          '/angularjs/collections/projects/:id',
          { apiKey: '2tAJ-CIssogfT683gTCqLNEOyDxy3ALA' },  
          { update: {method: 'PUT'} }
    );

    Project.prototype.update = function(cb) {
    	return Project.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };

    Project.prototype.destroy = function(cb) {
    	return Project.remove({id: this._id.$oid}, cb);
    };

    return Project;
})