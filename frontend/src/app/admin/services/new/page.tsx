'use client';

import { useRouter } from 'next/navigation';
import { useCreateServiceMutation } from '@/lib/redux/api';
import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateServiceMutation();

  const handleSave = async (data: any) => {
    await create(data).unwrap();
    router.push('/admin/services');
  };

  return <ServiceForm onSave={handleSave} saving={isLoading} />;
}
