'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import GalleryForm from '@/components/admin/GalleryForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { useGetGalleryItemQuery, useUpdateGalleryMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function EditGalleryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: item,
    isLoading: loading,
    error,
    refetch,
  } = useGetGalleryItemQuery(id, { refetchOnMountOrArgChange: true });
  const [updateGallery, { isLoading: saving }] = useUpdateGalleryMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Gallery item not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!item) {
    return (
      <div className="px-6 py-10 text-red-400 text-sm">
        Gallery item not found
      </div>
    );
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
    setSaveError(null);
    try {
      await updateGallery({ id, data }).unwrap();
      router.push('/admin/gallery');
    } catch (err) {
      // GalleryForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">
          {saveError}
        </Text>
      )}
      <GalleryForm
        initial={initial}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/gallery"
      />
    </>
  );
}
