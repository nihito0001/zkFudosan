import { Button, Container, Grid } from '@nextui-org/react';
import type { NextPageWithLayout } from './_app';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { useWeb3React } from '@web3-react/core';
import useChat from '../hooks/useChat';

const MyPage: NextPageWithLayout = () => {
  const { active } = useWeb3React();

  const { sendMessage } = useChat();

  return (
    <>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Grid.Container gap={2}>
              <Button
                color="gradient"
                disabled={!active}
                shadow
                onPress={() =>
                  sendMessage(
                    '0x2967bE68b12fc7f4c1c66cF7B48988353596196D',
                    'foo barr'
                  )
                }
              >
                Hoge
              </Button>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

MyPage.setLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyPage;
