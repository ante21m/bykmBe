'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetServiceQuery, useUpdateServiceMutation } from '@/lib/redux/api';
import ServiceForm from '@/components/admin/ServiceForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { describeQueryError } from '@/lib/adminQueryError';
import { Loader, Center, Text } from '@mantine/core';

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: service,
    isLoading: loading,
    error,
    refetch,
  } = useGetServiceQuery(id, { refetchOnMountOrArgChange: true });
  const [update, { isLoading: saving }] = useUpdateServiceMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) return <Center py="xl"><Loader /></Center>;

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Service not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!service) {
    return <Center py="xl"><Text c="red">Service not found</Text></Center>;
  }

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await update({ id, data }).unwrap();
      router.push('/admin/services');
    } catch (err) {
      // ServiceForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Center py="md"><Text c="red" size="sm">{saveError}</Text></Center>
      )}
      <ServiceForm
        initial={service}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/services"
      />
    </>
  );
}