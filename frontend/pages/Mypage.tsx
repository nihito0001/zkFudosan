import React from 'react';
import {
  Button,
  Container,
  Text,
  Grid,
  Modal,
  Card,
  Spacer,
  Loading
} from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import useCreateListing from '../hooks/contracts/useCreateListing';
import TextInputController from '../components/input/TextInputController';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { CreateListingRequest } from '../hooks/contracts/useCreateListing';
import { useWeb3React } from '@web3-react/core';

const MyPage: NextPageWithLayout = () => {
  const { active, library } = useWeb3React();
  // use
  const { createListing, loading } = useCreateListing();
  // close modal
  const [visible, setVisible] = React.useState(false);
  const openHandler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  // create listing modal
  const [listing, setListing] = React.useState(false);
  const openListingHandler = () => setListing(true);
  const createListingHandler = (req: any) => console.log(req);
  const closeListingHandler = () => setListing(false);

  const { control, handleSubmit } = useForm<CreateListingRequest>({
    defaultValues: {
      secondsUntilEndTime: '',
      reservePrice: '',
      detailText: '',
    },
  });

  const onSubmit: SubmitHandler<CreateListingRequest> = async (data: CreateListingRequest) => {
    console.log(data)
    const tx = await createListing(data, library.getSigner())
    console.log('tx: ', tx)
  }

  // id情報取得
  const getId = () => {
    return 'a';
  };

  // offer情報取得
  const getOffer = (id: string) => {
    console.log('getOffer');
    const infomation = [
      { id: 1, from: '0xxx0001', price: '1.2' },
      { id: 2, from: '0xxx0002', price: '1.0' },
      { id: 3, from: '0xxx0003', price: '0.8' },
      { id: 4, from: '0xxx0004', price: '0.2' },
      { id: 5, from: '0xxx0005', price: '0.1' },
    ];
    return infomation;
  };

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Button color="gradient" disabled={!active} shadow onPress={openListingHandler}>
              create Listing
            </Button>
          </Grid>

          <Grid xs={12}>
            <Grid.Container gap={2}>
              <Grid xs={12} justify="center">
                <Text h1 color="white">
                  My Listing
                </Text>
              </Grid>
              <Grid xs={12} justify="center">
                <Text color="white">Reserved Price : 0.5 wETH</Text>
              </Grid>
              <Grid xs={12} justify="center">
                <Text color="white">Duration : 3 days</Text>
              </Grid>
              <Grid xs={12} justify="center">
                <Text color="white">Detail : ここに詳細情報を表示させる</Text>
              </Grid>
            </Grid.Container>
          </Grid>

          <Grid xs={12}>
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <Text h1 color="white">
                  Offers
                </Text>
              </Grid>
              {getOffer(getId()).map((info) => {
                return (
                  <Grid key={info.id} xs={4}>
                    <Card>
                      <Card.Body>
                        <Grid xs={12}>
                          <Text>{info.from}</Text>
                        </Grid>
                        <Spacer y={0.5} />
                        <Grid xs={12} justify="center">
                          <Text>{info.price}ETH</Text>
                        </Grid>
                        <Grid xs={12} justify="center">
                          <Button
                            auto
                            color="primary"
                            shadow
                            onPress={openHandler}
                          >
                            Close
                          </Button>
                        </Grid>
                      </Card.Body>
                    </Card>
                  </Grid>
                );
              })}
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>

      {/* close modal */}
      <Modal
        closeButton
        className="closed"
        aria-label="Closed"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="moal-title" size={18} b>
            Closed
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Grid.Container gap={2} css={{ margin: '5' }}>
            <Grid xs={12} justify="center">
              <Text>successfully closed</Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* create new listing modal */}
      <Modal
        closeButton
        className="create-new-listing"
        aria-label="Create New Listing"
        open={listing}
        onClose={closeListingHandler}
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
                    message: 'Please the enter number'
                  }
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
                    message: 'Please enter the number'
                  }
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
            <Button auto color="secondary" shadow type="submit">
              <Loading type="points" color="currentColor" size="sm" />
            </Button>
          ) : (
            <Button auto color="secondary" shadow type="submit">
              Create Listing
            </Button>
          )}
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

MyPage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyPage;
