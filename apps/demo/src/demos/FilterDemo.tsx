import { Button, Count, Stage, States, Text, Window, type Act } from "../kit";
import { CartIcon, Shirt } from "./Shirt";
import "./shop.css";

// A shopper filters the shop by color: pick Red, Apply, the grid narrows.
// Real strings: the heading, the count, three product names and prices.

type S = { red: boolean; applied: boolean };

const initial: S = { red: false, applied: false };
const poster: S = { red: true, applied: true };
const REST = { x: 720, y: 300 };

const COLORS = [
  { id: "green", hex: "#00c12b" },
  { id: "red", hex: "#f50606" },
  { id: "blue", hex: "#063af5" },
  { id: "black", hex: "#000000" },
];

const ALL = [
  { name: "Plaid Shirt", price: "$34.99", base: "#c8191f" },
  { name: "Check Shirt", price: "$29.99", base: "#2f5fb0" },
  { name: "Plaid Shirt", price: "$31.49", base: "#1f7a3a" },
];
const RED = [
  { name: "Plaid Shirt", price: "$34.99", base: "#c8191f" },
  { name: "Relaxed Plaid", price: "$38.49", base: "#d4262c" },
  { name: "Classic Plaid", price: "$31.49", base: "#b3141a" },
];

async function script(a: Act<S>) {
  await a.wait(900);
  a.mark("pick");
  await a.move({ at: "red", x: 0.5, y: 0.5 });
  await a.wait(250);
  await a.click();
  await a.set({ red: true });
  await a.wait(600);
  a.mark("apply");
  await a.move({ at: "apply", x: 0.9, y: 0.7 });
  await a.wait(250);
  await a.click();
  await a.set({ applied: true });
  await a.move(REST);
  await a.wait(2600);
  await a.set({ red: false, applied: false });
  await a.wait(500);
}

const Grid = ({ items }: { items: typeof ALL }) => (
  <div className="fd-grid">
    {items.map((p, i) => (
      <div key={i} className="fd-card">
        <div className="fd-img">
          <Shirt base={p.base} size={96} />
        </div>
        <Text className="fd-name">{p.name}</Text>
        <Text className="fd-price">{p.price}</Text>
      </div>
    ))}
  </div>
);

export function FilterDemo() {
  return (
    <Stage width={860} height={440} initial={initial} poster={poster} script={script} cursor={{ at: REST, style: "arrow" }} accent="#0b0b0f" className="sd">
      {(s) => (
        <Window url="shop.co/shop" className="sd-browser" style={{ position: "absolute", left: 28, top: 28, width: 900, height: 470 }}>
          <div className="sd-page">
            <header className="sd-nav">
              <span className="sd-logo">SHOP.CO</span>
              <span className="sd-links">
                <Text>Shop</Text>
                <Text>On Sale</Text>
                <Text>New Arrivals</Text>
              </span>
              <span className="sd-cart">
                <CartIcon />
              </span>
            </header>

            <div className="fd-layout">
              <aside className="fd-filters">
                <div className="fd-heading">Filters</div>
                <div className="sd-label">Colors</div>
                <div className="fd-swatches">
                  {COLORS.map((c) => (
                    <span
                      key={c.id}
                      className="fd-swatch"
                      data-target={c.id}
                      data-cursor="pointer"
                      data-on={c.id === "red" && s.red}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <Button variant="primary" size="large" data-target="apply" className="sd-add">
                  Apply Filter
                </Button>
              </aside>

              <section className="fd-main">
                <div className="fd-head">
                  <span className="sd-title">ALL PRODUCTS</span>
                  <span className="sd-sub">
                    Showing 1-9 of <Count value={s.applied ? 14 : 28} />
                  </span>
                </div>
                <States value={s.applied ? "red" : "all"} align="start" states={{ all: <Grid items={ALL} />, red: <Grid items={RED} /> }} />
              </section>
            </div>
          </div>
        </Window>
      )}
    </Stage>
  );
}
