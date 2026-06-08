'use client';

import { useRouter } from 'next/navigation';
import { useCreateAboutSectionMutation } from '@/lib/redux/api';
import AboutSectionForm from '@/components/admin/AboutSectionForm';

export default function NewAboutPage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateAboutSectionMutation();

  const handleSave = async (data: any) => {
    await create(data).unwrap();
    router.push('/admin/about');
  };

  return <AboutSectionForm onSave={handleSave} saving={isLoading} />;
}
