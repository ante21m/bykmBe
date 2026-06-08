'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MapPin, Phone, Mail, Globe, Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useSubmitContactMutation } from '@/lib/redux/api';
import { RouteMap } from '@/components/RouteMap';

const statRows = [
  { labelEn: 'TIN', labelAm: 'ቲን', val: '0103921383' },
  { labelEn: 'VAT', labelAm: 'ቫት', val: '35205580010' },
  { labelEn: 'Registration', labelAm: 'ምዝገባ', val: 'AACATB/2/0257491/2018' },
  { labelEn: 'Tax Category', labelAm: 'የግብር ምድብ', val: 'Category "A"' },
  { labelEn: 'Tech Grade', labelAm: 'ቴክኒክ ደረጃ', val: 'GC-4 · CON/32486' },
];

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
  { value: 'partnership', labelEn: 'Partnerships & JV Investment',   labelAm: 'አጋርነት እና ጁንቲየር ቬንቸር', deptEn: 'Office of the General Manager',  deptAm: 'የአጠቃላይ ሥራ አስኪያጅ ቢሮ',  email: 'bykmtrading@gmail.com'       },
  { value: 'construction', labelEn: 'Construction & Mega-Corridors', labelAm: 'ኮንስትራክሽን እና ሜጋ-ኮሪደሮች', deptEn: 'Engineering & Infrastructure Division', deptAm: 'የምህንድስና እና መሠረተ ልማት ክፍል', email: 'bykmtrading@gmail.com' },
  { value: 'trade',        labelEn: 'Import/Export & Supply Chain',  labelAm: 'ማስመጣት/መላክ እና አቅርቦት ሰንሰለት',  deptEn: 'Global Trade & Logistics Hub',   deptAm: 'የአለም ንግድ እና ሎጂስቲክስ ማዕከል',   email: 'bykmtrading@gmail.com'    },
  { value: 'careers',      labelEn: 'Careers & Capacity Building',   labelAm: 'ሙያ እና አቅም ማጎልበት',   deptEn: 'Human Capital & Social Services', deptAm: 'የሰው ካፒታል እና ማህበራዊ አገልግሎቶች', email: 'bykmtrading@gmail.com'  },
  { value: 'general',      labelEn: 'General Inquiry',               labelAm: 'አጠቃላይ ጥያቄ',               deptEn: 'Corporate Communications',       deptAm: 'የኮርፖሬት ኮሙኒኬሽን',       email: 'bykmtrading@gmail.com'    },
];

const contactInfo = [
  {
    icon: MapPin, titleEn: 'Headquarters', titleAm: 'ዋና መሥሪያ ቤት',
    linesEn: ['Yeka Sub-City, Woreda 08', 'House No. 4-04 (New 4-04)', 'Addis Ababa, Ethiopia'],
    linesAm: ['የካ ንዑስ ከተማ፣ ወረዳ 08', 'ቤት ቁጥር 4-04 (አዲስ 4-04)', 'አዲስ አበባ፣ ኢትዮጵያ'],
  },
  {
    icon: Phone, titleEn: 'Phone', titleAm: 'ስልክ',
    linesEn: ['+251 911 34 32 90 (Primary)', '+251 912 76 43 43 (Operations)'],
    linesAm: ['+251 911 34 32 90 (ዋና)', '+251 912 76 43 43 (ኦፕሬሽን)'],
  },
  {
    icon: Mail, titleEn: 'Email', titleAm: 'ኢሜይል',
    linesEn: ['bykmtrading@gmail.com'],
    linesAm: ['bykmtrading@gmail.com'],
  },
  {
    icon: Globe, titleEn: 'Digital', titleAm: 'ዲጂታል',
    linesEn: ['www.bykmtrading.com', 'LinkedIn: /company/bykm-trading-plc'],
    linesAm: ['www.bykmtrading.com', 'LinkedIn: /company/bykm-trading-plc'],
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
    formState: { errors, isSubmitting },
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

  return (
    <>
      <section className="relative overflow-hidden bg-[#080616] text-white pt-40 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(30,50,150,0.5)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(40,70,180,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(10,8,30,0.6)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="geo-shape w-72 h-72 top-10 right-[-60px] rotate-12 opacity-30" />
        <div className="geo-shape w-40 h-40 bottom-16 right-32 rotate-6 opacity-15" />
        <div className="geo-shape w-24 h-24 top-1/3 right-1/4 opacity-10" />
        <div className="container-custom relative z-10">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{c.header.label[lang]}</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl">{c.header.title[lang]}</h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">{c.header.desc[lang]}</p>
        </div>
      </section>

      <section className="bg-white border-b border-navy-100 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {inquiryOptions.map(opt => (
              <div key={opt.value} className="border border-navy-100 p-4 text-center">
                <p className="font-bold text-navy-900 text-sm mb-1">{lang === 'en' ? opt.labelEn : opt.labelAm}</p>
                <p className="text-navy-700/50 text-xs font-mono">{opt.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f5f4ef]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            <div className="lg:col-span-1 space-y-6">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{c.sidebar.hqLabel[lang]}</span>
                <h2 className="font-display text-2xl font-bold text-navy-900 mt-2 mb-6">{c.sidebar.title[lang]}</h2>
              </div>

              {contactInfo.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.titleEn} className="flex gap-4 bg-white p-5 border border-navy-100">
                    <div className="w-10 h-10 bg-[#080616] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="font-bold text-navy-900 text-base mb-1">{lang === 'en' ? item.titleEn : item.titleAm}</p>
                      {(lang === 'en' ? item.linesEn : item.linesAm).map(line => (
                        <p key={line} className="text-navy-700/60 text-sm leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="bg-[#080616] text-white p-5">
                <p className="font-mono text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-3">{c.sidebar.statutoryLabel[lang]}</p>
                {statRows.map((row) => (
                  <div key={row.labelEn} className="flex justify-between text-sm py-1.5 border-b border-white/10">
                    <span className="text-white/40">{lang === 'en' ? row.labelEn : row.labelAm}</span>
                    <span className="text-white/80 font-mono">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white border border-green-200 p-12 text-center">
                  <CheckCircle2 size={56} className="text-forest-500 mx-auto mb-5" />
                  <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">{c.success.title[lang]}</h2>
                  <p className="text-navy-700/60 max-w-sm mx-auto mb-6">
                    {c.success.desc[lang]} <strong className="text-navy-900">{selectedOption ? (lang === 'en' ? selectedOption.deptEn : selectedOption.deptAm) : ''}</strong> {c.success.and[lang]}
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">
                    <span>{c.success.newInquiry[lang]}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-navy-100 p-8 md:p-10">
                  <div className="mb-8">
                    <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{c.form.label[lang]}</span>
                    <h2 className="font-display text-2xl font-bold text-navy-900 mt-2">{c.form.title[lang]}</h2>
                    {selectedOption && (
                      <p className="text-navy-700/60 text-sm mt-2">
                        {c.form.routedTo[lang]} <strong className="text-navy-900">{lang === 'en' ? selectedOption.deptEn : selectedOption.deptAm}</strong>
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.inquiryType[lang]}</label>
                      <select {...register('inquiryType')} className="form-input">
                        {inquiryOptions.map((o, i) => (
                          <option key={o.value} value={o.value}>{lang === 'en' ? o.labelEn : o.labelAm}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.firstName[lang]}</label>
                        <input {...register('firstName')} placeholder="Abebe"
                          className={`form-input ${errors.firstName ? 'error' : ''}`} />
                        {errors.firstName && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.lastName[lang]}</label>
                        <input {...register('lastName')} placeholder="Kebede"
                          className={`form-input ${errors.lastName ? 'error' : ''}`} />
                        {errors.lastName && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.email[lang]}</label>
                        <input {...register('email')} type="email" placeholder="you@organization.com"
                          className={`form-input ${errors.email ? 'error' : ''}`} />
                        {errors.email && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.phone[lang]}</label>
                        <input {...register('phone')} type="tel" placeholder="+251 9XX XXX XXX"
                          className="form-input" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.organization[lang]}</label>
                        <input {...register('organization')} placeholder="Your Organization"
                          className="form-input" />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.country[lang]}</label>
                        <input {...register('country')} placeholder="Ethiopia"
                          className="form-input" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.subject[lang]}</label>
                      <input {...register('subject')} placeholder="Brief subject of your inquiry"
                        className={`form-input ${errors.subject ? 'error' : ''}`} />
                      {errors.subject && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-700 mb-2">{c.form.message[lang]}</label>
                      <textarea {...register('message')} rows={5}
                        placeholder="Please describe your inquiry, project requirements, or partnership interest in detail..."
                        className={`form-input resize-none ${errors.message ? 'error' : ''}`} />
                      {errors.message && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <div className="flex items-start gap-3">
                      <input {...register('newsletterConsent')} type="checkbox" id="newsletter"
                        className="mt-0.5 w-4 h-4 accent-navy-700" />
                      <label htmlFor="newsletter" className="text-xs sm:text-sm text-navy-700/60 leading-relaxed cursor-pointer">
                        {c.form.newsletter[lang]}
                      </label>
                    </div>

                    {serverError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
                        {serverError}
                      </div>
                    )}

                    <button type="submit" disabled={isContactSubmitting} className="btn-primary w-full justify-center py-4">
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

                    <p className="text-center text-xs text-navy-700/40">{c.form.confidentiality[lang]}</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#080616] py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_50%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="geo-shape w-64 h-64 -top-20 right-[-30px] rotate-12 opacity-20" />
        <div className="geo-shape w-36 h-36 bottom-1/4 left-[-20px] rotate-45 opacity-10" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-10">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-400 uppercase">{c.map.label[lang]}</span>
            <h2 className="font-display text-2xl font-bold text-white mt-3 mb-2">{c.map.title[lang]}</h2>
            <p className="text-white/50 text-sm">{c.map.address[lang]}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="border border-white/10 overflow-hidden">
              <RouteMap lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
