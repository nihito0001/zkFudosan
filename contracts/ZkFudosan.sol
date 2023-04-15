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

    // array of ListingId
    uint256[] public allListingIds;

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

    // getAllActiveListings: 全てのリスティングを取得します。
    function getAllActiveListings() external view returns (Listing[] memory) {
        Listing[] memory _activeListings = new Listing[](allListingIds.length);

        for (uint256 i = 0; i < allListingIds.length; i++) {
            Listing memory listing = listings[allListingIds[i]];
            if (listing.listingStatus == ListingStatus.Active) {
                _activeListings[i] = listing;
            }
        }

        return _activeListings;
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
            listingStatus,
            _params.detailText,
            // 初期の落札者はownerにしています。
            owner
        );

        // リスティングを保存します。
        listings[listingId] = listing;
        userListingIds[owner].push(listingId);
        allListingIds.push(listingId);

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
    function closeListing(uint256 _listingId) external {
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

        // 一番高いオファーを取得します。
        Offer memory highestOffer = getHighestPriceOffer(_listingId);

        // オファーが存在するか確認します。
        require(highestOffer.offerId != 0, "Offer does not exist");

        // リスティングのステータスをClosedにします。
        listing.listingStatus = ListingStatus.Closed;
        listing.closer = highestOffer.offeror;

        // リスティングを保存します。
        listings[_listingId] = listing;

        // リスティングが成立したことを通知します。
        emit ListingClosed(_listingId, listing);
    }

    // getHighestPriceOffer: 一番priceの高いオファーを取得する
    function getHighestPriceOffer(
        uint256 _listingId
    ) internal view returns (Offer memory) {
        uint256[] memory offerIds = listingOfferIds[_listingId];

        Offer memory highestPriceOffer;
        uint256 memoPrice = 0;
        for (uint256 i = 0; i < offerIds.length; i++) {
            Offer memory offer = offers[_listingId][offerIds[i]];

            if (offer.price > memoPrice) {
                highestPriceOffer = offer;
            }
        }
        return highestPriceOffer;
    }

    // cancelListing: リスティングをキャンセルします。
    function cancelListing(uint256 _listingId) external {
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

        // リスティングのステータスをCancelledにします。
        listing.listingStatus = ListingStatus.Cancelled;

        // リスティングを保存します。
        listings[_listingId] = listing;

        // リスティングがキャンセルされたことを通知します。
        emit ListingCancelled(_listingId, listing);

        // TODO depositoを返金する
    }

    // approve: リスティングを承認します。
    function approve(uint256 _offerId) external {}

    // decline: リスティングを拒否します。
    function decline(uint256 _listingId) external {}

    // getPlatformFeeRecipient: プラットフォームの手数料を受け取るアドレスを取得します。
    function getPlatformFeeRecipient() external view returns (address) {
        return platformFeeRecipient;
    }
}
