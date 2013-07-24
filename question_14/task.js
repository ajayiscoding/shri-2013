/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
  this.name = name;
  this.position = position;
  this.capacity = capacity;
  this.occupiedSpace = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  console.log("Корабль " + '"' + this.getName() + '".');
  console.log("Местоположение: " + this.getCurrentPosition() + '.');
  console.log("Занято: " + this.getOccupiedSpace() + " из " + this.getFreeSpace() + "т.");
  console.log("");
}

/**
 * Выводит название корабля.
 * @name Vessel.getName
*/
Vessel.prototype.getName = function(){
  return this.name;
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.occupiedSpace;
}
/**
 * Выводит текущее местоположения корабля.
 * @name Vessel.getCurrentPosition
*/
Vessel.prototype.getCurrentPosition = function() {
  return (this.planet === undefined) ? this.position : this.planet.name;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.occupiedSpace;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
  if(newPosition instanceof Array){
    this.position = newPosition;
    this.planet = undefined;

    return;
  }

  this.position = newPosition.position;
  this.planet = newPosition;
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name;
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  console.log("Планета: " + this.name);
  console.log("Местоположение: " + this.position);
  console.log("Доступного груза: " + this.availableAmountOfCargo);
  console.log("");
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {}

var vessel = new Vessel("Космический захватчик", [0, 0], 2000);
var planetEarth = new Planet("Земля", [0, 0], 0);
var planetMars = new Planet("Марс", [10, 300], 15000);

vessel.report();
planetEarth.report();
planetMars.report();

/* Летим с планеты Земля на Марс */
vessel.flyTo(planetMars);

vessel.report();

