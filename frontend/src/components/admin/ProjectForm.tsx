'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Stack, Title, Paper, SimpleGrid, Text, ActionIcon,
} from '@mantine/core';
import { useUploadFileMutation } from '@/lib/redux/api';
import type { ProjectFormData } from '@/lib/redux/api';

interface Props {
  initial?: Partial<ProjectFormData>;
  onSave: (data: ProjectFormData) => Promise<void>;
  saving?: boolean;
}

export default function ProjectForm({ initial, onSave, saving }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();
  const [form, setForm] = useState<ProjectFormData>({
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',
    description: initial?.description || '',
    descAm: initial?.descAm || '',
    scope: initial?.scope || '',
    scopeAm: initial?.scopeAm || '',
    achievement: initial?.achievement || '',
    achievAm: initial?.achievAm || '',
    impact: initial?.impact || '',
    impactAm: initial?.impactAm || '',
    pillar: initial?.pillar || 'infrastructure',
    status: initial?.status || 'active',
    client: initial?.client || '',
    clientAm: initial?.clientAm || '',
    location: initial?.location || '',
    locationAm: initial?.locationAm || '',
    startYear: initial?.startYear || undefined,
    endYear: initial?.endYear || undefined,
    imageUrl: initial?.imageUrl || '',
    kpis: initial?.kpis || '',
    featured: initial?.featured || false,
    sortOrder: initial?.sortOrder || 0,
  });

  const set = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append('file', f);
    try {
      const res = await uploadFile(fd).unwrap();
      set('imageUrl', res.url);
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Project' : 'New Project'}</Title>
        <Group>
          <Button variant="default" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" loading={saving}>Save</Button>
        </Group>
      </Group>

      <Stack>
        <Paper withBorder p="md">
          <Title order={5} mb="sm">Basic Information</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="Title (EN)" value={form.title} onChange={(e) => set('title', e.target.value)} required />
            <TextInput label="Title (AM)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.target.value)} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="sm">
            <Textarea label="Description (EN)" value={form.description} onChange={(e) => set('description', e.target.value)} required minRows={3} />
            <Textarea label="Description (AM)" value={form.descAm || ''} onChange={(e) => set('descAm', e.target.value)} minRows={3} />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Classification</Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select
              label="Pillar"
              value={form.pillar}
              onChange={(v) => set('pillar', v || 'infrastructure')}
              data={[
                { value: 'agro', label: 'Agro-Industrialization' },
                { value: 'infrastructure', label: 'Infrastructure' },
                { value: 'logistics', label: 'Global Trade & Logistics' },
                { value: 'digital', label: 'Digital Economy' },
                { value: 'hospitality', label: 'Hospitality & Retail' },
              ]}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(v) => set('status', v || 'active')}
              data={[
                { value: 'completed', label: 'Completed' },
                { value: 'active', label: 'Active' },
                { value: 'pipeline', label: 'Pipeline' },
              ]}
            />
            <Switch
              label="Featured"
              checked={form.featured || false}
              onChange={(e) => set('featured', e.target.checked)}
              mt="xl"
            />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Client & Location</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="Client (EN)" value={form.client || ''} onChange={(e) => set('client', e.target.value)} />
            <TextInput label="Client (AM)" value={form.clientAm || ''} onChange={(e) => set('clientAm', e.target.value)} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="sm">
            <TextInput label="Location (EN)" value={form.location || ''} onChange={(e) => set('location', e.target.value)} />
            <TextInput label="Location (AM)" value={form.locationAm || ''} onChange={(e) => set('locationAm', e.target.value)} />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Dates & Ordering</Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <NumberInput label="Start Year" value={form.startYear || ''} onChange={(v) => set('startYear', typeof v === 'number' ? v : undefined)} min={1900} max={2100} />
            <NumberInput label="End Year" value={form.endYear || ''} onChange={(v) => set('endYear', typeof v === 'number' ? v : undefined)} min={1900} max={2100} />
            <NumberInput label="Sort Order" value={form.sortOrder || 0} onChange={(v) => set('sortOrder', typeof v === 'number' ? v : 0)} min={0} />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Details</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Textarea label="Scope (EN)" value={form.scope || ''} onChange={(e) => set('scope', e.target.value)} minRows={3} />
            <Textarea label="Scope (AM)" value={form.scopeAm || ''} onChange={(e) => set('scopeAm', e.target.value)} minRows={3} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="sm">
            <Textarea label="Achievement (EN)" value={form.achievement || ''} onChange={(e) => set('achievement', e.target.value)} minRows={3} />
            <Textarea label="Achievement (AM)" value={form.achievAm || ''} onChange={(e) => set('achievAm', e.target.value)} minRows={3} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="sm">
            <Textarea label="Impact (EN)" value={form.impact || ''} onChange={(e) => set('impact', e.target.value)} minRows={3} />
            <Textarea label="Impact (AM)" value={form.impactAm || ''} onChange={(e) => set('impactAm', e.target.value)} minRows={3} />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Image</Title>
          <Group gap="sm">
            <Button variant="light" size="compact-sm" onClick={() => fileRef.current?.click()} loading={uploading}>
              {form.imageUrl ? 'Replace Image' : 'Upload Image'}
            </Button>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
            {form.imageUrl && (
              <Group gap="xs">
                <Text size="sm" c="dimmed" truncate maw={200}>{form.imageUrl.split('/').pop()}</Text>
                <ActionIcon variant="subtle" color="red" size="sm" onClick={() => set('imageUrl', '')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </ActionIcon>
              </Group>
            )}
          </Group>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Extra</Title>
          <Textarea
            label="KPIs (JSON array)"
            description='Format: [{ "val": "...", "labelEn": "...", "labelAm": "..." }]'
            value={form.kpis || ''}
            onChange={(e) => set('kpis', e.target.value)}
            minRows={2}
          />
        </Paper>
      </Stack>
    </form>
  );
}
