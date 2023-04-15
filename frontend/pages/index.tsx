import React from 'react';
import { Button, Text, Card, Grid, Spacer } from '@nextui-org/react';
import { Nav } from '../components/navbar/Nav';

export default function Home() {
  const infomation = [
    {address: "tokyo", name: "mori" },
    {address: "tokyo", name: "umi" },
    {address: "tokyo", name: "yama" },
    {address: "tokyo", name: "kawa" },
    {address: "tokyo", name: "yuki" },
    {address: "tokyo", name: "natu" },
]

  return (
    <>
      <Nav />

      <Grid.Container gap={2} css={{ margin: "5" }}>
        <Grid xs={12} justify="center">
            <Text h1 color='white'>Listings</Text>
        </Grid>
        {infomation.map((info) => {
            return (
            <Grid xs={4}>
                <Card>
                <Card.Body>
                    <Grid xs={12} justify='center'>
                      <Text>{info.name}</Text>
                    </Grid>
                    <Spacer y={0.5} />
                    <Grid xs={12} justify='center'>
                      <Text>{info.address}</Text>
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Button auto color="primary" shadow>offer</Button>
                    </Grid>
                </Card.Body>
                </Card>
            </Grid>
            )
        })}
      </Grid.Container>
    </>
  )
}
