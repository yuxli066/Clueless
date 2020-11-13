/**
 * Coordinates Class
 */

class Coordinate {
  constructor(axisX, axisY) {
    this.axisX = axisX;
    this.axisY = axisY;
  }

  // return x axis
  getAxisX() {
    return axisX;
  }

  // return y axis
  getAxisY() {
    return axisXY;
  }

  // set x axis value
  setAxisX(xValue) {
    axisX = xValue;
  }

  // set y axis value
  setAxisY(yValue) {
    axisY = yValue;
  }

  // set both axis values in the same method
  setCoordinate(xValue, yValue) {
    axisX = xValue;
    axisY = yValue;
  }
}

//export class
module.exports.Coordinate = Coordinate;
