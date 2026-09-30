'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import TeamForm from '@/components/admin/TeamForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { useGetTeamMemberQuery, useUpdateTeamMemberMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function EditTeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: member,
    isLoading: loading,
    error,
    refetch,
  } = useGetTeamMemberQuery(id, { refetchOnMountOrArgChange: true });
  const [updateMember, { isLoading: saving }] = useUpdateTeamMemberMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Member not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!member) {
    return (
      <div className="px-6 py-10 text-red-400 text-sm">Member not found</div>
    );
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
    setSaveError(null);
    try {
      await updateMember({ id, data }).unwrap();
      router.push('/admin/team');
    } catch (err) {
      // TeamForm awaits onSave unguarded, so this must not rethrow or the
      // save fails silently with no feedback at all.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">
          {saveError}
        </Text>
      )}
      <TeamForm
        initial={initial}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/team"
      />
    </>
  );
}
