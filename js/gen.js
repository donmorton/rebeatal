$(document).ready(function(){

$("#butt").click(function(){
	alert("oo");


            var noteEvents = [];
            ["C4", "E4", "G4"].forEach(function(note) {
                Array.prototype.push.apply(noteEvents, MidiEvent.createNote(note));
            });
            var track = new MidiTrack({ events: noteEvents });
            var song  = MidiWriter({ tracks: [track] });

            // song.play();
            song.save();
            $("body").append(getList());
});

});
