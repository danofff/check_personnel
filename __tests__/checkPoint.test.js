const checkPoint = require("../utils/checkPoint");

describe("Testing check point's coords in given boundaries", () => {
  const data1 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.36251490116119, 37.5795209452308],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.35615253448486, 37.587302598423875],
              [-122.35954284667967, 37.58859486022663],
              [-122.36168861389159, 37.58992110558973],
              [-122.36383438110352, 37.591281332695054],
              [-122.36885547637938, 37.587574655404694],
              [-122.37164497375488, 37.5832556334297],
              [-122.3671817779541, 37.57808608084389],
              [-122.35954284667967, 37.57509301791995],
              [-122.34821319580078, 37.58475201586989],
              [-122.35035896301268, 37.58699653313186],
              [-122.35615253448486, 37.587302598423875],
            ],
          ],
        },
      },
    ],
  };

  test("if point in boundaries", () => {
    expect(checkPoint(data1)).toBe(true);
  });

  const data2 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.03287124633789, 37.35363042468854],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.04145431518556, 37.344368504994286],
              [-122.0328712463379, 37.344368504994286],
              [-122.0328712463379, 37.35760507144896],
              [-122.04145431518556, 37.35760507144896],
              [-122.04145431518556, 37.344368504994286],
            ],
          ],
        },
      },
    ],
  };

  test("if point on border line or near to it", () => {
    expect(checkPoint(data2)).toBe(true);
  });

  const data3 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.22101211547853, 37.478604425233506],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.26487159729002, 37.482282467501285],
              [-122.24324226379393, 37.482282467501285],
              [-122.24324226379393, 37.49855903614401],
              [-122.26487159729002, 37.49855903614401],
              [-122.26487159729002, 37.482282467501285],
            ],
          ],
        },
      },
    ],
  };
  test("if point out of boundaries", () => {
    expect(checkPoint(data3)).toBe(false);
  });
});
