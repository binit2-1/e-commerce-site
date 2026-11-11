import { Badge, Button, Card, Check, Count, Roll, Row, Segmented, Stage, States, Text, Window, type Act } from "../kit";
import { CartIcon, Shirt } from "./Shirt";
import "./shop.css";

// A shopper picks a size, adds a shirt, opens the cart and checks out.
// Real strings: the product, its price, the sizes, the cart lines, the order number.

type View = "product" | "cart" | "done";
type S = { view: View; size: number; added: boolean; count: number };

const SIZES = ["Small", "Medium", "Large", "X-Large"];
const initial: S = { view: "product", size: 0, added: false, count: 0 };
const poster: S = { view: "done", size: 1, added: true, count: 0 };
const REST = { x: 700, y: 330 };

async function script(a: Act<S>) {
  await a.wait(900);

  a.mark("size");
  await a.move({ at: "size-1", x: 0.5, y: 0.9 });
  await a.wait(250);
  await a.click();
  await a.set({ size: 1 });
  await a.wait(500);

  a.mark("add");
  await a.move({ at: "add", x: 0.9, y: 0.7 });
  await a.wait(250);
  await a.click();
  await a.set({ added: true, count: 1 });
  await a.wait(900);

  a.mark("cart");
  await a.move("cart");
  await a.wait(250);
  await a.click();
  await a.set({ view: "cart" });
  await a.wait(1300);

  a.mark("checkout");
  await a.move({ at: "checkout", x: 0.9, y: 0.7 });
  await a.wait(250);
  await a.click();
  await a.set({ view: "done", count: 0 });
  a.mark("done");
  await a.move(REST);
  await a.wait(2600);

  // Back to the start, with a cause the viewer can see: a fresh visit.
  await a.set({ view: "product", size: 0, added: false });
  await a.wait(500);
}

export function ShopDemo() {
  return (
    <Stage width={860} height={440} initial={initial} poster={poster} script={script} cursor={{ at: REST, style: "arrow" }} accent="#0b0b0f" className="sd">
      {(s) => (
        <Window url="shop.co/products/11" className="sd-browser" style={{ position: "absolute", left: 28, top: 28, width: 900, height: 470 }}>
          <div className="sd-page">
            <header className="sd-nav">
              <span className="sd-logo">SHOP.CO</span>
              <span className="sd-links">
                <Text>Shop</Text>
                <Text>On Sale</Text>
                <Text>New Arrivals</Text>
              </span>
              <span className="sd-cart" data-target="cart" data-cursor="pointer">
                <CartIcon />
                <span className="sd-count" data-show={s.count > 0}>
                  <Roll>{String(s.count || 1)}</Roll>
                </span>
              </span>
            </header>

            <States
              value={s.view}
              align="start"
              className="sd-views"
              states={{
                product: (
                  <div className="sd-product">
                    <div className="sd-photo">
                      <Shirt size={150} />
                    </div>
                    <div className="sd-info">
                      <div className="sd-title">MAN PLAID SHIRT</div>
                      <div className="sd-price">$34.99</div>
                      <div className="sd-label">Choose size</div>
                      <Segmented items={SIZES} value={s.size} targets={SIZES.map((_, i) => `size-${i}`)} className="sd-sizes" />
                      <Button variant="primary" size="large" data-target="add" className="sd-add">
                        {s.added ? "Added to cart" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                ),
                cart: (
                  <div className="sd-cartview">
                    <div className="sd-heading">YOUR CART</div>
                    <div className="sd-cartgrid">
                      <Card flush className="sd-lines">
                        <Row
                          lead={
                            <span className="sd-thumb">
                              <Shirt size={44} />
                            </span>
                          }
                          title="Man Plaid Shirt"
                          subtitle="Medium · Black"
                          meta="$34.99"
                        />
                      </Card>
                      <Card className="sd-summary" gap={10}>
                        <div className="sd-line">
                          <span>Subtotal</span>
                          <Count value={34.99} format={(n) => `$${n.toFixed(2)}`} />
                        </div>
                        <div className="sd-line">
                          <span>Delivery Fee</span>
                          <span>$15</span>
                        </div>
                        <div className="sd-line sd-total">
                          <span>Total</span>
                          <Count value={49.99} format={(n) => `$${n.toFixed(2)}`} />
                        </div>
                        <Button variant="primary" size="large" data-target="checkout" className="sd-checkout">
                          Go to Checkout
                        </Button>
                      </Card>
                    </div>
                  </div>
                ),
                done: (
                  <div className="sd-done">
                    <Check on size={36} />
                    <div className="sd-title">ORDER #1 PLACED</div>
                    <div className="sd-sub">Thanks! We'll start packing it now.</div>
                    <Card flush className="sd-lines sd-order">
                      <Row
                        lead={
                          <span className="sd-thumb">
                            <Shirt size={44} />
                          </span>
                        }
                        title="Man Plaid Shirt"
                        subtitle="Medium · Black"
                        meta="$49.99"
                      >
                        <Badge tone="success" dot>
                          Placed
                        </Badge>
                      </Row>
                    </Card>
                  </div>
                ),
              }}
            />
          </div>
        </Window>
      )}
    </Stage>
  );
}
