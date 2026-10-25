import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
};

export default function Marquee({
  items,
  className,
  reverse,
  duration = 30,
}: MarqueeProps) {
  return (
    <div
      className={cn('marquee-pause flex overflow-hidden', className)}
      aria-label={items.join(', ')}
    >
      <div
        aria-hidden
        className='marquee-track flex shrink-0 items-center'
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className='flex items-center'>
            <span className='px-5 whitespace-nowrap sm:px-8'>{item}</span>
            <span className='text-[0.5em] text-(--color-accent)'>
              {index % 2 === 0 ? '▲' : '▼'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
