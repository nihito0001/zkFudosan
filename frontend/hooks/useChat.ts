import { useWeb3React } from '@web3-react/core';
import * as PushAPI from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';

const useChat = () => {
  const { account, library } = useWeb3React();

  const sendMessage = async (
    receiverAddress: string,
    messageContent: string
  ) => {
    const signer = library.getSigner(account);
    let user = await PushAPI.user.get({
      account: `eip155:${account}`,
    });

    if (!user) {
      user = await PushAPI.user.create({
        account: `eip155:${account}`,
      });
    }

    const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: signer,
    });

    // actual api
    const response = await PushAPI.chat.send({
      messageContent,
      messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF"
      receiverAddress: `eip155:${receiverAddress}`,
      signer: signer,
      pgpPrivateKey: pgpDecryptedPvtKey,
    });
    console.log(response);
  };

  return {
    sendMessage,
  };
};

export default useChat;
