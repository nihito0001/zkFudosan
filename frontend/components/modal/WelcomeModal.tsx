import { Button, Grid, Modal, Text } from '@nextui-org/react';
import { appName } from '../../config/constants'

const WelcomeModal = (props: any) => {
  const { open, handlerClose } = props;

  const close = () => {
    window.localStorage.setItem('welcome-modal', '1');
    handlerClose()
  }

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
            Welcome to {appName}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid justify="center">
            <Text>
              Unlock the Future of Real Estate with Web3<br />Secure, Transparent, and Trustworthy!
            </Text>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="gradient" onPress={() => close()}>
            Go to {appName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WelcomeModal;
