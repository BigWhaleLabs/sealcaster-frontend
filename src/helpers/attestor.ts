import FarcasterSignature from 'models/FarcasterSignature'
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
    message,
    signature,
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
