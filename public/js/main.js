// Данные в дата js

// Класс пункта таблицы c_pt.js

// Остальное тут
const pts = [];

window.onload = () => {
	if(Pt){
		let parent = document.getElementsByClassName('work-list__column-content')[0];
		let dynamicSize;
		
		// прочтем размер поля для таблицы, если есть элемент с классом .__dynamic-field-size
		if(document.getElementsByClassName('__dynamic-field-size')[0]){
			dynamicSize = document.getElementsByClassName('__dynamic-field-size')[0].offsetWidth;
		}

		// удалим формальные эелементы .__delete
		for(let i = 0; i < document.getElementsByClassName('__delete').length; i++){
			document.getElementsByClassName('__delete')[i].parentNode.removeChild(document.getElementsByClassName('__delete')[i]);
		}

		// создадим заголовок таблицы
		createTableHeader(parent);
		
		// содадим элементы
		for(let i = 0; i < 20; i++){
			pts.push( new Pt(false, {
				dynamicElementSize : dynamicSize
			}));
			parent.appendChild(pts[i]);
		}

		// повесим слушатель на фильтр
		startInputBtnListener();


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
		showTimeInCell : true,
		wraperCustomClass : 'work-list__column-custom'
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


function showDream(){
	pts.map(e => {
		e.showhideDream(true);
	})
}

function hideDream(){
	pts.map(e => {
		e.showhideDream(false);
	})
}

function showReal(){
	pts.map(e => {
		e.showhideReal(true);
	})
}

function hideReal(){
	pts.map(e => {
		e.showhideReal(false);
	})
}

function startInputBtnListener(){
	let minInput = document.getElementById('grid-min');
	let maxInput = document.getElementById('grid-max');
	let btn = document.getElementById('grid-apply');

	if(!minInput || !maxInput) return false

	btn.onclick = () => {
		const err = [];

		let min = minmaxFilter(parseInt(minInput.value), 0, 23);
		let max = minmaxFilter(parseInt(maxInput.value), min + 1, 23);


		if(typeof min != 'number') {
			err.push('MIN : некорректное значение')
			minInput.classList.add('input-error');
		};

		if(typeof max != 'number') {
			err.push('MAX : некорректное значение')
			maxInput.classList.add('input-error');
		};

		if(err.length){
			err.map( e => {
				console.log(e);
			});
			return false 
		}

		minInput.value = min;
		maxInput.value = max;

		minInput.classList.remove('input-error');
		maxInput.classList.remove('input-error');

		console.log(min, max);

		changeSize(min, max + 1);

	}
}

// фильтр числовых значений 
function minmaxFilter(n, min = 0, max = 23){
	if(n >= min && n <= max){
		return n
	}else{
		return false
	}
}




















