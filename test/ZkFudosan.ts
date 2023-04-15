import Deployment from "./suites/Deployment";
import GetAllActiveListings from "./suites/GetAllActiveListings";
import GetMyListings from "./suites/GetMyListings";
import CreateListing from "./suites/CreateListing";
import CreateOffer from "./suites/CreateOffer";

describe("ZkFudosan", () => {
  // beforeEach(async () => {
  //   console.log("beforeEach");
  // });

  describe("Deployment", Deployment.bind(this));
  describe("GetAllActiveListings", GetAllActiveListings.bind(this));
  describe("GetMyListings", GetMyListings.bind(this));
  describe("CreateListing", CreateListing.bind(this));
  describe("CreateOffer", CreateOffer.bind(this));
});
