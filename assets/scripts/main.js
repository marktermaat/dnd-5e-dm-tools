var monsterXP = function(monsterLevel) {
    xpPerLevel = {'1/8': 25, '1/4': 50, '1/2': 100, 1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900};
    return xpPerLevel[monsterLevel];
}

var monsterMultiplier = function(nrMonsters) {
    switch(nrMonsters) {
        case 1:
            return 1;
        case 2:
            return 1.5;
        case 3: case 4: case 5: case 6:
            return 2;
        case 7: case 8: case 9: case 10:
            return 2.5;
        case 11: case 12: case 13: case 14:
            return 3;
        default:
            return 4;
    }
}

var encounterXpBoundaries = function(levels) {
    xpPerLevel = {
        1: [25, 50, 75, 100],
		2: [50, 100, 150, 200],
		3: [75, 150, 225, 400],
		4: [125, 250, 375, 500],
		5: [250, 500, 750, 1100],
		6: [300, 600, 900, 1400],
		7: [350, 750, 1100, 1700],
		8: [450, 900, 1400, 2100],
		9: [550, 1100, 1600, 2400],
		10: [600, 1200, 1900, 2800],
		11: [800, 1600, 2400, 3600],
		12: [1000, 2000, 3000, 4500],
		13: [1100, 2200, 3400, 5100],
		14: [1250, 2500, 3800, 5700],
		15: [1400, 2800, 4300, 6400],
		16: [1600, 3200, 4800, 7200],
		17: [2000, 3900, 5900, 8800],
		18: [2100, 4200, 6300, 9500],
		19: [2400, 4900, 7300, 10900],
		20: [2800, 5700, 8500, 12700]
    }
    boundaries = [0, 0, 0, 0, 0];
    for (i = 0; i < levels.length; i++) {
        xp = xpPerLevel[levels[i]];
        for (j = 1; j < boundaries.length; j++) {
            boundaries[j] += xp[j-1];
        }
    }
    return boundaries;
}

var playerModel = new PlayerModel();
var monsterModel = new MonsterModel();

ko.applyBindings(playerModel, document.getElementById('players'));
ko.applyBindings(monsterModel, document.getElementById('monsters'));