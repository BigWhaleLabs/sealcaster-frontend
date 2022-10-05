export const walletOptions = {
  wallet: 'Wallet',
  etherscan: 'Etherscan',
  disconnect: 'Disconnect',
} as { [name: string]: string }

export default interface WalletOptionType {
  wallet?: () => void
  disconnect: () => void
  etherscan: () => void
}
