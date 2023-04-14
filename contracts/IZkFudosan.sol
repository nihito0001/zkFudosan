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
    }

    // TODO
    string public contractURI;

    // platformFeeRecipient: プラットフォームの手数料を受け取るアドレス
    address private platformFeeRecipient;

    // listingId => Listing
    mapping(uint256 => Listing) public listings;

    // リスティングが作成されたときに発火します。
    event ListingAdded(
        uint256 indexed listingId,
        address indexed lister,
        Listing listing
    );

    // createListing: リスティングを作成します。
    function createListing(ListingParameters memory _params) external;

    // offer: リスティングにオファーをします。
    // この際金額をdepositします。
    function offer(uint256 _listingId) external payable;

    // closeListing: リスティングを成立させます。
    function closeListing(uint256 _listingId) external;

    // cancelListing: リスティングをキャンセルします。
    // TODO: listingOwnerのみキャンセルできるようにする
    function cancelListing(uint256 _listingId) external;

    // approve: リスティングを承認します。
    // TODO: listingに対して成立したオファーした人のみ承認できるようにする
    // この際金額を送金します。
    function approve(uint256 _listingId) external;

    // decline: リスティングを拒否します。
    function decline(uint256 _listingId) external;
}
