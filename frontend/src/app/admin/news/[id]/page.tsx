'use client';

import { useParams, useRouter } from 'next/navigation';
import NewsForm from '@/components/admin/NewsForm';
import { useGetNewsItemQuery, useUpdateNewsMutation } from '@/lib/redux/api';

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: article, isLoading: loading } = useGetNewsItemQuery(id);
  const [updateNews, { isLoading: saving }] = useUpdateNewsMutation();

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (!article) {
    return <div className="px-6 py-10 text-red-400 text-sm">Article not found</div>;
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
    await updateNews({ id, data }).unwrap();
    router.push('/admin/news');
  };

  return <NewsForm initial={initial} onSave={handleSave} saving={saving} />;
}
