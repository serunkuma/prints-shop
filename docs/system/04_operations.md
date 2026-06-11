# Operational Procedures

Status: Current

## Daily Development Workflow

```bash
# 1. Pull latest
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Start dev server
npm run dev

# 4. Work on changes. Test in browser at http://localhost:3000

# 5. Before committing: type check and build check
npm run typecheck
npm run build

# 6. Commit and push
git add .
git commit -m "Add [specific change description]"
git push origin feature/your-feature-name

# 7. Open PR in GitHub
# 8. Check Oxygen preview URL in Shopify admin → Hydrogen → deployments
# 9. Verify preview looks correct
# 10. Merge to main after review
```

## Adding a New Print Product (10-Step Procedure)

1. **Check the art file** — Verify the file is ≥150 DPI at the largest print size offered. Use an image inspector or `identify -verbose file.png | grep "Resolution"`.

2. **Upload to Printful** — Products → Create product → upload print file. Configure sizes (A4/A3/A2/50×70cm/70×100cm) and frame variants (No Frame/Black Frame/White Frame/Natural Wood Frame). Set Printful base prices.

3. **Sync to Shopify** — Printful dashboard → Sync. The product appears in Shopify with variants and base prices auto-populated.

4. **Set retail prices in Shopify** — Products → [new product] → variants. Apply markup multiplier (2.5×–4× based on tier).

5. **Add to collections** — Shopify admin → Products → [product] → Collections. Add to relevant collections (style, artist, series, special).

6. **Create productSupplement in Sanity** — Studio → productSupplement → Create new. Set `shopifyHandle` exactly matching the Shopify product handle. Add story, technique, inspiration, artist reference, series reference.

7. **Publish Sanity document** — The product supplement appears on the PDP automatically.

8. **Verify the product page** — Visit `/products/[handle]` locally and on Oxygen preview. Check: images load, variants render, price displays, add-to-cart works, editorial content appears.

9. **Test a checkout** — Add product to cart, go through checkout flow, verify the order reaches Printful.

10. **Update Umami** — No action needed (events are automatic), but verify the product page view registers in Umami dashboard.

## Publishing a New Drop/Series (8-Step Procedure)

1. **Upload all products** — Complete the product creation procedure (above) for every print in the drop.

2. **Create Shopify collection** — Collections → Create collection. Handle: `drop-[series-slug]`. Add all drop products. Set as active.

3. **Create series in Sanity** — Studio → series → Create new. Set `status: "draft"`. Fill: title, slug, heroImage, description, artistRef, shopifyCollectionHandle, featuredProducts (product handles).

4. **Preview the drop page** — Visit `/drops/[slug]?sanity-preview=true&sanity-preview-secret=[SECRET]`. Verify hero image, description, product grid all render correctly.

5. **Set status to live** — Change `status` to `"live"` in Sanity and publish. The drop appears on `/drops` automatically.

6. **Verify the drops listing** — Visit `/drops`. The new drop should appear in the listing (only `live` series are shown).

7. **Announce** — Share the drop URL on social channels.

8. **Monitor** — Check Umami for traffic spike from the announcement. Verify products from the drop are receiving views and orders.

## Deploying to Production

1. Push feature branch and open a PR on GitHub
2. Wait for Oxygen preview deployment (auto, ~2–3 minutes)
3. Verify the preview URL works: check the page you changed, test checkout flow
4. Merge PR to `main`
5. GitHub Actions auto-deploys to Oxygen production (auto, ~2–3 minutes)
6. Verify production URL: `https://prints.kumachigallery.com`

## Updating Site-Wide Settings

No code deploy required. All done in Sanity Studio:

- **Announcement bar**: Studio → Settings (singleton) → announcementBar → toggle `enabled`, update text/link
- **Footer navigation**: Studio → Settings → footerNavigation → reorder or add nav items
- **Social links**: Studio → Settings → socialLinks → update URLs
- **Navigation menu**: Studio → Navigation (singleton) → mainNav → add/reorder items

Changes go live immediately after Sanity publish.

## Weekly Operational Checks

- Review Umami dashboard for past week: sessions, top pages, referral sources
- Check Google Search Console for indexing errors or manual actions
- Verify no Printful orders have stalled (Printful dashboard → Orders → filter by status)
- Check for Shopify app update notifications (especially Printful app)
- Review any GitHub issues or PRs

## Rotating API Tokens

When rotating the Shopify Storefront API token or Sanity read token:

1. Generate new token in the relevant admin (Shopify Apps → custom app → regenerate; Sanity manage → API → Tokens → add)
2. Update in Oxygen: Shopify admin → Hydrogen → prints-shop → Production → Environment Variables → edit
3. Save and confirm redeployment
4. Verify the site works on the production URL
5. Revoke the old token
6. Update `.env.example` if variable name changed (never put actual values)

## Common Issues

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| Products not showing in Hydrogen | Product not published in Shopify | Check Shopify admin: product set to "Active" and "Online Store" |
| Products not showing after Printful sync | Sync incomplete | Printful dashboard → Stores → sync status; retry sync |
| Sanity content not updating on live site | Oxygen cache stale | Trigger redeployment from Oxygen UI |
| Sanity content not updating | Invalid read token | Check `SANITY_API_READ_TOKEN` in Oxygen environment |
| Cart loses items on refresh | Session secret changed | `SESSION_SECRET` rotation invalidates sessions — do only intentionally |
| Checkout not working | Payment gateway not configured | Verify Shopify Payments or Stripe is active |
| Checkout not working | Store in password mode | Disable password protection in Shopify admin |
| Printful order stuck | File quality issue | Check Printful dashboard for quality warnings |
| Build fails | TypeScript errors | Run `npm run typecheck` locally and fix |
| Dev server won't start | Missing `.env` variables | Verify all required env vars are set in `.env` |

*Last updated: 2026-06*
