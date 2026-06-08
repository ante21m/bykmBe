'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetServiceQuery, useUpdateServiceMutation } from '@/lib/redux/api';
import ServiceForm from '@/components/admin/ServiceForm';
import { Loader, Center, Text } from '@mantine/core';

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: service, isLoading: loading } = useGetServiceQuery(id);
  const [update, { isLoading: saving }] = useUpdateServiceMutation();

  if (loading) return <Center py="xl"><Loader /></Center>;
  if (!service) return <Center py="xl"><Text c="red">Not found</Text></Center>;

  const handleSave = async (data: any) => {
    await update({ id, data }).unwrap();
    router.push('/admin/services');
  };

  return <ServiceForm initial={service} onSave={handleSave} saving={saving} />;
}
