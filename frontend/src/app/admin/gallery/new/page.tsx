'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import { useCreateGalleryMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';
import GalleryForm from '@/components/admin/GalleryForm';

export default function NewGalleryPage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateGalleryMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await create(data).unwrap();
      router.push('/admin/gallery');
    } catch (err) {
      // GalleryForm awaits onSave unguarded, so a rejection here would be an
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
      <GalleryForm onSave={handleSave} saving={isLoading} cancelPath="/admin/gallery" />
    </>
  );
}