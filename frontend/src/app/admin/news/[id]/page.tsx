'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NewsForm from '@/components/admin/NewsForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { useGetNewsItemQuery, useUpdateNewsMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: article,
    isLoading: loading,
    error,
    refetch,
  } = useGetNewsItemQuery(id, { refetchOnMountOrArgChange: true });
  const [updateNews, { isLoading: saving }] = useUpdateNewsMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Article not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!article) {
    return (
      <div className="px-6 py-10 text-red-400 text-sm">Article not found</div>
    );
  }

  const initial = {
    title: article.title,
    titleAm: article.titleAm,
    tags: article.tags,
    sourceUrl: article.sourceUrl,
    excerpt: article.excerpt,
    excerptAm: article.excerptAm,
    content: article.content,
    contentAm: article.contentAm,
    imageUrl: article.imageUrl,
    fileUrl: article.fileUrl,
    fileName: article.fileName,
    active: article.active,
    sortOrder: article.sortOrder,
  };

  const handleSave = async (data: any) => {
    setSaveError(null);
    try {
      await updateNews({ id, data }).unwrap();
      router.push('/admin/news');
    } catch (err) {
      // NewsForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <div className="px-6 pt-4 text-sm text-red-400">{saveError}</div>
      )}
      <NewsForm
        initial={initial}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/news"
      />
    </>
  );
}
