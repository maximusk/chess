export default function indexController($scope, restService) {
    var {assign} = Object;

    assign($scope, {
        game: null
    });

    assign($scope, {
        render: () => {

        }
    });


    restService.startGame().then((game) => {
        $scope.game = game;
    });
}