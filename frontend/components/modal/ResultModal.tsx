import { Button, Grid, Modal, Text } from '@nextui-org/react';
import { etherScanUrl } from '../../config/constants'
import { formatLongLengthString } from '../../libs/formatLongLengthString';

const ListingDetailModal = (props: any) => {
  const { open, handlerClose, recipt } = props;

    // 外部サイトに遷移
    const openEtherScan = (tx: string) => {
      window.open(`${etherScanUrl}/tx/${tx}`, '_blank');
    };

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
            Result
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={2}>
            <Grid xs={12} justify="center">
              <Text onClick={() => openEtherScan(recipt?.transactionHash)}>
                {`${etherScanUrl}${formatLongLengthString(recipt?.transactionHash)}`}
              </Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={() => handlerClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListingDetailModal;
