import { cn } from '@/lib/utils';

import { Reveal, SplitHeading } from '@/components/site/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  tone = 'light',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]',
            align === 'center' && 'justify-center',
            dark ? 'text-white/60' : 'text-(--color-accent)',
          )}
        >
          <span className='h-px w-8 bg-current' />
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading
        text={title}
        accent={accent}
        className={cn(
          'mt-5 text-3xl leading-[1.1] font-semibold sm:text-5xl',
          dark ? 'text-white' : 'text-(--color-text-primary)',
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed sm:text-lg',
              dark ? 'text-white/65' : 'text-(--color-text-muted)',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
