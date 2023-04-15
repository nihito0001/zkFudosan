import React from 'react';
import { Button, Container, Text, Input, Grid } from '@nextui-org/react';
import type { NextPageWithLayout } from '../pages/_app';
import DefaultLayout from '../components/layouts/DefaultLayout';

const MyPage: NextPageWithLayout = () => {
  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} justify="center">
            <Text h1 color="white">
              MyPage
            </Text>
          </Grid>
          <Grid xs={12} justify="center">
            <Grid xs={4} justify="center">
              <Input
                label="Name"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter building name"
                contentLeft={<Text>🏢</Text>}
              />
            </Grid>
          </Grid>
          <Grid xs={12} justify="center">
            <Grid xs={4} justify="center">
              <Input
                label="Address"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter building address"
                contentLeft={<Text>📍</Text>}
              />
            </Grid>
          </Grid>
          <Grid xs={12} justify="center">
            <Button color="gradient" shadow>
              sell
            </Button>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

MyPage.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyPage;
