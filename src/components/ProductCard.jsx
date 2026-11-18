import { useState } from "react";
import { useLang, useT, L, isSale, money, labelsFor } from "../utils/lang.jsx";

export default function ProductCard({ product: p, store }) {
  const { lang } = useLang();
  const t = useT();
  const [sizeIdx, setSizeIdx] = useState(undefined);
  const [colorIdx, setColorIdx] = useState(undefined);

  const name = L(p, "name", lang);
  const sale = isSale(p);
  const ar = Math.min(1, Math.max(0.667, Number(p.ar) || 1));
  const code = p.code || p.id;

  const sizeLabels = labelsFor(p, "sizes", lang);
  const colorLabels = labelsFor(p, "colors", lang);

  function buildBuyUrl() {
    let msg = t("mHello") + "\n\n" + t("mItem") + ": " + name + "\n" + t("mCode") + ": " + code + "\n";
    if (typeof sizeIdx === "number" && sizeLabels[sizeIdx]) {
      msg += t("mSize") + ": " + sizeLabels[sizeIdx] + "\n";
    }
    if (typeof colorIdx === "number" && colorLabels[colorIdx]) {
      msg += t("mColor") + ": " + colorLabels[colorIdx] + "\n";
    }
    msg += t("mPrice") + ": " + money(p.price, store, lang) + "\n\n" + t("mName");
    return "https://t.me/" + store.telegram + "?text=" + encodeURIComponent(msg);
  }

  return (
    <article className="card">
      <div className="art" style={{ aspectRatio: ar }}>
        {p.photo ? (
          <img src={p.photo} alt={name} loading="lazy" />
        ) : (
          t("noPhoto")
        )}
        {p.isNew && <span className="tag tag-new">New</span>}
        {sale && <span className="tag tag-sale">SALE</span>}
        {p.soldOut && <span className="tag tag-sold">{t("sold")}</span>}
      </div>

      <div className="pname">
        {name} <span>{code}</span>
      </div>

      {L(p, "note", lang) && <p className="desc">{L(p, "note", lang)}</p>}

      <div className="prices">
        {sale && <span className="old">{money(p.oldPrice, store, lang)}</span>}
        <span className={`now${sale ? " on-sale" : ""}`}>{money(p.price, store, lang)}</span>
      </div>

      {sizeLabels.length > 0 && (
        <div className="opt">
          <span className="opt-label">
            {t("size")}{typeof sizeIdx === "number" && sizeLabels[sizeIdx] ? ": " + sizeLabels[sizeIdx] : ""}
          </span>
          <div className="opt-row">
            {sizeLabels.map((v, i) => (
              <button
                key={i}
                className="chip"
                type="button"
                aria-pressed={String(sizeIdx === i)}
                onClick={() => setSizeIdx(sizeIdx === i ? undefined : i)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {colorLabels.length > 0 && (
        <div className="opt">
          <span className="opt-label">
            {t("color")}{typeof colorIdx === "number" && colorLabels[colorIdx] ? ": " + colorLabels[colorIdx] : ""}
          </span>
          <div className="opt-row">
            {colorLabels.map((v, i) => (
              <button
                key={i}
                className="chip"
                type="button"
                aria-pressed={String(colorIdx === i)}
                onClick={() => setColorIdx(colorIdx === i ? undefined : i)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {p.soldOut ? (
        <span className="buy" aria-disabled="true">{t("sold")}</span>
      ) : (
        <a className="buy" target="_blank" rel="noopener noreferrer" href={buildBuyUrl()}>
          {t("buy")}
        </a>
      )}
    </article>
  );
}
