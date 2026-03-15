/** Navigation data shared across sidebar, mobile drawer, and subnav panels */

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** If present, clicking toggles a subnav panel instead of navigating */
  children?: NavSubItem[];
}

export const MEN_ITEMS: NavSubItem[] = [
  { label: "New In", href: "/new-in" },
  { label: "Sweatshirts", href: "/men/sweatshirts" },
  { label: "T-shirts", href: "/men/t-shirts" },
  { label: "Shirts", href: "/men/shirts" },
  { label: "Outerwear", href: "/men/outerwear" },
  { label: "Denim", href: "/men/denim" },
  { label: "Trousers & Bottoms", href: "/men/trousers" },
  { label: "Shorts", href: "/men/shorts" },
  { label: "Hats & Caps", href: "/men/hats-caps" },
  { label: "Accessories", href: "/men/accessories" },
];

export const WOMEN_ITEMS: NavSubItem[] = [
  { label: "New In", href: "/women/new-in" },
  { label: "Sweatshirts", href: "/women/sweats" },
  { label: "T-shirts", href: "/women/t-shirts" },
  { label: "Shirts", href: "/women/shirts" },
  { label: "Outerwear", href: "/women/outerwear" },
  { label: "Denim", href: "/women/denim" },
  { label: "Trousers & Bottoms", href: "/women/trousers" },
  { label: "Shorts", href: "/women/shorts" },
  { label: "Hats & Caps", href: "/women/hats-caps" },
  { label: "Accessories", href: "/women/accessories" },
];

export const GIFTING_ITEMS: NavSubItem[] = [
  { label: "Gift for Him", href: "/gifting/gift-for-him" },
  { label: "Gift for Her", href: "/gifting/gift-for-her" },
  { label: "Life Style", href: "/gifting/lifestyle" },
  { label: "Gift Cards", href: "/gifting/gift-cards" },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Men", href: "#", children: MEN_ITEMS },
  { label: "Women", href: "#", children: WOMEN_ITEMS },
  { label: "New In", href: "/new-in" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Sale", href: "/sale" },
  { label: "Collections & Capsules", href: "/collections" },
  { label: "Gifting", href: "#", children: GIFTING_ITEMS },
];
