const assert = require('chai').assert;

const Plane = require('../planes/plane');
const MilitaryPlane = require('../planes/militaryPlane');
const PassengerPlane = require('../planes/passengerPlane');
const Airport = require('../airport');
const MilitaryType = require('../models/militaryType');
const ExperimentalPlane = require('../planes/experimentalPlane');
const ExperimentalType = require('../models/experimentalType');
const ClassificationLevel = require('../models/classificationLevel');

describe('Tests for airport.js', () => {
  
  let planes = [
    new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
    new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
    new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
    new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
    new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
    new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
    new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
    new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
    new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.bomber),
    new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.bomber),
    new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.bomber),
    new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.fighter),
    new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.fighter),
    new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.transport),
    new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalType.highAttitude, ClassificationLevel.secret),
    new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalType.vtol, ClassificationLevel.topSecret)
  ];
  let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

  it('should have military planes with transport type', () => {
    let airport = new Airport(planes);
    let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
    let hasTransportTypeInMilitaryPlane = false;
      for (let militaryPlane of transportMilitaryPlanes) {
        if (militaryPlane.getMilitaryType() === MilitaryType.transport) {
          hasTransportTypeInMilitaryPlane = true;
          break;
        }
      }
     assert.equal(hasTransportTypeInMilitaryPlane, true);
  });

  it('should check passenger plane with max capacity', () => {
    let airport = new Airport(planes);
    let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
    assert.isFalse(expectedPlaneWithMaxPassengersCapacity === planeWithMaxPassengerCapacity);
  });


  it('should check sorting by max load capacity', () => {
    let airport = new Airport(planes);
    airport.sortByMaxLoadCapacity();
    let planesSortedByMaxLoadCapacity = airport.getPlanes();
    let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
      for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
        let currentPlane = planesSortedByMaxLoadCapacity[i];
        let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
          if (currentPlane.getMaxLoadCapacity() > nextPlane.getMaxLoadCapacity()) {
            nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
            break;
          }
      }
    assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
  });

  it('should have at least one bomber in military planes', () => {
    let airport = new Airport(planes);
    let bomberMilitaryPlanes  = airport.getBomberMilitaryPlanes();
    let hasAtLeastOneBomberInMilitaryPlanes = false;
      for (let militaryPlane of bomberMilitaryPlanes) {
        if (militaryPlane.getMilitaryType() === MilitaryType.bomber) {
          hasAtLeastOneBomberInMilitaryPlanes = true;
        } else {
          assert.fail("Test failed!");
        }
      }
  });

    it('should check that experimental planes has classification level higher than unclassified', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getExperimentalPlanes ();
        let hasUnclassifiedPlanes = false;
        for (let experimentalPlane of bomberMilitaryPlanes) {
            if (experimentalPlane.ClassificationLevel === ClassificationLevel.unclassified) {
                hasUnclassifiedPlanes = true;
        }
        assert.isFalse(hasUnclassifiedPlanes);
        }
    });
});



