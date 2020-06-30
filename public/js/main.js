// Данные в дата js

// Класс пункта таблицы c_pt.js

// Остальное тут
const pts = [];

window.onload = () => {
	if(Pt){
		let parent = document.getElementsByClassName('work-list__column-content')[0];
		let dynamicSize;
		let data;
		
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
		// for(let i = 0; i < 20; i++){
		// 	pts.push( new Pt(false, {
		// 		dynamicElementSize : dynamicSize,
		// 		showTimeInCell: false
		// 	}));
		// 	parent.appendChild(pts[i]);
		// }

		try{
			data = JSON.parse(DB3_json);
		}catch(e){
			console.log(e);
		}


		if(data && data.virtual && data.actual){
			
			for(let i = 0; i < data.virtual.length; i++){
				// возьмем планируемый график за первичные данные

				let newPt;
				let dataPt = {
					name : data.virtual[i][0],
					place : data.virtual[i][1],
					role : data.virtual[i][2],
					dateStartTimeDream: new Date(data.virtual[i][3]),
					dateEndTimeDream: new Date(data.virtual[i][4]),
					dateStartTimeReal: new Date(data.actual[i][3]),
					dateEndTimeReal: new Date(data.actual[i][4])
				};
				let setsPt = {
					dynamicElementSize : dynamicSize,
					showTimeInCell: false
				};

				newPt = new Pt(dataPt, setsPt);
				pts.push(newPt);
				parent.appendChild(newPt);


			}
		
		}


		// повесим слушатель на фильтр
		startInputBtnListener();


	}else{
		console.log('Can\'t find PT class');
	}
}

// создать строку с наименованием таблицы
function createTableHeader(parent){
	let newPt;
	let dataPt = {
		name : 'Имя',
		place : 'Место работы',
		role : 'Должность'
	};
	let setsPt = {
		ignoreGraph : true,
		showTimeInCell : true,
		wraperCustomClass : 'work-list__column-custom'
	};

	newPt = new Pt(dataPt, setsPt)
	pts.push(newPt);
	parent.appendChild(newPt);
}

// изменить масштаб
function changeSize(x, y){
	pts.map(e => {
		e.changeGridSize(x, y);
	})
}

// скрыть формальные графики
function showDream(){
	pts.map(e => {
		e.showhideDream(true);
	})
}

// скрыть формальные графики
function hideDream(){
	pts.map(e => {
		e.showhideDream(false);
	})
}

// отобразить графики фактических данных
function showReal(){
	pts.map(e => {
		e.showhideReal(true);
	})
}

// скрыть графики фактических данных
function hideReal(){
	pts.map(e => {
		e.showhideReal(false);
	})
}

// слушатель нажатия на кнопку применения диапозона
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

function getRand(min = 0){
	return min + Math.round(Math.random() * (24 - min));
}

// Генератор дат для массива работников
// Это можно было двумерной матрицой решить ,
// но я поздно сообразил , не стал переписывать,
// 
function generateDate(){
	let date = new Date(),
		dateVirtualStart,
		dateVirtualEnd,
		dateActualStart,
		dateActualEnd,
		randVS,
		randVE,
		randAS,
		randAE;

	randVS = getRand();
	randVE = getRand(randVS);

	randAS = getRand();
	randAE = getRand(randAS);

	dateVirtualStart = new Date();
	dateVirtualStart.setHours(randVS);

	dateVirtualEnd = new Date();
	dateVirtualEnd.setHours(randVE);

	dateActualStart = new Date();
	dateActualStart.setHours(randAS);

	dateActualEnd = new Date();
	dateActualEnd.setHours(randAE);

	console.log('virtual');
	console.log(`${JSON.stringify(dateVirtualStart)},${JSON.stringify(dateVirtualEnd)}`);

	console.log('Actual');
	console.log(`${JSON.stringify(dateActualStart)},${JSON.stringify(dateActualEnd)}`);

	return [[dateVirtualStart, dateVirtualEnd],[dateActualStart, dateActualEnd]]

}

let __TEST = {
	virtual : [],
	actual : []
}

function addObj(name = 'defName', place = 'defPlace', role = 'defRole'){
	let _date = generateDate();
	__TEST.virtual.push([name, place, role, ..._date[0]]);
	__TEST.actual.push([name, place, role, ..._date[1]]);
}


// Это генерация элементов таблицы
addObj('Kiril', "Soft", "mr.Soft");
addObj('Boris', "Hard", "mr.Hard");
addObj('Evgeniy', "Sweet", "mr.Sweet");
addObj('Gleb', "Pig", "mr.Pig");
addObj('Valera', "Som", "director");
addObj('Tundra', "Som", "JS");
addObj('Tayga', "Utug", "CPP");
addObj('Egor', "Tatt", "designer");
addObj('Jack', "Satt", "dir mr.Jack ");
addObj('Kack', "Salt", "dir mr.Mop ");
addObj('Ann', "Ssgft", "dirgd mr.Mop ");
addObj('Ssdjkg', "Ysgft", "dirgd mr.Mop ");














