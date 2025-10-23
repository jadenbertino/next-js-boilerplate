set -e

# Validate env
pnpm tsx src/env/client.ts
pnpm tsx src/env/server.ts

# Start dev server
pnpm next dev --turbopack