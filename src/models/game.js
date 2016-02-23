import Block from '../models/block';
import Piece from '../models/piece';
import Converter from '../utilities/converter';

export default class Game {
    constructor(currentPlayer, gameOver, inCheck, blocks) {
        this.currentPlayer = currentPlayer;
        this.gameOver = gameOver;
        this.inCheck = inCheck;
        this.blocks = blocks;
    }

    static init(values) {
        let blocks = [];
        for (let i = 1; i < 9; i++) {
            blocks[i] = [];
            for (let j = 1; j < 9; j++) {
                blocks[i][j] = new Block([i, j]);
            }
        }

        for (var position in values.positionToPieces) {
            let coordinates = Converter.toIndexes(position);
            let data = values.positionToPieces[position];
            let piece = new Piece(data.owner, data.type);
            blocks[coordinates[0]][coordinates[1]] = new Block(coordinates, piece);
        }

        return new Game(values.currentPlayer, values.gameOver, values.inCheck, blocks);
    }
}