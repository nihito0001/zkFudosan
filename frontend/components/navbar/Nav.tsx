import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Text, Button } from '@nextui-org/react';
import { connector } from '../../config/connectors';
import { useWeb3React } from '@web3-react/core';

export const Nav = () => {
  const { account, active, activate } = useWeb3React();

  useEffect(() => {
    console.log(account);
  }, [account]);

  const router = useRouter().pathname;

  return (
    <>
      <Navbar isBordered>
        <Text h1>zkFudosan</Text>

        <Navbar.Content>
          <Navbar.Link isActive={router === '/'} href="/">
            Listing
          </Navbar.Link>
          <Navbar.Link isActive={router === '/Mypage'} href="/Mypage">MyPage</Navbar.Link>
        </Navbar.Content>

        <Navbar.Content>
          <Navbar.Item>
            <Button
              auto
              color="gradient"
              shadow
              onClick={() => activate(connector.injected)}
            >
              connect wallet
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
};
