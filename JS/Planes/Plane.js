class Plane {
  constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
    this.model = model;
    this.maxSpeed = maxSpeed;
    this.maxFlightDistance = maxFlightDistance;
    this.maxLoadCapacity = maxLoadCapacity;
  }

  getModel() {
    return this.model;
  }

  setModel(value) {
    this.model = value;
  }

  getMaxSpeed() {
    return this.maxSpeed;
  }

  setMaxSpeed(value) {
    this.maxSpeed = value;
  }

  getMaxFlightDistance() {
    return this.maxFlightDistance;
  }

  setMaxFlightDistance(value) {
    this.maxFlightDistance = value;
  }

  getMaxLoadCapacity() {
    return this.maxLoadCapacity;

  }

  setMaxLoadCapacity(value) {
    this.maxLoadCapacity = value;
  }
}

module.exports = Plane;
