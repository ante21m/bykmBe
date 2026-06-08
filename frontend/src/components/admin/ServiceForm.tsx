'use client';

import { useState } from 'react';
import {
  TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Stack, Title, Paper, SimpleGrid,
} from '@mantine/core';
import { useRouter } from 'next/navigation';

interface Props {
  initial?: {
    pillarKey?: string;
    pillarTitle?: string;
    pillarDescription?: string;
    title?: string;
    description?: string;
    features?: string[];
    icon?: string;
    sortOrder?: number;
    active?: boolean;
  };
  onSave: (data: any) => Promise<void>;
  saving?: boolean;
}

const PILLARS = [
  { value: 'agro', label: 'Agro-Industrialization' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'logistics', label: 'Global Trade & Logistics' },
  { value: 'digital', label: 'Digital Economy' },
  { value: 'hospitality', label: 'Hospitality & Retail' },
];

export default function ServiceForm({ initial, onSave, saving }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    pillarKey: initial?.pillarKey || 'infrastructure',
    pillarTitle: initial?.pillarTitle || '',
    pillarDescription: initial?.pillarDescription || '',
    title: initial?.title || '',
    description: initial?.description || '',
    features: initial?.features?.join('\n') || '',
    icon: initial?.icon || '',
    sortOrder: initial?.sortOrder || 0,
    active: initial?.active ?? true,
  });

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      ...form,
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Service' : 'New Service'}</Title>
        <Group>
          <Button variant="default" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" loading={saving}>Save</Button>
        </Group>
      </Group>

      <Stack>
        <Paper withBorder p="md">
          <Title order={5} mb="sm">Classification</Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select label="Pillar" value={form.pillarKey} onChange={(v) => set('pillarKey', v || 'infrastructure')}
              data={PILLARS} />
            <TextInput label="Icon" value={form.icon} onChange={(e) => set('icon', e.target.value)}
              description="e.g. coffee, wheat, building" />
            <NumberInput label="Sort Order" value={form.sortOrder} onChange={(v) => set('sortOrder', typeof v === 'number' ? v : 0)} min={0} />
          </SimpleGrid>
          <Switch label="Active" checked={form.active} onChange={(e) => set('active', e.target.checked)} mt="sm" />
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Pillar Info</Title>
          <TextInput label="Pillar Title" value={form.pillarTitle} onChange={(e) => set('pillarTitle', e.target.value)} required />
          <Textarea label="Pillar Description" value={form.pillarDescription} onChange={(e) => set('pillarDescription', e.target.value)} minRows={2} mt="sm" />
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Service Details</Title>
          <TextInput label="Title" value={form.title} onChange={(e) => set('title', e.target.value)} required />
          <Textarea label="Description" value={form.description} onChange={(e) => set('description', e.target.value)} required minRows={3} mt="sm" />
          <Textarea label="Features (one per line)" value={form.features} onChange={(e) => set('features', e.target.value)} minRows={4} mt="sm"
            description="Enter each feature on a new line" />
        </Paper>
      </Stack>
    </form>
  );
}
