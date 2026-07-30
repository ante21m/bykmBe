'use client';

import { useRouter } from 'next/navigation';
import NewsForm from '@/components/admin/NewsForm';
import { useCreateNewsMutation } from '@/lib/redux/api';
import { useToast } from '@/components/ui/Toaster';

export default function NewNewsPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleSave = async (data: any) => {
    try {
      await createNews(data).unwrap();
      addToast({ type: 'success', title: 'Article created', message: 'The news article has been created successfully.' });
      router.push('/admin/news');
    } catch {
      addToast({ type: 'error', title: 'Creation failed', message: 'Could not create the article. Please try again.' });
    }
  };

  return (
<NewsForm onSave={handleSave} saving={isLoading} cancelPath="/admin/news" />
  );
}
