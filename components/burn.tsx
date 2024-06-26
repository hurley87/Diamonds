'use client';

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';
import { TransactButton } from './transact-button';
import { myNFTABI, myNFTAddress } from '@/utils/myNFT';

export const Burn = ({ tokenId }: { tokenId: number }) => {
  const account = useAccount();
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      const url =
        process.env.PAYMASTER_PROXY_SERVER_URL ||
        `${document.location.origin}/api/paymaster`;
      console.log('PAYMASTER_PROXY_SERVER_URL', url);
      return {
        paymasterService: {
          url,
        },
      };
    }
  }, [availableCapabilities, account.chainId]);

  return (
    <TransactButton
      text="Burn"
      contracts={[
        {
          address: myNFTAddress,
          abi: myNFTABI,
          functionName: 'safeMint',
          args: [account.address],
        },
      ]}
      capabilities={capabilities}
    />
  );
};
