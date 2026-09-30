'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetAboutSectionQuery, useUpdateAboutSectionMutation } from '@/lib/redux/api';
import AboutSectionForm from '@/components/admin/AboutSectionForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { describeQueryError } from '@/lib/adminQueryError';
import { Loader, Center, Text } from '@mantine/core';

export default function EditAboutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: section,
    isLoading: loading,
    error,
    refetch,
  } = useGetAboutSectionQuery(id, { refetchOnMountOrArgChange: true });
  const [update, { isLoading: saving }] = useUpdateAboutSectionMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) return <Center py="xl"><Loader /></Center>;

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Section not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!section) {
    return <Center py="xl"><Text c="red">Section not found</Text></Center>;
  }

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await update({ id, data }).unwrap();
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
        <Center py="md"><Text c="red" size="sm">{saveError}</Text></Center>
      )}
      <AboutSectionForm
        initial={section}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/about"
      />
    </>
  );
}
