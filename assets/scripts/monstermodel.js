module.exports = function(playerModel) {
    var self = this;
    var util = require('./util');

    self.monsters = ko.observableArray([])
    self.totalXp = ko.pureComputed(function() {
        return parseInt(self.monsters().reduce(function(sum, monster, index, arr) {
            return sum + monster.totalXp();
        }, 0));
    });
    self.totalMonsters = ko.pureComputed(function() {
        return self.monsters().reduce(function(sum, monster, index, arr) {
            return sum + parseInt(monster.amount());
        }, 0);
    });
    self.multiplier = ko.pureComputed(function() {
        return util.monsterMultiplier(self.totalMonsters());
    });
    self.difficultyDistance = ko.pureComputed(function() {
        var totalDifficultyXp = self.totalXp() * self.multiplier();
        var difficulty = ((totalDifficultyXp / playerModel.xpBoundaries()[4]) * 100);
        difficulty = Math.min(100, Math.max(0, difficulty));
        return difficulty + '%';
    });
    
    self.addMonster = function() {
        var monster;
        self.monsters.push(monster = {
            level: ko.observable(1),
            amount: ko.observable(1),
            xpPerMonster: ko.pureComputed(function() {
                return parseInt(util.monsterXP(monster.level()));
            }),
            totalXp: ko.pureComputed(function() {
                return monster.xpPerMonster() * parseInt(monster.amount());
            })
        });
    };
    
    self.removeMonster = function(monster) {
        self.monsters.remove(monster);
    }
    
    self.addMonster();
}