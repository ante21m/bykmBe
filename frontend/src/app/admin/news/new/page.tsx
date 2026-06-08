'use client';

import { useRouter } from 'next/navigation';
import NewsForm from '@/components/admin/NewsForm';
import { useCreateNewsMutation } from '@/lib/redux/api';

export default function NewNewsPage() {
  const router = useRouter();
  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleSave = async (data: any) => {
    await createNews(data).unwrap();
    router.push('/admin/news');
  };

  return <NewsForm onSave={handleSave} saving={isLoading} />;
}
