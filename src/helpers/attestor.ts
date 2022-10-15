import BalanceSignature from 'models/BalanceSignature'
import FarcasterSignature from 'models/FarcasterSignature'
import Network from 'models/Network'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.2/verify`

export async function requestAddressOwnershipAttestation(
  signature: string,
  message: string
) {
  const { data } = await axios.post<Signature>(`${baseURL}/ethereum-address`, {
    signature,
    message,
  })
  return data
}

export async function requestBalanceAttestation(
  tokenAddress: string,
  network: Network,
  ownerAddress: string
) {
  const { data } = await axios.post<BalanceSignature>(`${baseURL}/balance`, {
    tokenAddress,
    network,
    ownerAddress,
  })
  return data
}

export async function requestFarcasterAttestation(address: string) {
  const { data } = await axios.post<FarcasterSignature>(
    `${baseURL}/farcaster`,
    {
      address,
    }
  )
  return data
}

export async function getEddsaPublicKey() {
  const { data } = await axios.get<PublicKey>(`${baseURL}/eddsa-public-key`)
  return data
}
