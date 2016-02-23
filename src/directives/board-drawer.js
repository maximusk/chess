export default function () {
    return {
        scope: {
            blocks: "=bdBlocks"
        },
        link: (scope, element) => {
            scope.$watch("blocks", function (blocks) {
                if (blocks !== undefined) {
                    element.empty();
                    draw();
                }
            });

            function draw() {
                for (var i = 1; i < 9; i++) {
                    let wrapper = angular.element("<div class='wrapper'></div>");
                    for (var j = 1; j < 9; j++) {
                        let block = scope.blocks[j][i];
                        let div;
                        let color = (i + j) % 2 === 0 ? 'white' : 'black';
                        if (block.piece !== null) {
                            let pieceClass = `piece-type-${block.piece.type}-${block.piece.owner.toLowerCase()}`;
                            div = `<div class='cell ${color} ${pieceClass}'></div>`;
                        } else {
                            div = `<div class='cell ${color}'></div>`;
                        }
                        wrapper.append(div);
                    }
                    element.append(wrapper);
                }
            }
        }
    }
}