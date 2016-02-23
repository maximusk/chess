export default function indexController($scope, game) {
    var {assign} = Object;

    assign($scope, {
        activeBlock: null,
        game: null,
        move: (coordinates) => {
            if ($scope.game.isValidMove($scope.activeBlock, coordinates)) {
                $scope.game.move($scope.activeBlock, coordinates);
            }
        }
    });

    assign($scope, {
        render: () => {

        }
    });

    game.on('data-updated', (event, blocks) => {
        // first index denotes rows, second - column
        $scope.blocks = blocks;
    });

    game.play();

    /*setTimeout(function () {
     $scope.$apply(function () {
     debugger
     game.move($scope.blocks[1][2], $scope.blocks[1][4]);
     })
     }, 1000);*/

    //let valid = game.isValidMove($scope.blocks[1][2], $scope.blocks[1][4]);
    //let co = game.getValidMoveCoordinates($scope.blocks[1][2]);
}