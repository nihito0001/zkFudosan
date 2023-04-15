// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IZkFudosan {
    // Listingのステータスです。
    // - Active: リスティング中
    // - Cancel: リスティングがキャンセル
    // - Closed: リスティングが成立
    enum ListingStatus {
        Active,
        Cancel,
        Closed
    }

    // リスティングのパラメーターです。
    // - secondsUntilEndTime: リスティングの終了時間までの秒数
    // - reservePrice: リスティングの最低価格
    struct ListingParameters {
        uint256 secondsUntilEndTime;
        uint256 reservePrice;
    }

    // リスティングの情報です。
    // - listingId: リスティングのID
    // - owner: リスティングのオーナー(wallent address)
    // - endTime: リスティングの終了時間
    // - reservePrice: リスティングの最低価格
    // - listingStatus: リスティングのステータス
    struct Listing {
        uint256 listingId;
        address owner;
        uint256 endTime;
        uint256 reservePrice;
        ListingStatus listingStatus;
        // TODO
        // URLを追加
    }

    // オファーの情報です。
    struct Offer {
        uint256 offerId;
        uint256 listingId;
        address offeror;
        uint256 price;
    }

    // リスティングが作成されたときに発火します。
    event ListingAdded(
        uint256 indexed listingId,
        address indexed lister,
        Listing listing
    );

    // リスティングにオファーがされたときに発火します。
    event OfferAdded(
        uint256 indexed listingId,
        address indexed offeror,
        Offer offer
    );

    // getMyListings: 自分のリスティング一覧を取得します。
    function getMyListings() external view returns (Listing[] memory);

    // getAllActiveListings: アクティブなリスティングを取得します。(すべて)
    function getAllActiveListings() external view returns (Listing[] memory);

    // getOffers: 指定したリスティングのオファー一覧を取得します。
    function getOffers(
        uint256 _listingId
    ) external view returns (Offer[] memory);

    // createListing: リスティングを作成します。
    function createListing(ListingParameters memory _params) external;

    // offer: リスティングにオファーをします。
    // - activeなリスティングに対してのみオファーできるようにする
    // - この際金額をdepositします。
    function createOffer(uint256 _listingId) external payable;

    // closeListing: リスティングした人がリスティングを成立させます。
    function closeListing(uint256 _listingId, uint256 _offerId) external;

    // cancelListing: リスティングした人がリスティングをキャンセルします。
    // - listingOwnerのみキャンセルできるようにする
    function cancelListing(uint256 _listingId) external;

    // approve: リスティングを承認します。
    // - listingに対して成立したオファーした人のみ承認できるようにする
    // - この際金額を送金します。
    function approve(uint256 _offerId) external;

    // decline: リスティングを拒否します。
    function decline(uint256 _listingId) external;

    // getPlatformFeeRecipient: プラットフォームの手数料を受け取るアドレスを取得します。
    function getPlatformFeeRecipient() external view returns (address);
}
