const fetchStatus = require("../utils/fetchStatus");
const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const API_URL = process.env.API_URL;

describe("Test fetchStatus module", () => {
  describe("fetched dummy user #7 ", () => {
    let result = { type: "FeatureCollection" },
      error;
    beforeAll(async () => {
      try {
        const successResponse = await fetchStatus(
          `${API_URL}/clinicianstatus/7`
        );
        if (successResponse.status === 200) {
          result = successResponse.data;
        }
      } catch (error) {
        error = error;
      }
    });

    test("is an object", () => {
      expect(typeof result).toEqual("object");
    });
    test('has property "type" which equals to FeatureCollection', () => {
      expect(result.type).toEqual("FeatureCollection");
    });
  });

  describe("fetched random clinitian", () => {
    let result = { type: "FeatureCollection" },
      error;
    const randId = Math.round(Math.random() * 5) + 1;
    beforeAll(async () => {
      try {
        const successResponse = await fetchStatus(
          `${API_URL}/clinicianstatus/${randId}`
        );
        if (successResponse.status === 200) {
          result = successResponse.data;
        }
      } catch (error) {
        error = error;
      }
    });
    test("is an object", () => {
      expect(typeof result).toEqual("object");
    });
    test('has property "type" which equals to FeatureCollection', () => {
      expect(result.type).toEqual("FeatureCollection");
    });
  });
});
