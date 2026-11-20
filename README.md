# Pixelpunk

The design playground for UI & UX designers: a tool directory, mini tools, research kits, an arcade of design games, a live articles feed, player accounts and community features.

Built with [Astro](https://astro.build) and deployed on Netlify. Accounts, leaderboards, upvotes and tool suggestions use [Supabase](https://supabase.com). Without Supabase the site still works fully, and saves everything in the visitor's browser.

## Run it locally

```bash
npm install
npm run dev
```

## Switch on accounts & community (Supabase)

1. Create a free project at supabase.com.
2. In **SQL Editor**, paste and run `supabase/schema.sql`.
3. In **Authentication → URL Configuration**, set **Site URL** to the live site address and add `<site>/me/` to **Redirect URLs**.
4. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
5. In Netlify **Site configuration → Environment variables**, add:
   - `PUBLIC_SUPABASE_URL` = the project URL
   - `PUBLIC_SUPABASE_ANON_KEY` = the anon public key
6. Redeploy. For local testing, put the same two lines in a `.env` file (it's git-ignored).

The anon key is meant to be public; row-level security in `schema.sql` keeps each player's data private.

## Moderating tool suggestions

Suggestions arrive in the `submissions` table with status `pending`. In Supabase **Table Editor**, change a row's `status` to `approved` to publish it in the directory and on the community page.

## Where things live

| What | Where |
|---|---|
| Tools list | `src/data/tools.ts` |
| Research kits | `src/content/kits/*.md` |
| Games | `src/pages/arcade/` |
| Article sources | `src/lib/feeds.ts` (refreshed on every build) |
| Design tokens & motion | `src/styles/global.css` |
