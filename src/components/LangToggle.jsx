import { useLang } from "../utils/lang.jsx";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang" role="group" aria-label="Language">
      {["uz", "ru"].map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={String(lang === l)}
          onClick={() => { if (lang !== l) setLang(l); }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
