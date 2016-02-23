export default class Block {
    constructor(coordinates, piece = null) {
        this.x = coordinates[0];
        this.y = coordinates[1];
        this.piece = piece;
    }
}