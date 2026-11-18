import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { LangProvider, useLang, useT, L, isSale, money, labelsFor, list } from "../utils/lang.jsx";
import LangToggle from "../components/LangToggle.jsx";
import ProductCard from "../components/ProductCard.jsx";

function ShopContent() {
  const { lang } = useLang();
  const t = useT();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        const storeSnap = await getDoc(doc(db, "settings", "store"));
        if (storeSnap.exists()) {
          setStore(storeSnap.data());
        } else {
          setStore({
            name: "KENZA",
            telegram: "Axmedovna_16",
            currency: "so'm",
            currencyRu: "сум",
            heading: "Kiyim, poyabzal va aksessuarlar",
            headingRu: "Одежда, обувь и аксессуары",
            intro: "Har kuni uchun tanlangan buyumlar",
            introRu: "Вещи, отобранные на каждый день",
          });
        }

        const prodsSnap = await getDocs(collection(db, "products"));
        const prods = [];
        prodsSnap.forEach((d) => {
          prods.push({ id: d.id, ...d.data() });
        });
        prods.sort((a, b) => {
          const ta = a.createdAt?.toMillis?.() || a.createdAt || 0;
          const tb = b.createdAt?.toMillis?.() || b.createdAt || 0;
          return tb - ta;
        });
        setProducts(prods);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="wrap" style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
        Yuklanmoqda...
      </div>
    );
  }

  if (!store) return null;

  const cats = [];
  const keys = [];
  let anySale = false;
  let anyNew = false;
  products.forEach((p) => {
    if (p.cat && keys.indexOf(p.cat) < 0) {
      keys.push(p.cat);
      cats.push({ key: p.cat, label: L(p, "cat", lang) });
    }
    if (isSale(p)) anySale = true;
    if (p.isNew) anyNew = true;
  });

  let currentCat = cat;
  if (currentCat !== "All" && currentCat !== "__sale" && currentCat !== "__new" && keys.indexOf(currentCat) < 0) {
    currentCat = "All";
  }
  if ((currentCat === "__sale" && !anySale) || (currentCat === "__new" && !anyNew)) {
    currentCat = "All";
  }

  const navItems = [{ key: "All", label: t("all") }].concat(cats);
  if (anySale) navItems.push({ key: "__sale", label: t("navSale"), cls: "sale" });
  if (anyNew) navItems.push({ key: "__new", label: t("navNew") });

  const title = (navItems.find((i) => i.key === currentCat) || navItems[0]).label;

  const shown = products.filter((p) => {
    if (currentCat === "All") return true;
    if (currentCat === "__sale") return isSale(p);
    if (currentCat === "__new") return !!p.isNew;
    return p.cat === currentCat;
  });

  return (
    <>
      <header>
        <div className="wrap top-in">
          <div className="brand">{store.name}</div>
          <nav className="nav" aria-label={t("nav")}>
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={item.cls || undefined}
                aria-pressed={String(currentCat === item.key)}
                onClick={() => setCat(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <LangToggle />
        </div>
      </header>

      {anySale && (
        <div className="strip" aria-hidden="true">
          <div className="wrap">
            SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE • SALE
          </div>
        </div>
      )}

      <main className="wrap">
        <section className="hero">
          <h1>{L(store, "heading", lang)}</h1>
          {L(store, "intro", lang) && <p>{L(store, "intro", lang)}</p>}
        </section>

        <div className="sec-head">
          <h2>{title}</h2>
          {currentCat !== "All" && (
            <button className="see-all" type="button" onClick={() => setCat("All")}>
              {t("seeAll")}
            </button>
          )}
        </div>

        {shown.length > 0 ? (
          <div className="grid">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} store={store} />
            ))}
          </div>
        ) : (
          <div className="empty">{t("empty")}</div>
        )}

        <section className="steps">
          <h2>{t("howTitle")}</h2>
          <div className="steps-list">
            {[1, 2, 3].map((n) => (
              <div className="step" key={n}>
                <i className={`ico c${n}`} aria-hidden="true">{n}</i>
                <div>
                  <b>{t(`s${n}t`)}</b>
                  <span>{t(`s${n}d`)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer>{t("footer", { name: store.name })}</footer>
      </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <LangProvider>
      <ShopContent />
    </LangProvider>
  );
}
