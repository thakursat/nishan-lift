import fs from 'fs';
import path from 'path';

import {
  appreciationLetters,
  companyInfo,
  featuredServices,
  galleryImages,
  products,
  reviews,
  services,
} from '@/constant/nishan-content';

const publicFile = (src: string) => path.join(process.cwd(), 'public', src);

describe('nishan content', () => {
  it('uses the phone number from the live listing', () => {
    expect(companyInfo.phoneHref).toBe('tel:+919928058124');
    expect(companyInfo.whatsappHref).toContain('wa.me/919928058124');
  });

  it('lists the eight live products and services', () => {
    expect(products.map((product) => product.name)).toEqual([
      'SS Golden Cabin',
      'SS Finish',
      'SS Golden Finish Design',
      'SS Cabin',
      'SS Design Cabin',
      'MS Finish Cabin',
      'MS Finish Door',
      'SS Mirror Finish Glass Door',
    ]);
    expect(services).toHaveLength(8);
    expect(featuredServices).toHaveLength(3);
  });

  it('points every image at a file that exists', () => {
    const images = [
      ...products.map((product) => product.image),
      ...featuredServices.map((service) => service.image),
      ...appreciationLetters.map((letter) => letter.image),
      ...galleryImages,
    ];

    images.forEach((image) => {
      expect(fs.existsSync(publicFile(image))).toBe(true);
    });
  });

  it('has a non-empty text for every review', () => {
    expect(reviews.length).toBeGreaterThan(0);
    reviews.forEach((review) => expect(review.text.trim()).not.toBe(''));
  });
});
