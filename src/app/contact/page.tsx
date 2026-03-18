'use client';

import Link from 'next/link';
import { useState } from 'react';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo } from '@/constant/nishan-content';

const statusMessages = {
  idle: '',
  submitting: 'Sending your request...',
  success: "Thanks! We'll reach out within two business days.",
  error: 'Unable to submit right now. Please try again later.',
} as const;

type FormStatus = keyof typeof statusMessages;

type LiftType = 'hospital' | 'commercial' | 'residential' | 'others' | '';
type BuildingSize = '1-2 floors' | '3-4 floors' | '10+ floors' | '';

const liftTypeOptions: Array<{
  value: Exclude<LiftType, ''>;
  label: string;
  icon: string;
  hint: string;
}> = [
  {
    value: 'hospital',
    label: 'Hospital',
    icon: '🏥',
    hint: 'Patient and stretcher-friendly solutions',
  },
  {
    value: 'commercial',
    label: 'Commercial',
    icon: '🏢',
    hint: 'Office and retail building setups',
  },
  {
    value: 'residential',
    label: 'Residential',
    icon: '🏠',
    hint: 'Home and apartment elevator options',
  },
  {
    value: 'others',
    label: 'Others',
    icon: '⚙️',
    hint: 'Custom or special requirements',
  },
];

const buildingSizeOptions: Array<{
  value: Exclude<BuildingSize, ''>;
  label: string;
  icon: string;
  hint: string;
}> = [
  {
    value: '1-2 floors',
    label: '1 to 2 Floors',
    icon: '⬆️',
    hint: 'Low-rise building requirement',
  },
  {
    value: '3-4 floors',
    label: '3 to 4 Floors',
    icon: '🏬',
    hint: 'Mid-rise installation planning',
  },
  {
    value: '10+ floors',
    label: '10 Floors and Above',
    icon: '🏙️',
    hint: 'High-rise speed and capacity focus',
  },
];

export default function ContactPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>('idle');

  const [formData, setFormData] = useState({
    liftType: '' as LiftType,
    buildingSize: '' as BuildingSize,
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const openWizard = () => {
    setIsWizardOpen(true);
    setStep(1);
    setStatus('idle');
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
    setStep(1);
    setStatus('idle');
  };

  const canGoNext =
    (step === 1 && formData.liftType !== '') ||
    (step === 2 && formData.buildingSize !== '') ||
    (step === 3 &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '');

  const goNext = () => {
    if (!canGoNext || step >= 3) return;
    setStep((current) => current + 1);
    setStatus('idle');
  };

  const goBack = () => {
    if (step <= 1) return;
    setStep((current) => current - 1);
    setStatus('idle');
  };

  const handleSubmit = async () => {
    if (!canGoNext || step !== 3) return;
    setStatus('submitting');

    const payload = {
      liftType: formData.liftType,
      buildingSize: formData.buildingSize,
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setFormData({
        liftType: '',
        buildingSize: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setStatus('success');
      setTimeout(() => {
        closeWizard();
      }, 1200);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='layout px-4 pb-10 pt-32'>
        <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
          Contact Us
        </p>
        <h1 className='mt-2 text-3xl font-semibold sm:text-4xl'>Contact Us</h1>
      </section>

      <section className='layout grid gap-8 px-4 pb-12 lg:grid-cols-[1fr_1.1fr]'>
        <article className='glass-panel animate-fade-up rounded-3xl p-6'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Office Address
          </p>
          <p className='mt-3 text-sm text-[color:var(--color-text-muted)]'>
            {companyInfo.address}
          </p>

          <div className='mt-6 grid gap-3 text-sm'>
            <a
              href={companyInfo.mapUrl}
              target='_blank'
              rel='noreferrer'
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              Open on Google Maps
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              {companyInfo.email}
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              {companyInfo.phone}
            </a>
          </div>

          <div className='mt-6 rounded-2xl border border-[color:var(--color-border)] p-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
              Quick links
            </p>
            <div className='mt-3 flex flex-wrap gap-2'>
              {[
                { href: '/', label: 'Home' },
                { href: '/products-services', label: 'Products & Services' },
                { href: '/about', label: 'About' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='rounded-full bg-[color:var(--color-accent)]/10 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-accent)]'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <article className='animate-zoom space-y-6 rounded-[32px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 p-8 shadow-[0_40px_60px_rgba(14,14,19,0.15)]'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Get in touch
          </p>
          <h2 className='text-2xl font-semibold'>
            Start your lift requirement flow
          </h2>
          <p className='text-sm text-[color:var(--color-text-muted)]'>
            Answer step-by-step questions in a popup wizard and submit once
            done.
          </p>
          <div className='space-y-3'>
            <button
              type='button'
              onClick={openWizard}
              className='w-full rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[color:var(--color-accent-strong)]'
            >
              Open Contact Flow
            </button>
            <p className='text-center text-xs font-semibold text-[color:var(--color-text-muted)]'>
              Multi-step form with back/next controls.
            </p>
          </div>
        </article>
      </section>

      {isWizardOpen && (
        <div className='fixed inset-0 z-50 bg-black/70 px-4 py-6 sm:px-8'>
          <div className='mx-auto max-h-full w-full max-w-3xl overflow-auto rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[0_40px_60px_rgba(14,14,19,0.25)] sm:p-8'>
            <div className='mb-6 flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
                  Step {step} of 3
                </p>
                <h3 className='mt-2 text-2xl font-semibold'>
                  {step === 1 && 'What kind of lift do you want?'}
                  {step === 2 && 'What is your building size?'}
                  {step === 3 && 'Share your contact details'}
                </h3>
              </div>
              <button
                type='button'
                onClick={closeWizard}
                aria-label='Close contact flow'
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/70 text-lg font-bold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)]'
              >
                ✕
              </button>
            </div>

            <div className='mb-6 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-border)]/60'>
              <div
                className='h-full rounded-full bg-[color:var(--color-accent)] transition-all duration-300'
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {step === 1 && (
              <div className='grid gap-3 sm:grid-cols-2'>
                {liftTypeOptions.map((option) => {
                  const isSelected = formData.liftType === option.value;
                  return (
                    <button
                      key={option.value}
                      type='button'
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          liftType: option.value,
                        }))
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10'
                          : 'border-[color:var(--color-border)] bg-white/40 hover:border-[color:var(--color-accent)]/70'
                      }`}
                    >
                      <p className='text-2xl'>{option.icon}</p>
                      <p className='mt-2 text-sm font-semibold'>
                        {option.label}
                      </p>
                      <p className='mt-1 text-xs text-[color:var(--color-text-muted)]'>
                        {option.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className='grid gap-3 sm:grid-cols-3'>
                {buildingSizeOptions.map((option) => {
                  const isSelected = formData.buildingSize === option.value;
                  return (
                    <button
                      key={option.value}
                      type='button'
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          buildingSize: option.value,
                        }))
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10'
                          : 'border-[color:var(--color-border)] bg-white/40 hover:border-[color:var(--color-accent)]/70'
                      }`}
                    >
                      <p className='text-2xl'>{option.icon}</p>
                      <p className='mt-2 text-sm font-semibold'>
                        {option.label}
                      </p>
                      <p className='mt-1 text-xs text-[color:var(--color-text-muted)]'>
                        {option.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <label className='flex flex-col gap-2 text-sm font-semibold'>
                    <span>Name</span>
                    <input
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder='Your name'
                      className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
                    />
                  </label>
                  <label className='flex flex-col gap-2 text-sm font-semibold'>
                    <span>Phone</span>
                    <input
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      placeholder='+91 XXXXX XXXXX'
                      className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
                    />
                  </label>
                </div>

                <div className='grid gap-4 sm:grid-cols-2'>
                  <label className='flex flex-col gap-2 text-sm font-semibold'>
                    <span>Email</span>
                    <input
                      type='email'
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder='you@company.com'
                      className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
                    />
                  </label>
                  <label className='flex flex-col gap-2 text-sm font-semibold'>
                    <span>Company (optional)</span>
                    <input
                      value={formData.company}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                      placeholder='Company name'
                      className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
                    />
                  </label>
                </div>

                <label className='flex flex-col gap-2 text-sm font-semibold'>
                  <span>Requirement details (optional)</span>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder='Any specific details for your lift requirement'
                    className='rounded-2xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
                  />
                </label>
              </div>
            )}

            <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
              <button
                type='button'
                onClick={goBack}
                disabled={step === 1 || status === 'submitting'}
                className='rounded-full border border-[color:var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50'
              >
                Back
              </button>

              <div className='flex items-center gap-3'>
                {step < 3 ? (
                  <button
                    type='button'
                    onClick={goNext}
                    disabled={!canGoNext}
                    className='rounded-full bg-[color:var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={!canGoNext || status === 'submitting'}
                    className='rounded-full bg-[color:var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    {status === 'submitting' ? 'Sending...' : 'Submit'}
                  </button>
                )}
              </div>
            </div>

            <p
              className='mt-3 text-center text-xs font-semibold text-[color:var(--color-text-muted)]'
              aria-live='polite'
            >
              {statusMessages[status]}
            </p>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
