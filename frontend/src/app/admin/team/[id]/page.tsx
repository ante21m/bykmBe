'use client';

import { useParams, useRouter } from 'next/navigation';
import TeamForm from '@/components/admin/TeamForm';
import { useGetTeamMemberQuery, useUpdateTeamMemberMutation } from '@/lib/redux/api';

export default function EditTeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: member, isLoading: loading } = useGetTeamMemberQuery(id);
  const [updateMember, { isLoading: saving }] = useUpdateTeamMemberMutation();

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (!member) {
    return <div className="px-6 py-10 text-red-400 text-sm">Member not found</div>;
  }

  const initial = {
    nameEn: member.nameEn,
    nameAm: member.nameAm,
    titleEn: member.titleEn,
    titleAm: member.titleAm,
    descEn: member.descEn,
    descAm: member.descAm,
    imageUrl: member.imageUrl,
    category: member.category,
    active: member.active,
    sortOrder: member.sortOrder,
    linkedinUrl: member.linkedinUrl,
    email: member.email,
    education: member.education,
    experience: member.experience,
    certificates: member.certificates,
    awards: member.awards,
  };

  const handleSave = async (data: any) => {
    await updateMember({ id, data }).unwrap();
    router.push('/admin/team');
  };

  return <TeamForm initial={initial} onSave={handleSave} saving={saving} cancelPath="/admin/team" />;
}
