import { createContext, useContext, useState } from "react";

const T = {
  uz: {
    all: "Butun kolleksiya", navNew: "Yangiliklar", navSale: "SALE", nav: "Bo'limlar", seeAll: "Hammasini ko'rish →",
    noPhoto: "Rasm yo'q", sold: "Sotilgan", buy: "Telegramda sotib olish",
    size: "O'lcham", color: "Rang",
    empty: "Yangi mahsulotlar tez orada qo'shiladi.",
    howTitle: "Qanday buyurtma berish mumkin",
    s1t: "Tanlang", s1d: "Mahsulotni, agar bo'lsa, o'lcham yoki rangni tanlang.",
    s2t: "Tugmani bosing", s2d: "Telegram sotuvchi bilan chatni ochadi.",
    s3t: "Yuboring", s3d: "Mahsulot nomi xabarda allaqachon yozilgan. Ismingiz, telefon raqamingiz va manzilingizni qo'shib yuboring.",
    footer: "{name}. Yetkazib berish va to'lov Telegram chatida kelishiladi.",
    mHello: "Assalomu alaykum! Buyurtma bermoqchiman:", mItem: "Mahsulot", mCode: "Kod", mSize: "O'lcham", mColor: "Rang", mPrice: "Narxi", mName: "Ismim va telefon raqamim: ",
    edTitle: "Do'konni tahrirlash", cancel: "Bekor qilish", save: "Saqlash", saving: "Saqlanmoqda...",
    details: "Do'kon ma'lumotlari",
    fShop: "Do'kon nomi", fTg: "Telegram foydalanuvchi nomi", hTg: "«Sotib olish» tugmasi shu yerga olib boradi. @ belgisiz yozing.",
    fHead: "Bosh sarlavha", fHeadRu: "Bosh sarlavha (RU)",
    fIntro: "Sarlavha ostidagi matn", fIntroRu: "Sarlavha ostidagi matn (RU)",
    fName: "Mahsulot nomi", fNameRu: "Mahsulot nomi (RU)",
    fPrice: "Narxi", hPrice: "Faqat raqam, masalan 300000",
    fOld: "Eski narx", hOld: "Ixtiyoriy. Chegirma bo'lsa, avvalgi narxni yozing: SALE belgisi chiqadi.",
    fCat: "Toifa", hCat: "Masalan: Sumkalar, Kiyimlar, Poyabzal",
    fCatRu: "Toifa (RU)",
    fSizes: "O'lchamlar", hSizes: "Ixtiyoriy. Vergul bilan ajrating: 36, 37, 38",
    fSizesRu: "O'lchamlar (RU)",
    fColors: "Ranglar", hColors: "Ixtiyoriy. Vergul bilan ajrating: Qora, Jigarrang",
    fColorsRu: "Ranglar (RU)",
    fDesc: "Tavsif", fDescRu: "Tavsif (RU)",
    fPhoto: "Rasm", hPhoto: "Telefon yoki kompyuterdan rasm tanlang.",
    newCheck: "«New» belgisi", soldCheck: "Sotilgan (tugma o'chadi)",
    del: "Mahsulotni o'chirish", delSure: "O'chirish uchun yana bosing",
    add: "+ Mahsulot qo'shish", newProd: "Yangi mahsulot",
    photoBusy: "Rasm qayta ishlanmoqda...", ePhoto: "Bu faylni rasm sifatida o'qib bo'lmadi. JPG yoki PNG tanlang.",
    eTg: "Telegram foydalanuvchi nomi noto'g'ri. 5 dan 32 gacha harf, raqam yoki pastki chiziq ishlating.",
    eName: "{n}-mahsulotga nom kerak.",
    ePrice: "«{name}» uchun narx kerak.",
    eOld: "«{name}» uchun eski narx joriy narxdan katta bo'lishi kerak.",
    saved: "Muvaffaqiyatli saqlandi!",
    login: "Kirish",
    email: "Email",
    password: "Parol",
    logout: "Chiqish",
    loginError: "Email yoki parol noto'g'ri.",
    adminTitle: "Admin panel",
    currency: "Valyuta", currencyRu: "Valyuta (RU)",
  },
  ru: {
    all: "Вся коллекция", navNew: "Новинки", navSale: "SALE", nav: "Разделы", seeAll: "Смотреть всё →",
    noPhoto: "Нет фото", sold: "Продано", buy: "Купить в Telegram",
    size: "Размер", color: "Цвет",
    empty: "Скоро здесь появятся новые товары.",
    howTitle: "Как сделать заказ",
    s1t: "Выберите", s1d: "Выберите товар, а также размер или цвет, если они есть.",
    s2t: "Нажмите «Купить»", s2d: "Telegram откроет чат с продавцом.",
    s3t: "Отправьте", s3d: "Название товара уже в сообщении. Добавьте имя, номер телефона и адрес доставки и отправьте.",
    footer: "{name}. Доставка и оплата согласовываются в чате Telegram.",
    mHello: "Здравствуйте! Хочу заказать:", mItem: "Товар", mCode: "Код", mSize: "Размер", mColor: "Цвет", mPrice: "Цена", mName: "Моё имя и номер телефона: ",
    edTitle: "Редактирование магазина", cancel: "Отмена", save: "Сохранить", saving: "Сохранение...",
    details: "Данные магазина",
    fShop: "Название магазина", fTg: "Имя пользователя в Telegram", hTg: "Кнопка «Купить» ведёт сюда. Пишите без @.",
    fHead: "Заголовок", fHeadRu: "Заголовок (RU)",
    fIntro: "Текст под заголовком", fIntroRu: "Текст под заголовком (RU)",
    fName: "Название товара", fNameRu: "Название товара (RU)",
    fPrice: "Цена", hPrice: "Только цифры, например 300000",
    fOld: "Старая цена", hOld: "Необязательно. При скидке укажите прежнюю цену, появится метка SALE.",
    fCat: "Категория", hCat: "Например: Сумки, Одежда, Обувь",
    fCatRu: "Категория (RU)",
    fSizes: "Размеры", hSizes: "Необязательно. Через запятую: 36, 37, 38",
    fSizesRu: "Размеры (RU)",
    fColors: "Цвета", hColors: "Необязательно. Через запятую: Qora, Jigarrang",
    fColorsRu: "Цвета (RU)",
    fDesc: "Описание", fDescRu: "Описание (RU)",
    fPhoto: "Фото", hPhoto: "Выберите фото на телефоне или компьютере.",
    newCheck: "Метка «New»", soldCheck: "Продано (кнопка отключится)",
    del: "Удалить товар", delSure: "Нажмите ещё раз, чтобы удалить",
    add: "+ Добавить товар", newProd: "Новый товар",
    photoBusy: "Обработка фото...", ePhoto: "Не удалось прочитать файл как фото. Выберите JPG или PNG.",
    eTg: "Неверное имя пользователя Telegram.",
    eName: "Товару {n} нужно название.",
    ePrice: "Для «{name}» нужна цена.",
    eOld: "Для «{name}» старая цена должна быть больше текущей.",
    saved: "Успешно сохранено!",
    login: "Войти",
    email: "Email",
    password: "Пароль",
    logout: "Выйти",
    loginError: "Неверный email или пароль.",
    adminTitle: "Админ панель",
    currency: "Валюта", currencyRu: "Валюта (RU)",
  },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("shop-lang");
      return saved === "ru" ? "ru" : "uz";
    } catch {
      return "uz";
    }
  });

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("shop-lang", l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useLang();
  return (key, vars) => {
    let s = (T[lang] && T[lang][key]) || T.uz[key] || key;
    if (vars) {
      for (const v in vars) {
        s = s.replace("{" + v + "}", vars[v]);
      }
    }
    return s;
  };
}

export function L(obj, key, lang) {
  if (lang === "ru" && obj[key + "Ru"] && String(obj[key + "Ru"]).trim()) {
    return obj[key + "Ru"];
  }
  return obj[key] || "";
}

export function list(s) {
  return (s || "").split(",").map((x) => x.trim()).filter(Boolean);
}

export function money(n, store, lang) {
  const cur = L(store, "currency", lang);
  return String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + cur;
}

export function isSale(p) {
  return Number(p.oldPrice) > Number(p.price);
}

export function labelsFor(p, key, lang) {
  const uz = list(p[key]);
  const ru = list(p[key + "Ru"]);
  return uz.map((c, i) => (lang === "ru" && ru[i]) ? ru[i] : c);
}

export function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error("Cannot read file"));
    r.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        const max = 800;
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * s);
        cv.height = Math.round(img.height * s);
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        const dataUrl = cv.toDataURL("image/jpeg", 0.75);
        const ar = Math.round((cv.width / cv.height) * 1000) / 1000;
        resolve({ dataUrl, ar });
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}
