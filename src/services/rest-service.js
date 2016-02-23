import Game from '../models/game';

export default class RestService {
    constructor($http) {
        this.remote = 'http://localhost:8080';
        this._$http = $http;
    }

    getPositions() {
        return this._$http.get(`${this.remote}/api/chess`);
    }

    move(origin, destination) {
        let data = {origin, destination};
        return this._$http.post(`${this.remote}/api/chess/moves`, data).then((data) => data.data);
    }

    getValidMoves() {
        return this._$http.get(`${this.remote}/api/chess/moves`).then((data) => data.data);
    }

    startGame() {
        return this._$http.post(`${this.remote}/api/chess`).then(() => this.getPositions()).then((data)=> data.data);
    }
}