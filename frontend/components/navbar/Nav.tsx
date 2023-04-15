import { useEffect } from 'react';
import { Dropdown, Navbar, Text, Button, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { connector } from '../../config/connectors';
import { useWeb3React } from '@web3-react/core';
import { WalletIcon } from './WalletIcon';
import useEthBalance from '../../hooks/useEthBalance';

export const Nav = () => {
  const { account, active, activate, deactivate } = useWeb3React();
  const { balance, loading, fetchEthBalance } = useEthBalance();

  const formatAccount = (address: string | null | undefined) => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`;
    }
  };

  useEffect(() => {
    if (account) {
      fetchEthBalance(account);
    }
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
          {active ? (
            <Dropdown placement="bottom-right">
              {loading ? (
                <Button bordered color="gradient">
                  <Loading type="points" color="currentColor" size="sm" />
                </Button>
              ) : (
                <Dropdown.Button
                  bordered
                  color="gradient"
                  icon={<WalletIcon fill="currentColor" filled />}
                >
                  {balance} ETH
                </Dropdown.Button>
              )}
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="balance" css={{ height: '$18' }}>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    Connected in as
                  </Text>
                  <Text color="inherit" css={{ d: 'flex' }}>
                    {formatAccount(account)}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  <Text color="error" onClick={() => deactivate()}>
                    Log Out
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Navbar.Item>
              <Button
                auto
                color="gradient"
                shadow
                iconRight={<WalletIcon fill="currentColor" filled />}
                onClick={() => activate(connector.injected)}
              >
                Connect
              </Button>
            </Navbar.Item>
          )}
        </Navbar.Content>
      </Navbar>
    </>
  );
};
