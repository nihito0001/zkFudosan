import { Badge, Button, Text, Grid, Card } from '@nextui-org/react';
import { formatLongLengthString } from '../../libs/formatLongLengthString';
import { formatWeiToEth } from '../../libs/formatWeiToEth'

const ListingCard = (props: any) => {
  const {
    listingId,
    reservePrice,
    listingStatus,
    owner,
    buttonLabel,
    handler,
  } = props;

  return (
    <Card variant="bordered">
      <Card.Header css={{ pb: 0 }}>
        <Text>Listing ID: {formatLongLengthString(listingId.toString())}</Text>
      </Card.Header>
      <Card.Header css={{ pt: 0 }}>
        <Text>Owner: {formatLongLengthString(owner)}</Text>
      </Card.Header>
      <Card.Body css={{ pt: 0 }}>
        {listingStatus === 0 && (
          <Badge color="primary" variant="bordered">
            Active
          </Badge>
        )}
        {listingStatus === 1 && (
          <Badge color="warning" variant="bordered">
            Cancelled
          </Badge>
        )}
        {listingStatus === 2 && (
          <Badge color="error" variant="bordered">
            Closed
          </Badge>
        )}
        <Grid xs={12} justify="center" css={{ pb: 0 }}>
          <Text>
            Lowest price
          </Text>
        </Grid>
        <Grid xs={12} justify="center" css={{ pt: 0 }}>
          <Text b h3>
            {formatWeiToEth(reservePrice)} ETH
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

export default ListingCard;
