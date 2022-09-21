# Sealcaster frontend code

## Local launch

1. Install dependencies with `yarn`
2. Add `.env` into your project root with proper variables
3. Run the server with `yarn start`

## Environment variables

| Name                                   | Description                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `VITE_ENCRYPT_KEY`                     | Secret key to encrypt local storage                                            |
| `VITE_APP_NAME`                        | App name which is displayed in some wallets                                    |
| `VITE_ETH_NETWORK`                     | Eth network for your providers and contract (defaults to @bwl/constants)       |
| `VITE_ETH_RPC`                         | Ethereum node RPC URI (defaults to @bwl/constants)                             |
| `SC_FARCASTER_LEDGER_CONTRACT_ADDRESS` | SealCred Farcaster Ledger contract address (defaults to @bwl/constants)        |
| `SC_FARCASTER_POSTS_CONTRACT_ADDRESS`  | SealCred Farcaster Posts Storage contract address (defaults to @bwl/constants) |
| `VITE_GSN_PAYMASTER_CONTRACT_ADDRESS`  | GSN Paymaster contract address (defaults to @bwl/constants)                    |
| `VITE_GSN_SC_RELAY`                    | Relay URL (defaults to @bwl/constants)                                         |
| `VITE_FARCASTER_PROFILE_URL`           | Farcaster profile url                                                          |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
