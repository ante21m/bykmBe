'use client';

import { useRouter } from 'next/navigation';
import { useCreateGalleryMutation } from '@/lib/redux/api';
import GalleryForm from '@/components/admin/GalleryForm';

export default function NewGalleryPage() {
  const router = useRouter();
  const [create, { isLoading }] = useCreateGalleryMutation();

  const handleSave = async (data: any) => {
    await create(data).unwrap();
    router.push('/admin/gallery');
  };

  return <GalleryForm onSave={handleSave} saving={isLoading} cancelPath="/admin/gallery" />;
}
