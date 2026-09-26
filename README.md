# backoffice-qa

QA automation for [BackOffice](https://github.com/jpl1899/backoffice) — kept as a **separate repo on purpose**, mirroring the real pattern used by `tudeclaracion` / `tudeclaracion-qa`: the app repo and the QA-automation repo have different lifecycles, and these tests run against a *deployed* environment (staging), never against local source.

This is a deliberately lightweight setup (Playwright only) — not a clone of the full [`agentic-qa-boilerplate`](https://github.com/upex-galaxy/agentic-qa-boilerplate) pattern used by `tudeclaracion-qa` (Allure, Xray, Jira sync). Same two-repo topology, without machinery this project doesn't need yet.

## Setup

```bash
bun install
bunx playwright install chromium
cp .env.example .env  # fill in WEB_URL + the two test identities
```

## Running

```bash
bun run test          # headless
bun run test:headed   # see the browser
bun run test:ui       # Playwright's interactive UI mode
```

## Test identities

- **Admin**: any email from `ADMIN_EMAILS` in the BackOffice `.env` (Juan or Matías's real Supabase credentials).
- **Non-admin**: a disposable test account, created directly in Supabase Dashboard -> Authentication -> Users -> Add user. Never reuse a real accountant's credentials for QA.

## Scope notes

- **API automation**: not present yet. BAC-7 (the first story covered here) is a page-level guard with no API route of its own, so there's nothing to hit. It applies to later stories that have server actions with a request/response contract (Catalog CRUD, Accounts Block/Unblock) — this was a scoping decision, not an oversight.
- **UI automation**: `tests/e2e/` — one spec per Jira story, named after its `{Feature} | {Action}` title. Each spec translates that story's own Gherkin AC as directly as possible; the AC is the spec of record, this repo is the executable proof.
