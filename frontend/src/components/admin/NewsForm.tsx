'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Title, Tabs, ActionIcon, Image, Box, Text,
} from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useUploadFileMutation } from '@/lib/redux/api';
import { Upload } from 'lucide-react';
import { CollapsibleSection } from './FormControls';

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
  cancelPath?: string;
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

export default function NewsForm({ initial, onSave, saving, cancelPath }: Props) {
  const imageFileRef = useRef<HTMLInputElement>(null);
  const attachFileRef = useRef<HTMLInputElement>(null);
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
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    title: true,
    excerpt: true,
    content: true,
    image: true,
    attachment: true,
  });

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  const set = (key: keyof NewsFormData, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Article' : 'New Article'}</Title>
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

          <CollapsibleSection label="Excerpt" open={openSections.excerpt} onToggle={() => toggle('excerpt')}>
            {lang === 'en' ? (
              <Textarea label="Excerpt" required minRows={2} autosize value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
            ) : (
              <Textarea label="Excerpt (Amharic)" minRows={2} autosize value={form.excerptAm || ''} onChange={(e) => set('excerptAm', e.target.value)} />
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Content" open={openSections.content} onToggle={() => toggle('content')}>
            {lang === 'en' ? (
              <RTEditor label="Content" required value={form.content} onChange={(v) => set('content', v)} />
            ) : (
              <RTEditor label="Content (Amharic)" value={form.contentAm || ''} onChange={(v) => set('contentAm', v)} />
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Featured Image" open={openSections.image} onToggle={() => toggle('image')}>
            <div className="space-y-3">
              {form.imageUrl && (
                <Box className="relative rounded overflow-hidden border border-slate-200">
                  <Image src={form.imageUrl} alt="News image" h={200} fit="cover" radius="sm" />
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
                <Button variant="light" size="compact-sm" onClick={() => imageFileRef.current?.click()} loading={uploading} leftSection={<Upload size={16} />}>
                  {form.imageUrl ? 'Replace Image' : 'Upload Image'}
                </Button>
                <input ref={imageFileRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
                {form.imageUrl && (
                  <Text size="xs" c="dimmed" truncate maw={200}>{form.imageUrl.split('/').pop()}</Text>
                )}
              </Group>
            </div>
          </CollapsibleSection>

          <CollapsibleSection label="Attachment" open={openSections.attachment} onToggle={() => toggle('attachment')}>
            <Group gap="sm">
              <Button variant="light" size="compact-sm" onClick={() => attachFileRef.current?.click()} loading={uploading} leftSection={<Upload size={16} />}>
                {form.fileUrl ? 'Replace File' : 'Upload File'}
              </Button>
              <input ref={attachFileRef} type="file" hidden onChange={handleFileUpload} />
              {form.fileName && (
                <Group gap="xs">
                  <Text size="xs" c="dimmed">{form.fileName}</Text>
                  <ActionIcon variant="subtle" color="red" size="sm" onClick={() => { set('fileUrl', ''); set('fileName', ''); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </ActionIcon>
                </Group>
              )}
            </Group>
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <div className="border border-slate-200 rounded-md p-3">
            <div className="text-sm font-semibold text-slate-700 mb-2">Settings</div>
            <div className="space-y-3">
              <TextInput
                label="Tags"
                value={form.tags || ''}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="e.g. infrastructure, award"
                size="xs"
              />
              <TextInput
                label="Source URL"
                value={form.sourceUrl || ''}
                onChange={(e) => set('sourceUrl', e.target.value)}
                size="xs"
              />
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
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
