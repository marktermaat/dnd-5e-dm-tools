var playerModel = require('./playermodel');
var monsterModel = require('./monstermodel');
var initiativeModel = require('./initiativemodel');

var players = new playerModel();
var monsters = new monsterModel(players);
var initiative = new initiativeModel(players);

ko.applyBindings(players, document.getElementById('players'));
ko.applyBindings(monsters, document.getElementById('monsters'));
ko.applyBindings(initiative, document.getElementById('initiative-tracker'));