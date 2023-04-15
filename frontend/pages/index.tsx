import React from 'react';
import { Button, Text, Card, Container, Grid, Spacer, Modal, Input  } from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';

const HomePage: NextPageWithLayout = () => {
    // offer modal
    const [visible, setVisible] = React.useState(false);
    const openHandler = () => {
      setVisible(true);
    }
    const closeHandler = () => setVisible(false);
    const offerHandler = () => {
      setVisible(false);
    }

      // Listings一覧取得
  const getListings = () => {
    const infomation = [
      { id: 1, praice: "1.2", Duration: "3", Detail: "ここに詳細情報を出力します。" },
      { id: 2, praice: "0.2", Duration: "6", Detail: "ここに詳細情報を出力します。" },
      { id: 3, praice: "3.2", Duration: "9", Detail: "ここに詳細情報を出力します。" },
      { id: 4, praice: "0.8", Duration: "12", Detail: "ここに詳細情報を出力します。" },
    ]

    return infomation
  }

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} justify="center">
            <Text h1 color="white">
              Listings
            </Text>
          </Grid>
          {getListings().map((info) => {
            return (
              <Grid key={info.id} xs={4}>
                <Card>
                  <Card.Body>
                    <Grid xs={12}>
                  <Text>Reserved Praice : {info.praice} wETH</Text>
                    </Grid>
                    <Spacer y={0.5} />
                    <Grid xs={12}>
                      <Text>Duration : {info.Duration} days</Text>
                    </Grid>
                    <Grid xs={12}>
                      <Text>Detail : {info.Detail}</Text>
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Button auto color="primary" shadow onPress={openHandler}>offer</Button>
                    </Grid>
                  </Card.Body>
                </Card>
              </Grid>
            );
          })}
        </Grid.Container>
      </Container>

            {/* offer modal */}
            <Modal
        closeButton
        className='offer-listing'
        aria-label='Offer Listing'
        open={visible}
        onClose={closeHandler}
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
              type='number'
              bordered
              fullWidth
              color='secondary'
              size="lg"
              placeholder='Enter offer price'
              contentLeft={<Text>💵</Text>}
          />
        </Modal.Body>
        <Modal.Footer>
            <Button auto color="error" shadow onPress={closeHandler}>
                Close
            </Button>
            <Button auto shadow onPress={offerHandler}>
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
