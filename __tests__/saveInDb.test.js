const saveInDb = require("../utils/saveInDb");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const Record = require("../Models/Record");

const DB_CONNECTION = process.env.DB_CONNECTION;

describe("Test save in database", () => {
  const dummyData = {
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
  describe("saving the record using mongoose Model", () => {
    let response = null;
    let date = Date.now();
    beforeAll(async () => {
      await mongoose.connect(DB_CONNECTION);
      const record = new Record({
        clinicianId: 7,
        counter: 1,
        data: dummyData,
        createdAt: date,
      });
      response = await record.save();
    });

    test("response record data is an object", () => {
      expect(typeof response.data).toEqual("object");
    });
    test("response record date is the same", () => {
      expect(new Date(response.createdAt).getTime()).toEqual(date);
    });
    test("response clinitian id = 7", () => {
      expect(response.clinicianId).toEqual(7);
    });
    test("response counter equals 1", () => {
      expect(response.counter).toEqual(1);
    });
    afterAll(async () => {
      await mongoose.connection.close();
    });
  });

  describe("saving records using saveInDb module", () => {
    let result = [];
    const randUserId1 = Math.round(Math.random() * 10000 + 8);
    const randUserId2 = Math.round(Math.random() * 10000 + 8);
    beforeAll(async () => {
      await mongoose.connect(DB_CONNECTION);
      const records = [
        {
          clinicianId: randUserId1,
          data: dummyData,
        },
        {
          clinicianId: randUserId2,
          data: dummyData,
        },
      ];
      for (const record of records) {
        const response = await saveInDb(record);
        result.push(response);
      }
    });

    test(`result is array of records`, () => {
      expect(Array.isArray(result)).toEqual(true);
    });
    test(`result array length = 2`, () => {
      expect(result.length).toEqual(2);
    });
    test(`result clinician id = ${randUserId1}`, () => {
      expect(result[0].clinicianId).toEqual(randUserId1);
    });
    test(`result clinician counter = 1`, () => {
      expect(result[0].counter).toEqual(1);
    });

    afterAll(async () => {
      await mongoose.connection.close();
    });
  });
});
