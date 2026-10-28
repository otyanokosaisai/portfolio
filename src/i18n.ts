// Language support: English at /, Japanese at /ja/ (astro.config.mjs i18n).
// Components read the CV and fixed UI strings for the page's locale through these helpers.
import en from "../cv.json";
import ja from "../cv.ja.json";

export type Locale = "en" | "ja";

export const localeOf = (locale?: string): Locale => (locale === "ja" ? "ja" : "en");
export const cvFor = (locale?: string) => (localeOf(locale) === "ja" ? ja : en) as typeof en;
export const pathFor = (locale: Locale) => (locale === "ja" ? "/ja/" : "/");

const UI = {
  en: {
    About: "About", Education: "Education", Skills: "Skills", Projects: "Projects", Awards: "Awards",
    Experience: "Experience", Summary: "Summary", Achievements: "Achievements", showMore: "Show more",
    showLess: "Show less", present: "Present", aboutMe: "About me", socialMedia: "Social media",
    technologies: "Technologies used", otherLanguage: "日本語", otherLanguageLabel: "日本語で表示",
  },
  ja: {
    About: "概要", Education: "学歴", Skills: "スキル", Projects: "プロジェクト", Awards: "受賞",
    Experience: "職歴", Summary: "概要", Achievements: "取り組み", showMore: "もっと見る",
    showLess: "閉じる", present: "現在", aboutMe: "自己紹介", socialMedia: "SNS",
    technologies: "使用技術", otherLanguage: "English", otherLanguageLabel: "View in English",
  },
} as const;

export type UIKey = keyof (typeof UI)["en"];
export const t = (locale: string | undefined, key: UIKey): string => UI[localeOf(locale)][key];
