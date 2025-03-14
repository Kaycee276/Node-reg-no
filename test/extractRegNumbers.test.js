const request = require("supertest");
const { app } = require("../index");
const { extractRegNumbers } = require("../index");

let server;

beforeAll((done) => {
  server = app.listen(0, () => {
    done();
  });
});

describe("extractRegNumbers", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should extract valid registration numbers", async () => {
    const text =
      "Here are some registration numbers: 123456789012AB, 987654321098XY.";
    const result = extractRegNumbers(text);
    expect(result).toEqual(["123456789012AB", "987654321098XY"]);
  });

  it("should return a message when no registration numbers are found", () => {
    const text = "No registration numbers here.";
    const result = extractRegNumbers(text);
    expect(result).toEqual(["No registration numbers found"]);
  });
});
