'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import TeamForm from '@/components/admin/TeamForm';
import { useCreateTeamMemberMutation } from '@/lib/redux/api';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [createMember, { isLoading }] = useCreateTeamMemberMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await createMember(data).unwrap();
      router.push('/admin/team');
    } catch (err: any) {
      const msg = err?.data?.message ?? err?.error ?? 'Failed to create member';
      setSaveError(Array.isArray(msg) ? msg.join(', ') : String(msg));
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
