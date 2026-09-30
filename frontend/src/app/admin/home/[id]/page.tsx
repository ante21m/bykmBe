'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetHomeSectionQuery, useUpdateHomeSectionMutation } from '@/lib/redux/api';
import HomeSectionForm from '@/components/admin/HomeSectionForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { describeQueryError } from '@/lib/adminQueryError';
import { Loader, Center, Text } from '@mantine/core';

export default function EditHomePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: section,
    isLoading: loading,
    error,
    refetch,
  } = useGetHomeSectionQuery(id, { refetchOnMountOrArgChange: true });
  const [update, { isLoading: saving }] = useUpdateHomeSectionMutation();
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
        <Center py="md"><Text c="red" size="sm">{saveError}</Text></Center>
      )}
      <HomeSectionForm
        initial={section}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/home"
      />
    </>
  );
}