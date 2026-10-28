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
    About: "About", Education: "Education", Publications: "Publications", Skills: "Skills", Projects: "Projects", Awards: "Awards",
    Experience: "Experience", Summary: "Summary", Achievements: "Achievements", showMore: "Show more",
    showLess: "Show less", present: "Present", aboutMe: "About me", socialMedia: "Social media",
    technologies: "Technologies used", otherLanguage: "日本語", otherLanguageLabel: "日本語で表示",
    portfolio: "Portfolio", skillLanguages: "Languages", skillML: "ML Skills", skillTools: "Tools",
    skillCloud: "Cloud & Infra", skillEngineering: "Software Engineering", profileOf: "Profile of", sep: " - ", saveCV: "Save CV as PDF",
  },
  ja: {
    About: "自己紹介", Education: "学歴", Publications: "論文・発表", Skills: "スキル", Projects: "プロジェクト", Awards: "受賞・実績",
    Experience: "実務経験", Summary: "概要", Achievements: "主な取り組み", showMore: "もっと見る",
    showLess: "閉じる", present: "現在", aboutMe: "プロフィール", socialMedia: "連絡先・SNS",
    technologies: "使用技術", otherLanguage: "English", otherLanguageLabel: "View in English",
    portfolio: "ポートフォリオ", skillLanguages: "プログラミング言語", skillML: "機械学習", skillTools: "ツール",
    skillCloud: "クラウド・インフラ", skillEngineering: "ソフトウェアエンジニアリング", profileOf: "プロフィール写真：", sep: "・", saveCV: "CV を PDF で保存",
  },
} as const;

export type UIKey = keyof (typeof UI)["en"];
export const t = (locale: string | undefined, key: UIKey): string => UI[localeOf(locale)][key];
