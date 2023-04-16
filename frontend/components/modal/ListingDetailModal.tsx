import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useChat from '../../hooks/useChat';
import { Button, Card, Grid, Modal, Text, Loading } from '@nextui-org/react';
import useGetOffers from '../../hooks/contracts/useGetOffers';
import { formatLongLengthString } from '../../libs/formatLongLengthString';
import { ethers } from 'ethers';

const ListingDetailModal = (props: any) => {
  const {
    open,
    handlerClose,
    handlerCloseListing,
    listingId,
    listing,
    loading,
  } = props;

  const { active, library } = useWeb3React();
  const { offers, getOffers } = useGetOffers();
  const { sendMessage } = useChat();

  const handleSendMessage = (listing: any) => {
    sendMessage(listing.owner, 'Congratuations!! you got!');
  };

  useEffect(() => {
    if (active && library && listingId) {
      getOffers(listingId, library.getSigner());
    }
  }, [open, active, library]);

  return (
    <>
      <Modal
        aria-label="detail-modal"
        preventClose
        open={open}
        onClose={() => handlerClose()}
      >
        <Modal.Header>
          <Text id="moal-title" size={18} b>
            Listing Detail
            <br />
            {formatLongLengthString(listingId)}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container>
            <Grid xs={12} justify="flex-end" css={{ mb: 24 }}>
              {loading ? (
                <Button auto color="error" disabled>
                  <Loading type="points" color="currentColor" size="sm" />
                </Button>
              ) : (
                <>
                  {listing && listing.listingStatus === 0 && (
                    <Button
                      color="error"
                      disabled={loading}
                      onClick={() => handlerCloseListing()}
                    >
                      Close with highest offer
                    </Button>
                  )}
                  {listing && listing.listingStatus === 2 && (
                    <Button
                      color="success"
                      disabled={loading}
                      onClick={() => handleSendMessage(listing)}
                    >
                      Contact
                    </Button>
                  )}
                </>
              )}
            </Grid>
            {offers.length === 0 && <Text>No offers</Text>}
            {offers.length !== 0 &&
              offers.map((offer: any, index: number) => (
                <>
                  <Card key={index} variant="bordered" css={{ mb: 16 }}>
                    <Card.Header>
                      OfferID:{' '}
                      {formatLongLengthString(offer.offerId.toString())}
                      <br />
                      Owner: {formatLongLengthString(offer.offeror)}
                      <br />
                      Price:{' '}
                      {ethers.utils.formatUnits(offer.price.toString(), 18)} ETH
                    </Card.Header>
                  </Card>
                </>
              ))}
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Button flat auto color="error" disabled>
              <Loading type="points" color="currentColor" size="sm" />
            </Button>
          ) : (
            <Button
              flat
              auto
              color="error"
              disabled={loading}
              onPress={() => handlerClose()}
            >
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListingDetailModal;
