export const PORTFOLIO_FILTERS = ["All", "Branding", "Software", "Digital Marketing", "Web Design"] as const;

export type PortfolioCategory = (typeof PORTFOLIO_FILTERS)[number];

export interface PortfolioProject {
  slug: string;
  name: string;
  client: string;
  category: Exclude<PortfolioCategory, "All">;
  description: string;
  image: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "odeumu-digital-storefront",
    name: "Odeumu Digital Storefront",
    client: "Odeumu",
    category: "Web Design",
    description: "A custom e-commerce storefront designed for speed, clarity, and higher conversions.",
    image: "/images/portfolio/odeumu-digital-storefront.jpg",
  },
  {
    slug: "greenmart-brand-refresh",
    name: "GreenMart Brand Refresh",
    client: "GreenMart",
    category: "Branding",
    description: "A full visual identity overhaul that gave GreenMart a confident, modern presence.",
    image: "/images/portfolio/greenmart-brand-refresh.jpg",
  },
  {
    slug: "bookeasy-scheduling-app",
    name: "BookEasy Scheduling App",
    client: "BookEasy",
    category: "Software",
    description: "A custom booking and scheduling platform that automated manual operations.",
    image: "/images/portfolio/bookeasy-scheduling-app.jpg",
  },
  {
    slug: "poywise-growth-campaign",
    name: "PoyWise Growth Campaign",
    client: "PoyWise",
    category: "Digital Marketing",
    description: "A multi-channel campaign that grew qualified leads and brand visibility.",
    image: "/images/portfolio/poywise-growth-campaign.jpg",
  },
  {
    slug: "edubridge-learning-portal",
    name: "EduBridge Learning Portal",
    client: "EduBridge",
    category: "Web Design",
    description: "A clean, accessible learning portal built to scale with EduBridge's growing student base.",
    image: "/images/portfolio/edubridge-learning-portal.jpg",
  },
  {
    slug: "playvista-identity-system",
    name: "Playvista Identity System",
    client: "Playvista",
    category: "Branding",
    description: "A distinct brand identity system spanning logo, color, and messaging guidelines.",
    image: "/images/portfolio/playvista-identity-system.jpg",
  },
];
