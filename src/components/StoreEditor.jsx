import { useT } from "../utils/lang.jsx";

export default function StoreEditor({ store, onChange }) {
  const t = useT();

  return (
    <section className="panel">
      <h2>{t("details")}</h2>
      <div className="fields">
        <div className="field">
          <label htmlFor="s-name">{t("fShop")}</label>
          <input
            id="s-name"
            type="text"
            value={store.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-tg">{t("fTg")}</label>
          <input
            id="s-tg"
            type="text"
            value={store.telegram || ""}
            onChange={(e) => onChange("telegram", e.target.value)}
          />
          <small>{t("hTg")}</small>
        </div>
        <div className="field">
          <label htmlFor="s-head">{t("fHead")}</label>
          <input
            id="s-head"
            type="text"
            value={store.heading || ""}
            onChange={(e) => onChange("heading", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-head-ru">{t("fHeadRu")}</label>
          <input
            id="s-head-ru"
            type="text"
            value={store.headingRu || ""}
            onChange={(e) => onChange("headingRu", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-intro">{t("fIntro")}</label>
          <input
            id="s-intro"
            type="text"
            value={store.intro || ""}
            onChange={(e) => onChange("intro", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-intro-ru">{t("fIntroRu")}</label>
          <input
            id="s-intro-ru"
            type="text"
            value={store.introRu || ""}
            onChange={(e) => onChange("introRu", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-currency">{t("currency")}</label>
          <input
            id="s-currency"
            type="text"
            value={store.currency || ""}
            onChange={(e) => onChange("currency", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="s-currency-ru">{t("currencyRu")}</label>
          <input
            id="s-currency-ru"
            type="text"
            value={store.currencyRu || ""}
            onChange={(e) => onChange("currencyRu", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
