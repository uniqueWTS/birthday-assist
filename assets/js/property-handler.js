(function () {
	// Begin birthday assist
	
	// variables
	var db = 'birthAssist';

/*开始出错日志*/	
	 function printFailInfo(fn){
	 	console.log(fn.name + ' failed!');
	 }
/*结束出错日志*/

/*开始主事件处理器*/
	function dbPropertyHandler(key, value, handler) {
		for(var item in localStorage){
			if (typeof localStorage[item] == 'string') {
				var p = JSON.parse(localStorage[item]);
				if (p.db == db) {
					var data = handler(p, key, value);
					if (typeof data != 'undefined') {
						localStorage[item] = JSON.stringify(data);
					} else {
						return;
					}
				}
			}
		}
	}
/*结束主事件处理器 */

/*开始属性操作*/	 

	function addProperty(p, key, value) {
		if (p[key]) {
			printFailInfo(arguments.callee);
			return;
		} else {
			p[key] = value;
			return p;
		}
	}


	function removeProperty(p, key) {
		if (p[key]) {
			var copy = {};
			for(var property in p){
				if (property != key) {
					copy[property] = p[property];
				}
			}
			return copy;
		} else {
			printFailInfo(arguments.callee);
			return;
		}
	}


	function setProperty(p, key, value) {
		if (p[key]) {
			p[key] = value;
			return p;
		} else {
			printFailInfo(arguments.callee);;
			return;
		}
	}
	// dbPropertyHandler('relation','家人',addProperty);
	// dbPropertyHandler('关系',' ',removeProperty);
	// dbPropertyHandler('relation','家人', setProperty);
/*结束 属性操作*/


	// End birthday assist
})();