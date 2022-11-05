/// <reference types="react-scripts" />

interface Window {
    ethereum: any
}

interface HeadProfile {
    userId: number;
    address: string;
    displayName: string;
    email: string;
    isEmailVerified: boolean;
  }

interface WalletInfo {
  netWorkId: number,
  address: string,
  connected: boolean
  metamask: boolean
}