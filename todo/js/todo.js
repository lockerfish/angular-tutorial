var myApp = angular.module('myApp', []);

myApp.controller('TodoController', function ($scope, checkArrayService) {
    $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}
    ];

    $scope.getTotalTodos = function () {
        return $scope.todos.length;
    };

    $scope.addTodo = function () {
        var todoText = $scope.todoText;
        var duplicate = checkArrayService.contain($scope.todos, todoText);

        if (duplicate) {
            $scope.form.todo.$setValidity('duplicate', false);
        };

        if (todoText && !duplicate) {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
            $scope.form.todo.$setValidity('duplicate', true);
        };
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
});

myApp.service('checkArrayService', function () { 
    this.contain = function (array, value) {
        var duplicate = false;
        angular.forEach(array, function(todo) { 
            if (value === todo.text) {
                duplicate = true;
            };
        });
        return duplicate;
    };
});
