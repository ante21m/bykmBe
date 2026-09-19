'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MapPin, Phone, Mail, Globe, Loader2, CheckCircle2, Building2, ArrowRight, Shield, Gavel } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useSubmitContactMutation } from '@/lib/redux/api';
import { RouteMap } from '@/components/RouteMap';
import { CONTACT_INFO } from '@/lib/siteConfig';

const schema = z.object({
  firstName:        z.string().min(2, 'First name required').max(100),
  lastName:         z.string().min(2, 'Last name required').max(100),
  email:            z.string().email('Valid email required'),
  phone:            z.string().optional(),
  organization:     z.string().optional(),
  country:          z.string().optional(),
  inquiryType:      z.enum(['partnership', 'construction', 'trade', 'careers', 'general']),
  subject:          z.string().min(3, 'Subject required').max(255),
  message:          z.string().min(10, 'Message must be at least 10 characters'),
  newsletterConsent: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const inquiryOptions = [
  { value: 'partnership', labelEn: 'Partnerships & JV', labelAm: 'áŠ áŒ‹áˆ­áŠá‰µ áŠ¥áŠ“ áŒáŠ•á‰²á‹¨áˆ­ á‰¬áŠ•á‰¸áˆ­', icon: Building2, deptEn: 'Office of the General Manager', deptAm: 'á‹¨áŠ áŒ á‰ƒáˆ‹á‹­ áˆ¥áˆ« áŠ áˆµáŠªá‹«áŒ… á‰¢áˆ®', descEn: 'Strategic alliances, joint ventures, and investment collaboration.', descAm: 'áˆµá‰µáˆ«á‰´áŒ‚áŠ«á‹Š á‰µá‰¥á‰¥áˆ­á£ áŒáŠ•á‰²á‹¨áˆ­ á‰¬áŠ•á‰¸áˆ­ áŠ¥áŠ“ á‹¨áŠ¢áŠ•á‰¨áˆµá‰µáˆ˜áŠ•á‰µ á‰µá‰¥á‰¥áˆ­á¢' },
  { value: 'construction', labelEn: 'Construction', labelAm: 'áŠ®áŠ•áˆµá‰µáˆ«áŠ­áˆ½áŠ•', icon: Shield, deptEn: 'Engineering & Infrastructure Division', deptAm: 'á‹¨áˆáˆ…áŠ•á‹µáˆµáŠ“ áŠ¥áŠ“ áˆ˜áˆ áˆ¨á‰° áˆáˆ›á‰µ áŠ­ááˆ', descEn: 'Mega-corridors, general contracting, and urban development.', descAm: 'áˆœáŒ‹-áŠ®áˆªá‹°áˆ®á‰½á£ áŠ áŒ á‰ƒáˆ‹á‹­ áŠ®áŠ•á‰µáˆ«á‰µ áŠ¥áŠ“ á‹¨áŠ¨á‰°áˆ› áˆáˆ›á‰µá¢' },
  { value: 'trade', labelEn: 'Import/Export', labelAm: 'áˆ›áˆµáˆ˜áŒ£á‰µ/áˆ˜áˆ‹áŠ­', icon: Globe, deptEn: 'Global Trade & Logistics Hub', deptAm: 'á‹¨áŠ áˆˆáˆ áŠ•áŒá‹µ áŠ¥áŠ“ áˆŽáŒ‚áˆµá‰²áŠ­áˆµ áˆ›á‹•áŠ¨áˆ', descEn: 'Supply chain, logistics, and international trade services.', descAm: 'áŠ á‰…áˆ­á‰¦á‰µ áˆ°áŠ•áˆ°áˆˆá‰µá£ áˆŽáŒ‚áˆµá‰²áŠ­áˆµ áŠ¥áŠ“ áŠ áˆˆáˆ áŠ á‰€á á‹¨áŠ•áŒá‹µ áŠ áŒˆáˆáŒáˆŽá‰¶á‰½á¢' },
  { value: 'careers', labelEn: 'Careers', labelAm: 'áˆ™á‹«', icon: Gavel, deptEn: 'Human Capital & Social Services', deptAm: 'á‹¨áˆ°á‹ áŠ«á’á‰³áˆ áŠ¥áŠ“ áˆ›áˆ…á‰ áˆ«á‹Š áŠ áŒˆáˆáŒáˆŽá‰¶á‰½', descEn: 'Job opportunities, capacity building, and HR partnerships.', descAm: 'á‹¨áˆµáˆ« áŠ¥á‹µáˆŽá‰½á£ á‹¨áŠ á‰…áˆ áŒáŠ•á‰£á‰³ áŠ¥áŠ“ á‹¨áˆ°á‹ áˆƒá‹­áˆ áŠ áŒ‹áˆ­áŠá‰µá¢' },
  { value: 'general', labelEn: 'General Inquiry', labelAm: 'áŠ áŒ á‰ƒáˆ‹á‹­ áŒ¥á‹«á‰„', icon: Send, deptEn: 'Corporate Communications', deptAm: 'á‹¨áŠ®áˆ­á–áˆ¬á‰µ áŠ®áˆ™áŠ’áŠ¬áˆ½áŠ•', descEn: 'General questions, media, feedback, or other inquiries.', descAm: 'áŠ áŒ á‰ƒáˆ‹á‹­ áŒ¥á‹«á‰„á‹Žá‰½á£ áˆšá‹²á‹«á£ áŠ áˆµá‰°á‹«á‹¨á‰µ á‹ˆá‹­áˆ áˆŒáˆŽá‰½ áŒ¥á‹«á‰„á‹Žá‰½á¢' },
];

const contactInfo = [
  {
    icon: MapPin, titleEn: 'Headquarters', titleAm: 'á‹‹áŠ“ áˆ˜áˆ¥áˆªá‹« á‰¤á‰µ',
    linesEn: ['Yeka Sub-City, Woreda 08', 'House No. 4-04 (New 4-04)', 'Addis Ababa, Ethiopia'],
    linesAm: ['á‹¨áŠ« áŠ•á‹‘áˆµ áŠ¨á‰°áˆ›á£ á‹ˆáˆ¨á‹³ 08', 'á‰¤á‰µ á‰áŒ¥áˆ­ 4-04 (áŠ á‹²áˆµ 4-04)', 'áŠ á‹²áˆµ áŠ á‰ á‰£á£ áŠ¢á‰µá‹®áŒµá‹«'],
  },
  {
    icon: Phone, titleEn: 'Phone', titleAm: 'áˆµáˆáŠ­',
    linesEn: CONTACT_INFO.phones.map(p => `${p.number} (${p.label})`),
    linesAm: CONTACT_INFO.phones.map(p => `${p.number} (${p.label === 'Primary' ? 'á‹‹áŠ“' : 'áŠ¦á•áˆ¬áˆ½áŠ•'})`),
  },
  {
    icon: Mail, titleEn: 'Email', titleAm: 'áŠ¢áˆœá‹­áˆ',
    linesEn: [CONTACT_INFO.email],
    linesAm: [CONTACT_INFO.email],
  },
  {
    icon: Globe, titleEn: 'Digital', titleAm: 'á‹²áŒ‚á‰³áˆ',
    linesEn: ['www.bykmgroup.com', 'LinkedIn: /company/bykm-trading-plc'],
    linesAm: ['www.bykmgroup.com', 'LinkedIn: /company/bykm-trading-plc'],
  },
];

export function ContactClient() {
  const { lang, translations: t } = useTranslation();
  const c = t.contact;

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submitContact, { isLoading: isContactSubmitting }] = useSubmitContactMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { inquiryType: 'general', newsletterConsent: false },
  });

  const selectedType = watch('inquiryType');
  const selectedOption = inquiryOptions.find(o => o.value === selectedType);

  const onSubmit = async (data: FormData) => {
    setServerError('');
    try {
      await submitContact(data as unknown as Record<string, unknown>).unwrap();
      setSubmitted(true);
      reset();
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const inputBase = 'w-full bg-white border border-navy-200 px-4 py-3 text-navy-900 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all';
  const inputError = 'border-red-400 focus:ring-red-400/40 focus:border-red-400';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#080616] text-white pt-32 pb-20 md:pb-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.6)_0%,rgba(8,6,22,0.2)_50%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(200,168,75,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>
        <div className="geo-shape w-96 h-96 top-[-80px] right-[-80px] rotate-12 opacity-10" />
        <div className="geo-shape w-56 h-56 bottom-10 right-1/3 rotate-45 opacity-[0.06]" />
        <div className="container-custom relative z-10">
          <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-gold-400 uppercase">{c.header.label[lang]}</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 max-w-4xl">
            <span className="bg-gradient-to-r from-white via-white to-gold-300/80 bg-clip-text text-transparent">{c.header.title[lang]}</span>
          </h1>
          <p className="text-white/60 max-w-3xl text-lg leading-relaxed">{c.header.desc[lang]}</p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section id="form-section" className="py-16 md:py-24 bg-[#f5f4ef]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{c.sidebar.hqLabel[lang]}</span>
                <h2 className="font-display text-2xl font-bold text-navy-900 mt-2">{c.sidebar.title[lang]}</h2>
              </div>

              {contactInfo.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.titleEn} className="flex gap-4 bg-white p-5 border border-navy-100 hover:border-navy-200 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold-400" />
                    </div>
<div>
                    <p className="font-bold text-navy-900 text-sm mb-1">{lang === 'en' ? item.titleEn : item.titleAm}</p>
                    {(lang === 'en' ? item.linesEn : item.linesAm).map(line => (
                      item.titleEn === 'Headquarters' ? (
                        <a
                          key={line}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(line.endsWith('Ethiopia') ? line : line + ', Addis Ababa, Ethiopia')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-navy-600/60 text-sm leading-relaxed hover:text-gold-600 hover:underline transition-colors"
                        >
                          {line}
                        </a>
                      ) : item.titleEn === 'Email' ? (
                        <a
                          key={line}
                          href={`mailto:${line}`}
                          className="block text-navy-600/60 text-sm leading-relaxed hover:text-gold-600 hover:underline transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-navy-600/60 text-sm leading-relaxed">{line}</p>
                      )
                    ))}
                    {item.titleEn === 'Headquarters' && (
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=my_location&destination=${encodeURIComponent('Yeka Sub-City, Woreda 08, House No. 4-04, Addis Ababa, Ethiopia')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-mono tracking-[0.25em] uppercase px-4 py-2.5 hover:bg-navy-800 hover:gap-3 transition-all"
                      >
                        <MapPin size={14} className="text-gold-400" />
                        <span>{lang === 'en' ? 'Connect' : 'áŒáŠ•áŠ™áŠá‰µ'}</span>
                      </a>
                    )}
                  </div>
                  </div>
                );
              })}

            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white border border-green-200 p-12 md:p-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">{c.success.title[lang]}</h2>
                  <p className="text-navy-600/70 max-w-md mx-auto mb-8 leading-relaxed">
                    {c.success.desc[lang]} <strong className="text-navy-900">{selectedOption ? (lang === 'en' ? selectedOption.deptEn : selectedOption.deptAm) : ''}</strong> {c.success.and[lang]}
                  </p>
                  <button onClick={() => setSubmitted(false)} className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 text-sm font-mono tracking-wider uppercase hover:bg-navy-800 transition-colors">
                    <ArrowRight size={14} />
                    <span>{c.success.newInquiry[lang]}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-navy-100 p-8 md:p-10">
                  <div className="mb-8">
                    <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{c.form.label[lang]}</span>
                    <h2 className="font-display text-2xl font-bold text-navy-900 mt-2">{c.form.title[lang]}</h2>
                    {selectedOption && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-navy-600/70 bg-navy-50 px-4 py-2.5 border-l-2 border-gold-400">
                        <Send size={14} className="text-gold-500 shrink-0" />
                        <span>{c.form.routedTo[lang]} <strong className="text-navy-900">{lang === 'en' ? selectedOption.deptEn : selectedOption.deptAm}</strong></span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="hidden">
                      <select {...register('inquiryType')}>
                        {inquiryOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.value}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.firstName[lang]}</label>
                        <input {...register('firstName')} placeholder="Abebe"
                          className={`${inputBase} ${errors.firstName ? inputError : ''}`} />
                        {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.lastName[lang]}</label>
                        <input {...register('lastName')} placeholder="Kebede"
                          className={`${inputBase} ${errors.lastName ? inputError : ''}`} />
                        {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.email[lang]}</label>
                        <input {...register('email')} type="email" placeholder="you@organization.com"
                          className={`${inputBase} ${errors.email ? inputError : ''}`} />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.phone[lang]}</label>
                        <input {...register('phone')} type="tel" placeholder="+251 9XX XXX XXX"
                          className={inputBase} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.organization[lang]}</label>
                        <input {...register('organization')} placeholder="Your Organization"
                          className={inputBase} />
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.country[lang]}</label>
                        <input {...register('country')} placeholder="Ethiopia"
                          className={inputBase} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.subject[lang]}</label>
                      <input {...register('subject')} placeholder="Brief subject of your inquiry"
                        className={`${inputBase} ${errors.subject ? inputError : ''}`} />
                      {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase text-navy-600 mb-1.5">{c.form.message[lang]}</label>
                      <textarea {...register('message')} rows={5}
                        placeholder="Please describe your inquiry, project requirements, or partnership interest in detail..."
                        className={`${inputBase} resize-none ${errors.message ? inputError : ''}`} />
                      {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input {...register('newsletterConsent')} type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-navy-900 rounded" />
                      <span className="text-sm text-navy-600/70 leading-relaxed group-hover:text-navy-900 transition-colors">
                        {c.form.newsletter[lang]}
                      </span>
                    </label>

                    {serverError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 text-sm leading-relaxed">
                        {serverError}
                      </div>
                    )}

                    <button type="submit" disabled={isContactSubmitting} className="w-full bg-navy-900 text-white py-3.5 px-6 flex items-center justify-center gap-2 text-sm font-mono tracking-wider uppercase hover:bg-navy-800 disabled:opacity-50 transition-colors">
                      {isContactSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>{c.form.submitting[lang]}</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{c.form.submit[lang]}</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-navy-400">{c.form.confidentiality[lang]}</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative overflow-hidden bg-navy-900 py-16 md:py-24">
        <div className="geo-shape w-64 h-64 -top-20 right-[-30px] rotate-12 opacity-20" />
        <div className="geo-shape w-36 h-36 bottom-1/4 left-[-20px] rotate-45 opacity-10" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-10">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{c.map.label[lang]}</span>
            <h2 className="font-display text-2xl font-bold text-white mt-3 mb-2">{c.map.title[lang]}</h2>
            <p className="text-white/50 text-sm">{c.map.address[lang]}</p>
          </div>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/10 shadow-xl">
            <RouteMap lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}