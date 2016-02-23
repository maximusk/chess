export default function ($compile) {
    return {
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
                            // passing coordinates as joined string to avoid angular expression parsing errors
                            let coordinates = [i, j].join("");
                            let span = `<span data-drag="true" jqyoui-draggable="{onStart:'dragStart(${coordinates})', onStop:'dragStop()'}" class="${pieceClass}"></span>`;
                            div = `<div ng-class="{'path-cell': highlightedCells.indexOf('${[j, i].join("")}') !== -1}" class='cell ${color}'>${span}</div>`;
                        } else {
                            div = `<div ng-class="{'path-cell': highlightedCells.indexOf('${[j, i].join("")}') !== -1}" class='cell ${color}'></div>`;
                        }
                        wrapper.append(div);
                    }
                    element.append(wrapper);
                }
                $compile(element.contents())(scope);
            }
        }
    }
}