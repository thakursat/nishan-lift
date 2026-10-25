import {
  breadcrumbGraph,
  faqGraph,
  llmsText,
  siteGraph,
} from '@/lib/structured-data';

import { faqs, products, reviews } from '@/constant/nishan-content';

describe('structured data', () => {
  it('describes the business with live contact details, hours and rating', () => {
    const [business, website] = siteGraph()['@graph'] as Record<
      string,
      unknown
    >[];

    expect(business['@type']).toContain('LocalBusiness');
    expect(business.telephone).toBe('+91 99280 58124');
    expect(business.aggregateRating).toMatchObject({
      ratingValue: 4.8,
      reviewCount: 17,
    });
    expect(business.openingHoursSpecification).toMatchObject({
      opens: '00:00',
      closes: '23:59',
    });
    expect(business.review).toHaveLength(reviews.length);
    expect(website.publisher).toEqual({ '@id': business['@id'] });
  });

  it('dates every review as a valid ISO day', () => {
    const [business] = siteGraph()['@graph'] as {
      review: { datePublished: string }[];
    }[];
    business.review.forEach((review) =>
      expect(review.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/),
    );
  });

  it('builds a FAQPage from the visible FAQs', () => {
    const graph = faqGraph();
    expect(graph['@type']).toBe('FAQPage');
    expect(graph.mainEntity).toHaveLength(faqs.length);
    expect(graph.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].answer);
  });

  it('numbers breadcrumbs from Home', () => {
    const graph = breadcrumbGraph([{ name: 'About', path: '/about' }]);
    expect(graph.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(graph.itemListElement[1].item).toMatch(/\/about$/);
  });
});

describe('llms.txt', () => {
  it('summarises the business for AI assistants', () => {
    const text = llmsText();
    expect(text.startsWith('# Nishan Lift Solutions')).toBe(true);
    expect(text).toContain('+91 99280 58124');
    products.forEach((product) => expect(text).toContain(product.name));
    expect(text).toContain('/llms-full.txt');
  });

  it('includes FAQs and reviews in the full version', () => {
    const text = llmsText(true);
    faqs.forEach((faq) => expect(text).toContain(faq.question));
    expect(text).toContain('Kiana Jewels');
    expect(text).not.toContain('## Optional');
  });
});
