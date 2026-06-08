'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Stack, Title, Paper, SimpleGrid, Text, ActionIcon,
} from '@mantine/core';
import { useUploadFileMutation } from '@/lib/redux/api';

interface GalleryFormData {
  title: string;
  titleAm?: string;
  description?: string;
  descAm?: string;
  imageUrl?: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
}

interface Props {
  initial?: Partial<GalleryFormData>;
  onSave: (data: GalleryFormData) => Promise<void>;
  saving?: boolean;
}

export default function GalleryForm({ initial, onSave, saving }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();
  const [form, setForm] = useState<GalleryFormData>({
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',
    description: initial?.description || '',
    descAm: initial?.descAm || '',
    imageUrl: initial?.imageUrl || '',
    active: initial?.active ?? true,
    featured: initial?.featured ?? false,
    sortOrder: initial?.sortOrder ?? 0,
  });

  const set = (key: keyof GalleryFormData, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

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
      <Paper withBorder p="lg" radius="md">
        <Stack gap="md">
          <Title order={3}>{initial ? 'Edit Gallery Item' : 'New Gallery Item'}</Title>

          <SimpleGrid cols={2}>
            <TextInput label="Title (English)" required value={form.title} onChange={(e) => set('title', e.target.value)} />
            <TextInput label="Title (አማርኛ)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.target.value)} />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <Textarea label="Description (English)" minRows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
            <Textarea label="Description (አማርኛ)" minRows={3} value={form.descAm || ''} onChange={(e) => set('descAm', e.target.value)} />
          </SimpleGrid>

          <Paper withBorder p="sm" radius="sm" bg="gray.0">
            <Text size="sm" fw={600} mb="xs">Image</Text>
            <Group gap="sm">
              <Button
                variant="light"
                size="compact-sm"
                onClick={() => fileRef.current?.click()}
                loading={uploading}
              >
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

          <SimpleGrid cols={3}>
            <NumberInput label="Sort Order" value={form.sortOrder} onChange={(v) => set('sortOrder', v || 0)} min={0} />
            <Switch label="Active" checked={form.active} onChange={(e) => set('active', e.target.checked)} mt="lg" />
            <Switch label="Featured" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} mt="lg" />
          </SimpleGrid>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" loading={saving}>{initial ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
}
