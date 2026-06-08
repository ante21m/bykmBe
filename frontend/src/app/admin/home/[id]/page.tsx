'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetHomeSectionQuery, useUpdateHomeSectionMutation } from '@/lib/redux/api';
import HomeSectionForm from '@/components/admin/HomeSectionForm';
import { Loader, Center, Text } from '@mantine/core';

export default function EditHomePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: section, isLoading: loading } = useGetHomeSectionQuery(id);
  const [update, { isLoading: saving }] = useUpdateHomeSectionMutation();

  if (loading) return <Center py="xl"><Loader /></Center>;
  if (!section) return <Center py="xl"><Text c="red">Not found</Text></Center>;

  const handleSave = async (data: any) => {
    await update({ id, data }).unwrap();
    router.push('/admin/home');
  };

  return <HomeSectionForm initial={section} onSave={handleSave} saving={saving} />;
}
