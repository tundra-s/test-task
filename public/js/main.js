// Данные в дата js
// Класс пункта таблицы c_pt.js
// Остальное тут


window.onload = () => {
	if(Pt){
		let pt = new Pt(),
			parent = document.getElementsByClassName('work-list__column-content')[0];

		console.log(pt);

		parent.appendChild(pt);
		
	}else{
		console.log('Can\'t find PT class');
	}
}