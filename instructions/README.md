# Tech Stack Definition for Windsurf AI

This project uses the following technology stack:

- **Framework:** SvelteKit 2
- **Styling:** Tailwind CSS with Shadcn-Svelte components
- **Database:** Drizzle ORM with Neon PostgreSQL
- **Authentication:** Supabase Auth
- **Payment Gateways:** Stripe and NowPayments for USDT
- **Email:** Resend
- **AI SDK:** Vercel AI SDK for Gemini Flash 2
- **State Management:** Svelte Context API with writable stores
- **Language:** TypeScript

Please keep this tech stack in mind when generating code.

# Project Structure

```

saas-kit/
├── src/
│ ├── lib/
│ │ ├── components/
│ │ │ ├── ui/ # Shadcn-Svelte Components
│ │ │ └── app/ # App-Specific Components
│ │ ├── config/ # Config Files
│ │ ├── db/ # Drizzle ORM
│ │ ├── auth/ # Supabase Auth
│ │ ├── payment/ # Stripe Payment
│ │ ├── ai/ # Gemini AI SDK
│ │ ├── services/ # Services
│ │ ├── utils/ # Utilities
│ │ ├── types/ # Types
│ │ ├── stores/ # Svelte Stores
│ │ └── hooks/ # Svelte Hooks
│ ├── routes/
│ │ ├── (app)/
│ │ │ ├── dashboard/
│ │ │ │ ├── +page.svelte # Dashboard Page
│ │ │ │ └── +layout.svelte # Dashboard Layout
│ │ │ │ └── activity/ # Main App Functionality
│ │ │ │ └── settings/ # User Settings
│ │ │ │ └── billing/ # Payment Page
│ │ │ └── +layout.svelte # App Layout with Sidebar
│ │ └── +page.svelte # Landing Page
│ ├── hooks.server.ts # Global Hooks
│ ├── app.d.ts # Global Types
│ ├── +layout.svelte # Root Layout
│ └── +layout.server.ts # Root Server Layout
├── static/
├── .env
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

#1. Landing Page

Create the landing page component located at `src/routes/+page.svelte`. This page should be a simple marketing page.

Use Tailwind CSS for styling and ensure it is responsive. Include a header with navigation to Sign In, a main hero section, and a footer.

The header should include "Home", "Features", "Pricing", and "Sign In" links.

**Code Example (Basic Header)**

```svelte
<script>
	let links = [
		{ text: 'Home', href: '#home' },
		{ text: 'Features', href: '#features' },
		{ text: 'Pricing', href: '#pricing' },
		{ text: 'Sign In', href: '/sign-in' }
	];
</script>

// src/routes/+page.svelte
<nav class="bg-gray-800 p-4 text-white">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="text-xl font-bold">SaaS Kit</a>
		<ul class="flex gap-4">
			{#each links as link}
				<li><a href={link.href}>{link.text}</a></li>
			{/each}
		</ul>
	</div>
</nav>

<main>// Hero and page content here</main>
```

**Instructions:**
Create a landing page with responsive design using tailwind.
It should include the navigation bar with links, the hero content, features section, pricing, and footer section.

#2. Authentication Setup (Supabase)

# Supabase Authentication Integration

Implement Supabase authentication in `src/lib/auth`.

1.  **Setup:** Create a `config.ts` to store Supabase configuration from env variables.
2.  **Client:** Initialize the Supabase client in `src/lib/auth/supabase.ts`.
3.  **Hooks:** Set up `hooks.server.ts` to protect app pages, using the Supabase server auth helper library.
4.  **Helper Functions:** Create helper functions to handle user signup, signin, signout, and user updates using the Supabase client.
5.  Create a type for the user response from the Supabase SDK.

**Code Example (supabase.ts)**

```ts
// src/lib/auth/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_ANON_KEY || ''
);
```

**Instructions:**
Implement Supabase auth integration. Create supabase.ts, types, hooks.server.ts, and helper functions.

**3. Dashboard Layout & Sidebar (No changes needed, use the previous prompt)**

**4. Dashboard Page (`src/routes/(app)/dashboard/+page.svelte`) (No changes needed, use the previous prompt)**

**5. Project Activity Page (`src/routes/(app)/dashboard/activity/+page.svelte`) (No changes needed, use the previous prompt)**

**6. Settings Page (`src/routes/(app)/dashboard/settings/+page.svelte`)**

# Settings Page with Role-Based Access Control

Modify the settings page at `src/routes/(app)/dashboard/settings/+page.svelte` to include role-based access control.

1.  **Admin Setting:** Add a form field to select a user as an admin, this will be a dropdown with the currently registered users.
2.  **Admin Actions:** Implement logic to:
    - Add/remove users (this might link to another page for user management)
    - Send emails (using the Resend integration)
3.  **UI**: Add a section to see the user's profile information and subscription status.

Include a client-side form validation, and also a server side action with Zod for the Admin settings.

**Instructions:**
Modify the settings page to manage admin settings.
The page should include an admin setting, profile information, and subscription status.

#7. Billing Page (src/routes/(app)/dashboard/billing/+page.svelte)

# Billing Page with Stripe and NowPayments

Modify the billing page at `src/routes/(app)/dashboard/billing/+page.svelte` to support both Stripe and NowPayments.

1.  **Stripe Integration:** (Keep the Stripe logic from the previous prompt)
2.  **NowPayments Integration:**
    - Add logic to initiate USDT payments via NowPayments.
    - Provide the address to send USDT.
    - Display the confirmation once payment has been sent.
    - Include instructions for the user to complete the payment.
3.  Add a section to view subscription history.

Use a modal to display the payment address, and instructions.

**Instructions:**
Implement a billing page with Stripe and NowPayments. Make sure to add types.

#8. Credits Usage System (Drizzle, Context, Character Count)

# Refined Credit Usage System with Drizzle ORM, Svelte Context, and Character Count

Modify the credit usage system:

1.  **Database:**

    - The `users` table in Drizzle should have the `credits` column and `role`.
    - Add a `credit_logs` table with fields: `userId`, `action`, `amount`, `time`, `characters` to keep track of changes.
    - Add a `subscriptions` table with `userId`, `subscriptionId` from stripe, `plan` and `status`.

2.  **Context API:** Update the `creditStore` in `src/lib/stores/creditStore.ts` to:
    - `getCredits`: Fetch credits from database.
    - `deductCredits`: Deduct credits based on the number of _characters processed_ for OCR & data extraction, update the DB, and log the transaction.
    - `addCredits`: Add credits based on subscription or one-time purchases, update the DB, and log the transaction.
    - Update Credits based on subscription renewals.
3.  **Character Count:** Modify AI SDK and credit service to calculate char count when using the AI, and deduct accordingly.
4.  **Context Provider:** Ensure the context provider is working on main layout, with a default set of credits on mount.

**Instructions:**
Modify the DB schema, credit store, and the service to deduct credits based on the number of characters when using the AI for OCR. Use types for safety.

9. AI SDK (Gemini) (No changes needed, use the previous prompt)

10. Stripe & NowPayments API (No changes needed, use the previous prompt, but modify it to include functions for NowPayments)

11. Email Integration (Resend)

# Email Integration with Resend

Implement email integration with Resend in `src/lib/email/resend.ts`.

1.  **Setup:** Initialize Resend with your API key from env variables.
2.  **Helper Functions:** Create a function to send emails using Resend.
3.  **Types:** Create the proper types.

Create a type for the email body.

**Instructions:**
Implement the Resend email integration. Create `resend.ts`, types, and helper functions.

12. Profile Page (Integrated into Settings Page)

# User Profile & Subscription Status

The profile page is integrated into the settings page.

1. **Data:** Display the user's profile information (name, email) from the Supabase session.
2. **Subscription Status:** Display subscription information based on the Stripe data, with the credits.
3. **Data**: Make sure to fetch the data from the DB, to make sure it is consistent.

The credits should be reactive and update based on usage.

**Instructions:**
Update the settings page to display user profile and subscription data.

**Key Points to Consider**

- Modularity: Maintain separation of concerns with modules for each feature.

- Types: Be strict with your types.

- Testing: Write tests for each module.

- Security: Ensure data is protected, especially for passwords, API keys.
