import { utils } from 'ethers'
import FarcasterSignature from 'models/FarcasterSignature'
import ProofResult from 'models/ProofResult'
import PublicKey from 'models/PublicKey'
import Signature from 'models/Signature'
import generateNonce from 'helpers/generateNonce'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

async function getAddressSignatureInputs(
  publicKey: PublicKey,
  signature: Signature
) {
  const messageBytes = utils.toUtf8Bytes(signature.message)
  const { R8x, R8y, S } = await unpackSignature(
    messageBytes,
    signature.signature
  )

  return {
    address: signature.message,
    addressPubKeyX: publicKey.x,
    addressPubKeyY: publicKey.y,
    addressR8x: R8x,
    addressR8y: R8y,
    addressS: S,
  }
}

async function getFarcasterSignatureInputs(
  publicKey: PublicKey,
  signature: FarcasterSignature
) {
  const { R8x, R8y, S } = await unpackSignature(
    signature.message,
    signature.signature
  )

  return {
    farcasterMessage: signature.message,
    farcasterPubKeyX: publicKey.x,
    farcasterPubKeyY: publicKey.y,
    farcasterR8x: R8x,
    farcasterR8y: R8y,
    farcasterS: S,
  }
}

async function generateInput(
  publicKey: PublicKey,
  addressSignature: Signature,
  farcaterSignature: FarcasterSignature
) {
  const nonce = generateNonce()

  return {
    ...(await getAddressSignatureInputs(publicKey, addressSignature)),
    ...(await getFarcasterSignatureInputs(publicKey, farcaterSignature)),
    nonce,
  }
}

export default async function build(
  publicKey: PublicKey,
  addressSignature: Signature,
  farcaterSignature: FarcasterSignature
): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    await generateInput(publicKey, addressSignature, farcaterSignature),
    '/zk/FarcasterChecker.wasm',
    '/zk/FarcasterChecker_final.zkey'
  )
}
