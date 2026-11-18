import { useState } from "react";
import { useT, resizePhoto } from "../utils/lang.jsx";

export default function ProductEditor({ product: p, index: i, currency, onChange, onDelete, setStatus }) {
  const t = useT();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pre = "p" + i + "-";

  const handleChange = (key, value) => {
    onChange(i, key, value);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setStatus(t("photoBusy"), false);
    try {
      const { dataUrl, ar } = await resizePhoto(file);
      handleChange("photo", dataUrl);
      handleChange("ar", ar);
      setStatus("", false);
    } catch {
      setStatus(t("ePhoto"), true);
    }
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(i);
  };

  return (
    <section className="panel">
      <h2>{(p.name || t("newProd")) + "  ·  " + (p.code || "")}</h2>
      <div className="fields">
        <div className="field">
          <label htmlFor={pre + "name"}>{t("fName")}</label>
          <input
            id={pre + "name"}
            type="text"
            value={p.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={pre + "nameRu"}>{t("fNameRu")}</label>
          <input
            id={pre + "nameRu"}
            type="text"
            value={p.nameRu || ""}
            onChange={(e) => handleChange("nameRu", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={pre + "price"}>{t("fPrice")} ({currency})</label>
          <input
            id={pre + "price"}
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            value={p.price || ""}
            onChange={(e) => handleChange("price", Number(e.target.value) || 0)}
          />
          <small>{t("hPrice")}</small>
        </div>
        <div className="field">
          <label htmlFor={pre + "oldPrice"}>{t("fOld")} ({currency})</label>
          <input
            id={pre + "oldPrice"}
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            value={p.oldPrice || ""}
            onChange={(e) => handleChange("oldPrice", Number(e.target.value) || 0)}
          />
          <small>{t("hOld")}</small>
        </div>
        <div className="field">
          <label htmlFor={pre + "cat"}>{t("fCat")}</label>
          <input
            id={pre + "cat"}
            type="text"
            value={p.cat || ""}
            onChange={(e) => handleChange("cat", e.target.value)}
          />
          <small>{t("hCat")}</small>
        </div>
        <div className="field">
          <label htmlFor={pre + "catRu"}>{t("fCatRu")}</label>
          <input
            id={pre + "catRu"}
            type="text"
            value={p.catRu || ""}
            onChange={(e) => handleChange("catRu", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={pre + "sizes"}>{t("fSizes")}</label>
          <input
            id={pre + "sizes"}
            type="text"
            value={p.sizes || ""}
            onChange={(e) => handleChange("sizes", e.target.value)}
          />
          <small>{t("hSizes")}</small>
        </div>
        <div className="field">
          <label htmlFor={pre + "sizesRu"}>{t("fSizesRu")}</label>
          <input
            id={pre + "sizesRu"}
            type="text"
            value={p.sizesRu || ""}
            onChange={(e) => handleChange("sizesRu", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={pre + "colors"}>{t("fColors")}</label>
          <input
            id={pre + "colors"}
            type="text"
            value={p.colors || ""}
            onChange={(e) => handleChange("colors", e.target.value)}
          />
          <small>{t("hColors")}</small>
        </div>
        <div className="field">
          <label htmlFor={pre + "colorsRu"}>{t("fColorsRu")}</label>
          <input
            id={pre + "colorsRu"}
            type="text"
            value={p.colorsRu || ""}
            onChange={(e) => handleChange("colorsRu", e.target.value)}
          />
        </div>
        <div className="field wide">
          <label htmlFor={pre + "note"}>{t("fDesc")}</label>
          <textarea
            id={pre + "note"}
            value={p.note || ""}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>
        <div className="field wide">
          <label htmlFor={pre + "noteRu"}>{t("fDescRu")}</label>
          <textarea
            id={pre + "noteRu"}
            value={p.noteRu || ""}
            onChange={(e) => handleChange("noteRu", e.target.value)}
          />
        </div>
      </div>

      <div className="photo">
        <div className="thumb">
          {p.photo ? <img src={p.photo} alt="" /> : t("noPhoto")}
        </div>
        <div className="field">
          <label htmlFor={pre + "photo"}>{t("fPhoto")}</label>
          <input
            id={pre + "photo"}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <small>{t("hPhoto")}</small>
        </div>
      </div>

      <div className="checks">
        <label className="check">
          <input
            type="checkbox"
            checked={!!p.isNew}
            onChange={(e) => handleChange("isNew", e.target.checked)}
          />
          {t("newCheck")}
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={!!p.soldOut}
            onChange={(e) => handleChange("soldOut", e.target.checked)}
          />
          {t("soldCheck")}
        </label>
      </div>

      <div className="row">
        <button
          className="btn danger"
          type="button"
          onClick={handleDelete}
        >
          {confirmDelete ? t("delSure") : t("del")}
        </button>
      </div>
    </section>
  );
}
