'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Title, Tabs,
} from '@mantine/core';
import { CollapsibleSection } from './FormControls';

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
  cancelPath?: string;
}

export default function AboutSectionForm({ initial, onSave, saving, cancelPath }: Props) {
  const [form, setForm] = useState({
    sectionKey: initial?.sectionKey || '',
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',
    content: initial?.content || '',
    contentAm: initial?.contentAm || '',
    sortOrder: initial?.sortOrder || 0,
    active: initial?.active ?? true,
  });
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    identification: true,
    title: true,
    content: true,
  });

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
          {cancelPath && <Button component={Link} href={cancelPath} variant="default">Cancel</Button>}
          <Button type="submit" loading={saving}>Save</Button>
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
              <TextInput label="Title" value={form.title} onChange={(e) => set('title', e.target.value)} required />
            ) : (
              <TextInput label="Title (Amharic)" value={form.titleAm} onChange={(e) => set('titleAm', e.target.value)} />
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Content" open={openSections.content} onToggle={() => toggle('content')}>
            {lang === 'en' ? (
              <Textarea label="Content" value={form.content} onChange={(e) => set('content', e.target.value)} required minRows={5} autosize />
            ) : (
              <Textarea label="Content (Amharic)" value={form.contentAm} onChange={(e) => set('contentAm', e.target.value)} minRows={5} autosize />
            )}
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <div className="border border-slate-200 rounded-md p-3">
            <div className="text-sm font-semibold text-slate-700 mb-2">Settings</div>
            <div className="space-y-3">
              <TextInput
                label="Section Key"
                value={form.sectionKey}
                onChange={(e) => set('sectionKey', e.target.value)}
                required
                placeholder="e.g. overview, mission"
                size="xs"
              />
              <NumberInput
                label="Sort Order"
                value={form.sortOrder}
                onChange={(v) => set('sortOrder', typeof v === 'number' ? v : 0)}
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
