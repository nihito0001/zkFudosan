import React from 'react';
import { Button, Text, Card, Grid, Spacer } from '@nextui-org/react';
import { Nav } from '../components/navbar/Nav';

export default function Home() {
  const infomation = [
    { id: 1, address: 'tokyo', name: 'mori' },
    { id: 2, address: 'tokyo', name: 'umi' },
    { id: 3, address: 'tokyo', name: 'yama' },
    { id: 4, address: 'tokyo', name: 'kawa' },
    { id: 5, address: 'tokyo', name: 'yuki' },
    { id: 6, address: 'tokyo', name: 'natu' },
  ];

  return (
    <>
      <Nav />

      <Grid.Container gap={2} css={{ margin: '5' }}>
        <Grid xs={12} justify="center">
          <Text h1 color="white">
            Listings
          </Text>
        </Grid>
        {infomation.map((info) => {
          return (
            <Grid key={info.id} xs={4}>
              <Card>
                <Card.Body>
                  <Grid xs={12} justify="center">
                    <Text>{info.name}</Text>
                  </Grid>
                  <Spacer y={0.5} />
                  <Grid xs={12} justify="center">
                    <Text>{info.address}</Text>
                  </Grid>
                  <Grid xs={12} justify="center">
                    <Button auto color="primary" shadow>
                      offer
                    </Button>
                  </Grid>
                </Card.Body>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </>
  );
}
