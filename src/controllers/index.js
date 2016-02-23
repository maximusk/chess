"use strict";
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
        highlightedCells: [],
        dragStart: (...params) => {
            let block = String(params[2]);
            let coordinates = block.split("").map((num) => {
                return Number(num);
            });
            let validCoordinates = game.getValidMoveCoordinates(coordinates);
            validCoordinates.forEach((co) => {
                $scope.highlightedCells.push(co.destination[0] + "" + co.destination[1]);
            });
            console.log($scope.highlightedCells);
            $scope.$digest();
        },
        dragStop: () => {
            $scope.highlightedCells = [];
            $scope.$digest();
        },
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
}