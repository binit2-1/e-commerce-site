# Walkthrough storyboard

A silent 2 min 15 s tour of the real site (1920x1080, 30 fps, H.264) with captions. Every
frame of site footage is a recording of the running app, nothing is mocked.

Built with Remotion (render) and the HyperFrames guidance for pacing and motion
(contrast speeds, arrive slow / leave clean, words arriving one by one, transitions with a cause).

| # | Scene | Real flow shown | Speed |
|---|---|---|---|
| 0 | Intro | Title card on the site's own hero image and fonts | |
| 1 | Browse the store | Hero, brand bar, New Arrivals, Top Selling, dress styles, testimonials, footer | 1.2x |
| 2 | Search, filter and sort | Navbar search "plaid", Shop, color filter + Apply, price sort, page 2, On Sale | 1.4x |
| 3 | Phones | 390 px: slide-out menu, filter bottom sheet, color + Apply | 1.0x |
| 4 | Size and color | Gallery thumbs, Medium, second swatch, quantity, Add to Cart, cart badge (zoom on the button) | 1.3x |
| 5 | Cart and promo | Quantity, a wrong code is rejected, `SHOP20` (zoom on the totals) | 1.25x |
| 6 | Sign up | Go to Checkout redirects to login, create account, back to checkout with the cart intact | 1.35x |
| 7 | Place the order | Delivery details, Place order, confirmation (zoom on the banner) | 1.0x |
| 8 | Orders and reviews | My orders, order detail, product page, write and post a review | 1.5x |
| 9 | Saved cart | Log out (cart cleared), log in (cart restored), the 404 page | 1.3x |
| 10 | Outro | Recap checklist and the stack | |

## How it is made

```
apps/video/capture/   scripted Chrome sessions that drive the real site (Playwright + CDP screencast)
apps/video/public/clips/   one MP4 per scene + manifest.json (durations, where key elements were on screen)
apps/video/src/       Remotion composition: browser/phone frames, captions, zooms, intro/outro
docs/walkthrough/shop-walkthrough.mp4   the render
```

To make it again (site, API and a fresh database must be running):

```sh
pnpm db:reset                 # clean demo data, no users
pnpm --filter @shop/api dev   # API on :3000
pnpm --filter @shop/web dev --port 5190 --strictPort
pnpm video:capture            # records every scene (about 3 min)
pnpm video:render             # renders the MP4 (about 10 min)
pnpm video:studio             # optional: preview and tweak in Remotion Studio
```

The demo account used while recording is `alex.morgan@example.com`.
