'use client';

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Factory,
  HeartPulse,
  Home,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react';
import { type ElementType, useEffect, useRef, useState } from 'react';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo } from '@/constant/nishan-content';

/* ── types ── */
type PropertyType =
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Hospital'
  | '';
type LiftType = 'Passenger' | 'Goods' | 'Home Lift' | '';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FormData = {
  name: string;
  phone: string;
  email: string;
  location: string;
  propertyType: PropertyType;
  floors: string;
  liftRequirement: LiftType;
  message: string;
};

const EMPTY_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  location: '',
  propertyType: '',
  floors: '',
  liftRequirement: '',
  message: '',
};

/* ── selection options ── */
const propertyOptions: {
  value: Exclude<PropertyType, ''>;
  Icon: ElementType;
  hint: string;
}[] = [
  { value: 'Residential', Icon: Home, hint: 'Apartments & homes' },
  { value: 'Commercial', Icon: Building2, hint: 'Offices & retail' },
  { value: 'Industrial', Icon: Factory, hint: 'Warehouses & factories' },
  { value: 'Hospital', Icon: HeartPulse, hint: 'Medical facilities' },
];

const liftOptions: {
  value: Exclude<LiftType, ''>;
  Icon: ElementType;
  hint: string;
}[] = [
  { value: 'Passenger', Icon: Users, hint: 'Standard people mover' },
  { value: 'Goods', Icon: Package, hint: 'Freight & materials' },
  { value: 'Home Lift', Icon: Home, hint: 'Compact residential lift' },
];

/* ── step definitions ── */
type TextStep = {
  kind: 'text';
  field: 'name' | 'phone' | 'email' | 'location' | 'floors';
  inputType: string;
  placeholder: string;
  required?: boolean;
  question: string;
  subtext: string;
  Icon: ElementType;
};
type SelectPropertyStep = {
  kind: 'select-property';
  field: 'propertyType';
  question: string;
  subtext: string;
  Icon: ElementType;
};
type SelectLiftStep = {
  kind: 'select-lift';
  field: 'liftRequirement';
  question: string;
  subtext: string;
  Icon: ElementType;
};
type TextareaStep = {
  kind: 'textarea';
  field: 'message';
  placeholder: string;
  question: string;
  subtext: string;
  Icon: ElementType;
};
type StepConfig = TextStep | SelectPropertyStep | SelectLiftStep | TextareaStep;

const STEPS: StepConfig[] = [
  {
    kind: 'text',
    field: 'name',
    inputType: 'text',
    required: true,
    question: "What's your name?",
    subtext: "So we know who we're speaking with.",
    Icon: User,
    placeholder: 'Your full name',
  },
  {
    kind: 'text',
    field: 'phone',
    inputType: 'tel',
    required: true,
    question: 'Your phone number?',
    subtext: "We'll call you to discuss your requirement.",
    Icon: Phone,
    placeholder: '+91 XXXXX XXXXX',
  },
  {
    kind: 'text',
    field: 'email',
    inputType: 'email',
    required: true,
    question: 'Your email address?',
    subtext: "We'll send a confirmation and follow-ups here.",
    Icon: Mail,
    placeholder: 'you@company.com',
  },
  {
    kind: 'text',
    field: 'location',
    inputType: 'text',
    required: true,
    question: 'Where is the property?',
    subtext: 'City or full address helps us plan site visits.',
    Icon: MapPin,
    placeholder: 'e.g. Jaipur, Rajasthan',
  },
  {
    kind: 'select-property',
    field: 'propertyType',
    question: 'Type of property?',
    subtext: 'Helps us recommend the right lift system.',
    Icon: Building2,
  },
  {
    kind: 'text',
    field: 'floors',
    inputType: 'number',
    required: true,
    question: 'How many floors?',
    subtext: 'Total number of floors including ground.',
    Icon: Layers,
    placeholder: 'e.g. 4',
  },
  {
    kind: 'select-lift',
    field: 'liftRequirement',
    question: 'What type of lift do you need?',
    subtext: 'Select the primary use case for the elevator.',
    Icon: Package,
  },
  {
    kind: 'textarea',
    field: 'message',
    question: 'Anything else to share?',
    subtext: 'Additional notes, timeline, or special requirements.',
    Icon: MessageSquare,
    placeholder: 'Tell us more about your project…',
  },
];

const TOTAL = STEPS.length;

function isEmailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function canAdvance(step: number, formData: FormData): boolean {
  const s = STEPS[step];
  switch (s.kind) {
    case 'text': {
      const val = (formData[s.field] as string).trim();
      if (s.field === 'email') return val !== '' && isEmailValid(val);
      return val !== '';
    }
    case 'select-property':
      return formData.propertyType !== '';
    case 'select-lift':
      return formData.liftRequirement !== '';
    case 'textarea':
      return formData.message.trim() !== '';
  }
}

/* ════════════════════════════════════════
   Page
═══════════════════════════════════════ */
export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'bwd'>('fwd');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [step, isOpen]);

  const openModal = () => {
    setFormData(EMPTY_FORM);
    setStep(0);
    setDir('fwd');
    setStatus('idle');
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const goNext = () => {
    if (!canAdvance(step, formData)) return;
    setDir('fwd');
    setStep((s) => s + 1);
    setStatus('idle');
  };

  const goBack = () => {
    setDir('bwd');
    setStep((s) => s - 1);
    setStatus('idle');
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < TOTAL - 1 && canAdvance(step, formData)) {
      e.preventDefault();
      goNext();
    }
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const progress = Math.round(((step + 1) / TOTAL) * 100);
  const current = STEPS[step];
  const ok = canAdvance(step, formData);
  const animClass =
    dir === 'fwd' ? 'animate-slide-right' : 'animate-slide-left';

  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      {/* Global Background Pattern */}
      <div
        className='fixed inset-0 z-[-1] pointer-events-none opacity-[0.03]'
        style={{
          backgroundImage:
            'radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className='fixed top-0 left-0 w-150 h-150 bg-(--color-accent)/5 blur-[120px] rounded-full pointer-events-none z-[-1]' />
      <div className='fixed bottom-0 right-0 w-150 h-150 bg-(--color-accent)/5 blur-[120px] rounded-full pointer-events-none z-[-1]' />

      <SiteHeader />

      {/* Hero */}
      <section className='layout px-4 pb-12 pt-36 text-center'>
        <div className='mb-6 flex justify-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-semibold uppercase tracking-widest text-(--color-accent)'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
            </span>
            Available Now
          </span>
        </div>
        <h1 className='animate-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
          Let&apos;s Build Your{' '}
          <span className='text-(--color-accent)'>Elevator</span>
        </h1>
        <p className='animate-fade-up animation-delay-100 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-(--color-text-muted) sm:text-lg'>
          Tell us about your lift requirement and our engineers will reach back
          within one business day with a tailored solution.
        </p>

        {/* Trust row */}
        <div className='mt-10 flex flex-wrap justify-center gap-4'>
          {[
            { Icon: Clock, label: '1-Day Response' },
            { Icon: ShieldCheck, label: 'Free Consultation' },
            { Icon: CheckCircle2, label: 'No Commitment' },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className='glass-panel animate-zoom flex items-center gap-2 rounded-full px-5 py-2.5'
            >
              <Icon size={14} className='text-(--color-accent)' />
              <span className='text-xs font-semibold'>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main grid */}
      <section className='layout grid gap-8 px-4 pb-16 lg:grid-cols-[1fr_1.6fr]'>
        {/* Left — company info (second on mobile, first on desktop) */}
        <div className='order-2 space-y-5 lg:order-1'>
          {/* Contact details */}
          <article className='glass-panel animate-fade-up space-y-5 rounded-3xl p-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-(--color-accent)'>
              Reach Us Directly
            </p>

            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-accent)/10 text-(--color-accent)'>
                <MapPin size={16} />
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)'>Office</p>
                <p className='mt-0.5 text-sm text-(--color-text-muted)'>{companyInfo.address}</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-accent)/10 text-(--color-accent)'>
                <Phone size={16} />
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)'>Phone</p>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className='mt-0.5 block text-sm font-medium transition hover:text-(--color-accent)'
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-accent)/10 text-(--color-accent)'>
                <Mail size={16} />
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)'>Email</p>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className='mt-0.5 block break-all text-sm font-medium transition hover:text-(--color-accent)'
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <a
              href={companyInfo.mapUrl}
              target='_blank'
              rel='noreferrer'
              className='mt-1 inline-flex items-center gap-2 rounded-full border border-(--color-accent) px-5 py-2 text-xs font-semibold text-(--color-accent) transition hover:bg-(--color-accent) hover:text-white'
            >
              <MapPin size={12} /> Open on Google Maps
            </a>
          </article>
        </div>

        {/* Right — CTA card (first on mobile, second on desktop) */}
        <article className='order-1 animate-zoom glass-panel relative overflow-hidden rounded-3xl p-8 text-center sm:p-10 lg:order-2'>
          {/* Ghost icon */}
          <MessageSquare className='absolute -right-6 -bottom-6 h-40 w-40 text-(--color-accent) opacity-[0.04]' />

          <div className='relative z-10 flex flex-col items-center gap-6'>
            <div className='inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent)/10 text-(--color-accent)'>
              <MessageSquare size={30} />
            </div>

            <div>
              <h2 className='text-2xl font-extrabold'>Start Your Requirement</h2>
              <p className='mt-2 text-sm text-(--color-text-muted)'>
                Answer {TOTAL} quick questions — takes under 2 minutes. Our
                engineers review every submission personally.
              </p>
            </div>

<button
              type='button'
              onClick={openModal}
              className='group w-full rounded-full bg-(--color-accent) py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(158,0,0,0.25)] transition-all hover:bg-(--color-accent-strong) hover:shadow-[0_0_50px_rgba(158,0,0,0.4)] hover:-translate-y-0.5 active:scale-95'
            >
              Open Contact Form
            </button>
            <p className='text-xs text-(--color-text-muted)'>
              {TOTAL} steps &middot; No account needed &middot; Free
            </p>
          </div>
        </article>
      </section>

      {/* ══════════════════════════════════
          MODAL
      ══════════════════════════════════ */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className='relative w-full max-w-lg overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-2xl'>
            {/* ── success ── */}
            {status === 'success' ? (
              <div className='flex flex-col items-center gap-5 px-8 py-14 text-center'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-(--color-accent)/10 text-(--color-accent)'>
                  <CheckCircle2 size={36} />
                </div>
                <h2 className='text-2xl font-bold'>Request Submitted!</h2>
                <p className='max-w-xs text-sm text-(--color-text-muted)'>
                  Thank you{formData.name ? `, ${formData.name}` : ''}!
                  We&apos;ve received your inquiry and will reach out within one
                  business day.
                </p>
                <button
                  type='button'
                  onClick={closeModal}
                  className='mt-2 rounded-full bg-[color:var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* top bar */}
                <div className='px-6 pt-6'>
                  <div className='mb-3 flex items-center justify-between'>
                    <span className='text-xs font-semibold uppercase tracking-[0.3em] text-(--color-text-muted)'>
                      Step {step + 1} of {TOTAL}
                    </span>
                    <button
                      type='button'
                      onClick={closeModal}
                      aria-label='Close'
                      className='flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-text-muted) transition hover:border-(--color-accent) hover:text-(--color-accent)'
                    >
                      <X size={15} />
                    </button>
                  </div>
                  {/* progress bar */}
                  <div className='h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-border)]/50'>
                    <div
                      className='h-full rounded-full bg-[color:var(--color-accent)] transition-[width] duration-500 ease-in-out'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className='mt-1.5 text-right text-[10px] font-semibold text-(--color-text-muted)'>
                    {progress}% complete
                  </p>
                </div>

                {/* step content */}
                <div
                  key={`step-${step}`}
                  className={`min-h-[220px] px-6 pb-2 pt-6 ${animClass}`}
                >
                  <div className='mb-6 flex items-start gap-4'>
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-accent)/10 text-(--color-accent)'>
                      <current.Icon size={22} />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold leading-snug'>
                        {current.question}
                      </h3>
                      <p className='mt-0.5 text-xs text-(--color-text-muted)'>
                        {current.subtext}
                      </p>
                    </div>
                  </div>

                  {current.kind === 'text' && (
                    <>
                      <input
                        ref={inputRef}
                        type={current.inputType}
                        value={formData[current.field] as string}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            [current.field]: e.target.value,
                          }))
                        }
                        onKeyDown={handleEnter}
                        placeholder={current.placeholder}
                        className='w-full rounded-xl border border-(--color-border) bg-white/80 px-4 py-3.5 text-sm placeholder:text-(--color-text-muted)/50 transition focus:border-(--color-accent) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)/20'
                      />
                    </>
                  )}

                  {current.kind === 'textarea' && (
                    <>
                      <textarea
                        ref={inputRef}
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            message: e.target.value,
                          }))
                        }
                        placeholder={current.placeholder}
                        className='w-full resize-none rounded-xl border border-(--color-border) bg-white/80 px-4 py-3.5 text-sm placeholder:text-(--color-text-muted)/50 transition focus:border-(--color-accent) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)/20'
                      />
                    </>
                  )}

                  {current.kind === 'select-property' && (
                    <>
                      <div className='grid grid-cols-2 gap-3'>
                        {propertyOptions.map(({ value, Icon, hint }) => {
                          const sel = formData.propertyType === value;
                          return (
                            <button
                              key={value}
                              type='button'
                              onClick={() =>
                                setFormData((p) => ({
                                  ...p,
                                  propertyType: value,
                                }))
                              }
                              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${sel ? 'border-(--color-accent) bg-(--color-accent)/10' : 'border-(--color-border) bg-white/50 hover:border-(--color-accent)/50'}`}
                            >
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${sel ? 'bg-[color:var(--color-accent)] text-white' : 'bg-(--color-accent)/10 text-(--color-accent)'}`}
                              >
                                <Icon size={18} />
                              </div>
                              <p className='text-xs font-semibold'>{value}</p>
                              <p className='text-[10px] text-(--color-text-muted)'>
                                {hint}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {current.kind === 'select-lift' && (
                    <>
                      <div className='grid grid-cols-3 gap-3'>
                        {liftOptions.map(({ value, Icon, hint }) => {
                          const sel = formData.liftRequirement === value;
                          return (
                            <button
                              key={value}
                              type='button'
                              onClick={() =>
                                setFormData((p) => ({
                                  ...p,
                                  liftRequirement: value,
                                }))
                              }
                              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${sel ? 'border-(--color-accent) bg-(--color-accent)/10' : 'border-(--color-border) bg-white/50 hover:border-(--color-accent)/50'}`}
                            >
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${sel ? 'bg-[color:var(--color-accent)] text-white' : 'bg-(--color-accent)/10 text-(--color-accent)'}`}
                              >
                                <Icon size={18} />
                              </div>
                              <p className='text-xs font-semibold'>{value}</p>
                              <p className='text-[10px] text-(--color-text-muted)'>
                                {hint}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {status === 'error' && (
                  <p className='mx-6 mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600'>
                    Unable to submit. Please try again or call us directly.
                  </p>
                )}

                {/* footer nav */}
                <div className='flex items-center justify-between border-t border-(--color-border) px-6 py-4'>
                  <button
                    type='button'
                    onClick={goBack}
                    disabled={step === 0}
                    className='flex items-center gap-1.5 rounded-full border border-(--color-border) px-4 py-2.5 text-sm font-semibold text-(--color-text-primary) transition hover:border-(--color-accent) disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <ArrowLeft size={15} /> Back
                  </button>

                  {step < TOTAL - 1 ? (
                    <button
                      type='button'
                      onClick={goNext}
                      disabled={!ok}
                      className='flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      Next <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleSubmit}
                      disabled={status === 'submitting'}
                      className='rounded-full bg-[color:var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60'
                    >
                      {status === 'submitting' ? 'Sending…' : 'Submit Request'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
