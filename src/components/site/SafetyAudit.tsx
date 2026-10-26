import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { DoorImage, Reveal } from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

import { safetyAudit, warningSigns } from '@/constant/nishan-content';

type SafetyAuditProps = {
  floor: string;
};

export default function SafetyAudit({ floor }: SafetyAuditProps) {
  return (
    <section
      data-floor={floor}
      data-floor-name='Safety audit'
      className='py-24 sm:py-36'
    >
      <div className='layout grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20'>
        <DoorImage
          src='/images/site/pro/car-interior.webp'
          alt='Stainless steel lift car with car operating panel'
          className='aspect-[4/5] rounded-3xl sm:aspect-[16/10] lg:order-2 lg:aspect-[4/5]'
          sizes='(max-width: 1024px) 100vw, 50vw'
        />

        <div>
          <SectionHeading
            eyebrow='Free safety audit'
            title='Know your lift is safe — not just running.'
            accent='safe'
            description={safetyAudit.intro}
          />

          <Reveal delay={0.1} className='mt-10'>
            <p className='text-sm font-semibold'>Our engineers check</p>
            <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
              {safetyAudit.checks.map((check) => (
                <li key={check} className='flex items-start gap-3 text-sm'>
                  <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-600' />
                  {check}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.2}
            className='mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5'
          >
            <p className='flex items-center gap-2 text-sm font-semibold text-amber-900'>
              <AlertTriangle className='h-4 w-4' />
              Book an audit if you notice
            </p>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {warningSigns.map((sign) => (
                <li
                  key={sign}
                  className='rounded-full bg-white px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200'
                >
                  {sign}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <Link
              href='/contact'
              className='group mt-10 inline-flex items-center gap-2 rounded-full bg-(--color-ink) px-7 py-4 text-sm font-semibold text-white transition hover:bg-black'
            >
              Book your free audit
              <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
