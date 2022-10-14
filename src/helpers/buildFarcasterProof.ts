import { utils } from 'ethers'
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
  signature: Signature,
  address: string
) {
  const farcasterBytes = utils.toUtf8Bytes('farcaster')
  const message = [0, address, ...farcasterBytes]
  const messageBytes = utils.toUtf8Bytes(signature.message)
  const { R8x, R8y, S } = await unpackSignature(
    messageBytes,
    signature.signature
  )

  return {
    farcasterMessage: message,
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
  farcaterSignature: Signature
) {
  const nonce = generateNonce()

  return {
    ...(await getAddressSignatureInputs(publicKey, addressSignature)),
    ...(await getFarcasterSignatureInputs(
      publicKey,
      farcaterSignature,
      addressSignature.message
    )),
    nonce,
  }
}

export default async function build(
  publicKey: PublicKey,
  addressSignature: Signature,
  farcaterSignature: Signature
): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    await generateInput(publicKey, addressSignature, farcaterSignature),
    '/zk/FarcasterChecker.wasm',
    '/zk/FarcasterChecker_final.zkey'
  )
}
