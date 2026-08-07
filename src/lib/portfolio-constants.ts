export const PORTFOLIO_FILTERS = ["All", "Branding", "Software", "Digital Marketing", "Web Design"] as const;

export type PortfolioCategory = (typeof PORTFOLIO_FILTERS)[number];
