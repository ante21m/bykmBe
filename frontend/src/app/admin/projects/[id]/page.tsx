'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import QueryErrorState from '@/components/admin/QueryErrorState';
import { useGetProjectQuery, useUpdateProjectMutation } from '@/lib/redux/api';
import type { ProjectFormData } from '@/lib/redux/api';
import { describeQueryError } from '@/lib/adminQueryError';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: project,
    isLoading: loading,
    error,
    refetch,
  } = useGetProjectQuery(id, { refetchOnMountOrArgChange: true });
  const [updateProject, { isLoading: saving }] = useUpdateProjectMutation();

  // A failed save must not be reported as a missing record. This only ever
  // means "the API did not accept the write".
  const [saveError, setSaveError] = useState<string | null>(null);

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (error) {
    return (
      <QueryErrorState
        info={describeQueryError(error)}
        notFoundLabel="Project not found"
        onRetry={() => refetch()}
      />
    );
  }

  if (!project) {
    return (
      <div className="px-6 py-10 text-red-400 text-sm">
        Project not found
      </div>
    );
  }

  const initial: ProjectFormData & { id?: string } = {
    id: project.id,
    title: project.title,
    titleAm: project.titleAm,
    description: project.description,
    descAm: project.descAm,
    scope: project.scope,
    scopeAm: project.scopeAm,
    achievement: project.achievement,
    achievAm: project.achievAm,
    impact: project.impact,
    impactAm: project.impactAm,
    pillar: project.pillar,
    status: project.status,
    client: project.client,
    clientAm: project.clientAm,
    location: project.location,
    locationAm: project.locationAm,
    startYear: project.startYear,
    endYear: project.endYear,
    imageUrl: project.imageUrl,
    kpis: project.kpis,
    featured: project.featured,
    sortOrder: project.sortOrder,
  };

  const handleSave = async (data: ProjectFormData) => {
    setSaveError(null);
    try {
      await updateProject({ id, data }).unwrap();
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
        <div className="px-6 pt-4 text-sm text-red-400">{saveError}</div>
      )}
      <ProjectForm
        initial={initial}
        onSave={handleSave}
        saving={saving}
        cancelPath="/admin/projects"
      />
    </>
  );
}
