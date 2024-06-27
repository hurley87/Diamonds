'use client';

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';
import { TransactButton } from './transact-button';
import { myNFTABI, myNFTAddress } from '@/utils/myNFT';

export const Burn = ({ tokenId }: { tokenId: number }) => {
  console.log('Burn', tokenId);
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
        'https://api.developer.coinbase.com/rpc/v1/base-sepolia/JxL6umPWXhkvl6FZLjobYH_t--UZbo7j';

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
          functionName: 'burn',
          args: [tokenId],
        },
      ]}
      capabilities={capabilities}
    />
  );
};
