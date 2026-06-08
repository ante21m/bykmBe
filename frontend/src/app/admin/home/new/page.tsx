'use client';

import { useRouter } from 'next/navigation';
import { useCreateHomeSectionMutation } from '@/lib/redux/api';
import HomeSectionForm from '@/components/admin/HomeSectionForm';

export default function NewHomePage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateHomeSectionMutation();

  const handleSave = async (data: any) => {
    await create(data).unwrap();
    router.push('/admin/home');
  };

  return <HomeSectionForm onSave={handleSave} saving={isLoading} />;
}
