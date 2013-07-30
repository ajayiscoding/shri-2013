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
  this.planet = undefined;
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
  console.log("Занято: " + this.getOccupiedSpace() + " из " + this.capacity + " т.");
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

Vessel.prototype.isOnPlanet = function(planetName){
  return (this.planet && this.planet.name === planetName);
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
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  var planetName = this.name,
      freeSpaceOnVessel = vessel.getFreeSpace(),
      amountOfCargo = this.getAvailableAmountOfCargo();

  if(!vessel.isOnPlanet(planetName)){
    throw new Error('Корабль ' + vessel.name + ' должен находиться на планете ' + planetName);
  }
  
  if(freeSpaceOnVessel < cargoWeight){
    throw new Error('На корабле ' + vessel.name + ' недостаточно места.');
  }

  if(amountOfCargo < cargoWeight){
    throw new Error('На планете ' + this.name + ' нет такого кол-ва груза.')
  }

  this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
  vessel.occupiedSpace += cargoWeight;
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  var planetName = this.name,
      occupiedSpaceOnVessel = vessel.getOccupiedSpace();

  if(!vessel.isOnPlanet(planetName)){
    throw new Error('Корабль ' + vessel.name + ' должен находиться на планете ' + planetName);
  }

  if(occupiedSpaceOnVessel < cargoWeight){
    throw new Error('На корабле ' + vessel.name + ' нет такого кол-ва груза.');
  }

  this.availableAmountOfCargo += cargoWeight;
  vessel.occupiedSpace -= cargoWeight;

}

var planetEarth = new Planet("Земля", [0, 0], 0);
var planetMars = new Planet("Марс", [10, 300], 15000);
var vessel = new Vessel("Павел", planetEarth.position, 2000);

console.log("Этап 1");
vessel.report();
planetEarth.report();
planetMars.report();
console.log("");

console.log("Этап 2. Летим с Земли на Марс. Загружаем с Марса 1000т груза.");

vessel.flyTo(planetMars);
planetMars.loadCargoTo(vessel, 1000);
vessel.report();
planetMars.report();

console.log("Этап 3. Летим с Марса на Землю. Выгружаем с Павла 1000т груза.");
vessel.flyTo(planetEarth);

vessel.report();
planetEarth.report();

planetEarth.unloadCargoFrom(vessel, 800);

vessel.report();
planetEarth.report();

