'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import { useCreateAboutSectionMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';
import AboutSectionForm from '@/components/admin/AboutSectionForm';

export default function NewAboutPage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateAboutSectionMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await create(data).unwrap();
      router.push('/admin/about');
    } catch (err) {
      // AboutSectionForm awaits onSave unguarded, so a rejection here would
      // be an unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">{saveError}</Text>
      )}
      <AboutSectionForm onSave={handleSave} saving={isLoading} cancelPath="/admin/about" />
    </>
  );
}