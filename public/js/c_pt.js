// Pt.staticColumn - сылка на div элемент колонки информацией
// Pt.dynamicColumn - сылка на div элемент колонки со школой времени 
// Pt.dynamicColumnWrap = сылка на div элемент обертки колонки со школой времени ;
// Pt.graphDream - график формального рабочего дня;
// Pt.graphReal - график фактического рабочего дня;

function Pt(data, set) {
	const that = document.createElement('div');
	
	// дефолтные параметры для пункта
	const settings = {
		timeRangeStart: 8, // 0-23
		timeRangeEnd: 21, // 1-24

		// не отображать статистику
		ignoreGraph: false,

		// Отображать дату в ячейках
		showTimeInCell: true,

		// максималное количество ячеек при которых
		// дата отображается в формате hh:mm, при привышении
		// hh
		stripTimeGrid: 8, 

		// размер одной ячейки 
		dynamicElementSize: 900,

		// кастомный класс для пункта 
		wraperCustomClass: false,

		// отображение фактического графика по умолчанию
		showGraphFact : true,

		// отображение формального графика по умолчанию 
		showGraphDream : true,

		// переключение отображения графа по нажатию на строку
		changeGraph : true

	};

	// дефолтные значения для пункта 
	const values = {
		name: 'def name',
		place: 'def place',
		role: 'def role',
		dateStartTimeDream: new Date("1999-08-16T08:00:00.511Z"),
		dateEndTimeDream: new Date("1999-08-16T18:00:00.211Z"),
		dateStartTimeReal: new Date("1999-08-16T08:00:00.511Z"),
		dateEndTimeReal: new Date("1999-08-16T18:00:00.211Z")
	};

	// =======
	// privat functions
	// =======

		// приобразуем время к общему виду (эстетика)
		function prettyTime(n, strip){
			// приведем n к двум знакам
			n = n > 9 ? n : '0' + n;
			return  strip ? n : n + ':00'
		}


		// создадим базовую структуру
		function createPtStructure(){

			// можно это сделать через шаблон что-то вроде ...
			// но эстетически не очень нравится, по старинке привычнее
			let name = 'some name',
			 	place = 'some place',
			 	thatInnerHtml = `
					<div class="work-list__static-column-pt flex-grow left-block">
						<div class="big">${name}</div>
						<div class="big">${place}</div>
					</div>
					<div class="work-list__dynamic-column-pt flex-grow grow-this">
						<div class="small">.</div>
						<div class="small">.</div>
						<div class="small">.</div>
						<div class="small">.</div>
						<div class="small">.</div>
						<div class="small">.</div>
					</div>`;

			// --------------------------

			const 	staticColumn = document.createElement('div'),
					dynamicColumn = document.createElement('div'),
					dynamicColumnWrap = document.createElement('div'),
					ptName = document.createElement('div'),
					ptPlace = document.createElement('div'),
					ptRole = document.createElement('div'),
					graphDream = document.createElement('div'),
					graphReal = document.createElement('div');
					


			that.className = 'work-list__column-content-pt flex';
			that.className += settings.wraperCustomClass ? " " + settings.wraperCustomClass : "";


			staticColumn.className = 'work-list__static-column-pt flex-grow left-block';
			dynamicColumn.className = 'work-list__dynamic-column-pt grow-this';
			graphReal.className = 'work-list__statusBarReal';
			graphDream.className = 'work-list__statusBarDream';
			
			ptName.innerText = values.name;
			ptPlace.innerText = values.place;
			ptRole.innerText = values.role;

			that.appendChild(staticColumn);
			that.appendChild(dynamicColumn);

			staticColumn.appendChild(ptName);
			staticColumn.appendChild(ptPlace);
			staticColumn.appendChild(ptRole);

			dynamicColumn.appendChild(dynamicColumnWrap);

			if(!settings.ignoreGraph){
				dynamicColumn.appendChild(graphDream);
				dynamicColumn.appendChild(graphReal);
			}				


			that.graphDream = graphDream;
			that.graphReal = graphReal;
			that.staticColumn = staticColumn;
			that.dynamicColumn = dynamicColumn;
			that.dynamicColumnWrap = dynamicColumnWrap;
		}


		// создадим "сетку" для графика 
		function createPtGrid(){
			if(!that.dynamicColumn) return false
			const elementSize =  calcPtGridElementSize();
			// const elementSize = that.dynamicColumn.offsetWidth / (settings.timeRangeEnd - settings.timeRangeStart);

			that.dynamicColumn.style.overflow = 'hidden';

			for(let i = 0; i < 24; i++){
				let element = document.createElement('div');
				element.className = 'generated-script';
				
				element.style.position = 'absolute';
				element.style.width = elementSize + 'px';
				element.style.left = elementSize * (i - settings.timeRangeStart) + 'px';

				if(settings.showTimeInCell){
					element.innerText = prettyTime(i, settings.stripTimeGrid < settings.timeRangeEnd - settings.timeRangeStart);
				}
				
				that.dynamicColumnWrap.appendChild(element);
			}
		}


		// изменим масштаб сетки 
		function changePtGridSize(){
			const 	elementSize = calcPtGridElementSize(),
					elements = that.dynamicColumnWrap.children;
			
			for(let i = 0; i < elements.length; i++){
				elements[i].style.width = elementSize + 'px';
				elements[i].style.left = elementSize * (i - settings.timeRangeStart) + 'px';
			}
			
			calcGraphReal();
			calcGraphDream();
		}


		// посчитаем размер ячейки времени 
		function calcPtGridElementSize(){
			return settings.dynamicElementSize / (settings.timeRangeEnd - settings.timeRangeStart);
		}


		// добавим мечту график 
		function calcGraphDream(){
			let graphSize,
				elementSize = calcPtGridElementSize(),
				hourStart = new Date(values.dateStartTimeDream),
				hourEnd = new Date(values.dateEndTimeDream);
				
				
			hourStart = hourStart.getHours();
			hourEnd = hourEnd.getHours();

			graphSize = hourEnd - hourStart;

			that.graphDream.style.width =  elementSize * graphSize + 'px';
			that.graphDream.style.left = elementSize * (hourStart - settings.timeRangeStart) + 'px';
		}

		
		// добавим реальный график 
		function calcGraphReal(){
			let graphSize,
				elementSize = calcPtGridElementSize(),
				hourStart = new Date(values.dateStartTimeReal),
				hourEnd = new Date(values.dateEndTimeReal);
				
				
			hourStart = hourStart.getHours();
			hourEnd = hourEnd.getHours();
				
			graphSize = hourEnd - hourStart;

			that.graphReal.style.width =  elementSize * graphSize + 'px';
			that.graphReal.style.left = elementSize * (hourStart - settings.timeRangeStart) + 'px';
		}


		// отображение/скрытие фактического графика от bool
		function showhideReal(bool){
			if(bool){
				that.graphReal.style.opacity = 1;
			}else{
				that.graphReal.style.opacity = 0;
			}
		}


		// отображение/скрытие фактического графика от bool
		function showhideDream(bool){
			if(bool){
				that.graphDream.style.opacity = 1;
			}else{
				that.graphDream.style.opacity = 0;
			}
		}


		// переключение между графиками
		function startChangeGraphListener(){
			if(!settings.ignoreGraph && settings.changeGraph){
				that.staticColumn.onclick = () => {
					if(!that.showVariant){
						that.showVariant = true;
					}else{
						that.showVariant = false;
					}

					showhideDream(that.showVariant);
					showhideReal(!that.showVariant);

				}
			}
		}


		function changeGraph(){

		}

	// =======
	// public functions (methods)
	// =======

	// изменение масштаба сетки
	// в диапозоне от start часов
	// до end часов
	that.changeGridSize = (start, end) => {
		
		console.log('changeGridSize', start, end);

		if(typeof start != 'number' || typeof end != 'number') return false
		if(start >= end){
			console.log("первый аргумент должен быть больше аторого");
			return false
		}

		settings.timeRangeStart = start;
		settings.timeRangeEnd = end;

		changePtGridSize();
	}


	that.showhideDream = showhideDream;

	that.showhideReal = showhideReal;

	// =======
	// init
	// =======


	// DELETE
	// припишем кастомные данные
	if(data) Object.assign(values, data);

	// припишем кастомные параметры
	if(settings) Object.assign(settings, set);



	createPtStructure();
	createPtGrid();

	calcGraphReal();
	calcGraphDream();

	startChangeGraphListener();

	return that
}
