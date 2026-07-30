'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Title, Tabs, ActionIcon, Image, Box, Text,
} from '@mantine/core';
import { useUploadFileMutation } from '@/lib/redux/api';
import { Upload } from 'lucide-react';
import { CollapsibleSection } from './FormControls';

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
  cancelPath?: string;
}

export default function GalleryForm({ initial, onSave, saving, cancelPath }: Props) {
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
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    title: true,
    description: true,
    image: true,
  });

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Gallery Item' : 'New Gallery Item'}</Title>
        <Group>
          {cancelPath && <Button component={Link} href={cancelPath} variant="default">Cancel</Button>}
          <Button type="submit" loading={saving}>{initial ? 'Update' : 'Create'}</Button>
        </Group>
      </Group>

      <div className="flex gap-6 items-start flex-col lg:flex-row">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="sticky top-0 z-10 bg-white border border-slate-200 rounded-md">
            <Tabs value={lang} onChange={(v) => v && setLang(v as 'en' | 'am')}>
              <Tabs.List grow>
                <Tabs.Tab value="en">English</Tabs.Tab>
                <Tabs.Tab value="am">Amharic</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>

          <CollapsibleSection label="Title" open={openSections.title} onToggle={() => toggle('title')}>
            {lang === 'en' ? (
              <TextInput label="Title" required value={form.title} onChange={(e) => set('title', e.target.value)} />
            ) : (
              <TextInput label="Title (Amharic)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.target.value)} />
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Description" open={openSections.description} onToggle={() => toggle('description')}>
            {lang === 'en' ? (
              <Textarea label="Description" value={form.description || ''} onChange={(e) => set('description', e.target.value)} minRows={3} autosize />
            ) : (
              <Textarea label="Description (Amharic)" value={form.descAm || ''} onChange={(e) => set('descAm', e.target.value)} minRows={3} autosize />
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Image" open={openSections.image} onToggle={() => toggle('image')}>
            <div className="space-y-3">
              {form.imageUrl && (
                <Box className="relative rounded overflow-hidden border border-slate-200">
                  <Image src={form.imageUrl} alt="Gallery image" h={200} fit="cover" radius="sm" />
                  <ActionIcon
                    className="absolute top-2 right-2"
                    color="red" variant="filled" size="sm"
                    onClick={() => set('imageUrl', '')}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </ActionIcon>
                </Box>
              )}
              <Group gap="sm">
                <Button variant="light" size="compact-sm" onClick={() => fileRef.current?.click()} loading={uploading} leftSection={<Upload size={16} />}>
                  {form.imageUrl ? 'Replace Image' : 'Upload Image'}
                </Button>
                <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
                {form.imageUrl && (
                  <Text size="xs" c="dimmed" truncate maw={200}>{form.imageUrl.split('/').pop()}</Text>
                )}
              </Group>
            </div>
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <div className="border border-slate-200 rounded-md p-3">
            <div className="text-sm font-semibold text-slate-700 mb-2">Settings</div>
            <div className="space-y-3">
              <NumberInput
                label="Sort Order"
                value={form.sortOrder}
                onChange={(v) => set('sortOrder', v || 0)}
                min={0}
                size="xs"
              />
              <Switch
                label="Active"
                checked={form.active}
                onChange={(e) => set('active', e.target.checked)}
              />
              <Switch
                label="Featured"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
