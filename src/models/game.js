import Block from '../models/block';
import Piece from '../models/piece';
import Converter from '../utilities/converter';

export default class Game {
    constructor(restService, $rootScope) {
        this._restService = restService;
        this._events = $rootScope.$new(true);
        this.currentPlayer = null;
        this.gameOver = null;
        this.inCheck = null;
        this.blocks = null;
        this.validMoves = [];
    }

    play() {
        return this._restService.startGame().then(this.processState.bind(this));
    }

    on(type, callback) {
        this._events.$on(type, callback);
    }

    trigger(type, data) {
        this._events.$emit(type, data);
    }

    processState(values) {
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

        this.currentPlayer = values.currentPlayer;
        this.gameOver = values.gameOver;
        this.inCheck = values.inCheck;
        this.blocks = blocks;

        this.getValidMoves().then(() => {
            this.trigger('data-updated', this.blocks);
        });
    }

    move(origin, destination) {
        let originConverted = Converter.fromIndexes(origin.coordinates[0], origin.coordinates[1]);
        let destinationConverted = Converter.fromIndexes(destination.coordinates[0], destination.coordinates[1]);
        return this._restService.move(originConverted, destinationConverted).then(this.processState.bind(this));
    }

    getValidMoves() {
        return this._restService.getValidMoves().then((values) => {
            this.validMoves = values.map((v) => {
                return {
                    origin: Converter.toIndexes(v.origin),
                    destination: Converter.toIndexes(v.destination)
                }
            });
        });
    }

    getValidMoveCoordinates(coordinates) {
        return this.validMoves.filter((data) => data.origin[1] === coordinates[0] && data.origin[0] === coordinates[1]);
    }

    isValidMove(origin, destination) {
        let moves = this.getValidMoveCoordinates(origin);
        let allowed = false;
        moves.forEach((move) => {
            if (move.destination[0] === destination.coordinates[0] && move.destination[1] === destination.coordinates[1]) {
                allowed = true;
            }
        });

        return allowed;
    }
}