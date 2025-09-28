# WARA Backlog

## Milestones

### Milestone 1: Setup & Auth (Week 1)
- **Objective**: Establish authentication foundation and developer environment baselines.
- **Related PRD Sections**: `PRD.md` §4.1, §5.1, §8 (Week 1).
- **Stories**:
  - **Story 1.1 — User Authentication**: As a newcomer, I can sign up or log in via email/password or Google OAuth to access the dashboard.
    - **Tickets**:
      - [x] **T1.1.2 — Auth UI Scaffolding**: Build sign up / login forms in `apps/web/src/app/(auth)/` with React Hook Form validation and success navigation to dashboard.
      - [x] **T1.1.3 — Welcome Email Stub**: Implement welcome email trigger (stub webhook + template) to satisfy PRD acceptance for onboarding.
  - **Story 1.2 — Dashboard Shell**: As an authenticated user, I land on a dashboard summarizing my setup.
    - **Tickets**:
      - [x] **T1.2.1 — Dashboard Layout**: Create responsive layout in `apps/web/src/app/dashboard/page.tsx` with cards for WhatsApp connections, agents, recent replies.
      - [x] **T1.2.2 — Providers Wiring**: Ensure `apps/web/src/components/providers.tsx` wraps dashboard with query + theme providers and stub data hooks.
      - [x] **T1.2.3 — Trial Status Indicator**: Display trial countdown and upgrade CTA per PRD subscription gate.
  - **Story 1.3 — Marketing Landing Page**: As a visitor, I understand WARA’s value proposition and can quickly start the onboarding flow.
    - **Tickets**:
      - [x] **T1.3.1 — shadcn Component Setup**: Ensure required shadcn UI components are generated/configured for marketing use (hero, CTA, testimonials) in `apps/web/` per PRD §7.
      - [x] **T1.3.2 — Landing Page Route**: Build responsive marketing page at `apps/web/src/app/(marketing)/page.tsx` using shadcn components to highlight features and CTA.
      - [x] **T1.3.3 — Auth CTA Wiring**: Connect landing page CTA buttons to `/login` and ensure deep link parameters persist trial attribution.
  - **Story 1.4 — WhatsApp Connect Dialog**: As a user, I can connect a WhatsApp Business number and view connection status.

### Milestone 2: WhatsApp Integration (Week 2)
- **Objective**: Enable WhatsApp number connection and webhook handling via Twilio.
- **Related PRD Sections**: `PRD.md` §4.2, §5.3, §8 (Week 2).
- **Stories**:
  - **Story 2.1 — Connect WhatsApp Flow**: As a user, I can connect a WhatsApp Business number and view connection status.
    - **Tickets**:
      - [x] **T2.1.1 — Prisma WhatsApp Schema**: Existing `integration_account` model already stores WhatsApp data; no additional `whatsapp_accounts` table required.
      - [x] **T2.1.2 — tRPC Connect Mutation**: `packages/server-core/src/routes/integrations.ts` already exposes connect/disconnect endpoints via Eden client.
      - **T2.1.3 — UI Connection Wizard**: Build stepper UI in `apps/web/src/app/dashboard/whatsapp/connect.tsx` to guide Twilio embedded signup.
      - **T2.1.4 — Twilio Subaccount per Customer**: Create/fetch a Twilio Subaccount for each user via API; persist mapping (Subaccount SID) against `IntegrationAccount` metadata.
      - **T2.1.5 — API Key Management**: Generate a Subaccount-scoped API Key/Secret; store encrypted in DB (at rest). Rotate on disconnect/revoke.
      - **T2.1.6 — Onboarding Start Endpoint**: Backend endpoint returns Twilio WhatsApp Embedded/Hosted Onboarding link for the user’s Subaccount. Feature-flag if onboarding isn’t enabled yet.
      - **T2.1.7 — Wizard Step 2 Integration**: Replace console link with a “Start WhatsApp Onboarding” action; open in popup and provide a “Check connection” button.
      - **T2.1.8 — Sender Detection & Status**: Backend `listWhatsAppSenders(subaccountSid)` checks for available/approved WA senders; frontend polls until ready.
      - **T2.1.9 — Messaging Service Provisioning**: Create a Messaging Service in the Subaccount, attach sender, and set inbound webhook URL to `apps/server/src/routes/webhook.whatsapp.ts`. Persist Service SID/Sender SID.
      - **T2.1.10 — Outbound Send Helper**: Implement a small server helper to send a test message via the Messaging Service for verification.
      - **T2.1.11 — Server Env Validation**: Extend `packages/server-core/src/env.ts` to validate required Twilio env vars and surface helpful errors.
      - **T2.1.12 — Implement Twilio Service (SDK/REST)**: Replace stubs in `packages/server-core/src/twilio/service.ts` with real calls using the official SDK or REST endpoints.
      - **T2.1.13 — Secret Storage (Encryption-at-Rest)**: Encrypt Subaccount API Key/Secret and (if stored) Subaccount Auth Token. Add helpers to decrypt on use.
      - **T2.1.14 — Identifier Persistence**: Persist sender phone and WA identifiers via `IntegrationAccountIdentifier` to map inbound webhooks to the correct account.
      - **T2.1.15 — Webhook URL Provisioning**: Use `SERVER_PUBLIC_URL` to construct and set `/webhook/whatsapp` as the Messaging Service inbound URL.
  - **Story 2.2 — Webhook Processing**: As the system, I receive incoming WhatsApp messages and store them.
    - **Tickets**:
      - **T2.2.1 — Webhook Route**: Implement `apps/server/src/routes/webhook.whatsapp.ts` to validate Twilio signatures and persist messages.
      - **T2.2.2 — Message Log UI**: Show latest messages in dashboard activity feed using React Query subscriptions.
      - **T2.2.3 — Signature Verification**: Verify `X-Twilio-Signature` using the tenant’s Subaccount Auth Token. Reject invalid requests.
      - **T2.2.4 — Inbound Mapping & Persistence**: Map Twilio WhatsApp payloads to `IntegrationMessage` (direction/body/metadata, timestamps, statuses).
      - **T2.2.5 — Activity Feed API**: Add a server endpoint to fetch recent messages (with pagination/filters) and optionally a stream/subscription mechanism.
      - **T2.2.6 — Frontend Activity Feed**: Implement the UI list with direction badges and timestamps, powered by React Query polling/subscriptions.
      - **T2.2.7 — Signature Verification (Tenant)**: Verify `X-Twilio-Signature` against the tenant’s Subaccount Auth Token and reject invalid requests.
      - **T2.2.8 — E2E Inbound Test**: Automated test to POST a sample Twilio webhook and assert `integration_message` persistence.
      - **T2.2.9 — E2E Outbound Test**: Trigger a test send via Messaging Service and verify Twilio accepted the message (mock/sandbox acceptable initially).

### Milestone 3: AI Reply & Catalog (Week 3)
- **Objective**: Ground AI replies with catalog data and return responses via Twilio.
- **Related PRD Sections**: `PRD.md` §4.3, §5.2, §5.3, §8 (Week 3).
- **Stories**:
  - **Story 3.1 — Catalog Upload**: As a user, I upload product data for AI context.
    - **Tickets**:
      - **T3.1.1 — Catalog Schema**: Add `catalogs` and `products` tables with relations in Prisma and regenerate client.
      - **T3.1.2 — Upload Endpoint**: Create streaming upload handler (`apps/server/src/routes/catalog.upload.ts`) supporting CSV/JSON parsing with validation.
      - **T3.1.3 — Catalog UI**: Provide upload form, success state, and product list in dashboard catalog tab.
  - **Story 3.2 — AI Reply Generation**: As the agent, I craft responses using OpenAI with catalog grounding.
    - **Tickets**:
      - **T3.2.1 — Prompt Builder**: Implement prompt assembly helper in `packages/server-core/src/ai/prompt.ts` referencing catalog data and guardrails.
      - **T3.2.2 — Reply Service**: Integrate OpenAI SDK, fallback echo, and Twilio send logic in `apps/server/src/services/reply.ts`.
      - **T3.2.3 — Dashboard Reply Stream**: Display reply status per conversation with loading/error indicators.

### Implementation Notes — Twilio Integration (Details)

- **Architecture**
  - Subaccounts per customer under a single Twilio master account to isolate credentials and usage.
  - Subaccount-scoped API Key/Secret stored encrypted in DB (e.g., on `IntegrationAccount.metadata`).
  - A Messaging Service per tenant with the WhatsApp sender attached; inbound webhook set to our server.

- **End-to-End Flow in App**
  - 1) User clicks Connect WhatsApp in the dashboard.
  - 2) Backend creates/fetches a Twilio Subaccount and API Key, persists securely.
  - 3) Backend returns an onboarding link for WhatsApp Embedded/Hosted Signup (Meta approval flow).
  - 4) User completes onboarding in popup.
  - 5) Frontend polls a status endpoint; backend lists WhatsApp senders until one is approved/ready.
  - 6) Backend creates a Messaging Service, attaches the sender, sets the inbound webhook URL.
  - 7) We mark the integration as connected and enable outbound send.

- **Server Deliverables**
  - Twilio client wrapper (e.g., `packages/server-core/src/twilio/service.ts`):
    - `createSubaccount(userId)`
    - `createSubaccountApiKey(subaccountSid)`
    - `listWhatsAppSenders(subaccountSid)`
    - `createMessagingService(subaccountSid)`
    - `addSenderToService(serviceSid, senderSid)`
    - `updateServiceInboundUrl(serviceSid, webhookUrl)`
  - Webhook route: `apps/server/src/routes/webhook.whatsapp.ts` with signature verification and persistence.
  - Onboarding start endpoint: returns the Embedded/Hosted Signup link; add feature flag for when Twilio enables it for the master account.

- **Frontend Deliverables**
  - Wizard Step 2: call onboarding endpoint instead of linking the console; show “Check connection” and poll status.
  - Activity Feed UI: list latest messages with direction and timestamps; wire to server Activity Feed API.

- **Required Environment Variables**
  - `TWILIO_ACCOUNT_SID`: Master account SID used for subaccount creation.
  - `TWILIO_AUTH_TOKEN`: Master account Auth Token used for privileged API calls.
  - `TWILIO_EMBEDDED_SIGNUP_ENABLED` (true/false): Feature flag to toggle Hosted/Embedded onboarding.
  - `TWILIO_EMBEDDED_SIGNUP_BASE_URL` (optional): Base URL provided by Twilio for onboarding if applicable.
  - `SERVER_PUBLIC_URL`: Public URL of our server used to set Twilio inbound webhook (e.g., `https://api.wara.dev`).
  - Notes:
    - Subaccount API Key/Secret and Subaccount Auth Token are tenant secrets persisted per account (not env). Store encrypted at rest.
    - Frontend already uses `NEXT_PUBLIC_API_BASE_URL` for Eden client.

- **Security & Tenancy**
  - Never expose master Account SID/Auth Token to the client.
  - Encrypt Subaccount API Key/Secret at rest; restrict access by tenant.
  - Verify webhooks using the tenant’s Subaccount Auth Token; log and reject invalid signatures.

- **Alternatives Considered**
  - Customer-supplied Twilio credentials (they manage their own account and number); increases friction and support.
  - WhatsApp Cloud API (Meta) instead of Twilio; different infra/pricing; onboard directly with Meta APIs.

### Milestone 4: Billing & Polish (Week 4)
- **Objective**: Add subscription enforcement, monitoring, and launch readiness items.
- **Related PRD Sections**: `PRD.md` §4.4, §6, §8 (Week 4).
- **Stories**:
  - **Story 4.1 — Subscription Gate**: As a user, I upgrade to continue using the platform post-trial.
    - **Tickets**:
      - **T4.1.1 — Stripe Integration**: Configure price tiers, customer portal links, and usage limit enforcement in `packages/server-core/src/billing/stripe.ts`.
      - **T4.1.2 — Usage Tracking**: Track replies per plan via Prisma counters and show usage in dashboard billing card.
      - **T4.1.3 — Access Middleware**: Enforce plan checks in tRPC procedures to block over-limit actions.
  - **Story 4.2 — Stability & Monitoring**: As the team, we observe and react to issues quickly.
    - **Tickets**:
      - **T4.2.1 — Sentry Setup**: Add Sentry instrumentation for web (`apps/web`) and server (`apps/server`).
      - **T4.2.2 — Rate Limiting**: Implement rate limits on webhook and auth routes using Elysia plugins.
      - **T4.2.3 — Launch Checklist**: Final QA, responsive polish, performance budget checks.

## Logs & Notes
- **2025-09-25**: Backlog initialized from `PRD.md` v1.1; aligns milestones with suggested four-week timeline.
- **2025-09-25**: Completed backend auth foundation (T1.1.1), Resend welcome email hook (T1.1.3), and dashboard summary UI + API stub (T1.2.1); pending end-to-end test of signup UI (T1.1.2).
- **2025-09-25**: Finished auth forms, dashboard providers, and trial indicator (T1.1.2, T1.2.2, T1.2.3). Implemented WhatsApp connect dialog with @tanstack/react-form to prep for Milestone 2 UI.
- **2025-09-25**: Confirmed existing `IntegrationAccount` schema covers WhatsApp connections; marked T2.1.1 as complete without additional Prisma work.
- **2025-09-25**: Defined Twilio integration approach (subaccounts per customer, embedded/hosted onboarding, messaging service provisioning, webhook signature verification). Added detailed Story 2.1/2.2 tickets and implementation notes.
- **2025-09-27**: Adopted actual Twilio integration plan with env variables, encryption of secrets, identifier mapping, webhook URL provisioning, and E2E tests. Ready to implement SDK-based helpers and onboarding/sender endpoints.
- **TODO**: Record progress updates, retro notes, and scope adjustments here as sprints advance.
