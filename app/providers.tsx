'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        appearance: {
          theme: 'dark',
          walletList: ['coinbase_wallet'],
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
