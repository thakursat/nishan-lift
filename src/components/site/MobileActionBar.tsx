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
    <motion.div
      className='pb-safe fixed inset-x-0 bottom-0 z-40 px-3 pt-2 md:hidden'
      initial={false}
      animate={{ y: visible ? 0 : '120%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
    >
      <div className='steel-dark grid grid-cols-3 gap-2 rounded-3xl p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10'>
        <a
          href={companyInfo.phoneHref}
          className='flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold text-white/80 active:bg-white/5'
        >
          <span className='pulse-ring flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) text-white'>
            <Phone className='h-4 w-4' />
          </span>
          Call 24×7
        </a>
        <a
          href={companyInfo.whatsappHref}
          target='_blank'
          rel='noreferrer'
          className='flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold text-white/80 active:bg-white/5'
        >
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white'>
            <MessageCircle className='h-4 w-4' />
          </span>
          WhatsApp
        </a>
        <Link
          href='/contact'
          className='flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold text-white/80 active:bg-white/5'
        >
          <span className='steel flex h-10 w-10 items-center justify-center rounded-full text-black/75'>
            <Send className='h-4 w-4' />
          </span>
          Enquire
        </Link>
      </div>
    </motion.div>
  );
}
