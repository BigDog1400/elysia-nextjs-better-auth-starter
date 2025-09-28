# Product Requirements Document (PRD): WhatsApp AI Reply Agent (WARA)

## 1. Document Overview
### 1.1 Purpose
This PRD outlines the requirements for building **WARA (WhatsApp AI Reply Agent)**, a SaaS platform that enables salespeople to automate WhatsApp replies using AI-driven agents. The agent acts like a Zapier-style workflow, processing incoming messages, generating context-aware responses via OpenAI, and supporting product catalog integration for personalized sales interactions. 

This document serves as a blueprint for developers, designers, and stakeholders to align on the MVP (Minimum Viable Product) and future iterations. It focuses on the MVP scope while noting expansion opportunities.

### 1.2 Version History
| Version | Date       | Author | Changes |
|---------|------------|--------|---------|
| 1.0     | Sept 24, 2025 | Grok (xAI) | Initial draft based on product discussion. |
| 1.1     | Sept 24, 2025 | Grok (xAI) | Updated tech stack: Added tRPC for type-safe APIs, better-auth for authentication; confirmed Next.js and product name WARA. |

### 1.3 Key Stakeholders
- **Product Owner**: [Your Name/Company] – Defines vision and priorities.
- **Developers**: Next.js backend/frontend team.
- **Designers**: UI/UX for touch-friendly interfaces.
- **External**: Twilio (WhatsApp integration), OpenAI (AI generation).

## 2. Product Vision and Goals
### 2.1 High-Level Overview
WARA empowers salespeople to offload routine WhatsApp conversations to an intelligent agent. When a customer messages (e.g., "What's the price of Product X?"), the agent:
- Analyzes the message.
- Pulls context from the user's uploaded product catalog.
- Generates a custom, natural reply using OpenAI (e.g., "Product X is $49.99—here's a link to buy!").
- Triggers optional actions (e.g., log to CRM, schedule follow-up).

This reduces response time from hours to seconds, boosts sales efficiency, and scales for high-volume sellers.

### 2.2 Business Goals
- **Primary**: Launch MVP within 4-6 weeks to validate WhatsApp connection and basic AI replies with 10 beta users.
- **Secondary**: Achieve 50% user retention by enabling catalog uploads for context-rich replies.
- **Metrics for Success**:
  - 80% of replies generated within 5 seconds.
  - User NPS > 7/10 post-MVP.
  - 20% conversion uplift for sales users (tracked via analytics).

### 2.3 Target Users
- **Primary Persona**: Solo Salesperson (e.g., e-commerce owner, real estate agent).
  - Pain Points: Overwhelmed by 100+ daily WhatsApp queries; manual replies lead to delays/missed sales.
  - Needs: Quick setup, AI that "knows" their products, multi-account support for different client segments.
- **Secondary**: Small Sales Teams (2-5 people) – Shared access to agents.

## 3. MVP Scope
Focus on core value: Seamless WhatsApp connection + simple AI reply. Defer advanced features to v1.1.

### 3.1 In Scope (MVP)
- User authentication and onboarding.
- WhatsApp account connection (via Twilio).
- Basic AI reply generation (OpenAI integration).
- Product catalog upload (simple file parse for context).
- Dashboard for monitoring/replies.
- Simple subscription gate (free trial → paid).

### 3.2 Out of Scope (Post-MVP)
- Full Zapier-like workflows (e.g., multi-step actions like CRM sync).
- Multi-WhatsApp advanced routing.
- Advanced analytics/reporting.
- Mobile app (web-first, responsive for touch).

### 3.3 Assumptions and Dependencies
- **Assumptions**: Users have WhatsApp Business accounts; OpenAI API keys are user-provided or app-managed.
- **Dependencies**:
  - Twilio WhatsApp API (account funded).
  - OpenAI API (GPT-4o-mini for cost-efficiency).
  - Hosting: Vercel for Next.js.
- **Risks**: Meta approval delays for WhatsApp senders (mitigate with sandbox testing); AI hallucinations (mitigate with catalog grounding).

## 4. User Stories and Features
Prioritized by MVP needs. Each story includes acceptance criteria.

### 4.1 Authentication and Onboarding
| Feature | User Story | Acceptance Criteria |
|---------|------------|----------------------|
| Sign Up/Login | As a new user, I want to create an account so I can access WARA. | - Email/password or Google OAuth via better-auth.<br>- Welcome email with setup guide.<br>- Free trial activated (14 days). |
| Dashboard Basics | As a logged-in user, I want a home dashboard so I can overview my setup. | - Shows connected WhatsApps, active agents, recent replies.<br>- Touch-optimized (mobile-first). |

### 4.2 WhatsApp Connection
| Feature | User Story | Acceptance Criteria |
|---------|------------|----------------------|
| Connect WhatsApp | As a user, I want to link my WhatsApp Business number so messages route to WARA. | - "Connect WhatsApp" button triggers Twilio embedded signup (number verification, Meta link).<br>- Supports 1-2 numbers per user (MVP limit).<br>- Status: Pending/Connected/Error.<br>- Webhook setup auto-configured in Next.js API route. |
| Multi-Account Support | As a user, I want to add multiple WhatsApps so I can segment clients (e.g., leads vs. support). | - Add/remove numbers via dashboard.<br>- Basic toggle per number (enable agent). |

### 4.3 AI Reply Agent
| Feature | User Story | Acceptance Criteria |
|---------|------------|----------------------|
| Simple Reply Generation | As a user, I want the agent to auto-reply to incoming messages so I don't miss leads. | - Webhook receives message → OpenAI prompt (e.g., "Reply to: [message]. Use catalog: [products]. Keep salesy but natural.").<br>- Reply sent via Twilio within 24h window.<br>- Fallback: Echo message if AI fails. |
| Catalog Upload | As a user, I want to upload my product catalog so the AI has sales context. | - CSV/JSON upload (parse for products: name, price, desc, image URL).<br>- Stored in DB; injected into OpenAI prompts.<br>- MVP: Basic search (e.g., keyword match). |

### 4.4 Subscriptions
| Feature | User Story | Acceptance Criteria |
|---------|------------|----------------------|
| Basic Billing | As a user, I want a subscription model so the app is sustainable. | - Stripe integration: Free (1 WhatsApp, 100 replies/mo), Pro ($19/mo: Unlimited).<br>- Paywall after trial: "Upgrade to continue."<br>- MVP: Hardcode limits, track usage. |

## 5. Technical Requirements
### 5.1 Architecture Overview
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS for responsive/touch UI, React Hook Form for inputs.
- **Backend**: Next.js API routes for webhooks/auth; tRPC for type-safe API queries/mutations across frontend/backend; Twilio SDK (`npm i twilio`) for messaging; OpenAI SDK (`npm i openai`) for generation; better-auth for secure authentication (email/password, OAuth).
- **Database**: Supabase/Postgres for users, catalogs, reply logs (schema: users, whatsapp_accounts, catalogs, messages).
- **Integrations**:
  - Twilio: Subaccounts per user; webhooks to `/api/webhook/whatsapp`.
  - OpenAI: API key stored per user; prompt engineering for grounded replies.
- **Security**: JWT auth via better-auth; encrypt API keys; rate limiting on webhooks.
- **Deployment**: Vercel (auto-deploys); ngrok for local webhook testing.

### 5.2 Data Flow (MVP Example)
1. Incoming WhatsApp message → Twilio webhook → Next.js API → Parse & store in DB.
2. Trigger OpenAI: Prompt with message + catalog → Generate reply.
3. Send reply via Twilio API.
4. Log to dashboard.

### 5.3 API Endpoints (High-Level)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | User registration via better-auth. |
| `/api/whatsapp/connect` | POST | Initiate Twilio signup (returns status; via tRPC). |
| `/api/catalog/upload` | POST | Parse & store catalog file (via tRPC). |
| `/api/webhook/whatsapp` | POST | Handle incoming messages; generate/send reply. |

## 6. Non-Functional Requirements
- **Performance**: <2s end-to-end reply latency; scale to 1k messages/day.
- **Accessibility**: WCAG 2.1 AA; touch-friendly (e.g., large buttons, swipe gestures).
- **Compliance**: GDPR for data; WhatsApp policies (opt-ins, templates for non-24h replies).
- **Testing**: Unit (Jest for logic), E2E (Cypress for flows); sandbox for WhatsApp.
- **Monitoring**: Sentry for errors; Vercel Analytics for usage.

## 7. Design and UX Guidelines
- **Style**: Modern, sales-oriented (greens/blues for trust); mobile-first (90% usage on phones).
- **Flows**: Stepper for onboarding (e.g., 1. Connect WhatsApp → 2. Upload Catalog → 3. Test Reply).
- **Wireframes**: [To be added; suggest Figma prototype with connect modal and dashboard.]

## 8. Timeline and Milestones (Suggested)
| Milestone | Duration | Deliverables |
|-----------|----------|--------------|
| Week 1 | Setup & Auth | Next.js boilerplate, better-auth login, dashboard skeleton. |
| Week 2 | WhatsApp Integration | Connect flow, webhook handling. |
| Week 3 | AI & Catalog | OpenAI replies, file upload/parse. |
| Week 4 | Polish & Test | Subscriptions, beta testing, deploy. |

## 9. Next Steps
1. **Review & Feedback**: Share this PRD with your team; iterate on priorities.
2. **Prototyping**: Build a Figma wireframe for the connect flow.
3. **Development Kickoff**: Assign tickets (e.g., via Jira/GitHub Issues) based on user stories.
4. **Research Gaps**: If needed, validate OpenAI prompt examples or catalog formats.

This updated PRD integrates the specified tech stack for a more robust, type-safe build. tRPC will streamline your API development in Next.js, and better-auth handles secure sessions out-of-the-box. If we need to add more details (e.g., tRPC router sketches), just let me know!