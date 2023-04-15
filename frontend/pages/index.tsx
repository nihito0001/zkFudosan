import { useEffect, useState } from 'react';
import { Button, Text, Container, Grid, Modal, Loading } from '@nextui-org/react';
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
import ResultModal from '../components/modal/ResultModal';
import TextInputController from '../components/input/TextInputController';

type Listing = {
  id: number;
  listingId: string;
  reservePrice: number;
  endTime: string;
  owner: string;
  detailText: string;
  listingStatus: number;
};

const dateFormat = (_listing: Listing): string => {
  const d = new Date(Number(_listing.endTime) * 1000);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

const HomePage: NextPageWithLayout = () => {
  // Use
  const { active, library } = useWeb3React();
  const { getAllActiveListings, activeListings } = useGetAllActiveListings();
  const { createOffer, loading } = useCreateOffer();

  // State
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [resultRecipt, setResultRecipt] = useState<any>(null);
  const [listingId, setListingId] = useState<string>('');

  const [offerListingModal, setOfferListingModal] = useState<boolean>(false);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<Listing | undefined>(
    undefined
  );

  const { control, handleSubmit, reset } = useForm<CreateOfferRequest>({
    defaultValues: {
      listingId: '',
      price: '',
    },
  });

  const onSubmitOffer: SubmitHandler<CreateOfferRequest> = async (
    data: CreateOfferRequest
  ) => {
    const params = {
      listingId: listingId,
      price: data.price,
    }
    const tx = await createOffer(params, library.getSigner());
    setResultRecipt(tx)
    setOfferListingModal(false)
    getAllActiveListings(library.getSigner());
    reset();
    setResultModal(true)
  };

  useEffect(() => {
    if (active) {
      getAllActiveListings(library.getSigner());
    }
  }, [active]);

  useEffect(() => {
    if (window.localStorage.getItem('welcome-modal') !== '1') {
      setWelcomeModal(true);
    }
  }, []);

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} css={{ paddingBottom: "0", marginBottom: "inherit" }}>
            <Text h1 color="white">
              Listings
            </Text>
          </Grid>
          <Grid xs={12} css={{ paddingTop: "0" }} >
            <Text color='white'>
            All the information of the listed mediation contracts.<br/>
Everyone can view it and make offers by specifying the offered amount for the listing they want to mediate.
              </Text>
          </Grid>
          <Grid xs={12}>
            <Grid.Container gap={2}>
              {activeListings.length === 0 && <p>Not data.</p>}

              {activeListings.length !== 0 &&
                activeListings.map((listing: Listing) => {
                  return (
                    <Grid key={listing.id} xs={12} md={4}>
                      <ListingCard
                        listingId={listing.listingId.toString()}
                        reservePrice={listing.reservePrice.toString()}
                        owner={listing.owner}
                        detail={listing.detailText}
                        listingStatus={listing.listingStatus}
                        buttonLabel="Offer"
                        handler={() => {
                          setListingId(listing.listingId.toString())
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
        <Modal
          className="offer-listing"
          aria-label="Offer Listing"
          open={offerListingModal}
        >
          <form onSubmit={handleSubmit(onSubmitOffer)}>
            <Modal.Header>
              <Text id="moal-title" size={18} b>
                Offer Listing
              </Text>
            </Modal.Header>
            <Modal.Body>
              {selectedListing && (
                <>
                  <Text>
                    Sale Price :<br />
                    {selectedListing.reservePrice.toString()} ETH
                  </Text>
                  <Text>
                    Duration :<br />
                    ~{dateFormat(selectedListing)}
                  </Text>
                  <Text>
                    Detail :<br/>
                    {selectedListing.detailText}
                  </Text>
                </>
              )}

              <TextInputController
                name="price"
                label="Offer price (wETH)"
                control={control}
                rules={{
                  required: 'Please enter offer price',
                  pattern: {
                    value: /[0-9]{1,3}/,
                    message: 'Please enter the number',
                  },
                }}
                disabled={loading}
                placeholder="Enter offer price"
              />
            </Modal.Body>
            <Modal.Footer>
              {loading ? (
                <>
                  <Button
                    auto
                    color="error"
                    shadow
                    disabled
                  >
                    <Loading type="points" color="currentColor" size="sm" />
                  </Button>
                  <Button auto color="secondary" disabled shadow>
                    <Loading type="points" color="currentColor" size="sm" />
                  </Button>
                </>
              ) : (
                <>
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

      <WelcomeModal
        open={welcomeModal}
        handlerClose={() => setWelcomeModal(false)}
      />
    </>
  );
};

HomePage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;
