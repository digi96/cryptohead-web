/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    APP_CONTRACT_HEADPROFILE_ADDRESS: string;
  }
}

interface Window {
  ethereum: any;
}

interface HeadProfile {
  userId: number;
  address: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
}

interface WalletInfo {
  netWorkId: number;
  address: string | null;
  signedMessage: string | null;
  loggedIn: boolean;
}

interface HeadProfileCreation {
  userId: number;
  userType: number;
  userAddress: string;
  displayName: string;
  email: string;
  isEmailVerified: boolean;
  lastUpdate: string;
  emailVerifyNumber: number;
}
