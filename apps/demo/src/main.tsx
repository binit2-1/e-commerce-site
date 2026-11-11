import { createRoot } from "react-dom/client";
import "./kit/stageshow.css";
import { FilterDemo } from "./demos/FilterDemo";
import { ShopDemo } from "./demos/ShopDemo";

// ?demo=shop or ?demo=filter shows one demo on its own (used for filming);
// with no parameter both are listed.
const which = new URLSearchParams(location.search).get("demo");

createRoot(document.getElementById("root")!).render(
  <main style={{ maxWidth: 900, margin: "0 auto", padding: which ? 0 : 24, display: "grid", gap: 24 }}>
    {(!which || which === "shop") && <div id="shop-demo"><ShopDemo /></div>}
    {(!which || which === "filter") && <div id="filter-demo"><FilterDemo /></div>}
  </main>,
);
