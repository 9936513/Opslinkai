# OpsLinkAI

A Next.js application for AI-powered operations linking.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory with pages and API routes
- `components/` - Reusable React components
- `app/api/extract/` - API endpoint for data extraction

## Pricing & Plans

| Plan | Price | AI Extractions | Features | Target Users |
|------|-------|---------------|----------|--------------|
| Starter | $29/month | 100 extractions/month | Basic CRM, Email support | Individual agents |
| Pro | $79/month | Unlimited extractions | Advanced CRM, Priority support, API access | Power users, Small teams |
| Enterprise | $199/month | Unlimited + Team features | Multi-user, Custom integrations, Phone support | Brokerages, Large teams |

### Value Proposition

- ROI: Customers save $400+/month on manual data entry costs
- Time Savings: 30-minute tasks reduced to 30 seconds
- Accuracy: 95%+ confidence scores with AI processing
- Market Size: 2M+ real estate agents in US alone

## API Endpoints

- `POST /api/smart-intake` - Process uploaded files
- `GET /api/smart-intake` - List processing history
- `GET /api/smart-intake/[id]` - Get specific extraction
- `GET /api/health` - Health check endpoint

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Add all `.env.local` variables to your Vercel project settings.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Website**: [smartintake.io](https://smartintake.io)
- **Email**: support@smartintake.io
- **GitHub Issues**: For bugs and feature requests

---

**Built for professionals who want to focus on what matters, not data entry**
