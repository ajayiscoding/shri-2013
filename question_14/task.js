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
};

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  var position = this.getCurrentPosition();
  console.log("Корабль: " + '"' + this.getName() + '".');
  console.log("Местоположение: " + (this.isPlanet(position) ? position.getName() : position) + '.');
  console.log("Занято: " + this.getOccupiedSpace() + " из " + this.getCapacity() + "т");
  console.log("");
};

/**
 * Выводит название корабля.
 * @name Vessel.getName
*/
Vessel.prototype.getName = function(){
  return this.name;
};

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.occupiedSpace;
};

/**
 * Выводит текущее местоположения корабля.
 * @name Vessel.getCurrentPosition
*/
Vessel.prototype.getCurrentPosition = function() {
  return this.position;
};

/**
 * Проверяет текущее местоположение планета или массив координат
 * @name Vessel.isPlanet
*/
Vessel.prototype.isPlanet = function(position){
  return (position instanceof Planet);
};

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.occupiedSpace;
};

/**
 * Выводит грузоподъемность корабля
 * @name Vessel.getCapacity
 */
Vessel.prototype.getCapacity = function(){
  return this.capacity;
};

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
  if(this.isOn(newPosition)){
    throw new Error('Корабль ' + this.getName() + ' уже находиться в этом месте.');
  }

  this.position = newPosition;
};

/*
 * @param {Number} cargoWeight Вес груза, который нужно загрузить на корабль
*/
Vessel.prototype.hasEnoughSpace = function (cargoWeight) {
  var freeSpace = this.getFreeSpace();

  return freeSpace >= cargoWeight;
};

Vessel.prototype.hasEnoughCargo = function (cargoWeight) {
  var occupiedSpace = this.getOccupiedSpace();

  return occupiedSpace >= cargoWeight;
};

/* Проверить находится ли корабль в местоположении position 
 * @param {Number}[]|Planet position Проверяемое местоположение
*/
Vessel.prototype.isOn = function(position){
  var currentPosition = this.getCurrentPosition();

  if(this.isPlanet(currentPosition)){
    currentPosition = currentPosition.getPosition();
  }

  if(this.isPlanet(position)){
    position = position.getPosition();
  }

  return currentPosition.toString() === position.toString();
};

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
};

/* Возвращает имя планеты */
Planet.prototype.getName = function () {
  return this.name;
};

/* Возвращает координаты планеты */
Planet.prototype.getPosition = function () {
  return this.position;
};

/*
  Проверяет, есть ли на планете необходимое кол-во груза
  @param {Number} necessaryCargo - Необходимое кол-во груза
*/
Planet.prototype.hasEnoughCargo = function(necessaryCargo){
  var availableAmountOfCargo = this.getAvailableAmountOfCargo();

  return availableAmountOfCargo >= necessaryCargo;
};

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  var name = this.getName(),
      availableAmountOfCargo = this.getAvailableAmountOfCargo(),
      position = this.getPosition(),
      cargoMessage = '';

  cargoMessage = (availableAmountOfCargo === 0) ? "Грузов нет." : ("Доступного груза: " + availableAmountOfCargo + 'т');

  console.log("Планета: " + name);
  console.log("Местоположение: " + position);
  console.log(cargoMessage);
  console.log("");
};

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
};

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  var planet = this,
      freeSpaceOnVessel = vessel.getFreeSpace();

  if(!cargoWeight){
    throw new Error('Не указан вес загружаемого груза');
  }

  if(!vessel.isOn(planet)){
    throw new Error('Корабль ' + vessel.name + ' должен находиться на планете ' + planet.getName());
  }

  if(!vessel.hasEnoughSpace(cargoWeight)){
    throw new Error('На корабле ' + vessel.name + ' недостаточно места.');
  }

  if(!planet.hasEnoughCargo(cargoWeight)){
    throw new Error('На планете ' + this.name + ' нет такого кол-ва груза.')
  }

  this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
  vessel.occupiedSpace += cargoWeight;
};

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  var planet = this;

  if(!cargoWeight){
    throw new Error('Не указан вес загружаемого груза');
  }

  if(!vessel.isOn(planet)){
    throw new Error('Корабль ' + vessel.name + ' должен находиться на планете ' + planet.getName());
  }

  if(!vessel.hasEnoughCargo(cargoWeight)){
    throw new Error('На корабле ' + vessel.name + ' нет ' + cargoWeight + 'т груза.');
  }

  this.availableAmountOfCargo += cargoWeight;
  vessel.occupiedSpace -= cargoWeight;

};

var planetEarth = new Planet("Земля", [0, 0], 0);
var planetMars = new Planet("Марс", [10, 300], 10000);
var spaceship = new Vessel("Настоящий", [0, 0], 2000);

spaceship.report();
planetEarth.report();
planetMars.report();

spaceship.flyTo(planetMars);

planetMars.loadCargoTo(spaceship, 1000);
spaceship.report();
planetMars.report();

spaceship.flyTo(planetEarth);
spaceship.report();

planetEarth.unloadCargoFrom(spaceship, 1000);
spaceship.report();
planetEarth.report();