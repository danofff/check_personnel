const turf = require("@turf/helpers");
const booleanPointInPolygon = require("@turf/boolean-point-in-polygon");
// const data = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           [
//             [-122.1799850463867, 37.46164222168521],
//             [-122.1928596496582, 37.45551035774642],
//             [-122.18324661254881, 37.45046822629871],
//             [-122.17964172363281, 37.457009304251244],
//             [-122.17706680297852, 37.46027962870619],
//             [-122.1799850463867, 37.46164222168521],
//           ],
//         ],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "Point",
//         coordinates: [-122.18487739562988, 37.45714557062557],
//       },
//     },
//   ],
// };

const checkPoint = (data = { features: [] }) => {
  let point;
  let polygons = [];

  //loop through data
  data.features.forEach((feature) => {
    //retrive point
    if (feature.geometry.type === "Point") {
      point = feature.geometry.coordinates;

      //decrise point's coords accurency
      point[0] = roundDigit(point[0]);
      point[1] = roundDigit(point[1]);
    }
    //retrive poligons
    if (feature.geometry.type === "Polygon") {
      feature.geometry.coordinates.forEach((coord) => {
        //decrise polygon's coords accurency
        roundCoords(coord);
        polygons.push(coord);
      });
    }
  });
  let inBoundaries = false;
  for (let i = 0; i < polygons.length; i++) {
    inBoundaries = checkPointInPolygone(point, polygons[i]);
    if (inBoundaries) break;
  }
  return inBoundaries;
};

function roundCoords(digits) {
  digits.forEach((digit) => {
    digit[0] = roundDigit(digit[0]);
    digit[1] = roundDigit(digit[1]);
  });
}

function roundDigit(digit, decim = 7) {
  const mult = Math.pow(10, decim);
  return Math.round(digit * mult) / mult;
}

function checkPointInPolygone(point, polygon) {
  const pt = turf.point(point);
  const poly = turf.polygon([polygon]);
  return booleanPointInPolygon.default(pt, poly);
}

module.exports = checkPoint;
