'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type Service = { title: string; description: string; image: string };

type CardProps = {
  service: Service;
  index: number;
  total: number;
};

function StackCard({ service, index, total }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Cards underneath shrink back as the next "floor" slides over them.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (total - index) * 0.04],
  );
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  return (
    <div
      ref={ref}
      className='sticky h-[78svh] pt-2 sm:h-[70vh]'
      style={{ top: `calc(5.5rem + ${index * 1.25}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className='steel-dark relative flex h-full origin-top flex-col overflow-hidden rounded-[2rem] text-white shadow-[0_-20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 md:flex-row'
      >
        <div className='relative h-1/2 md:h-full md:w-1/2'>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-linear-to-t from-[#1c1c23] via-transparent md:bg-linear-to-r md:from-transparent md:to-[#1c1c23]' />
        </div>
        <div className='relative flex flex-1 flex-col justify-between gap-6 p-6 sm:p-10'>
          <div>
            <p className='font-display text-outline text-7xl leading-none font-extrabold sm:text-8xl'>
              0{index + 1}
            </p>
            <h3 className='font-display mt-3 text-3xl leading-none font-extrabold uppercase sm:text-4xl'>
              {service.title}
            </h3>
            <p className='mt-4 line-clamp-5 text-sm leading-relaxed text-white/65 sm:line-clamp-none sm:text-base'>
              {service.description}
            </p>
          </div>
          <Link
            href='/contact'
            className='group flex w-fit items-center gap-2 text-sm font-bold text-white'
          >
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) transition group-hover:scale-110'>
              <ArrowUpRight className='h-4 w-4' />
            </span>
            Enquire about this
          </Link>
        </div>
        <motion.div
          className='pointer-events-none absolute inset-0 bg-black'
          style={{ opacity: dim }}
        />
      </motion.article>
    </div>
  );
}

export default function ServiceStack({ services }: { services: Service[] }) {
  return (
    <div className='relative'>
      {services.map((service, index) => (
        <StackCard
          key={service.title}
          service={service}
          index={index}
          total={services.length}
        />
      ))}
    </div>
  );
}
