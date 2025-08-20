
![tw-banner](https://github.com/thirdweb-example/next-starter/assets/57885104/20c8ce3b-4e55-4f10-ae03-2fe4743a5ee8)

# LockPay - Secure Escrow Service

A secure blockchain-based escrow service built with [thirdweb](https://thirdweb.com/) and [Next.js](https://nextjs.org/).

## Features

- 🔐 **MetaMask Wallet Integration** - Seamless wallet connection using thirdweb
- 💼 **Transaction Dashboard** - View and manage your escrow transactions
- 🛡️ **Dispute Resolution** - Built-in arbitration system for transaction disputes
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

## Installation

Install the template using [thirdweb create](https://portal.thirdweb.com/cli/create)

```bash
  npx thirdweb create app --next
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-client-id-here
```

### Getting Your Client ID

1. Go to [thirdweb dashboard](https://thirdweb.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to the API Keys section
4. Copy your Client ID
5. Add it to your `.env.local` file

## Wallet Integration

This project includes seamless MetaMask wallet integration:

- **Connect Wallet**: Click the "Connect Wallet" button in the header to connect your MetaMask wallet
- **Wallet Status**: See your connected wallet address and connection status
- **Disconnect**: Use the disconnect button to safely disconnect your wallet
- **Responsive**: Works on both desktop and mobile devices

The wallet integration is built using thirdweb's ConnectWallet component and provides a smooth user experience for blockchain interactions. 

## Run locally

Install dependencies

```bash
yarn
```

Start development server

```bash
yarn dev
```

Create a production build

```bash
yarn build
```

Preview the production build

```bash
yarn start
```

## Resources

- [Documentation](https://portal.thirdweb.com/typescript/v5)
- [Templates](https://thirdweb.com/templates)
- [YouTube](https://www.youtube.com/c/thirdweb)
- [Blog](https://blog.thirdweb.com)

## Need help?

For help or feedback, please [visit our support site](https://thirdweb.com/support)
