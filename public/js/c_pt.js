// Не совсем ясно имеется ли сразу информация о фактическом присутствии, 
// по этому буду исходить из того что она догружается с сервера (в случае
// если она не догружается все вроде очевидно, принимаем индекс массива за id и 
// сопоставляем инфу из двух массивов)
// 
// 

// Pt.dynamicColumn - сылка на div элемент колонки со школой времени 

function Pt(data, set) {
	const that = document.createElement('div');
	
	// дефолтные параметры для пункта
	const settings = {
		timeRangeStart: 0, // 0-23
		timeRangeEnd: 7, // 1-24

		showTimeInCell: true,

		stripTimeGrid: 8,

		dynamicElementSize: 1200 - 300


	};

	// дефолтные значения для пункта 
	const values = {
		name: 'def name',
		place: 'def place',
		role: 'def role',
		dateStartTimeDream: new Date("1999-08-16T08:00:00.511Z"),
		dateEndTimeDream: new Date("1999-08-16T18:0000.211Z"),
		dateStartTimeReal: new Date("1999-08-16T08:00:00.511Z"),
		dateEndTimeReal: new Date("1999-08-16T08:00:00.511Z")
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
					ptRole = document.createElement('div');


			that.className = 'work-list__column-content-pt flex';
			staticColumn.className = 'work-list__static-column-pt flex-grow left-block';
			dynamicColumn.className = 'work-list__dynamic-column-pt grow-this';
			
			ptName.innerText = values.name;
			ptPlace.innerText = values.place;
			ptRole.innerText = values.role;

			that.appendChild(staticColumn);
			that.appendChild(dynamicColumn);

			staticColumn.appendChild(ptName);
			staticColumn.appendChild(ptPlace);
			staticColumn.appendChild(ptRole);

			dynamicColumn.appendChild(dynamicColumnWrap);

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
				
				that.dynamicColumn.appendChild(element);
			}
		}


		// изменим масштаб сетки 
		function changePtGridSize(){
			const elementSize = calcPtGridElementSize();
		}


		// посчитаем размер ячейки времени 
		function calcPtGridElementSize(){
			return settings.dynamicElementSize / (settings.timeRangeEnd - settings.timeRangeStart);
		}

	// =======
	// public functions (methods)
	// =======

	that.changeGridSize = (start, end) => {
		if(!start || !end) return false

		settings.timeRangeStart = start;
		settings.timeRangeEnd = end;

		changePtGridSize();

	}


	// =======
	// init
	// =======

	// DEL 
	if(data) Object.assign(values, data);
	if(settings) Object.assign(settings, set);

	createPtStructure();
	createPtGrid();

	changePtGridSize();

	return that
}
