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
  { value: 'partnership', labelEn: 'Partnerships & JV', labelAm: 'አጋርነት እና ጁንቲየር ቬንቸር', icon: Building2, deptEn: 'Office of the General Manager', deptAm: 'የአጠቃላይ ሥራ አስኪያጅ ቢሮ', descEn: 'Strategic alliances, joint ventures, and investment collaboration.', descAm: 'ስትራቴጂካዊ ትብብር፣ ጁንቲየር ቬንቸር እና የኢንቨስትመንት ትብብር።' },
  { value: 'construction', labelEn: 'Construction', labelAm: 'ኮንስትራክሽን', icon: Shield, deptEn: 'Engineering & Infrastructure Division', deptAm: 'የምህንድስና እና መሠረተ ልማት ክፍል', descEn: 'Mega-corridors, general contracting, and urban development.', descAm: 'ሜጋ-ኮሪደሮች፣ አጠቃላይ ኮንትራት እና የከተማ ልማት።' },
  { value: 'trade', labelEn: 'Import/Export', labelAm: 'ማስመጣት/መላክ', icon: Globe, deptEn: 'Global Trade & Logistics Hub', deptAm: 'የአለም ንግድ እና ሎጂስቲክስ ማዕከል', descEn: 'Supply chain, logistics, and international trade services.', descAm: 'አቅርቦት ሰንሰለት፣ ሎጂስቲክስ እና አለም አቀፍ የንግድ አገልግሎቶች።' },
  { value: 'careers', labelEn: 'Careers', labelAm: 'ሙያ', icon: Gavel, deptEn: 'Human Capital & Social Services', deptAm: 'የሰው ካፒታል እና ማህበራዊ አገልግሎቶች', descEn: 'Job opportunities, capacity building, and HR partnerships.', descAm: 'የስራ እድሎች፣ የአቅም ግንባታ እና የሰው ሃይል አጋርነት።' },
  { value: 'general', labelEn: 'General Inquiry', labelAm: 'አጠቃላይ ጥያቄ', icon: Send, deptEn: 'Corporate Communications', deptAm: 'የኮርፖሬት ኮሙኒኬሽን', descEn: 'General questions, media, feedback, or other inquiries.', descAm: 'አጠቃላይ ጥያቄዎች፣ ሚዲያ፣ አስተያየት ወይም ሌሎች ጥያቄዎች።' },
];

const contactInfo = [
  {
    icon: MapPin, titleEn: 'Headquarters', titleAm: 'ዋና መሥሪያ ቤት',
    linesEn: ['Yeka Sub-City, Woreda 08', 'House No. 4-04 (New 4-04)', 'Addis Ababa, Ethiopia'],
    linesAm: ['የካ ንዑስ ከተማ፣ ወረዳ 08', 'ቤት ቁጥር 4-04 (አዲስ 4-04)', 'አዲስ አበባ፣ ኢትዮጵያ'],
  },
  {
    icon: Phone, titleEn: 'Phone', titleAm: 'ስልክ',
    linesEn: CONTACT_INFO.phones.map(p => `${p.number} (${p.label})`),
    linesAm: CONTACT_INFO.phones.map(p => `${p.number} (${p.label === 'Primary' ? 'ዋና' : 'ኦፕሬሽን'})`),
  },
  {
    icon: Mail, titleEn: 'Email', titleAm: 'ኢሜይል',
    linesEn: [CONTACT_INFO.email],
    linesAm: [CONTACT_INFO.email],
  },
  {
    icon: Globe, titleEn: 'Digital', titleAm: 'ዲጂታል',
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
      <section className="relative overflow-hidden bg-[#080616] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="geo-shape w-72 h-72 top-10 right-[-60px] rotate-12 opacity-30" />
        <div className="geo-shape w-40 h-40 bottom-16 right-32 rotate-6 opacity-15" />
        <div className="h-28" />
        <div className="container-custom relative z-10 pb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{c.header.label[lang]}</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{c.header.title[lang]}</h1>
          <p className="text-white/90 max-w-2xl text-lg leading-relaxed">{c.header.desc[lang]}</p>
        </div>
      </section>

      {/* Inquiry Type Cards */}
      <section className="bg-white border-b border-navy-100">
        <div className="container-custom -mt-10 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {inquiryOptions.map(opt => {
              const Icon = opt.icon;
              const isActive = selectedType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('form');
                    const select = form?.querySelector('select[name="inquiryType"]') as HTMLSelectElement;
                    if (select) { select.value = opt.value; select.dispatchEvent(new Event('change', { bubbles: true })); }
                    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`group text-left bg-white border p-5 hover:shadow-lg transition-all duration-300 ${
                    isActive ? 'border-gold-400 shadow-md ring-1 ring-gold-400/20' : 'border-navy-100 hover:border-navy-200'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center mb-3 transition-colors ${
                    isActive ? 'bg-gold-400 text-navy-900' : 'bg-navy-900 text-gold-400 group-hover:bg-navy-800'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <p className="font-bold text-navy-900 text-sm mb-1">{lang === 'en' ? opt.labelEn : opt.labelAm}</p>
                  <p className="text-navy-500/60 text-xs leading-relaxed">{lang === 'en' ? opt.descEn : opt.descAm}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section id="form-section" className="section-padding bg-[#f5f4ef]">
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
                        <p key={line} className="text-navy-600/60 text-sm leading-relaxed">{line}</p>
                      ))}
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
      <section className="relative overflow-hidden bg-navy-900 py-16">
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
