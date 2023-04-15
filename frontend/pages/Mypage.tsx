import React from 'react';
import { Button, Container, Text, Input, Grid, Modal, Textarea, Card, Spacer } from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';

const MyPage: NextPageWithLayout = () => {
    // close modal
    const [visible, setVisible] = React.useState(false);
    const openHandler = () => setVisible(true);
    const closeHandler = () => setVisible(false);
    // create listing modal
    const [listing, setListing] = React.useState(false);
    const createListingHandler = () => setListing(true);
    const closeListingHandler = () => setListing(false);

    // id情報取得
    const getId = () => {
        return "a"
    }

        // offer情報取得
        const getOffer = (id: string) => {
            console.log("getOffer")
            const infomation = [
                { id: 1, from: "0xxx0001", price: "1.2" },
                { id: 2, from: "0xxx0002", price: "1.0" },
                { id: 3, from: "0xxx0003", price: "0.8" },
                { id: 4, from: "0xxx0004", price: "0.2" },
                { id: 5, from: "0xxx0005", price: "0.1" },
            ]
            return infomation
        }

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
        <Grid xs={12}>
                <Button color="gradient" shadow onPress={createListingHandler}>create Listing</Button>
            </Grid>

            <Grid xs={12}>
                <Grid.Container gap={2}>
                    <Grid xs={12} justify="center">
                        <Text h1 color='white'>My Listing</Text>
                    </Grid>
                    <Grid xs={12} justify="center">
                        <Text color='white'>Reserved Price : 0.5 wETH</Text>
                    </Grid>
                    <Grid xs={12} justify="center">
                        <Text color='white'>Duration : 3 days</Text>
                    </Grid>
                    <Grid xs={12} justify='center'>
                        <Text color='white'>Detail : ここに詳細情報を表示させる</Text>
                    </Grid>
                </Grid.Container>
            </Grid>

            <Grid xs={12}>
                <Grid.Container gap={2}>
                    <Grid xs={12}>
                        <Text h1 color='white'>Offers</Text>
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
                                    <Grid xs={12} justify='center'>
                                    <Text>{info.price}ETH</Text>
                                    </Grid>
                                    <Grid xs={12} justify='center'>
                                    <Button auto color="primary" shadow onPress={openHandler}>Close</Button>
                                    </Grid>
                                </Card.Body>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid.Container>
            </Grid>

        </Grid.Container>
      </Container>

            {/* close modal */}
            <Modal
            closeButton
            className='closed'
            aria-label='Closed'
            open={visible}
            onClose={closeHandler}
            >
            <Modal.Header>
            <Text id="moal-title" size={18} b>
                Closed
            </Text>
            </Modal.Header>

            <Modal.Body>
                <Grid.Container gap={2} css={{ margin: "5" }}>
                    <Grid xs={12} justify='center'>
                        <Text>successfully closed</Text>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        
        {/* create new listing modal */}
        <Modal
            closeButton
            className='create-new-listing'
            aria-label='Create New Listing'
            open={listing}
            onClose={closeListingHandler}
            >
            <Modal.Header>
            <Text id="moal-title" size={18} b>
                Create New Listing
            </Text>
            </Modal.Header>

            <Modal.Body>
                <Input 
                    label='Reserved Price'
                    clearable
                    bordered
                    fullWidth
                    color='secondary'
                    size="lg"
                    placeholder='Enter reserved price'
                    contentLeft={<Text>💳</Text>}
                />
                <Input 
                    label='Duration'
                    clearable
                    bordered
                    fullWidth
                    color='secondary'
                    size="lg"
                    placeholder='Enter the days of duration'
                    contentLeft={<Text>📆</Text>}
                />
                <Text color='secondary'>Detail</Text>
                <Textarea 
                    bordered
                    fullWidth
                    color='secondary'
                    size="lg"
                    placeholder='Enter reserved price'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto color="secondary" shadow onPress={closeListingHandler}>create Listing</Button>
            </Modal.Footer>
        </Modal>

    </>
  );
};

MyPage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyPage;
