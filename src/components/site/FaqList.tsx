'use client';

import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type Faq = { question: string; answer: string };

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className='divide-y divide-(--color-border) border-y border-(--color-border)'>
      {faqs.map((faq, index) => {
        const expanded = open === index;
        return (
          <li key={faq.question}>
            <h3>
              <button
                type='button'
                aria-expanded={expanded}
                aria-controls={`faq-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                className='group flex w-full items-center gap-4 py-5 text-left'
              >
                <span
                  className={cn(
                    'font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition',
                    expanded
                      ? 'bg-(--color-accent) text-white shadow-[0_0_16px_rgba(196,0,0,0.5)]'
                      : 'steel text-black/70',
                  )}
                >
                  {index + 1}
                </span>
                <span className='flex-1 text-base font-semibold sm:text-lg'>
                  {faq.question}
                </span>
                <Plus
                  className={cn(
                    'h-5 w-5 shrink-0 text-(--color-accent) transition duration-300',
                    expanded && 'rotate-45',
                  )}
                />
              </button>
            </h3>
            {/* Answers stay in the DOM so crawlers and AI assistants can read them. */}
            <AnimatePresence initial={false}>
              <motion.div
                id={`faq-${index}`}
                key={String(expanded)}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expanded ? 'auto' : 0,
                  opacity: expanded ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className='overflow-hidden'
              >
                <p className='pb-5 pl-[3.25rem] text-sm leading-relaxed text-(--color-text-muted) sm:text-base'>
                  {faq.answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
