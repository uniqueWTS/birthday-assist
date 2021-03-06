var db = "birthAssist";
var family = {
	"方佩兰": {
		name: "方佩兰",
		birthday: "1961-08-06",
		relation: "家人",
		db: db
	},
	"伍文亮": {
		name: "伍文亮",
		birthday: "1959-10-13",
		relation: "家人",
		db: db
	},
	"伍天才": {
		name: "伍天才",
		birthday: "1987-09-05",
		relation: "家人",
		db: db
	},
	"伍天津": {
		name: "伍天津",
		birthday: "1986-02-01",
		relation: "家人",
		db: db
	},
	"伍天胜": {
		name: "伍天胜",
		birthday: "1990-02-04",
		relation: "家人",
		db: db
	},
	"方桂文": {
		name: "方桂文",
		birthday: "1936-09-17",
		relation: "外公",
		db: db
	},
	"杨雪香": {
		name: "杨雪香",
		birthday: "1937-02-03",
		relation: "外婆",
		db: db
	}
};

$(document).ready(function () {
	for(var p in family){
		if (!localStorage[p]) {
			localStorage[p] = JSON.stringify(family[p]);
		}
	}
});