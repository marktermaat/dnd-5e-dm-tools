module.exports = function(playerModel) {
    var self = this;
    
    self.participants = ko.observableArray([]);

    self.sortedParticipants = ko.pureComputed(function() {
        return self.participants().sort(function(left, right) {
            if (!left.hasInitiative() && !right.hasInitiative()) return 0;
            if (!left.hasInitiative()) return 1;
            if (!right.hasInitiative()) return -1;
            return left.initiative() - right.initiative();
        });
    });

    self.addParticipantObject = function(name) {
        name = typeof name !== 'undefined' ? name : 'participant';
        var participant;
        self.participants.push(participant = {
            name: ko.observable(name),
            initiative: ko.observable(),
            hasInitiative: ko.pureComputed(function() {
                console.log("initiative: ", participant.name(), participant.initiative());
                return (typeof participant.initiative() !== 'undefined') 
                    && participant.initiative().length > 0;
            })
        });
    }
 
    self.addParticipant = function() {
        self.addParticipantObject();
    };
    
    self.reset = function() {
        self.participants.removeAll();
        for (i = 0; i < playerModel.players().length; i++) {
            self.addParticipantObject(playerModel.players()[i].name());
        }
    }

    self.reset();
}