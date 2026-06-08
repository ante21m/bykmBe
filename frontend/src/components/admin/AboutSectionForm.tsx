'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Stack, Title, Paper, SimpleGrid,
} from '@mantine/core';

interface Props {
  initial?: {
    sectionKey?: string;
    title?: string;
    titleAm?: string;
    content?: string;
    contentAm?: string;
    sortOrder?: number;
    active?: boolean;
  };
  onSave: (data: any) => Promise<void>;
  saving?: boolean;
}

export default function AboutSectionForm({ initial, onSave, saving }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    sectionKey: initial?.sectionKey || '',
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',
    content: initial?.content || '',
    contentAm: initial?.contentAm || '',
    sortOrder: initial?.sortOrder || 0,
    active: initial?.active ?? true,
  });

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Section' : 'New Section'}</Title>
        <Group>
          <Button variant="default" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" loading={saving}>Save</Button>
        </Group>
      </Group>

      <Stack>
        <Paper withBorder p="md">
          <Title order={5} mb="sm">Identification</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="Section Key" value={form.sectionKey} onChange={(e) => set('sectionKey', e.target.value)} required
              description="e.g. overview, mission, vision, values, history" />
            <NumberInput label="Sort Order" value={form.sortOrder} onChange={(v) => set('sortOrder', typeof v === 'number' ? v : 0)} min={0} />
          </SimpleGrid>
          <Switch label="Active" checked={form.active} onChange={(e) => set('active', e.target.checked)} mt="sm" />
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Titles</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="Title (EN)" value={form.title} onChange={(e) => set('title', e.target.value)} required />
            <TextInput label="Title (AM)" value={form.titleAm} onChange={(e) => set('titleAm', e.target.value)} />
          </SimpleGrid>
        </Paper>

        <Paper withBorder p="md">
          <Title order={5} mb="sm">Content</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Textarea label="Content (EN)" value={form.content} onChange={(e) => set('content', e.target.value)} required minRows={5} autosize />
            <Textarea label="Content (AM)" value={form.contentAm} onChange={(e) => set('contentAm', e.target.value)} minRows={5} autosize />
          </SimpleGrid>
        </Paper>
      </Stack>
    </form>
  );
}
