'use client';

import { useParams, useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import { useGetProjectQuery, useUpdateProjectMutation } from '@/lib/redux/api';
import type { ProjectFormData } from '@/lib/redux/api';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading: loading } = useGetProjectQuery(id);
  const [updateProject, { isLoading: saving }] = useUpdateProjectMutation();

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-sm">Loading...</div>;
  }

  if (!project) {
    return <div className="px-6 py-10 text-red-400 text-sm">Project not found</div>;
  }

  const initial: ProjectFormData = {
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
    await updateProject({ id, data }).unwrap();
    router.push('/admin/projects');
  };

  return <ProjectForm initial={initial} onSave={handleSave} saving={saving} />;
}
