import { SITE } from '../data/site';

export interface Crumb {
  name: string;
  path: string;
}

export const absolute = (path: string, site: URL | undefined) => new URL(path, site).href;

export const organizationId = (site: URL | undefined) => absolute('/#organization', site);

const sameAs: string[] = Object.values(SITE.social).filter(Boolean);

export const organizationLd = (site: URL | undefined, logoUrl: string) => ({
  '@type': 'Organization',
  '@id': organizationId(site),
  name: SITE.name,
  url: absolute('/', site),
  logo: { '@type': 'ImageObject', url: logoUrl },
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.district,
    addressRegion: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phone,
    email: SITE.email,
    contactType: 'sales',
    areaServed: 'TR',
    availableLanguage: 'Turkish',
  },
  ...(sameAs.length && { sameAs }),
});

export const websiteLd = (site: URL | undefined) => ({
  '@type': 'WebSite',
  '@id': absolute('/#website', site),
  name: SITE.name,
  url: absolute('/', site),
  inLanguage: 'tr-TR',
  publisher: { '@id': organizationId(site) },
});

export const breadcrumbLd = (crumbs: Crumb[], site: URL | undefined) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absolute(c.path, site),
  })),
});
