import type { ServiceCatalogArea, SpaceId } from '../data/serviceCatalog';
import { indianSocialLinks, spacePages } from '../data/spaces';
import { normalizeServiceCatalog } from '../utils/spaces';
import { getCmsDefinition } from './cmsDefaults';
import { useCmsValue } from './CmsProvider';

type NavigationItem = { label: string; to: string };
type BusinessHour = { days: string; value: string };
export type SocialLink = { label: string; href: string };

export type GlobalSettings = {
  brandName: string;
  logoMark: string;
  logoLockup: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  address: string;
  city: string;
  mapHref: string;
  bookingUrl: string;
  hours: BusinessHour[];
  navigation: NavigationItem[];
  socialLinks?: SocialLink[];
};

export type HomeHeroContent = {
  location: string;
  founded: string;
  title: string;
  lead: string;
  video: string;
  poster: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export type HomeProofContent = { title: string; items: { value: string; label: string }[] };
export type HomeServicesContent = { eyebrow: string; title: string };
export type HomeClubContent = { eyebrow: string; title: string; description: string; ctaLabel: string; video: string; poster: string };
export type PromotionContent = { eyebrow: string; title: string; note: string; areas?: SpaceId[]; visible?: boolean };
export type HomeGiftCardsContent = { eyebrow: string; title: string; description: string; image: string; values: string[]; primaryLabel: string; secondaryLabel: string };
export type HomeGuidesContent = { eyebrow: string; title: string; ctaLabel: string };
export type HomeVisitContent = { eyebrow: string; title: string; bookingTitle: string; bookingLabel: string };

export type TeamMemberContent = {
  name: string;
  role: string;
  statement: string;
  image: string;
  areas?: SpaceId[];
  visible?: boolean;
};

export type TeamPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  collaborationEyebrow: string;
  collaborationTitle: string;
  collaborationDescription: string;
  bookingTitle: string;
  bookingDescription: string;
};

export type ClubGalleryItem = { label: string; title: string; image?: string; video?: string; poster?: string };
export type ClubPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  heroVideo: string;
  heroPoster: string;
  gallery: ClubGalleryItem[];
  amenitiesTitle: string;
  amenities: { title: string; description: string }[];
};

export type StyleBookFrame = { image: string; label: string; alt: string; className: string; areas?: SpaceId[] };
export type StyleBookContent = { eyebrow: string; title: string; description: string; frames: StyleBookFrame[] };

export type JournalArticleContent = {
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
  areas?: SpaceId[];
  visible?: boolean;
};

export type JournalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  coverEyebrow: string;
  coverTitle: string;
  coverDescription: string;
};

export type SpacePageContent = {
  id: SpaceId;
  title: string;
  lead: string;
  servicesTitle: string;
  teamTitle: string;
  styleBookTitle: string;
  adviceTitle: string;
  benefitsTitle: string;
  inquiryTitle: string;
  inquiryLead: string;
  benefits: { title: string; description: string }[];
};

export type ProductContent = { number: string; title: string; category: string; description: string; visible?: boolean };
export type GiftCardsPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  values: string[];
  buttonLabel: string;
  steps: { title: string; description: string }[];
};
export type ContactPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  journey: { title: string; description: string }[];
};

function useDefinition<T>(key: string): T {
  const definition = getCmsDefinition(key);
  if (!definition) throw new Error(`No existe la definición CMS ${key}.`);
  return useCmsValue<T>(key, definition.value as unknown as T);
}

export const useGlobalSettings = () => {
  const settings = useDefinition<GlobalSettings>('global.settings');
  return { ...settings, socialLinks: settings.socialLinks?.length ? settings.socialLinks : indianSocialLinks };
};
export const useHomeHero = () => useDefinition<HomeHeroContent>('home.hero');
export const useHomeProof = () => useDefinition<HomeProofContent>('home.proof');
export const useHomeServices = () => useDefinition<HomeServicesContent>('home.services');
export const useHomeClub = () => useDefinition<HomeClubContent>('home.club');
export const usePromotionsContent = () => useDefinition<PromotionContent[]>('promotions.list').filter((item) => item.visible !== false);
export const useHomeGiftCards = () => useDefinition<HomeGiftCardsContent>('home.giftCards');
export const useHomeGuides = () => useDefinition<HomeGuidesContent>('home.guides');
export const useHomeVisit = () => useDefinition<HomeVisitContent>('home.visit');
export const useServiceCatalogContent = () => normalizeServiceCatalog(useDefinition<ServiceCatalogArea[]>('services.catalog'));
export const useSpacesContent = () => useCmsValue<SpacePageContent[]>('spaces.pages', spacePages);
export const useTeamMembersContent = () => useDefinition<TeamMemberContent[]>('team.members').filter((item) => item.visible !== false);
export const useTeamPageContent = () => useDefinition<TeamPageContent>('team.page');
export const useClubPageContent = () => useDefinition<ClubPageContent>('club.page');
export const useStyleBookContent = () => useDefinition<StyleBookContent>('stylebook.gallery');
export const useJournalArticlesContent = () => useDefinition<JournalArticleContent[]>('journal.articles').filter((item) => item.visible !== false);
export const useJournalPageContent = () => useDefinition<JournalPageContent>('journal.page');
export const useProductsContent = () => useDefinition<ProductContent[]>('products.list').filter((item) => item.visible !== false);
export const useGiftCardsPageContent = () => useDefinition<GiftCardsPageContent>('giftcards.page');
export const useContactPageContent = () => useDefinition<ContactPageContent>('contact.page');
