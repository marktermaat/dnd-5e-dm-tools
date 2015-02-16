function PlayerModel() {
    var self = this;
    
    self.players = ko.observableArray([]);
    self.levels = ko.pureComputed(function() {
        return self.players().map(function(player){
            return player.level()
        });
    });
    self.xpBoundaries = ko.pureComputed(function(){
        return encounterXpBoundaries(self.levels());
    });
 
    self.addPlayer = function() {
        self.players.push({
            level: ko.observable(1)
        })
    };
    
    self.removePlayer = function() {
        self.players.pop();
    }
    
    self.addPlayer();
}