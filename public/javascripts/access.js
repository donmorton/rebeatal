var sounds = [""];

function add(element){
	sounds.push(element);
	alert("PUSHED");
}

function getList(){
	alert(sounds);
	return sounds;
}
