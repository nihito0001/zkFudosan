import { useEffect, useState } from 'react';
import { Button, Text, Container, Grid, Modal, Input } from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ListingCard from '../components/card/ListingCard';
import { useWeb3React } from '@web3-react/core';
import useGetAllActiveListings from '../hooks/contracts/useGetAllActiveListings';
import WelcomeModal from '../components/modal/WelcomeModal';
import useCreateOffer, {
  CreateOfferRequest,
} from '../hooks/contracts/useCreateOffer';
import { useForm, SubmitHandler } from 'react-hook-form';

type Listing = {
  listingId: string;
  reservePrice: number;
  endTime: string;
  owner: string;
  detailText: string;
  listingStatus: number;
};

const dateFormat = (_listing: Listing): string => {
  console.log(_listing.endTime.toString());
  const d = new Date(Number(_listing.endTime) * 1000);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

const HomePage: NextPageWithLayout = () => {
  // Use
  const { active, library } = useWeb3React();
  const { getAllActiveListings, activeListings } = useGetAllActiveListings();
  const { createOffer, loading, txReceipt: txRecipt } = useCreateOffer();

  const [offerListingModal, setOfferListingModal] = useState<boolean>(false);
  const [webcomeModal, setWebcomeModal] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<Listing | undefined>(
    undefined
  );

  const { control, handleSubmit, reset } = useForm<CreateOfferRequest>({
    defaultValues: {
      listingId: '',
      price: 0,
    },
  });

  const onSubmitOffer: SubmitHandler<CreateOfferRequest> = async (
    data: CreateOfferRequest
  ) => {
    await createOffer(data, library.getSigner());
  };

  useEffect(() => {
    if (active) {
      getAllActiveListings(library.getSigner());
    }
  }, [active]);

  useEffect(() => {
    if (window.localStorage.getItem('welcome-modal') !== '1') {
      setWebcomeModal(true);
    }
  }, []);

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

              {activeListings.length !== 0 &&
                activeListings.map((listing: Listing) => {
                  return (
                    <Grid key={listing.id} xs={12} md={4}>
                      {listing.listingStatus.toString()}
                      <ListingCard
                        listingId={listing.listingId.toString()}
                        reservePrice={listing.reservePrice.toString()}
                        owner={listing.owner}
                        detail={listing.detailText}
                        listingStatus={listing.listingStatus}
                        buttonLabel="Offer"
                        handler={() => {
                          setOfferListingModal(true);
                          setSelectedListing(listing);
                        }}
                      />
                    </Grid>
                  );
                })}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>

      {/* offer modal */}

      <form onSubmit={handleSubmit(onSubmitOffer)}>
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
            {selectedListing && (
              <>
                <Text>
                  Sale Price : {selectedListing.reservePrice.toString()} ETH
                </Text>
                <Text>Duration : ~{dateFormat(selectedListing)}</Text>
                <Text>Detail : </Text>
                <Text>{selectedListing.detailText}</Text>
              </>
            )}

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
            <Button
              auto
              color="error"
              shadow
              onClick={() => setOfferListingModal(false)}
            >
              Close
            </Button>
            <Button auto color="secondary" shadow type="submit">
              Offer
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <WelcomeModal
        open={webcomeModal}
        handlerClose={() => setWebcomeModal(false)}
      />
    </>
  );
};

HomePage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;
