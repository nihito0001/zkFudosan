// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {IZkFudosan} from "./IZkFudosan.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ZkFudosan is IZkFudosan, ReentrancyGuard, AccessControl {
    // contractURI: コントラクトのURI
    string public contractURI;

    // platformFeeRecipient: プラットフォームの手数料を受け取るアドレス
    address private platformFeeRecipient;

    // listingId => Listing
    mapping(uint256 => Listing) public listings;

    // listingId => offerId => Offer
    mapping(uint256 => mapping(uint256 => Offer)) public offers;

    // address => listingId[]
    mapping(address => uint256[]) private userListingIds;

    // address => listingId[]
    mapping(address => uint256[]) private userOfferIds;

    // listingId => offerId[]
    mapping(uint256 => uint256[]) private listingOfferIds;

    constructor(
        address _defaultAdmin,
        string memory _contractURI,
        address _platformFeeRecipient
    ) {
        // Initialize this contract's state.
        contractURI = _contractURI;
        platformFeeRecipient = _platformFeeRecipient;

        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
    }

    // getMyListings: 自分のリスティングを取得します。
    function getMyListings() external view returns (Listing[] memory) {
        // リスティングのIDの配列を取得します。
        uint256[] memory listingIds = userListingIds[msg.sender];

        // リスティングの配列を作成します。
        Listing[] memory _myListings = new Listing[](listingIds.length);

        // リスティングの配列を作成します。
        for (uint256 i = 0; i < listingIds.length; i++) {
            _myListings[i] = listings[listingIds[i]];
        }

        return _myListings;
    }

    // getOffers: 指定したリスティングのオファー一覧を取得します。
    function getOffers(
        uint256 _listingId
    ) external view returns (Offer[] memory) {
        uint256[] memory offerIds = listingOfferIds[_listingId];

        // オファーの配列を作成します。
        Offer[] memory _offers = new Offer[](offerIds.length);

        // リスティングの配列を作成します。
        for (uint256 i = 0; i < offerIds.length; i++) {
            _offers[i] = offers[_listingId][offerIds[i]];
        }

        return _offers;
    }

    function getAllActiveListings() external view returns (Listing[] memory) {
        // 増田さんにきく
    }

    // createListing: リスティングを作成します。
    function createListing(ListingParameters memory _params) external {
        // リスティングの作成者がリスティングのオーナーとなります。
        address owner = msg.sender;

        // リスティングの終了時間を計算します。
        uint256 endTime = block.timestamp + _params.secondsUntilEndTime;

        // リスティングのIDを計算します。
        uint256 listingId = uint256(
            keccak256(abi.encodePacked(owner, endTime))
        );

        // リスティングのステータスをActiveにします。
        ListingStatus listingStatus = ListingStatus.Active;

        // リスティングを作成します。
        Listing memory listing = Listing(
            listingId,
            owner,
            endTime,
            _params.reservePrice,
            listingStatus
        );

        // リスティングを保存します。
        listings[listingId] = listing;
        userListingIds[owner].push(listingId);

        // リスティングが作成されたことを通知します。
        emit ListingAdded(listingId, owner, listing);
    }

    // offer: リスティングにオファーをします。
    // この際金額をdepositします。
    function createOffer(uint256 _listingId) external payable {
        // リスティングを取得します。
        Listing memory listing = listings[_listingId];

        // リスティングが存在するか確認します。
        require(listing.listingId != 0, "Listing does not exist");

        // リスティングのステータスがActiveか確認します。
        require(
            listing.listingStatus == ListingStatus.Active,
            "Listing is not active"
        );

        // リスティングの終了時間が現在時刻よりも後か確認します。
        require(block.timestamp < listing.endTime, "Listing is already closed");

        // リスティングの最低価格よりも高い金額を送金しているか確認します。
        require(
            msg.value >= listing.reservePrice,
            "Offer price is less than reserve price"
        );

        // オファーのIDを計算します。
        uint256 offerId = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        );

        // オファーを作成します。
        Offer memory offer = Offer(offerId, _listingId, msg.sender, msg.value);

        // オファーを保存します。
        offers[_listingId][offerId] = offer;
        listingOfferIds[listing.listingId].push(offerId);
        userOfferIds[msg.sender].push(offerId);

        // オファーが作成されたことを通知します。
        emit OfferAdded(_listingId, msg.sender, offer);
    }

    // closeListing: リスティングを成立させます。
    function closeListing(uint256 _listingId, uint256 _offerId) external {}

    // cancelListing: リスティングをキャンセルします。
    function cancelListing(uint256 _listingId) external {}

    // approve: リスティングを承認します。
    function approve(uint256 _offerId) external {}

    // decline: リスティングを拒否します。
    function decline(uint256 _listingId) external {}

    // getPlatformFeeRecipient: プラットフォームの手数料を受け取るアドレスを取得します。
    function getPlatformFeeRecipient() external view returns (address) {
        return platformFeeRecipient;
    }
}
