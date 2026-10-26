'use client';

import { MessageCircle, Phone, Send } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { companyInfo } from '@/constant/nishan-content';

/** Thumb-reach actions for phones, shown once the hero has scrolled away. */
export default function MobileActionBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(
    () => scrollY.on('change', (latest) => setVisible(latest > 320)),
    [scrollY],
  );

  if (pathname === '/contact') return null;

  return (
    <motion.nav
      aria-label='Quick contact'
      className='pb-safe fixed right-0 bottom-0 left-0 z-40 border-t border-(--color-border) bg-(--color-surface)/95 backdrop-blur-lg md:hidden'
      initial={false}
      animate={{ y: visible ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <div className='grid grid-cols-3 gap-2 px-3 pt-2'>
        <a
          href={companyInfo.phoneHref}
          className='flex items-center justify-center gap-2 rounded-xl bg-(--color-accent) py-3 text-sm font-semibold text-white'
        >
          <Phone className='h-4 w-4' />
          Call
        </a>
        <a
          href={companyInfo.whatsappHref}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center gap-2 rounded-xl border border-(--color-border) py-3 text-sm font-semibold'
        >
          <MessageCircle className='h-4 w-4 text-[#25d366]' />
          WhatsApp
        </a>
        <Link
          href='/contact'
          className='flex items-center justify-center gap-2 rounded-xl bg-(--color-ink) py-3 text-sm font-semibold text-white'
        >
          <Send className='h-4 w-4' />
          Enquire
        </Link>
      </div>
    </motion.nav>
  );
}
