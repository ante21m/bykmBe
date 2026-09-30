'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@mantine/core';
import ProjectForm from '@/components/admin/ProjectForm';
import { useCreateProjectMutation } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';
import type { ProjectFormData } from '@/lib/redux/api';

export default function NewProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (data: ProjectFormData) => {
    setSaveError(null);
    try {
      await createProject(data).unwrap();
      router.push('/admin/projects');
    } catch (err) {
      // ProjectForm awaits onSave unguarded, so a rejection here would be an
      // unhandled promise rejection with no visible feedback.
      const info = describeQueryError(err);
      setSaveError(`${info.title} — ${info.detail}`);
    }
  };

  return (
    <>
      {saveError && (
        <Text c="red" size="sm" mb="md">{saveError}</Text>
      )}
      <ProjectForm onSave={handleSave} saving={isLoading} cancelPath="/admin/projects" />
    </>
  );
}