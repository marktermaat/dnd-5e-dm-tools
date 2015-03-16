module.exports = function() {
    var self = this;
    var util = require('./util');
    
    self.players = ko.observableArray([]);
    self.levels = ko.pureComputed(function() {
        return self.players().map(function(player){
            return player.level()
        });
    });
    self.xpBoundaries = ko.pureComputed(function(){
        return util.encounterXpBoundaries(self.levels());
    });
 
    self.addPlayer = function() {
        self.players.push({
            name: ko.observable('player ' + self.players().length),
            level: ko.observable(1)
        })
    };
    
    self.removePlayer = function(player) {
        self.players.remove(player);
    }
    
    self.addPlayer();
}