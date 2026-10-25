import { siteConfig } from '@/constant/config';
import {
  companyInfo,
  elevatorTypes,
  faqs,
  featuredServices,
  products,
  rating,
  reviews,
  services,
} from '@/constant/nishan-content';

const BUSINESS_ID = `${siteConfig.url}/#business`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const absolute = (path: string) => `${siteConfig.url}${path}`;

/** Site-wide graph: the business itself and the website that represents it. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': BUSINESS_ID,
        name: companyInfo.name,
        alternateName: 'Nishan Lift',
        slogan: companyInfo.tagline,
        description: `${companyInfo.description} ${companyInfo.commitment}`,
        url: siteConfig.url,
        logo: absolute('/images/site/logo-full.webp'),
        image: [
          absolute('/images/site/hero-cabin.webp'),
          absolute('/images/site/shopfront.webp'),
          absolute('/images/og.jpg'),
        ],
        telephone: companyInfo.phone,
        email: companyInfo.email,
        founder: { '@type': 'Person', name: companyInfo.owner },
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Gate No. 2, Gali No. 2, opposite Teoler High School, Raghunath Vihar, Prithviraj Nagar (B Sector)',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302021',
          addressCountry: 'IN',
        },
        hasMap: companyInfo.mapUrl,
        areaServed: companyInfo.serviceAreas.map((city) => ({
          '@type': 'City',
          name: city,
          containedInPlace: { '@type': 'State', name: 'Rajasthan' },
        })),
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.score,
          reviewCount: rating.count,
          bestRating: 5,
        },
        review: reviews.map((review) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: review.name },
          datePublished: new Date(review.date).toISOString().slice(0, 10),
          reviewBody: review.text,
        })),
        knowsAbout: [
          'Lift installation',
          'Elevator modernization',
          'Lift AMC',
          'Emergency lift repair',
          ...elevatorTypes,
        ],
        hasOfferCatalog: catalog(),
        sameAs: [companyInfo.instagramUrl, companyInfo.reviewsUrl],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: siteConfig.title,
        url: siteConfig.url,
        inLanguage: siteConfig.locale,
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  };
}

/** Every service and product, offered by the business. */
export function catalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Lift services and products',
    itemListElement: [
      ...featuredServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: 'Elevator service',
          areaServed: companyInfo.serviceAreas,
          provider: { '@id': BUSINESS_ID },
        },
      })),
      ...services.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          provider: { '@id': BUSINESS_ID },
        },
      })),
      ...products.map((product) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          image: absolute(product.image),
          category: 'Lift cabins and doors',
          brand: { '@type': 'Brand', name: companyInfo.name },
        },
      })),
    ],
  };
}

export function faqGraph() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbGraph(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map(
      (item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absolute(item.path),
      }),
    ),
  };
}

/** Plain-text brief for AI assistants, served at /llms.txt. */
export function llmsText(full = false) {
  const lines = [
    `# ${companyInfo.name}`,
    '',
    `> ${companyInfo.category} in Jaipur, Rajasthan, India. Lift installation, modernization, Annual Maintenance Contracts (AMC) and 24×7 emergency lift repair. Rated ${rating.score}/5 from ${rating.count}+ Google reviews.`,
    '',
    '## Key facts',
    `- Phone / WhatsApp: ${companyInfo.phone}`,
    `- Email: ${companyInfo.email}`,
    `- Address: ${companyInfo.address}`,
    `- Hours: ${companyInfo.hours}`,
    `- Service areas: ${companyInfo.serviceAreas.join(', ')}`,
    `- Founder: ${companyInfo.owner}`,
    `- Instagram: ${companyInfo.instagramUrl}`,
    `- Google Maps: ${companyInfo.mapUrl}`,
    '',
    '## Pages',
    `- [Home](${siteConfig.url}/): overview, services, products, modernization, safety audit, reviews and gallery`,
    `- [Products & Services](${siteConfig.url}/products-services): full service list and lift cabin/door range`,
    `- [About](${siteConfig.url}/about): company story, founder, business hours`,
    `- [Contact](${siteConfig.url}/contact): enquiry form, phone, WhatsApp and directions`,
    '',
    '## Services',
    ...featuredServices.map(
      (service) =>
        `- ${service.title}${full ? `: ${service.description}` : ''}`,
    ),
    ...services.map((service) => `- ${service}`),
    '',
    '## Elevator types',
    ...elevatorTypes.map((type) => `- ${type}`),
    '',
    '## Products',
    ...products.map((product) => `- ${product.name}`),
  ];

  if (full) {
    lines.push(
      '',
      '## About',
      companyInfo.description,
      companyInfo.commitment,
      '',
      '## Frequently asked questions',
      ...faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
      '## Google reviews',
      ...reviews.map(
        (review) => `- "${review.text}" — ${review.name}, ${review.date}`,
      ),
    );
  } else {
    lines.push(
      '',
      '## Optional',
      `- [Full details, FAQs and reviews](${siteConfig.url}/llms-full.txt)`,
    );
  }

  return `${lines.join('\n')}\n`;
}
