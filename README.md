1. Clone the repo without git history

```bash
mkdir new_project
cd new_project
git clone git@github.com:jadenbertino/next-js-boilerplate.git .
rm -rf .git
git init
git add .
git commit -m "Next.js boilerplate"
```

2. Install dependencies

```bash
pnpm install
```

3. Add project to vercel

- [ ] Vercel > Add project > Add github repository
- [ ] Confirm that the deployment works

4. Configure environment variables

- [ ] Update `src/env/client.ts` and `src/env/server.ts` with the correct environment variables
- [ ] Create a doppler project
- [ ] Set `DOPPLER_TOKEN` in `env/.env.[development | staging | production]`
- [ ] Configure doppler > vercel integration
  - [ ] Go to https://vercel.com/integrations/doppler => setup the integration from vercel’s end. Do NOT start the connection from doppler, trust me you will get issues.
  - [ ] Go to project > settings > Environment variables > confirm that you see doppler env vars were synced (should have doppler icon + be marked as sensitive)
- [ ] Configure all environment variables in doppler
- [ ] Set `ENVIRONMENT` variable when working locally

4. Run the app locally

```bash
pnpm dev
```

5. Push to staging environment

## Additional Useful Tools

- Component Library (e.g. shadcn/ui, tailwind plus, etc)
- Tanstack Query
- Sentry
