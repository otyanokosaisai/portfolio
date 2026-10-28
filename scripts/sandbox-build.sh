#!/bin/sh
# Build the site inside a Docker container, so that dependency code never runs on the Mac.
#   - The repository is mounted read-only and copied in without .git (no hook can be planted).
#   - No home directory, SSH agent or tokens are passed in.
#   - Network only for `pnpm install`; `astro check` and `astro build` run with --network none.
#   - Only dist/ is copied back.
# node_modules and the pnpm store live in Docker volumes, apart from the Mac's node_modules.
# Usage: scripts/sandbox-build.sh            (output in dist/)
#        scripts/sandbox-build.sh --clean    (drop the volumes first)
set -eu

ROOT=$(cd "$(dirname "$0")/.." && pwd)
IMAGE="node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d"
WORK=portfolio-sandbox-work
STORE=portfolio-sandbox-store
HARDEN="--rm --cap-drop ALL --security-opt no-new-privileges"

if [ "${1:-}" = "--clean" ]; then
  docker volume rm -f "$WORK" "$STORE" >/dev/null
fi

echo "== copy the sources (read-only mount, without .git, node_modules, dist)"
docker run $HARDEN -v "$ROOT":/src:ro -v "$WORK":/work "$IMAGE" sh -ec '
  find /work -mindepth 1 -maxdepth 1 ! -name node_modules -exec rm -rf {} +
  tar -C /src --exclude=./.git --exclude=./node_modules --exclude=./dist --exclude=./.astro -cf - . \
    | tar -C /work --no-same-owner -xf -'

echo "== pnpm install (frozen lockfile, build scripts per allowBuilds)"
docker run $HARDEN -e CI=true -v "$WORK":/work -v "$STORE":/store -w /work "$IMAGE" sh -ec '
  corepack enable pnpm >/dev/null
  COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm install --frozen-lockfile --store-dir /store'

echo "== astro check && astro build (no network)"
docker run $HARDEN --network none -v "$WORK":/work -w /work "$IMAGE" sh -ec '
  node_modules/.bin/astro check
  node_modules/.bin/astro build'

echo "== copy dist/ out"
mkdir -p "$ROOT/dist"
docker run $HARDEN -v "$WORK":/work:ro -v "$ROOT/dist":/out "$IMAGE" sh -ec '
  find /out -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  cp -R /work/dist/. /out/'
echo "Built: $ROOT/dist"
