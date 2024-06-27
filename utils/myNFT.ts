export const myNFTABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const myNFTAddress = '0x1f0826412A9D076700Da54153B833Cc8A33A73CC';
