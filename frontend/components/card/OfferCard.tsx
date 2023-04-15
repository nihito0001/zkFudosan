import { Badge, Button, Text, Grid, Card } from '@nextui-org/react';
import { formatLongLengthString } from '../../libs/formatLongLengthString';
import { formatWeiToEth } from '../../libs/formatWeiToEth'

const OfferCard = (props: any) => {
  const {
    listingId,
    offerId,
    price,
    offerStatus,
    offeror,
    buttonLabel,
    handler,
  } = props;

  return (
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
          <Badge color="primary" variant="bordered">
            Approved
          </Badge>
        )}
        {offerStatus === 3 && (
          <Badge color="primary" variant="bordered">
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
          <Grid xs={12} justify="flex-end">
            <Button auto color="primary" shadow onClick={() => handler()}>
              {buttonLabel}
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  );
};

export default OfferCard;
