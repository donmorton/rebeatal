var sounds = ["TVRoZAAAAAYAAAABAIBNVHJrAAAAHwCQPFqBAIA8WgCQQFqBAIBAWgCQQ1qBAIBDWgD/LwA="];

function add(element){
	sounds.push(element);
	alert("PUSHED");
}

function getList(){
	alert(sounds);
	return sounds;
}