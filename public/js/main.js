// Данные в дата js
// Класс пункта таблицы c_pt.js
// Остальное тут
const pts = [];

window.onload = () => {
	if(Pt){
		let parent = document.getElementsByClassName('work-list__column-content')[0];
		
		createTableHeader(parent);

		for(let i = 0; i < 10; i++){
			pts.push(new Pt());
			parent.appendChild(pts[i]);
		}

	}else{
		console.log('Can\'t find PT class');
	}
}


function createTableHeader(parent){
	let newPt;
	let data = {
		name : 'Имя',
		place : 'Место работы',
		role : 'Должность'
	};
	let sets = {
		ignoreGraph : true,
		showTimeInCell : true
	};

	newPt = new Pt(data, sets)
	pts.push(newPt);
	parent.appendChild(newPt);
}

function changeSize(x, y){
	pts.map(e => {
		e.changeGridSize(x, y);
	})
}