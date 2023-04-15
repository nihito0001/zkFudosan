import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Text,
  Grid,
  Modal,
  Loading,
} from '@nextui-org/react';
import type { NextPageWithLayout } from './_app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import useCreateListing from '../hooks/contracts/useCreateListing';
import TextInputController from '../components/input/TextInputController';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { CreateListingRequest } from '../hooks/contracts/useCreateListing';
import useMyListings from '../hooks/contracts/useGetMyListings';
import useMyOffers from '../hooks/contracts/useGetMyOffers';
import { useWeb3React } from '@web3-react/core';
import OfferCard from '../components/card/OfferCard';
import ListingCard from '../components/card/ListingCard';
import ListingDetailModal from '../components/modal/ListingDetailModal';
import useCloseListing from '../hooks/contracts/useCloseListing';
import ResultModal from '../components/modal/ResultModal';

const MyPage: NextPageWithLayout = () => {
  // Use
  const { active, library } = useWeb3React();
  const { createListing, loading, txRecipt } = useCreateListing();
  const {
    closeListing,
    loading: closeListingLoading,
    txRecipt: closeListingTxRecipt,
  } = useCloseListing();
  const { getMyListings, listings } = useMyListings();
  const { getMyOffers, offers } = useMyOffers();

  // State
  const [listingId, setListingId] = useState<string>('');
  const [listingDetailModal, seListingDetailModal] = useState<boolean>(false);
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [resultRecipt, setResultRecipt] = useState<any>(null);

  // create listing modal
  const [listing, setListing] = useState(false);
  const openListingHandler = () => setListing(true);

  const { control, handleSubmit, reset } = useForm<CreateListingRequest>({
    defaultValues: {
      secondsUntilEndTime: '',
      reservePrice: '',
      detailText: '',
    },
  });

  const onSubmit: SubmitHandler<CreateListingRequest> = async (
    data: CreateListingRequest
  ) => {
    await createListing(data, library.getSigner());
    setResultRecipt(txRecipt)
    getMyListings(library.getSigner());
  };

  const openListingDetailModal = (id: string) => {
    setListingId(id);
    seListingDetailModal(true);
  };

  const handlerCloseListing = async () => {
    setResultModal(false);
    setResultRecipt(null);
    await closeListing(listingId, library.getSigner());
    console.log('closeListingTxRecipt: ', closeListingTxRecipt)
    setResultRecipt(closeListingTxRecipt)
    getMyListings(library.getSigner());
    seListingDetailModal(false);
    setResultModal(true);
  };

  useEffect(() => {
    if (txRecipt) {
      reset();
      setListing(false);
      setResultModal(true);
    }
  }, [txRecipt]);

  useEffect(() => {
    if (active) {
      getMyListings(library.getSigner());
      getMyOffers(library.getSigner());
    }
  }, [active]);

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          {/* listings */}
          <Grid xs={12}>
            <Text h1 color="white">
              My Listing
            </Text>
          </Grid>
          <Grid xs={12}>
            <Button
              color="gradient"
              disabled={!active}
              shadow
              onPress={openListingHandler}
            >
              create Listing
            </Button>
          </Grid>
          <Grid xs={12}>
            <Grid.Container gap={2}>
              {listings.length === 0 && <p>Not data.</p>}

              {listings.length !== 0 &&
                listings.map((listing: any) => {
                  return (
                    <Grid key={listing.listingId.toString()} xs={12} md={4}>
                      <ListingCard
                        listingId={listing.listingId.toString()}
                        reservePrice={listing.reservePrice.toString()}
                        owner={listing.owner}
                        listingStatus={listing.listingStatus}
                        buttonLabel="Detail"
                        handler={() =>
                          openListingDetailModal(listing.listingId.toString())
                        }
                      />
                    </Grid>
                  );
                })}
            </Grid.Container>
          </Grid>

          {/* offers */}
          <Grid xs={12}>
            <Text h1 color="white">
              My Offers
            </Text>
          </Grid>

          <Grid xs={12}>
            <Grid.Container gap={2}>
              {offers.length === 0 && <p>Not data.</p>}

              {offers.length !== 0 &&
                offers.map((offer: any) => {
                  return (
                    <Grid key={offer.id.toString()} xs={4}>
                      <OfferCard
                        listingId={offer.listingId.toString()}
                        offerId={offer.offerId.toString()}
                        reservePrice={offer.price.toString()}
                        offeror={offer.offeror}
                        offerStatus={offer.offerStatus}
                        buttonLabel="Detail"
                      />
                    </Grid>
                  );
                })}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>

      {/* create new listing modal */}
      <Modal
        className="create-new-listing"
        aria-label="Create New Listing"
        open={listing}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Text id="moal-title" size={18} b>
              Create New Listing
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <TextInputController
                  name="secondsUntilEndTime"
                  label="Deadline"
                  control={control}
                  rules={{
                    required: 'Please enter deadline',
                    pattern: {
                      value: /[0-9]{1,15}/,
                      message: 'Please the enter number',
                    },
                  }}
                  disabled={loading}
                  placeholder="Enter the deadline"
                />
              </Grid>
              <Grid xs={12}>
                <TextInputController
                  name="reservePrice"
                  label="Reserve price (wETH)"
                  control={control}
                  rules={{
                    required: 'Please enter reserve price',
                    pattern: {
                      value: /[0-9]{1,3}/,
                      message: 'Please enter the number',
                    },
                  }}
                  disabled={loading}
                  placeholder="Enter reserve price"
                />
              </Grid>
              <Grid xs={12}>
                <TextInputController
                  name="detailText"
                  label="Detail"
                  control={control}
                  rules={{
                    required: 'Please enter detail',
                  }}
                  disabled={loading}
                  placeholder="Enter the days of detail"
                />
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            {loading ? (
              <Button auto color="secondary" disabled>
                <Loading type="points" color="currentColor" size="sm" />
              </Button>
            ) : (
              <>
                <Button
                  flat
                  auto
                  color="error"
                  onPress={() => setListing(false)}
                >
                  Close
                </Button>
                <Button auto color="secondary" shadow type="submit">
                  Create Listing
                </Button>
              </>
            )}
          </Modal.Footer>
        </form>
      </Modal>

      {/* Result modal */}
      <ResultModal
        open={resultModal}
        handlerClose={() => setResultModal(false)}
        recipt={resultRecipt}
      />

      {/* Detail modal */}
      <ListingDetailModal
        open={listingDetailModal}
        handlerClose={() => seListingDetailModal(false)}
        handlerCloseListing={() => handlerCloseListing()}
        listingId={listingId}
        loading={closeListingLoading}
      />
    </>
  );
};

MyPage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyPage;
