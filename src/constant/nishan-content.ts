export const companyInfo = {
  name: 'Nishan Lift Solutions',
  owner: 'Amit Sharma',
  tagline: 'Your trusted partner in Elevator Service',
  category: 'Lift Service & Elevator Manufacturer',
  description:
    'Nishan Lift Solutions is a trusted name in premium lift installation, modernization, and maintenance services. We deliver high-quality, safe, and reliable elevator solutions for residential, commercial, and industrial projects. With expert engineers, timely service, and advanced technology, we ensure smooth and efficient vertical mobility for every building.',
  commitment:
    'Nishan Lift Solutions is committed to superior craftsmanship, customer satisfaction, and long-term performance—making us your dependable partner for all elevator and lift service needs.',
  address:
    'Gate No. 2, Gali No. 2, opposite Teoler High School, Raghunath Vihar, Prithviraj Nagar (B Sector), Jaipur, Rajasthan 302021',
  shortAddress:
    'Opposite Teoler High School, Gate No. 2, Jaipur, Rajasthan 302021',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Nishan+Lift+Solutions%2C+Opposite+Teoler+High+School%2C+Gate+no.2%2C+Jaipur%2C+Rajasthan%2C+302021&query_place_id=ChIJg2UedJm0bTkRVFGvv5dbLUI',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Nishan+Lift+Solutions%2C+Opposite+Teoler+High+School%2C+Gate+no.2%2C+Jaipur%2C+Rajasthan%2C+302021&destination_place_id=ChIJg2UedJm0bTkRVFGvv5dbLUI',
  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJg2UedJm0bTkRVFGvv5dbLUI',
  phone: '+91 99280 58124',
  phoneHref: 'tel:+919928058124',
  whatsappHref:
    'https://wa.me/919928058124?text=Hi%20Nishan%20Lift%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20a%20lift.',
  email: 'info@nishanliftsolutions.com',
  instagram: 'nishanlift',
  instagramUrl: 'https://www.instagram.com/nishanlift/',
  hours: 'Open 24 hours, Monday–Sunday',
  serviceAreas: ['Jaipur', 'Ajmer', 'Sikar', 'Jhunjhunu'],
};

export const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products-services', label: 'Products & Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export const rating = { score: 4.8, count: 17 };

export const metrics = [
  { value: 4.8, decimals: 1, suffix: '', label: 'Google Rating' },
  { value: 300, decimals: 0, suffix: '+', label: 'Happy Customers' },
  { value: 24, decimals: 0, suffix: '×7', label: 'Service Support' },
  { value: 8, decimals: 0, suffix: '', label: 'Elevator Types' },
];

export const services = [
  'Commercial Services',
  'Dumbwaiters And Chair Lifts',
  'General Repairs',
  'General Repairs And Maintenance',
  'Installation',
  'Modernization',
  'Oil Filtration',
  'Pressure Testing',
];

export const featuredServices = [
  {
    title: 'Commercial & Residential Elevator Installation',
    description:
      'End-to-end design, manufacturing, and installation of premium passenger and freight elevators for commercial complexes, hospitals, and residential buildings. We ensure compliance with all safety regulations, offering energy-efficient lifts customized to your architectural requirements.',
    image: '/images/site/golden-cabin.webp',
  },
  {
    title: 'Emergency Lift Repair & Maintenance (AMC)',
    description:
      "Don't let a broken lift disrupt your building. We provide rapid-response emergency repair services and comprehensive Annual Maintenance Contracts (AMC). Our preventive maintenance ensures smooth operation, reduces downtime, and extends the lifespan of your elevators.",
    image: '/images/site/machine.webp',
  },
  {
    title: 'Elevator Modernization & Upgrades',
    description:
      'Upgrade your aging lifts with modern technology. We modernize outdated elevator systems to improve safety, speed, and energy efficiency. From cabin aesthetic upgrades to advanced control system replacements, we bring your old lifts up to modern standards.',
    image: '/images/site/after.webp',
  },
];

export const elevatorTypes = [
  'MRL Elevator',
  'Passenger Elevator',
  'Capsule Elevator',
  'Home Elevator',
  'Hospital Elevator',
  'Goods Elevator',
  'Car Elevator',
  'Hydraulic Elevator',
];

export const products = [
  {
    name: 'SS Golden Cabin',
    image: '/images/site/products/ss-golden-cabin.webp',
  },
  { name: 'SS Finish', image: '/images/site/products/ss-finish.webp' },
  {
    name: 'SS Golden Finish Design',
    image: '/images/site/products/ss-golden-finish-design.webp',
  },
  { name: 'SS Cabin', image: '/images/site/products/ss-cabin.webp' },
  {
    name: 'SS Design Cabin',
    image: '/images/site/products/ss-design-cabin.webp',
  },
  {
    name: 'MS Finish Cabin',
    image: '/images/site/products/ms-finish-cabin.webp',
  },
  {
    name: 'MS Finish Door',
    image: '/images/site/products/ms-finish-door.webp',
  },
  {
    name: 'SS Mirror Finish Glass Door',
    image: '/images/site/products/ss-mirror-finish-glass-door.webp',
  },
];

export const galleryImages = Array.from(
  { length: 32 },
  (_, index) =>
    `/images/site/gallery/${String(index + 1).padStart(2, '0')}.webp`,
);

export const highlights = [
  '24/7 Quick Response',
  'Modern Equipment',
  'Competitive Pricing',
  'Service Guarantee',
  'Experienced Technicians',
];

export const safetyAudit = {
  date: 'September 10, 2026',
  title: 'Free Lift Maintenance & Safety Audit',
  intro:
    "Frequent breakdowns? Unusual noises? Jerky stops? Moisture and heavy usage can cause hidden wear and tear on your elevator's electrical and mechanical systems.",
  checks: [
    'Door sensors and alignment',
    'Motor and cable health',
    'Control panel & electrical safety',
    'Emergency rescue systems (ARD)',
  ],
};

export const reviews = [
  {
    name: 'Neha Sharma',
    date: 'July 31, 2026',
    text: 'Excellent lift installation and outstanding service. The team was professional, punctual and complete the work on time. Highly Recommended',
  },
  {
    name: 'Rajat Sharma',
    date: 'July 31, 2026',
    text: 'Excellent product. Best part is after sales service which is most important. Thanks a lot',
  },
  {
    name: 'Param InFin',
    date: 'July 27, 2026',
    text: 'Product Quality is very good & post sale services are very prompt. 100% recommendation to try Nishan Lift.',
  },
  {
    name: 'Ashish Sharma',
    date: 'July 20, 2026',
    text: 'Fantastic experience with Nishan Lift Solution. Their prompt service and commitment to deadlines made our lift installation completely stress-free. They delivered the exact high quality they promised from day one, on time and with zero hassle. A reliable, professional team.',
  },
  {
    name: 'Jeetu CA',
    date: 'July 18, 2026',
    text: 'Pretty much satisfied with the service they provide',
  },
  {
    name: 'Shailendra Kumar',
    date: 'April 21, 2026',
    text: 'Excellent customer service with best product.',
  },
  {
    name: 'Harsh Bhandari',
    date: 'April 17, 2026',
    text: 'We, Kiana Jewels Pvt. Ltd., SEZ 2, jaipur were highly amazed by the quality of Lift and services that these guys are providing. At first we were in dilemma but as we got the elevator delivered all our doubts were cleared. Keep up the good work. We recommend Nishan Lift as one of the finest vendor.',
  },
  {
    name: 'Uttam Singh',
    date: 'February 12, 2026',
    text: 'Can’t believe such great quality lifts can be installed at such great prices. Thanks to the owner Amit ji for seamlessly building this facility.',
  },
];

export const appreciationLetters = [
  {
    from: 'Kiana Jewels Pvt. Ltd.',
    image: '/images/site/letter-kiana.webp',
  },
  {
    from: 'Epoch Form Architects',
    image: '/images/site/letter-epoch.webp',
  },
];

export const instaReels = [
  { shortcode: 'DDg95Srhcsx' },
  { shortcode: 'DCrPOg7BPdj' },
  { shortcode: 'DO8_LmIEu-s' },
  { shortcode: 'DPiZ90Wkk3p' },
];

/** Answers drawn only from the business's own listing; also feeds FAQPage schema and llms.txt. */
export const faqs = [
  {
    question:
      'Does Nishan Lift Solutions offer 24×7 emergency lift repair in Jaipur?',
    answer:
      'Yes. Nishan Lift Solutions is open 24 hours, Monday to Sunday, and provides rapid-response emergency lift repair. Call +91 99280 58124 at any time.',
  },
  {
    question: 'Which areas does Nishan Lift Solutions serve?',
    answer:
      'The team is based opposite Teoler High School, Gate No. 2, Jaipur, and serves residential and commercial buildings across Jaipur, Ajmer, Sikar and Jhunjhunu.',
  },
  {
    question: 'What types of elevators does Nishan Lift Solutions install?',
    answer:
      'MRL, passenger, capsule, home, hospital, goods, car and hydraulic elevators, plus dumbwaiters and chair lifts, for residential, commercial and industrial projects.',
  },
  {
    question: 'Do you provide an Annual Maintenance Contract (AMC) for lifts?',
    answer:
      'Yes. Comprehensive Annual Maintenance Contracts with preventive maintenance keep lifts running smoothly, reduce downtime and extend their lifespan.',
  },
  {
    question: 'Can you modernize an old lift?',
    answer:
      'Yes. Outdated elevators are modernized to improve safety, speed and energy efficiency — from cabin aesthetic upgrades to complete control system replacements.',
  },
  {
    question: 'What does the free lift safety audit check?',
    answer:
      'Engineers check door sensors and alignment, motor and cable health, control panel and electrical safety, and emergency rescue systems (ARD).',
  },
  {
    question: 'Which lift cabin and door finishes are available?',
    answer:
      'SS golden cabins, SS finish and SS golden finish designs, SS and SS design cabins, MS finish cabins, MS finish doors and SS mirror finish glass doors.',
  },
  {
    question: 'How do I get a quote from Nishan Lift Solutions?',
    answer:
      'Call or WhatsApp +91 99280 58124, or fill in the enquiry form on the contact page. Consultation is free and engineers reply within one business day.',
  },
];
