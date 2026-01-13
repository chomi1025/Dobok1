import { category } from "./../assets/data/category";

export function getMainCategory(mainSlug: string) {
  return category.find((c) => c.mainSlug === mainSlug);
}

export function getSubCategory(mainSlug: string, subSlug: string) {
  const main = getMainCategory(mainSlug);
  if (!main) return null;

  return main.subMenu.find((s) => s.subSlug === subSlug);
}
