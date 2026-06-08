'use client';

import { useRouter } from 'next/navigation';
import GalleryForm from '@/components/admin/GalleryForm';
import { useCreateGalleryMutation } from '@/lib/redux/api';

export default function NewGalleryPage() {
  const router = useRouter();
  const [createGallery, { isLoading }] = useCreateGalleryMutation();

  const handleSave = async (data: any) => {
    await createGallery(data).unwrap();
    router.push('/admin/gallery');
  };

  return <GalleryForm onSave={handleSave} saving={isLoading} />;
}
