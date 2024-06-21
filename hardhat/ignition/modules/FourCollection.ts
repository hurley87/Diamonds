import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const FourCollectionModule = buildModule('FourCollectionModule', (m) => {
  const fourCollection = m.contract('FourCollect', [
    '0x7f3ed7C37E1Ab4D0b14572290d3E741b830497cA',
  ]);

  return { fourCollection };
});

export default FourCollectionModule;
