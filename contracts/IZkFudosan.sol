// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IZkFudosan {
    // Listingのステータスです。
    // - Active: リスティング中
    // - Cancelled: リスティングがキャンセル
    // - Closed: リスティングが成立
    enum ListingStatus {
        Active,
        Cancelled,
        Closed
    }

    // リスティングのパラメーターです。
    // - secondsUntilEndTime: リスティングの終了時間までの秒数
    // - reservePrice: リスティングの最低価格
    struct ListingParameters {
        uint256 secondsUntilEndTime;
        uint256 reservePrice;
        string detailText;
    }

    // リスティングの情報です。
    // - listingId: リスティングのID
    // - owner: リスティングのオーナー(wallent address)
    // - endTime: リスティングの終了時間
    // - reservePrice: リスティングの最低価格
    // - listingStatus: リスティングのステータス
    // - detailText: 詳細分
    // - closer: 落札者
    struct Listing {
        uint256 listingId;
        address owner;
        uint256 endTime;
        uint256 reservePrice;
        ListingStatus listingStatus;
        string detailText;
        address closer;
    }

    enum OfferStatus {
        Active,
        Declined,
        Approved,
        Refunded
    }

    // オファーの情報です。
    struct Offer {
        uint256 offerId;
        uint256 listingId;
        address offeror;
        uint256 price;
        OfferStatus offerStatus;
    }

    // リスティングが作成されたときに発火します。
    event ListingAdded(
        uint256 indexed listingId,
        address indexed lister,
        Listing listing
    );

    // リスティングが成立したときに発火します。
    event ListingClosed(uint256 indexed listingId, Listing listing);

    // リスティングがキャンセルしたときに発火します。
    // - この際depositした金額を返金します。
    event ListingCancelled(uint256 indexed listingId, Listing listing);

    // リスティングにオファーがされたときに発火します。
    event OfferAdded(Offer offer);

    event OfferApproved(Offer offer);

    // getMyListings: 自分のリスティング一覧を取得します。
    function getMyListings() external view returns (Listing[] memory);

    // getMyOffers: 自分のオファー一覧を取得します。
    function getMyOffers() external view returns (Offer[] memory);

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
    // - 一番高いオファー価格のオファーを成立させる
    function closeListing(uint256 _listingId) external;

    // cancelListing: リスティングした人がリスティングをキャンセルします。
    // - listingOwnerのみキャンセルできるようにする
    function cancelListing(uint256 _listingId) external;

    // approveOffer: リスティングを承認します。
    // - listingに対して成立したオファーした人のみ承認できるようにする
    // - この際金額を送金します。
    function approveOffer(uint256 _offerId) external;

    // decline: リスティングを拒否します。
    // function decline(uint256 _listingId) external;
    // TODO

    // getPlatformFeeRecipient: プラットフォームの手数料を受け取るアドレスを取得します。
    function getPlatformFeeRecipient() external view returns (address);
}
