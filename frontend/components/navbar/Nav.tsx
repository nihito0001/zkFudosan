import React, { FC, useCallback } from 'react'
import { Navbar, Text, Button, Modal, Input } from '@nextui-org/react';
import { connector } from '../config/connectors'
import { useWeb3React } from '@web3-react/core'


export const Nav = () => {

    const { active, activate } = useWeb3React()

    const onConnectWalletClick = useCallback(() => {
      console.log('connect wallet clicked')
      activate(connector.injected)
    }, [activate])

    return(
        <>
            <Navbar isBordered>
                
                <Text h1>
                    zkFudosan
                </Text>

                <Navbar.Content>
                    <Navbar.Link isActive href="/">Listing</Navbar.Link>
                    <Navbar.Link href="/Mypage">MyPage</Navbar.Link>
                </Navbar.Content>
            
                <Navbar.Content>
                    <Navbar.Item>
                        <Button auto color="gradient" shadow onClick={onConnectWalletClick}>
                            connect wallet
                        </Button>
                        {active ? 'connected' : 'not connected'}
                    </Navbar.Item>
                </Navbar.Content>

            </Navbar>
        </>
    )
}