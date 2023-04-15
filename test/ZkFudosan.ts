import Deployment from "./suites/Deployment";
import GetAllActiveListings from "./suites/GetAllActiveListings";
import GetMyListings from "./suites/GetMyListings";
import CreateListing from "./suites/CreateListing";
import CreateOffer from "./suites/CreateOffer";
import CloseListing from "./suites/CloseListing";
import CancelListing from "./suites/CancelListing";
import ApproveOffer from "./suites/ApproveOffer";

describe("ZkFudosan", () => {
  // beforeEach(async () => {
  //   console.log("beforeEach");
  // });

  describe("Deployment", Deployment.bind(this));
  describe("GetAllActiveListings", GetAllActiveListings.bind(this));
  describe("GetMyListings", GetMyListings.bind(this));
  describe("CreateListing", CreateListing.bind(this));
  describe("CreateOffer", CreateOffer.bind(this));
  describe("CloseListing", CloseListing.bind(this));
  describe("CancelListing", CancelListing.bind(this));
  describe("ApproveOffer", ApproveOffer.bind(this));
});
