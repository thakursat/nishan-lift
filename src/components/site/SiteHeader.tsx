'use client';

import { Bell, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import FloorIndicator from '@/components/site/FloorIndicator';

import { companyInfo, quickLinks } from '@/constant/nishan-content';

const floorLabel = (index: number) => (index === 0 ? 'G' : String(index));

type SiteHeaderProps = {
  /** Use on pages without a dark hero so the bar is opaque from the top. */
  solid?: boolean;
};

export default function SiteHeader({ solid = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);

  useEffect(
    () => scrollY.on('change', (latest) => setScrolled(latest > 24)),
    [scrollY],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pressFloor = (href: string) => {
    setPressed(href);
    // Let the button light up before the doors "close" on the menu.
    window.setTimeout(() => {
      setOpen(false);
      setPressed(null);
      router.push(href);
    }, 380);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled || solid
            ? 'bg-(--color-ink)/85 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl'
            : 'bg-linear-to-b from-black/60 to-transparent',
        )}
      >
        <div className='layout flex h-16 items-center justify-between gap-3 sm:h-20'>
          <Link
            href='/'
            className='group flex items-center gap-3'
            aria-label={`${companyInfo.name} home`}
          >
            <span className='sheen flex h-10 items-center rounded-lg bg-(--color-accent) px-2.5 shadow-[0_8px_24px_rgba(196,0,0,0.4)] sm:h-11'>
              <Image
                src='/images/site/logo-mark-white.png'
                alt=''
                width={96}
                height={40}
                priority
                className='h-auto w-14 sm:w-16'
              />
            </span>
            <span className='hidden leading-none text-white min-[380px]:block'>
              <span className='block text-base font-semibold tracking-tight'>
                Nishan Lift
              </span>
              <span className='block text-[11px] whitespace-nowrap text-white/60'>
                Solutions · Jaipur
              </span>
            </span>
          </Link>

          <nav className='hidden items-center gap-1 lg:flex'>
            {quickLinks.slice(0, 5).map((link, index) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                    active ? 'text-white' : 'text-white/65 hover:text-white',
                  )}
                >
                  <span
                    className={cn(
                      'font-display flex h-6 w-6 items-center justify-center rounded-full border text-[11px] transition',
                      active
                        ? 'border-(--color-accent) bg-(--color-accent) text-white shadow-[0_0_14px_rgba(255,40,40,0.8)]'
                        : 'border-white/25 group-hover:border-white/60',
                    )}
                  >
                    {floorLabel(index)}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className='flex items-center gap-2'>
            <FloorIndicator />
            <a
              href={companyInfo.phoneHref}
              className='hidden items-center gap-2 rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(196,0,0,0.45)] transition hover:bg-(--color-accent-strong) md:flex'
            >
              <Phone className='h-4 w-4' />
              {companyInfo.phone}
            </a>
            <button
              type='button'
              onClick={() => setOpen(true)}
              aria-label='Open menu'
              aria-expanded={open}
              className='steel flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.4)] lg:hidden'
            >
              <span className='flex flex-col gap-1'>
                <span className='block h-0.5 w-4 rounded bg-black/70' />
                <span className='block h-0.5 w-4 rounded bg-black/70' />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className='fixed inset-0 z-[90] flex items-stretch justify-center bg-black/70 backdrop-blur-sm lg:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              role='dialog'
              aria-modal='true'
              aria-label='Site menu'
              className='steel-dark relative m-3 flex w-full max-w-sm flex-col overflow-y-auto rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/10'
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className='flex items-center justify-between'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50'>
                  Car operating panel
                </p>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  aria-label='Close menu'
                  className='flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              <div className='mt-5 flex items-center justify-between rounded-2xl bg-black px-5 py-4 ring-1 ring-white/10'>
                <span className='text-xs font-semibold uppercase tracking-[0.3em] text-white/40'>
                  You are on
                </span>
                <span className='led text-4xl'>
                  {floorLabel(
                    Math.max(
                      0,
                      quickLinks.findIndex((link) => link.href === pathname),
                    ),
                  )}
                </span>
              </div>

              <ul className='mt-6 grid gap-3'>
                {quickLinks.map((link, index) => {
                  const active = pathname === link.href;
                  const lit = active || pressed === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                    >
                      <button
                        type='button'
                        onClick={() => pressFloor(link.href)}
                        className='group flex w-full items-center gap-4 rounded-2xl px-2 py-1.5 text-left'
                      >
                        <span
                          className={cn(
                            'steel font-display relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-extrabold text-black/75 shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_6px_14px_rgba(0,0,0,0.5)] transition active:scale-95',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute inset-1 rounded-full ring-2 transition duration-300',
                              lit
                                ? 'ring-[#ff3b3b] shadow-[0_0_18px_rgba(255,40,40,0.9)]'
                                : 'ring-black/10',
                            )}
                          />
                          {floorLabel(index)}
                        </span>
                        <span
                          className={cn(
                            'text-lg font-semibold transition',
                            lit
                              ? 'text-white'
                              : 'text-white/65 group-hover:text-white',
                          )}
                        >
                          {link.label}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className='mt-auto grid gap-3 pt-8'>
                <a
                  href={companyInfo.phoneHref}
                  className='flex items-center gap-4 rounded-2xl bg-yellow-400/10 px-3 py-3 ring-1 ring-yellow-400/30'
                >
                  <span className='flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.6)]'>
                    <Bell className='h-5 w-5' />
                  </span>
                  <span>
                    <span className='block text-sm font-bold text-white'>
                      Lift stuck? Call 24×7
                    </span>
                    <span className='block text-xs text-white/60'>
                      {companyInfo.phone}
                    </span>
                  </span>
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
