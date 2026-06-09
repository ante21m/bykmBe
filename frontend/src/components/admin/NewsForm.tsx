'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Stack, Title, Paper, SimpleGrid, Text, ActionIcon,
} from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useUploadFileMutation } from '@/lib/redux/api';

interface NewsFormData {
  title: string;
  titleAm?: string;
  tags?: string;
  sourceUrl?: string;
  excerpt: string;
  excerptAm?: string;
  content: string;
  contentAm?: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  active: boolean;
  sortOrder: number;
}

interface Props {
  initial?: Partial<NewsFormData>;
  onSave: (data: NewsFormData) => Promise<void>;
  saving?: boolean;
}

function RTEditor({ value, onChange, label, required }: { value: string; onChange: (v: string) => void; label: string; required?: boolean }) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: true,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div>
      <Text size="sm" fw={500} mb={4}>
        {label}{required && ' *'}
      </Text>
      <RichTextEditor editor={editor} styles={{ root: { borderColor: 'var(--mantine-color-gray-3)' } }}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content mih={200} />
      </RichTextEditor>
    </div>
  );
}

export default function NewsForm({ initial, onSave, saving }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();
  const [form, setForm] = useState<NewsFormData>({
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',

    tags: initial?.tags || '',
    sourceUrl: initial?.sourceUrl || '',
    excerpt: initial?.excerpt || '',
    excerptAm: initial?.excerptAm || '',
    content: initial?.content || '',
    contentAm: initial?.contentAm || '',
    imageUrl: initial?.imageUrl || '',
    fileUrl: initial?.fileUrl || '',
    fileName: initial?.fileName || '',
    active: initial?.active ?? true,
    sortOrder: initial?.sortOrder ?? 0,
  });

  const set = (key: keyof NewsFormData, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append('file', f);
    try {
      const res = await uploadFile(fd).unwrap();
      set('fileUrl', res.url);
      set('fileName', res.name);
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
          <Title order={3}>{initial ? 'Edit Article' : 'New Article'}</Title>

          <SimpleGrid cols={2}>
            <TextInput label="Title (English)" required value={form.title} onChange={(e) => set('title', e.target.value)} />
            <TextInput label="Title (አማርኛ)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.target.value)} />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <TextInput label="Tags" value={form.tags || ''} onChange={(e) => set('tags', e.target.value)} />
            <TextInput label="Source URL" value={form.sourceUrl || ''} onChange={(e) => set('sourceUrl', e.target.value)} />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <Textarea label="Excerpt (English)" required minRows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
            <Textarea label="Excerpt (አማርኛ)" minRows={2} value={form.excerptAm || ''} onChange={(e) => set('excerptAm', e.target.value)} />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <RTEditor label="Content (English)" required value={form.content} onChange={(v) => set('content', v)} />
            <RTEditor label="Content (አማርኛ)" value={form.contentAm || ''} onChange={(v) => set('contentAm', v)} />
          </SimpleGrid>

          <TextInput label="Image URL" value={form.imageUrl || ''} onChange={(e) => set('imageUrl', e.target.value)} />

          <Paper withBorder p="sm" radius="sm" bg="gray.0">
            <Text size="sm" fw={600} mb="xs">Attachment (optional)</Text>
            <Group gap="sm">
              <Button
                variant="light"
                size="compact-sm"
                onClick={() => fileRef.current?.click()}
                loading={uploading}
              >
                {form.fileUrl ? 'Replace File' : 'Upload File'}
              </Button>
              <input ref={fileRef} type="file" hidden onChange={handleFileUpload} />
              {form.fileName && (
                <Group gap="xs">
                  <Text size="sm" c="dimmed">{form.fileName}</Text>
                  <ActionIcon variant="subtle" color="red" size="sm" onClick={() => { set('fileUrl', ''); set('fileName', ''); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </ActionIcon>
                </Group>
              )}
            </Group>
          </Paper>

          <SimpleGrid cols={2}>
            <NumberInput label="Sort Order" value={form.sortOrder} onChange={(v) => set('sortOrder', v || 0)} min={0} />
            <Switch label="Active" checked={form.active} onChange={(e) => set('active', e.target.checked)} mt="lg" />
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
