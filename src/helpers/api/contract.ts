import * as richRektAbi from '@0xneged/rich-rekt-contract/artifacts/contracts/RichRekt.sol/abi'
import env from 'helpers/env'
import { EthAddressString } from 'types/Blockchain'
import { base } from 'wagmi/chains'

export const richRektContractData = {
  address: env.VITE_CONTRACT_ADDRESS as EthAddressString,
  abi: richRektAbi.abi,
  chainId: base.id,
} as const
