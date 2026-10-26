import { Bell, Phone } from 'lucide-react';

import { Reveal } from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

import { companyInfo, emergencySteps } from '@/constant/nishan-content';

type EmergencyGuideProps = {
  floor: string;
};

export default function EmergencyGuide({ floor }: EmergencyGuideProps) {
  return (
    <section
      data-floor={floor}
      data-floor-name='Emergency'
      className='py-24 sm:py-36'
    >
      <div className='layout'>
        <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
          <SectionHeading
            eyebrow='Stuck in a lift?'
            title='Four calm steps until help arrives.'
            accent='calm'
          />
          <Reveal from='right' className='w-full sm:w-auto'>
            <a
              href={companyInfo.phoneHref}
              className='flex w-full items-center gap-4 rounded-2xl bg-yellow-400 px-5 py-5 text-black transition hover:bg-yellow-300 sm:px-6'
            >
              <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-yellow-400'>
                <Bell className='h-5 w-5' />
              </span>
              <span>
                <span className='block text-xs font-semibold uppercase tracking-[0.15em]'>
                  24×7 emergency line
                </span>
                <span className='flex items-center gap-2 text-lg font-semibold whitespace-nowrap sm:text-xl'>
                  <Phone className='h-4 w-4' />
                  {companyInfo.phone}
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <ol className='mt-16 grid gap-px overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-border) sm:grid-cols-2 lg:grid-cols-4'>
          {emergencySteps.map((step, index) => (
            <Reveal
              key={step.title}
              as='li'
              delay={index * 0.08}
              className='bg-(--color-surface) p-7 sm:p-8'
            >
              <span className='flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) text-sm font-semibold'>
                {index + 1}
              </span>
              <h3 className='mt-6 text-lg font-semibold'>{step.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-(--color-text-muted)'>
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
