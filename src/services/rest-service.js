import Game from '../models/game';

export default class RestService {
    constructor($http) {
        this.endpoint = 'http://localhost:8080';
        this._$http = $http;
    }

    getPositions() {
        return this._$http.get(`${this.endpoint}/api/chess`);
    }

    startGame() {
        return this._$http.post(`${this.endpoint}/api/chess`).then(() => {
            return this.getPositions();
        }).then(function (data) {
            return Game.init(data.data)
        });
    }
}