import { useEffect, useState } from 'react';
import {
  Button,
  Text,
  Container,
  Grid,
  Modal,
  Input,
} from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ListingCard from '../components/card/ListingCard';
import { useWeb3React } from '@web3-react/core';
import useGetAllActiveListings from '../hooks/contracts/useGetAllActiveListings';

const HomePage: NextPageWithLayout = () => {
  const { active, library } = useWeb3React();
  const { getAllActiveListings, activeListings } = useGetAllActiveListings();

  const [offerListingModal, setOfferListingModal] = useState(false);

  useEffect(() => {
    if (active) {
      getAllActiveListings(library.getSigner())
    }
  }, [active])

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Text h1 color="white">
              Listings
            </Text>
          </Grid>
          <Grid xs={12}>
            <Grid.Container gap={2}>
              {activeListings.length === 0 && <p>Not data.</p>}

              {activeListings.length !== 0 && activeListings.map((listing: any) => {
                return (
                  <Grid key={listing.listingId.toString()} xs={4}>
                    <ListingCard
                      listingId={listing.listingId.toString()}
                      reservePrice={listing.reservePrice.toString()}
                      owner={listing.owner}
                      detail={listing.detailText}
                      listingStatus={listing.listingStatus}
                      buttonLabel="Offer"
                      handler={() => setOfferListingModal(true)}
                    />
                  </Grid>
                );
              })}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>

      {/* offer modal */}
      <Modal
        className="offer-listing"
        aria-label="Offer Listing"
        open={offerListingModal}
      >
        <Modal.Header>
          <Text id="moal-title" size={18} b>
            Offer Listing
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Sale Price : 10000</Text>
          <Text>Duration : 10 days</Text>
          <Text>Detail : </Text>
          <Text>ここに詳細情報を出力します。</Text>

          <Input
            label="Offer Price"
            type="number"
            bordered
            fullWidth
            color="secondary"
            size="lg"
            placeholder="Enter offer price"
            contentLeft={<Text>💵</Text>}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" shadow onClick={() => setOfferListingModal(false)}>
            Close
          </Button>
          <Button auto shadow onClick={() => {console.log('test')}}>
            Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

HomePage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;
