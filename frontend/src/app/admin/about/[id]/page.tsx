'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetAboutSectionQuery, useUpdateAboutSectionMutation } from '@/lib/redux/api';
import AboutSectionForm from '@/components/admin/AboutSectionForm';
import { Loader, Center, Text } from '@mantine/core';

export default function EditAboutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: section, isLoading: loading } = useGetAboutSectionQuery(id);
  const [update, { isLoading: saving }] = useUpdateAboutSectionMutation();

  if (loading) return <Center py="xl"><Loader /></Center>;
  if (!section) return <Center py="xl"><Text c="red">Not found</Text></Center>;

  const handleSave = async (data: any) => {
    await update({ id, data }).unwrap();
    router.push('/admin/about');
  };

  return <AboutSectionForm initial={section} onSave={handleSave} saving={saving} />;
}
