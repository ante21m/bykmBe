'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import TeamForm from '@/components/admin/TeamForm';
import { useCreateTeamMemberMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [createMember, { isLoading }] = useCreateTeamMemberMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await createMember(data).unwrap();
      router.push('/admin/team');
    } catch (err) {
      // TeamForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">{saveError}</Text>
      )}
      <TeamForm onSave={handleSave} saving={isLoading} cancelPath="/admin/team" />
    </>
  );
}