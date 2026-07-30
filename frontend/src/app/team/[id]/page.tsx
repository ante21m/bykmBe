'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useGetTeamMemberQuery } from '@/lib/redux/api';
import { ChevronLeft } from 'lucide-react';

export default function TeamMemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: member, isLoading } = useGetTeamMemberQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-start justify-center">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="container-custom">
          <p className="text-navy-700/60">Member not found.</p>
          <Link href="/team" className="text-gold-600 hover:underline mt-4 inline-block">&larr; Back to Team</Link>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section className="relative overflow-hidden bg-[#080616] text-white pt-32 pb-20 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.6)_0%,rgba(8,6,22,0.2)_50%,transparent_80%)]" />
        <div className="container-custom relative z-10">
          <Link href="/team" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-mono text-sm tracking-wider uppercase transition-colors mb-8">
            <ChevronLeft size={16} /> Back to Team
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{member.nameEn}</h1>
            <p className="text-gold-400 font-mono text-lg">{member.titleEn}</p>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {member.imageUrl && (
                <div className="relative">
                  <div className="aspect-[4/5] bg-gradient-to-br from-navy-50 to-navy-100 overflow-hidden rounded-sm">
                    <img src={member.imageUrl} alt={member.nameEn} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div>
                <div className="w-16 h-1 bg-gold-400 mb-6" />
                <p className="text-navy-700/80 text-lg leading-relaxed whitespace-pre-line">{member.descEn}</p>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-navy-100/50">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-sm font-mono text-navy-700 hover:text-gold-600 transition-colors">{member.email}</a>
                  )}
                  {member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-navy-700 hover:text-gold-600 transition-colors">LinkedIn</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {member.education && member.education.length > 0 && (
        <ScrollReveal>
          <section className="py-16 md:py-20 bg-[#f5f4ef]">
            <div className="container-custom">
              <div className="text-center mb-10">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">Education</span>
                <div className="w-10 h-0.5 bg-gold-400 mx-auto mt-3" />
              </div>
              <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-12">#</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Degree</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Institution</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-24">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.education.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f5f4ef]'}>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{i + 1}</td>
                        <td className="px-4 py-3"><span className="font-semibold text-navy-900">{item.degree}</span>{item.description && <p className="text-navy-700/60 text-xs mt-0.5">{item.description}</p>}</td>
                        <td className="px-4 py-3 text-navy-700">{item.institution}</td>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{item.year || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {member.experience && member.experience.length > 0 && (
        <ScrollReveal>
          <section className="py-16 md:py-20 bg-white">
            <div className="container-custom">
              <div className="text-center mb-10">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">Experience</span>
                <div className="w-10 h-0.5 bg-gold-400 mx-auto mt-3" />
              </div>
              <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-12">#</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Role</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Organization</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-40">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.experience.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-[#f5f4ef]' : 'bg-white'}>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{i + 1}</td>
                        <td className="px-4 py-3"><span className="font-semibold text-navy-900">{item.role}</span>{item.description && <p className="text-navy-700/60 text-xs mt-0.5">{item.description}</p>}</td>
                        <td className="px-4 py-3 text-navy-700">{item.organization}</td>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{item.startYear || '—'}{item.endYear ? ` – ${item.endYear}` : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {member.certificates && member.certificates.length > 0 && (
        <ScrollReveal>
          <section className="py-16 md:py-20 bg-[#f5f4ef]">
            <div className="container-custom">
              <div className="text-center mb-10">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">Certificates</span>
                <div className="w-10 h-0.5 bg-gold-400 mx-auto mt-3" />
              </div>
              <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Name</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Issuer</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-24">Year</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-20">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.certificates.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f5f4ef]'}>
                        <td className="px-4 py-3 font-semibold text-navy-900">{item.name}</td>
                        <td className="px-4 py-3 text-navy-700">{item.issuer}</td>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{item.year || '—'}</td>
                        <td className="px-4 py-3">{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:text-gold-700 font-mono text-xs tracking-wider uppercase transition-colors">View</a> : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {member.awards && member.awards.length > 0 && (
        <ScrollReveal>
          <section className="py-16 md:py-20 bg-white">
            <div className="container-custom">
              <div className="text-center mb-10">
                <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">Awards & Recognition</span>
                <div className="w-10 h-0.5 bg-gold-400 mx-auto mt-3" />
              </div>
              <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-12">#</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Title</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3 w-24">Year</th>
                      <th className="text-left text-gold-400 font-mono text-xs tracking-wider uppercase px-4 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.awards.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-[#f5f4ef]' : 'bg-white'}>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{i + 1}</td>
                        <td className="px-4 py-3 font-semibold text-navy-900">{item.title}</td>
                        <td className="px-4 py-3 text-navy-700 font-mono text-sm">{item.year || '—'}</td>
                        <td className="px-4 py-3 text-navy-700/60 text-sm">{item.description || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}
    </React.Fragment>
  );
}
