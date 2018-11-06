(function () {
	/*开始表格操作*/
	var db = 'birthAssist';

	// Alert
	var ms_showAlert = 2000;
	

	$('document').ready(function () {
	/*
	1.文档加载完毕，显示全部（人物记录）
	2.点击新建按钮，新建（人物记录）
	3.点击查询按钮，查询（人物记录）
	4.点击更改按钮，更改（人物记录）
	5.点击删除按钮，删除（人物记录）
	*/
	// 1
	showAll(); 
	$('.alert').hide();
	$('.dropdown-menu').on('click',function (event) {
		switch(event.target.innerHTML){
			case '显示全部': showAll(); break;
			case '新建': break; // bootstrap show modal
			case '查询': break; // bootstrap show modal
			case '更改': break; // bootstrap show modal
			case '删除': break; // bootstrap show modal
			default: break;
		}
	});
	// 2
	$('#btnNewSave').on('click', newAndSave);

	// 3
	$('#btnQuery').on('click', queryRecord);
});

	// 4
	$('#btnUpdate').on('click', updateRecord);

	// 5
	$('#btnRemove').on('click', removeRecord);

/*
显示全部，新建，查询，修改和删除
*/

function removeRecord(){
	var oldName = $('#nameBeforeRemove').val(),
	success = isRemove(oldName);
	$('#removeRecordModal').modal('hide');
	showAll();
	if (success) {
			writeAlert("删除成功！", 'alert-success');
		} else {
			writeAlert("删除失败", 'alert-danger');
		}
	showAlertAndHide(ms_showAlert);
}

function isRemove(oldName){
	var isSuccess = false,
	dat = localStorage[oldName];
	if (typeof dat == 'string') {
		var p = JSON.parse(dat);
		if (p.db == db) { //update
			localStorage.removeItem(oldName);
			isSuccess = true;
		}
	}
	return isSuccess;
}

function updateRecord(){
	// alert("updateRecord");
	var isUpdateSuccess = false;
	var oldName = $('#nameBeforeUpdate').val(),
	key            = $('#updateKey').val(),
	value          = $('#updateValue').val(),
	// console.log(namebefore+key+value);
	success = isUpdate(oldName, key, value);
	$('#updateRecordModal').modal('hide');
	showAll();
	if (success) {
			writeAlert("修改成功！", 'alert-success');
		} else {
			writeAlert("修改失败", 'alert-error');
		}
	showAlertAndHide(ms_showAlert);
}

function isUpdate(oldName, key, value){
	dat = localStorage[oldName];
	if (typeof dat == 'string') {
		var p = JSON.parse(dat);
		if (p.db == db) { //update
			p[key] = value;
			var  t = JSON.stringify(p);
			localStorage.setItem(p.name, t);
			if (key == 'name') {
				localStorage.removeItem(oldName);
				console.log(localStorage[oldName]);
			}
			isUpdateSuccess = true;
		}
	}
	return isUpdateSuccess; // oldName not found
}

function showAll() {
	// 显示所有记录
	var thead, tbody = '';
	for(var item in localStorage){
		if (typeof localStorage[item] == 'string') {
			var p = JSON.parse(localStorage[item]);
			if (p.db == db) {
				if (typeof thead == 'undefined') {
					thead = writeThead(p);
					$('#showAll').find('thead').html(thead);
				}
				tbody += writeTbody(p);
				$('#showAll').find('tbody').html(tbody);
			}
		}
	}
}

function writeThead(p) {
	var html = '<tr>';
	for(var property in p){
		switch(property){
			case 'name': property = '姓名'; break
			case 'birthday': property = '生日'; break;
			case 'db': property = '数据库'; break;
			case 'relation': property = '关系';break;
			default: break;
		}
		if (property == '数据库') {
			html += '<th style="display:none">'+ property + '</th>';
		} else {
			html += '<th>'+ property + '</th>';
		}
	}
	html += '</tr>';
	return html;
}

function writeTbody(p) {
	var html = '<tr>';
	for(var property in p){
		if (property != 'db') 
			html += '<td>'+ p[property] + '</td>';
		else
			html += '<td style="display:none">'+ p[property] + '</td>';
	}
	html += '</tr>';
	return html;
}

function newAndSave(){
	var success = save(get());
		$('#newRecordModal').modal('hide');
		if (success) {
			writeAlert("保存成功！", 'alert-success');
		} else {
			writeAlert("保存失败，姓名已存在！", 'alert-danger');
		}
		showAlertAndHide(ms_showAlert);
		showAll();
}

// 获取表单输入
function get() {
	var name = document.getElementById('fullname'),
	birthday = document.getElementById('birthday'),
	relation = document.getElementById('relation');
	data = {
		name: name.value,
		birthday: birthday.value,
		db: db,
		relation: relation.value
	};
	return data;
}

// 保存数据
function save(data) {
	if (localStorage[data.name]) { 
		return false;
			} 
	else { // 名字不重复, 则转化为字符串对象保存
		localStorage.setItem(data.name.toString(), JSON.stringify(data));
		return true;
	}
}

// 查询记录
function queryRecord(){
		var key = $('#queryKey').val();
		var value = $('#queryValue').val();
		$('#queryRecordModal').modal('hide');
		var success = isFound(key, value);
		if (success) {
			writeAlert("查询到以下结果！", 'alert-info');
		} else {
			writeAlert("没有查询到任何记录", 'alert-info');
		}
		showAlertAndHide(ms_showAlert);
	}

// 包装alert
function writeAlert(msg,className){
		$('.alert').find('strong').html(msg);
		$('.alert').addClass(className);
		setTimeout(function(){
			$('.alert').removeClass(className);
		}, ms_showAlert);
}

// 显示alert并延迟消失
function showAlertAndHide(time_ms){
	time_ms = time_ms ? time_ms : 1000;
	$('.alert').show();
		setTimeout(function(){
			$('.alert').hide();
		}, time_ms);
}

function isFound(key, value) {
	var tbody = document.getElementsByTagName('tbody')[0];
	tbody.innerHTML = '';
	if (localStorage[value] && typeof localStorage[value] == 'string') {
		var person = JSON.parse(localStorage[value]);
		if (person.db == db && person[key] == value) {
			writeRow(tbody, person);
			return true;
		}
	}
	return false;
}

function writeRow(ele, obj) {
	var html = "<tr>";
	for(var p in obj){
		html += "<td>"+ obj[p] +"</td>";
	}
	html += "</tr>";
	ele.innerHTML += html;
}

/*结束表格操作*/
})();