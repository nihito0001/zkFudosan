import Deployment from "./suites/Deployment";
import CreateListing from "./suites/CreateListing";
import CreateOffer from "./suites/CreateOffer";

describe("ZkFudosan", () => {
  // beforeEach(async () => {
  //   console.log("beforeEach");
  // });

  describe("Deployment", Deployment.bind(this));
  describe("CreateListing", CreateListing.bind(this));
  describe("CreateOffer", CreateOffer.bind(this));
});
