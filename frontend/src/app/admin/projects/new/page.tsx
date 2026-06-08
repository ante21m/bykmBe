'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import { useCreateProjectMutation } from '@/lib/redux/api';
import type { ProjectFormData } from '@/lib/redux/api';

export default function NewProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleSave = async (data: ProjectFormData) => {
    await createProject(data).unwrap();
    router.push('/admin/projects');
  };

  return <ProjectForm onSave={handleSave} saving={isLoading} />;
}
