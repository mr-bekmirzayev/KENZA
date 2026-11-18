import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase.js";
import { LangProvider, useLang, useT, L, resizePhoto } from "../utils/lang.jsx";
import LangToggle from "../components/LangToggle.jsx";
import StoreEditor from "../components/StoreEditor.jsx";
import ProductEditor from "../components/ProductEditor.jsx";

function LoginForm() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>KENZA</h1>
        <p>{t("adminTitle")}</p>
        <div className="field">
          <label htmlFor="login-email">{t("email")}</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="login-pass">{t("password")}</label>
          <input
            id="login-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "..." : t("login")}
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

function AdminPanel() {
  const { lang } = useLang();
  const t = useT();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusErr, setStatusErr] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
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
          heading: "",
          headingRu: "",
          intro: "",
          introRu: "",
        });
      }

      const prodsSnap = await getDocs(collection(db, "products"));
      const prods = [];
      prodsSnap.forEach((d) => {
        prods.push({ _docId: d.id, ...d.data() });
      });
      prods.sort((a, b) => {
        const ta = a.createdAt?.toMillis?.() || a.createdAt || 0;
        const tb = b.createdAt?.toMillis?.() || b.createdAt || 0;
        return tb - ta;
      });
      setProducts(prods);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  }

  function setStatus(msg, err) {
    setStatusMsg(msg);
    setStatusErr(!!err);
  }

  function handleStoreChange(key, value) {
    setStore((prev) => ({ ...prev, [key]: value }));
  }

  function handleProductChange(index, key, value) {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  }

  function handleDeleteProduct(index) {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddProduct() {
    let max = 0;
    products.forEach((p) => {
      const m = /(\d+)$/.exec(p.code || "");
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    const code = "P-" + String(max + 1).padStart(3, "0");
    setProducts((prev) => [
      ...prev,
      {
        code,
        name: "",
        nameRu: "",
        price: 0,
        oldPrice: "",
        cat: "",
        catRu: "",
        note: "",
        noteRu: "",
        sizes: "",
        sizesRu: "",
        colors: "",
        colorsRu: "",
        photo: "",
        ar: 1,
        isNew: false,
        soldOut: false,
        _isNew: true,
      },
    ]);
    setTimeout(() => {
      const idx = products.length;
      const el = document.getElementById("p" + idx + "-name");
      if (el) {
        el.scrollIntoView({ block: "center" });
        el.focus();
      }
    }, 100);
  }

  function validate() {
    const tg = String(store.telegram || "").replace(/^@/, "").trim();
    if (!/^[A-Za-z0-9_]{5,32}$/.test(tg)) return t("eTg");
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      if (!String(p.name || "").trim()) return t("eName", { n: i + 1 });
      if (!(Number(p.price) > 0)) return t("ePrice", { name: p.name });
      if (Number(p.oldPrice) > 0 && !(Number(p.oldPrice) > Number(p.price))) {
        return t("eOld", { name: p.name });
      }
    }
    return "";
  }

  async function handleSave() {
    if (saving) return;
    const err = validate();
    if (err) {
      setStatus(err, true);
      return;
    }

    setSaving(true);
    setStatus(t("saving"), false);

    try {
      const cleanStore = {
        name: (store.name || "").trim() || "KENZA",
        telegram: String(store.telegram || "").replace(/^@/, "").trim(),
        currency: (store.currency || "").trim() || "so'm",
        currencyRu: (store.currencyRu || "").trim() || "сум",
        heading: (store.heading || "").trim(),
        headingRu: (store.headingRu || "").trim(),
        intro: (store.intro || "").trim(),
        introRu: (store.introRu || "").trim(),
      };

      await setDoc(doc(db, "settings", "store"), cleanStore);

      const existingSnap = await getDocs(collection(db, "products"));
      const existingIds = new Set();
      existingSnap.forEach((d) => existingIds.add(d.id));

      const newIds = new Set();
      for (const p of products) {
        const docId = p._docId || p.code || doc(collection(db, "products")).id;
        newIds.add(docId);

        const cleanProduct = {
          code: p.code || docId,
          name: (p.name || "").trim(),
          nameRu: (p.nameRu || "").trim(),
          price: Math.round(Number(p.price) || 0),
          oldPrice: Number(p.oldPrice) > 0 ? Math.round(Number(p.oldPrice)) : "",
          cat: (p.cat || "").trim(),
          catRu: (p.catRu || "").trim(),
          note: (p.note || "").trim(),
          noteRu: (p.noteRu || "").trim(),
          sizes: (p.sizes || "").trim(),
          sizesRu: (p.sizesRu || "").trim(),
          colors: (p.colors || "").trim(),
          colorsRu: (p.colorsRu || "").trim(),
          photo: p.photo || "",
          ar: Number(p.ar) || 1,
          isNew: !!p.isNew,
          soldOut: !!p.soldOut,
          createdAt: p.createdAt || serverTimestamp(),
        };

        await setDoc(doc(db, "products", docId), cleanProduct);
      }

      for (const existingId of existingIds) {
        if (!newIds.has(existingId)) {
          await deleteDoc(doc(db, "products", existingId));
        }
      }

      setStatus(t("saved"), false);
      await fetchData();
    } catch (err) {
      console.error("Save error:", err);
      setStatus("Xatolik yuz berdi: " + err.message, true);
    } finally {
      setSaving(false);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="wrap" style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="ed-top">
        <h1>{t("edTitle")}</h1>
        <div className="row">
          <LangToggle />
          <button className="logout-btn" type="button" onClick={handleLogout}>
            {t("logout")}
          </button>
          <button
            className="btn primary"
            type="button"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? t("saving") : t("save")}
          </button>
        </div>
      </div>

      <div
        className={`status${statusErr ? " err" : ""}`}
        role="status"
        aria-live="polite"
      >
        {statusMsg}
      </div>

      <StoreEditor store={store} onChange={handleStoreChange} />

      {products.map((p, i) => (
        <ProductEditor
          key={p._docId || p.code || i}
          product={p}
          index={i}
          currency={store.currency || "so'm"}
          onChange={handleProductChange}
          onDelete={handleDeleteProduct}
          setStatus={setStatus}
        />
      ))}

      <div className="row" style={{ marginBottom: "40px" }}>
        <button className="btn" type="button" onClick={handleAddProduct}>
          {t("add")}
        </button>
        <button
          className="btn primary"
          type="button"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? t("saving") : t("save")}
        </button>
      </div>
    </div>
  );
}

function AdminContent() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  if (user === undefined) {
    return (
      <div className="wrap" style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
        Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminPanel />;
}

export default function AdminPage() {
  return (
    <LangProvider>
      <AdminContent />
    </LangProvider>
  );
}
