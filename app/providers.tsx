'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/utils/wagmi';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
