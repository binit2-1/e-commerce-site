import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../app/paths";
import cart from "../../assets/imgs/cart.svg";
import dropdown from "../../assets/imgs/dropdown.svg";
import hamburger from "../../assets/imgs/hamburger.svg";
import magnifyingGlass from "../../assets/imgs/magnifyingGlass.svg";
import pfp from "../../assets/imgs/pfp.svg";
import { useAuth } from "../../features/auth/useAuth";
import { useCart } from "../../features/cart/useCart";
import Container from "./Container";

const links = [
  { label: "Shop", to: paths.shop, dropdown: true },
  { label: "On Sale", to: `${paths.shop}?onSale=true` },
  { label: "New Arrivals", to: `${paths.shop}?sort=newest` },
  { label: "Brands", to: paths.shop },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  const onLogout = async () => {
    setAccountOpen(false);
    await logout();
    navigate(paths.home);
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setMenuOpen(false);
    navigate(q ? `${paths.shop}?q=${encodeURIComponent(q)}` : paths.shop);
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      <Container>
        <div className="flex h-16 items-center gap-4 border-b border-line lg:h-24 lg:gap-10">
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden"
        >
          <img src={hamburger} alt="" className="h-4 w-5" />
        </button>

        <Link to={paths.home} className="font-display text-2xl leading-none lg:text-[32px]">
          SHOP.CO
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="flex items-center gap-1 whitespace-nowrap text-base">
              {l.label}
              {l.dropdown && <img src={dropdown} alt="" className="h-2 w-3" />}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} role="search" className="relative hidden flex-1 lg:block">
          <img src={magnifyingGlass} alt="" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            aria-label="Search products"
            className="w-full rounded-full bg-surface py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/20"
          />
        </form>

        <div className="ml-auto flex items-center gap-3.5 lg:ml-0">
          <Link to={paths.shop} aria-label="Search" className="lg:hidden">
            <img src={magnifyingGlass} alt="" className="h-5 w-5" />
          </Link>
          <Link to={paths.cart} aria-label="Cart" className="relative">
            <img src={cart} alt="" className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Account menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
                onKeyDown={(e) => e.key === "Escape" && setAccountOpen(false)}
              >
                <img src={pfp} alt="" className="h-6 w-6" />
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-9 z-50 w-48 rounded-[20px] border border-line bg-white p-2 shadow-lg"
                >
                  <p className="truncate px-3 py-2 text-sm text-muted">Hi, {user.name.split(" ")[0]}</p>
                  <Link role="menuitem" to={paths.orders} onClick={() => setAccountOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-surface">
                    My orders
                  </Link>
                  <button role="menuitem" type="button" onClick={onLogout} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-surface">
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={paths.login} aria-label="Log in" title="Log in">
              <img src={pfp} alt="" className="h-6 w-6" />
            </Link>
          )}
        </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-4 py-5">
            <form onSubmit={onSearch} role="search" className="relative">
              <img src={magnifyingGlass} alt="" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                aria-label="Search products"
                className="w-full rounded-full bg-surface py-3 pl-12 pr-4 outline-none"
              />
            </form>
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)} className="font-body-medium text-base">
                {l.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
