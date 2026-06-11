# Operational Notes — Daily & Weekly Procedures

Status: Current

## Core Operational Rules

1. Never deploy to production without verifying on a preview URL first
2. Never edit `sources/` files — they are frozen historical inputs
3. Never commit `.env` — all secrets stay out of the repository
4. Sanity Studio must be redeployed after every schema change: `cd studio && npx sanity deploy`
5. After any Printful product change (new sizes, file update), verify the Shopify sync completed before announcing
6. Check Umami for unusual traffic patterns weekly — a spike usually means a social post landed

## Daily Workflow (when actively developing)

```bash
# 1. Pull latest
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Start dev server
npm run dev

# 4. Work. Test in browser at http://localhost:3000

# 5. Before committing: type check and build check
npm run typecheck
npm run build

# 6. Commit and push
git add .
git commit -m "Add [specific change]"
git push origin feature/your-feature-name

# 7. Check the Oxygen preview URL (in Shopify admin → Hydrogen → deployments)
# 8. Verify the preview looks correct
# 9. Open a PR and merge to main
```

## Adding a New Print Product

1. In Printful: Products → Create product → upload print file (verify ≥150 DPI)
2. Configure sizes and frame variants
3. Set Printful base prices
4. Sync to Shopify (Printful dashboard → Sync)
5. In Shopify: set retail prices on the new product's variants
6. In Shopify: add product to relevant collections
7. In Sanity Studio: create a `productSupplement` document with matching `shopifyHandle`
8. Add artist reference if applicable
9. Add series reference if applicable
10. Publish the Sanity document
11. Verify the product page at `/products/[handle]` looks correct in preview

## Publishing a New Drop (Series)

1. Upload all products for the drop to Printful (step above for each)
2. Create a Shopify collection for this drop (handle: `drop-[series-name]`)
3. Add all drop products to the collection
4. In Sanity Studio: create a `series` document
   - Set `status: "draft"` initially
   - Fill all fields: title, slug, heroImage, description, featuredProducts
   - Set `shopifyCollectionHandle` to the Shopify collection handle
5. Preview the drop page at `/drops/[slug]?sanity-preview=true&sanity-preview-secret=[SECRET]`
6. When ready: change `status` to `"live"` in Sanity and publish
7. The drop appears on `/drops` automatically

## Updating Site-Wide Settings

In Sanity Studio: Documents → Settings (singleton)

- Announcement bar: toggle `enabled`, update text and link
- Footer navigation: reorder or add navigation items
- Social links: update if handles change

No code deploy required. Changes go live immediately after Sanity publish.

## Weekly Checks

- Review Umami dashboard for the past week's sessions, top pages, and referral sources
- Check Google Search Console for indexing errors or manual actions
- Verify no Printful orders have stalled (Printful dashboard → Orders → filter by status)
- Check for Shopify app update notifications (especially Printful app)

## Rotating Secrets

When rotating API tokens (Sanity, Shopify):

1. Generate the new token in the relevant admin
2. Update in Oxygen: Shopify admin → Hydrogen → Environment Variables → edit → save
3. Trigger a redeployment from the Oxygen UI
4. Verify the site still works on the production URL
5. Revoke the old token
6. Update `.env.example` if the variable name changed (never put the value in `.env.example`)

## Common Issues

**Products not showing up in Hydrogen after Printful sync:**
- Check Shopify admin — is the product published and set to "Online Store"?
- Check Printful → Stores → your store → sync status
- Clear Hydrogen's cache by triggering a redeploy in Oxygen

**Sanity content not updating on the live site:**
- Sanity content is cached in Oxygen. A content publish triggers a cache revalidation automatically via Hydrogen's built-in Sanity loader. If not updating: force a redeployment in Oxygen.
- Check that `SANITY_API_READ_TOKEN` in Oxygen environment is valid

**Cart losing items on page refresh:**
- This is expected behaviour if the session secret changed — rotating `SESSION_SECRET` invalidates all existing sessions
- Only rotate `SESSION_SECRET` intentionally

**Checkout not working:**
- Verify Shopify Payments or Stripe is active and configured for the store's currency
- Check if the store is in "password protected" mode (should be off for production)

*Last updated: 2026-06-10*
