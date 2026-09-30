'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import { useCreateHomeSectionMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';
import HomeSectionForm from '@/components/admin/HomeSectionForm';

export default function NewHomePage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateHomeSectionMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await create(data).unwrap();
      router.push('/admin/home');
    } catch (err) {
      // HomeSectionForm awaits onSave unguarded, so a rejection here would be
      // an unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">{saveError}</Text>
      )}
      <HomeSectionForm onSave={handleSave} saving={isLoading} cancelPath="/admin/home" />
    </>
  );
}