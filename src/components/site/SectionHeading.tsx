import { cn } from '@/lib/utils';

import { Reveal, SplitHeading } from '@/components/site/Reveal';

type SectionHeadingProps = {
  floor: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  floor,
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
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal
        className={cn(
          'flex items-center gap-3',
          align === 'center' && 'justify-center',
        )}
      >
        <span className='font-display flex h-7 min-w-7 items-center justify-center rounded-md bg-black px-1.5 text-sm'>
          <span className='led'>{floor}</span>
        </span>
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-[0.35em]',
            dark ? 'text-white/60' : 'text-(--color-accent)',
          )}
        >
          {eyebrow}
        </span>
      </Reveal>
      <SplitHeading
        text={title}
        accent={accent}
        className={cn(
          'font-display mt-4 text-4xl leading-[0.95] font-extrabold uppercase sm:text-5xl lg:text-6xl',
          dark ? 'text-white' : 'text-(--color-text-primary)',
        )}
      />
      {description && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              'mt-4 text-base leading-relaxed sm:text-lg',
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
