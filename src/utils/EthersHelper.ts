import { Bytes, ethers } from "ethers";

export const signMessage = async () => {
       
    try {
      const messageToSign =
        'Welcome to vist Cryptohead, this request is to get a signature from you, here after we will use this signature to get your wallet address';
      const from = window.ethereum.selectedAddress;
      if (from) {
        console.log('signing message for address:' + from);
        const sign = await window.ethereum.request({
          method: 'personal_sign',
          params: [messageToSign, from, 'cryptohead'],
        });

        console.log('sign : ' + sign);
        //userTools.setSignature(sign);

        return {
          success: true,
          status: 'Sign successfully',
          data: sign,
        };
      } else {
        return {
          success: false,
          status: 'No address selected.',
        };
      }
    } catch (error: any) {
        
      return {
        success: false,
        status: '😥 Something went wrong: ' + error.message,
      };
    }
  };

  export const verifyMessage = async (messageToVerify:Bytes, signature:Bytes) => {
    try {
      const from = window.ethereum.selectedAddress;
      console.log('verying signature..., address:' + from);

      const recoveredAddr = ethers.utils.recoverAddress(messageToVerify, signature);
      
      if (from.toLowerCase() === recoveredAddr.toLowerCase()) {
        console.log('signature and address are valid.');
        return true;
      } else {
        console.log('signature and address are invalid.');
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
