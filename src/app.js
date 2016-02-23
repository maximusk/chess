// quick fix for angularDragDrop window.jQuery dependency
window.jQuery = require("jquery");
require("jqueryUi");
require("angular");
require("angularDragDrop");

// models
import Game from './models/game';
import Piece from './models/piece';
import Player from './models/player';

// directives
import boardDrawer from './directives/board-drawer';

// controllers
import indexController from './controllers/index.js';

// services
import RestService from './services/rest-service';

// services
angular.module('main', ['ngDragDrop'])
    .directive('boardDrawer', boardDrawer)
    .controller('indexController', indexController)
    .service('game', Game)
    .service('restService', RestService);