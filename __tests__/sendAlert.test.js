const sendAlert = require("../utils/sendAlert");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

describe("test sending emails", () => {
  const sendingEmailArr = [
    {
      clinicianId: 4,
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
    },
    {
      clinicianId: 1,
      data: null,
      createdAt: "2022-05-09T14:50:01.500+00:00",
      lostSince: "2022-05-09T14:50:01.500+00:00",
    },
  ];
  const emailSendResponses = [];
  beforeAll(async () => {
    for (const dataToSend of sendingEmailArr) {
      const result = await sendAlert(dataToSend, "sam.cassel@yandex.com");
      emailSendResponses.push(result);
    }
  });

  test(`result is array of email sending responses`, () => {
    expect(Array.isArray(emailSendResponses)).toEqual(true);
  });
  test(`results array length = 2`, () => {
    expect(emailSendResponses.length).toEqual(2);
  });
  test(`result accepted is not empty`, () => {
    expect(emailSendResponses[0].accepted.length).not.toEqual(0);
  });
  test(`result accepted email = sam.cassel@yandex.com`, () => {
    expect(emailSendResponses[0].accepted[0]).toEqual("sam.cassel@yandex.com");
  });
  test(`result accepted email from = alert@checkpersonnel.com`, () => {
    expect(emailSendResponses[0].envelope.from).toEqual(
      "alert@checkpersonnel.com"
    );
  });
});
