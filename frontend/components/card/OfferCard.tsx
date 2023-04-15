import { useState, useEffect } from 'react';
import { Badge, Button, Text, Grid, Card, Loading } from '@nextui-org/react';
import { formatLongLengthString } from '../../libs/formatLongLengthString';
import { formatWeiToEth } from '../../libs/formatWeiToEth'
import useApproveOffer from '../../hooks/contracts/useApproveOffer';
import ResultModal from '../../components/modal/ResultModal';
import { useWeb3React } from '@web3-react/core';

const OfferCard = (props: any) => {
  const {
    listingId,
    offerId,
    price,
    offerStatus,
    offeror,
    setReloadOfferFlg
  } = props;

  const { library } = useWeb3React();
  const { approveOffer, txReceipt, loading } = useApproveOffer();

  const [resultModal, setResultModal] = useState<boolean>(false);

  useEffect(() => {
    if (txReceipt) {
        setReloadOfferFlg(true)
    }
  }, [txReceipt])

  return (
    <>
      <Card variant="bordered">
        <Card.Header css={{ pb: 0 }}>
          <Text>Listing ID: {formatLongLengthString(listingId.toString())}</Text>
        </Card.Header>
        <Card.Header css={{ py: 0 }}>
          <Text>Offer ID: {formatLongLengthString(offerId.toString())}</Text>
        </Card.Header>
        <Card.Header css={{ pt: 0 }}>
          <Text>Offeror: {formatLongLengthString(offeror)}</Text>
        </Card.Header>
        <Card.Body css={{ pt: 0 }}>
          {offerStatus === 0 && (
            <Badge color="primary" variant="bordered">
              Active
            </Badge>
          )}
          {offerStatus === 1 && (
            <Badge color="warning" variant="bordered">
              Declined
            </Badge>
          )}
          {offerStatus === 2 && (
            <Badge color="success" variant="bordered">
              Approved
            </Badge>
          )}
          {offerStatus === 3 && (
            <Badge color="error" variant="bordered">
              Refunded
            </Badge>
          )}
          <Grid xs={12} justify="center" css={{ pb: 0 }}>
            <Text>
              Offer price
            </Text>
          </Grid>
          <Grid xs={12} justify="center" css={{ pt: 0 }}>
            <Text b h3>
              {formatWeiToEth(price)} ETH
            </Text>
          </Grid>
        </Card.Body>
        <Card.Footer>
          <Grid.Container>
            {offerStatus === 0 && (
              <Grid xs={12} justify="flex-end">
                {loading ? (
                  <Button auto color="primary" disabled>
                    <Loading type="points" color="currentColor" size="sm" />
                  </Button>
                ) : (
                  <Button auto color="primary" shadow onClick={() => approveOffer(offerId, library.getSigner())}>
                    Approve
                  </Button>
                )}
              </Grid>
            )}
          </Grid.Container>
        </Card.Footer>
      </Card>

      <ResultModal
        open={resultModal}
        handlerClose={() => setResultModal(false)}
        recipt={txReceipt}
      />
    </>
  );
};

export default OfferCard;
