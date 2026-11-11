// One function per scene, driving the REAL site like a person. `prep` runs before recording
// starts (so loading flashes never reach the clip); `run` is what the viewer sees.
// Scenes run in order and share one logged-out -> logged-in browser session (see record.mjs).

export const CREDS = { name: "Alex Morgan", email: "alex.morgan@example.com", password: "Demo-pass-2026" };

export const desktopScenes = [
  {
    name: "home",
    async prep({ a, base }) {
      await a.page.goto(base + "/", { waitUntil: "networkidle" });
      await a.imagesLoaded();
      await a.page.mouse.move(760, 430);
    },
    async run({ a }) {
      await a.pause(1716); // hero
      await a.scrollToElement('h2:text-is("NEW ARRIVALS")', { offset: 110, ms: 1300 });
      await a.pause(1560);
      await a.scrollToElement('h2:text-is("TOP SELLING")', { offset: 110, ms: 1300 });
      await a.pause(1404);
      await a.scrollToElement('h2:text-is("BROWSE BY DRESS STYLE")', { offset: 110, ms: 1300 });
      await a.pause(1404);
      await a.scrollToElement('h2:text-is("OUR HAPPY CUSTOMERS")', { offset: 110, ms: 1300 });
      await a.pause(1404);
      await a.scrollTo(99999, 1600); // footer
      await a.pause(1170);
    },
  },

  {
    name: "search",
    async prep({ a, base }) {
      await a.page.goto(base + "/", { waitUntil: "networkidle" });
      await a.imagesLoaded();
      await a.page.evaluate(() => scrollTo(0, 0)); // the router restores the last scroll position
      await a.pause(400);
      await a.page.mouse.move(760, 430);
    },
    async run({ a }) {
      await a.pause(700);
      await a.type('header input[aria-label="Search products"]', "plaid");
      await a.pause(500);
      await a.page.keyboard.press("Enter");
      await a.page.waitForURL(/q=plaid/);
      await a.imagesLoaded();
      await a.pause(2028);

      await a.click('header nav a:text-is("Shop")');
      await a.page.waitForURL((u) => u.pathname === "/shop" && !u.search);
      await a.imagesLoaded();
      await a.pause(936);

      await a.click('aside button[aria-label="Red"]');
      await a.pause(500);
      await a.click('button:text-is("Apply Filter")');
      await a.page.waitForURL(/colors=Red/);
      await a.imagesLoaded();
      await a.pause(1716);

      await a.select("main select", "price_asc");
      await a.imagesLoaded();
      await a.pause(1716);

      await a.click('nav[aria-label="Pagination"] button:text-is("2")');
      await a.imagesLoaded();
      await a.pause(1716);

      await a.click('header nav a:text-is("On Sale")');
      await a.page.waitForURL(/onSale=true/);
      await a.imagesLoaded();
      await a.pause(1404);
    },
  },

  {
    name: "product",
    async run({ a, rec }) {
      await a.pause(700);
      await a.click('main a[href^="/products/"]');
      await a.page.waitForURL(/\/products\/\d+/);
      await a.imagesLoaded();
      await a.pause(1404);
      await a.click('button[aria-label="Show image 2"]');
      await a.pause(900);
      await a.click('button[aria-label="Show image 3"]');
      await a.pause(900);
      await a.click('button[aria-pressed]:text-is("Medium")');
      await a.pause(600);
      await a.click("button[aria-pressed][title] >> nth=1"); // second colour swatch
      await a.pause(600);
      await a.click('button[aria-label="Increase quantity"]');
      await a.pause(800);
      await a.moveTo('button:text-is("Add to Cart")');
      await rec.mark("addToCart", 'button:text-is("Add to Cart")');
      await a.pause(400);
      await a.click('button:text-is("Add to Cart")');
      await a.page.locator("text=Added to your cart").waitFor();
      await rec.mark("badge", 'header a[aria-label="Cart"]');
      await a.pause(1716);
    },
  },

  {
    name: "cart",
    async run({ a, rec }) {
      await a.click('a:text-is("View cart")');
      await a.page.waitForURL(/\/cart/);
      await a.imagesLoaded();
      await a.pause(1560);
      await a.click('button[aria-label="Increase quantity"]');
      await a.pause(936);
      await a.type('input[placeholder="Add promo code"]', "bogus");
      await a.pause(300);
      await a.click('button:text-is("Apply")');
      await a.pause(1404);
      await a.click('input[placeholder="Add promo code"]');
      await a.page.keyboard.press("Control+A");
      await a.page.keyboard.type("shop20", { delay: 75 });
      await a.pause(300);
      await a.click('button:text-is("Apply")');
      await a.page.locator("text=applied").first().waitFor();
      await rec.mark("totals", 'section[aria-labelledby="order-summary"]');
      await a.pause(2340);
    },
  },

  {
    name: "signup",
    async run({ a }) {
      await a.pause(600);
      await a.click('button:has-text("Go to Checkout")');
      await a.page.waitForURL(/\/login/);
      await a.pause(1716); // "log in to continue" after the redirect
      await a.click('a:text-is("Create an account")');
      await a.page.waitForURL(/\/register/);
      await a.pause(900);
      await a.type("input[autocomplete=name]", CREDS.name);
      await a.type("input[type=email]", CREDS.email);
      await a.type("input[type=password]", CREDS.password, { delay: 90 });
      await a.pause(500);
      await a.click('button:text-is("Create account")');
      await a.page.locator('h1:text-is("CHECKOUT")').waitFor();
      await a.imagesLoaded();
      await a.pause(2184); // the cart came along
    },
  },

  {
    name: "checkout",
    async run({ a, rec }) {
      await a.pause(800);
      await a.type("textarea", "24 Maple Street, Brookfield 10001");
      await a.pause(936);
      await a.click('button:text-is("Place order")');
      await a.page.locator("[role=status]").waitFor();
      await a.imagesLoaded();
      await rec.mark("placed", "[role=status]");
      await a.pause(2964);
    },
  },

  {
    name: "orders",
    async run({ a, rec }) {
      await a.click('button[aria-label="Account menu"]');
      await a.pause(500);
      await a.click('a:text-is("My orders")');
      await a.page.waitForURL(/\/orders$/);
      await a.imagesLoaded();
      await a.pause(1404);
      await a.click("main ul li a");
      await a.page.waitForURL(/\/orders\/\d+/);
      await a.imagesLoaded();
      await a.pause(1716);
      await a.click('main ul li a[href^="/products/"]');
      await a.page.waitForURL(/\/products\/\d+/);
      await a.imagesLoaded();
      await a.pause(800);
      await a.scrollToElement('h2:has-text("All Reviews")', { offset: 160, ms: 1400 });
      await a.pause(900);
      await a.click('button:text-is("Write a Review")');
      await a.pause(600);
      await a.click('button[aria-label="5 stars"]');
      await a.type("textarea", "Fits perfectly and the fabric feels great. Arrived fast!", { delay: 45 });
      await a.pause(600);
      await a.click('button:text-is("Post review")');
      await a.page.locator("text=Fits perfectly").first().waitFor();
      await rec.mark("review", "text=Fits perfectly");
      await a.pause(2028);
      await a.scrollTo(0, 1000);
      await a.pause(500);
      await a.click('button:text-is("Add to Cart")'); // something in the cart for the next scene
      await a.pause(1170);
    },
  },

  {
    name: "session",
    async run({ a, rec }) {
      await a.click('button[aria-label="Account menu"]');
      await a.pause(500);
      await a.click('button:text-is("Log out")');
      await a.page.waitForURL((u) => u.pathname === "/");
      await a.imagesLoaded();
      await a.pause(1560); // logged out, cart emptied
      await a.click('a[aria-label="Log in"]');
      await a.page.waitForURL(/\/login/);
      await a.pause(700);
      await a.type("input[type=email]", CREDS.email);
      await a.type("input[type=password]", CREDS.password, { delay: 90 });
      await a.click('button:text-is("Log in")');
      await a.page.locator('header a[aria-label="Cart"] span').waitFor();
      await a.imagesLoaded();
      await rec.mark("badge", 'header a[aria-label="Cart"]');
      await a.pause(2028); // saved cart is back
      await a.page.evaluate(() => {
        history.pushState({}, "", "/does-not-exist");
        dispatchEvent(new PopStateEvent("popstate"));
        scrollTo(0, 0);
      });
      await a.pause(1872);
    },
  },
];

export const mobileScene = {
  name: "mobile",
  async prep({ a, base }) {
    await a.page.goto(base + "/", { waitUntil: "networkidle" });
    await a.imagesLoaded();
  },
  async run({ a }) {
    await a.pause(1716);
    await a.click('button[aria-label="Open menu"]');
    await a.pause(1404);
    await a.click('header a:text-is("Shop") >> visible=true');
    await a.page.waitForURL(/\/shop/);
    await a.imagesLoaded();
    await a.pause(1404);
    await a.click('button[aria-label="Open filters"]');
    await a.pause(1404);
    await a.click('[role=dialog] button[aria-label="Red"]');
    await a.pause(900);
    await a.click('[role=dialog] button:text-is("Apply Filter")');
    await a.page.waitForURL(/colors=Red/);
    await a.imagesLoaded();
    await a.pause(1872);
  },
};
