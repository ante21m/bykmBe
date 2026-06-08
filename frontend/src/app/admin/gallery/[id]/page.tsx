'use client';

import { useParams, useRouter } from 'next/navigation';
import GalleryForm from '@/components/admin/GalleryForm';
import { useGetGalleryItemQuery, useUpdateGalleryMutation } from '@/lib/redux/api';

export default function EditGalleryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: item, isLoading: loading } = useGetGalleryItemQuery(id);
  const [updateGallery, { isLoading: saving }] = useUpdateGalleryMutation();

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (!item) {
    return <div className="px-6 py-10 text-red-400 text-sm">Gallery item not found</div>;
  }

  const initial = {
    title: item.title,
    titleAm: item.titleAm,
    description: item.description,
    descAm: item.descAm,
    imageUrl: item.imageUrl,
    active: item.active,
    featured: item.featured,
    sortOrder: item.sortOrder,
  };

  const handleSave = async (data: any) => {
    await updateGallery({ id, data }).unwrap();
    router.push('/admin/gallery');
  };

  return <GalleryForm initial={initial} onSave={handleSave} saving={saving} />;
}
