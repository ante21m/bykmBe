'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import NewsForm from '@/components/admin/NewsForm';
import { useCreateNewsMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function NewNewsPage() {
  const router = useRouter();
  const [createNews, { isLoading }] = useCreateNewsMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await createNews(data).unwrap();
      router.push('/admin/news');
    } catch (err) {
      // NewsForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback. The previous
      // catch showed a fixed string, which hid a 500 behind "please try again".
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">{saveError}</Text>
      )}
      <NewsForm onSave={handleSave} saving={isLoading} cancelPath="/admin/news" />
    </>
  );
}