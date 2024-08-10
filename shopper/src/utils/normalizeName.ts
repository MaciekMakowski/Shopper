import { franc } from "franc";

const normalizeEnglish = (name: string): string => {
  return name.toLowerCase().replace(/(s|es)$/, "");
};

const normalizePolish = (name: string): string => {
  const lowercasedName = name.toLowerCase();
  return lowercasedName.replace(/(ów|ie|a|e|s|i|y)$/, "");
};

const normalizeProductName = (name: string): string => {
  const lang = franc(name);

  if (lang === "pol") {
    return normalizePolish(name);
  } else if (lang === "eng") {
    return normalizeEnglish(name);
  } else {
    return name.toLowerCase();
  }
};

export default normalizeProductName;
