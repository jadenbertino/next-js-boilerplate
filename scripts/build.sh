#!/bin/bash
set -euo pipefail

BUILD_COMMAND="pnpm next build"

if [ -z "${DOPPLER_TOKEN:-}" ]; then
    # local builds
    doppler run -- $BUILD_COMMAND
else
    # vercel builds
    # no need for doppler because all env vars are synced via doppler > vercel integration
    # so vercel handles env vars
    $BUILD_COMMAND
fi