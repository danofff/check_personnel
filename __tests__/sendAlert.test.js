const sendAlerts = require("../utils/sendAlerts");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

describe("Test send alerts emails", () => {
  const sendingEmailArr = [
    {
      clinitianId: 4,
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [-121.9432383, 37.3247657],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-121.9346809, 37.3363163],
                  [-121.9624901, 37.3361798],
                  [-121.9652367, 37.3046448],
                  [-121.9370842, 37.3049179],
                  [-121.9377708, 37.3176153],
                  [-121.9515038, 37.3167962],
                  [-121.9521904, 37.3260791],
                  [-121.9370842, 37.3264886],
                  [-121.9346809, 37.3363163],
                ],
              ],
            },
          },
        ],
      },
      createdAt: "2022-05-09T04:43:00.682Z",
      lostSince: "2022-05-09T04:29:22.300Z",
      counter: 21,
      _id: new ObjectId("62789bd445af7a34f49eda93"),
      __v: 0,
    },
  ];
});
