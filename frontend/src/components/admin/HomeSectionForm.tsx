'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  TextInput, Textarea, NumberInput, Switch, Button, Group, Title, Tabs, Select, FileInput,
} from '@mantine/core';
import { Upload } from 'lucide-react';
import { useUploadFileMutation } from '@/lib/redux/api';
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

const JSON_SECTIONS = ['heroSection', 'hero', 'heroStatistics', 'heroStats', 'mission', 'pillars', 'flagshipProject', 'flagship', 'values', 'esg', 'partners', 'ctaSection', 'cta'];

const SECTION_KEY_OPTIONS = [
  { value: 'heroSection', label: 'Hero Section' },
  { value: 'hero', label: 'Hero Section (legacy key)' },
  { value: 'heroStatistics', label: 'Hero Statistics' },
  { value: 'heroStats', label: 'Hero Statistics (legacy key)' },
  { value: 'mission', label: 'Mission' },
  { value: 'pillars', label: 'Pillars' },
  { value: 'flagshipProject', label: 'Flagship Project' },
  { value: 'flagship', label: 'Flagship Project (legacy key)' },
  { value: 'values', label: 'Values' },
  { value: 'esg', label: 'ESG' },
  { value: 'partners', label: 'Partners' },
  { value: 'ctaSection', label: 'CTA Section' },
  { value: 'cta', label: 'CTA Section (legacy key)' },
];

function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/En$/, ' (EN)')
    .replace(/Am$/, ' (AM)')
    .trim();
}

export default function HomeSectionForm({ initial, onSave, saving, cancelPath }: Props) {
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

  const isJsonSection = JSON_SECTIONS.includes(form.sectionKey);
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();

  const handleBgUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadFile(fd).unwrap();
      const raw = form.content || '{}';
      let obj: Record<string, any> = {};
      try { obj = JSON.parse(raw); } catch { obj = {}; }
      obj.bgImage = res.url;
      set('content', JSON.stringify(obj, null, 2));
    } catch { /* upload failed */ }
  };

  let parsedJson: Record<string, any> = {};
  let parseError = '';
  if (isJsonSection) {
    try {
      const raw = lang === 'en' ? form.content : (form.contentAm || '{}');
      const parsed = JSON.parse(raw || '{}');
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        parsedJson = parsed;
        if ((form.sectionKey === 'heroSection' || form.sectionKey === 'hero') && !('bgImage' in parsedJson)) {
          parsedJson.bgImage = '';
        }
      }
    } catch { parseError = 'Invalid JSON — check your content'; }
  }

  const updateJsonField = (fieldKey: string, rawValue: string) => {
    const source = lang === 'en' ? 'content' : 'contentAm';
    const raw = form[source] || '{}';
    let obj: Record<string, any> = {};
    try { obj = JSON.parse(raw); } catch { obj = {}; }
    const existing = obj[fieldKey];
    if (Array.isArray(existing) || (typeof existing === 'object' && existing !== null)) {
      try { obj[fieldKey] = JSON.parse(rawValue); } catch { obj[fieldKey] = rawValue; }
    } else {
      obj[fieldKey] = rawValue;
    }
    set(source, JSON.stringify(obj, null, 2));
  };

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
            {isJsonSection && !parseError ? (
              <div className="space-y-3">
                {Object.entries(parsedJson).map(([fieldKey, fieldVal]) => (
                  Array.isArray(fieldVal) ? (
                    <Textarea
                      key={fieldKey}
                      label={`${humanizeKey(fieldKey)} (JSON array)`}
                      value={JSON.stringify(fieldVal, null, 2)}
                      onChange={(e) => updateJsonField(fieldKey, e.currentTarget.value)}
                      minRows={3}
                      autosize
                    />
                  ) : typeof fieldVal === 'object' && fieldVal !== null ? (
                    <Textarea
                      key={fieldKey}
                      label={`${humanizeKey(fieldKey)} (JSON)`}
                      value={JSON.stringify(fieldVal, null, 2)}
                      onChange={(e) => updateJsonField(fieldKey, e.currentTarget.value)}
                      minRows={3}
                      autosize
                    />
                  ) : String(fieldVal).length > 80 ? (
                    <Textarea
                      key={fieldKey}
                      label={humanizeKey(fieldKey)}
                      value={String(fieldVal)}
                      onChange={(e) => updateJsonField(fieldKey, e.currentTarget.value)}
                      minRows={3}
                      autosize
                    />
                  ) : (
                    <TextInput
                      key={fieldKey}
                      label={humanizeKey(fieldKey)}
                      value={String(fieldVal)}
                      onChange={(e) => updateJsonField(fieldKey, e.currentTarget.value)}
                    />
                  )
                ))}
                {(form.sectionKey === 'heroSection' || form.sectionKey === 'hero') && (
                  <FileInput
                    label="Background Image"
                    accept="image/*"
                    onChange={handleBgUpload}
                    clearable
                    leftSection={<Upload size={16} />}
                  />
                )}
              </div>
            ) : (
              <Textarea
                label={lang === 'en' ? 'Content' : 'Content (Amharic)'}
                value={lang === 'en' ? form.content : (form.contentAm || '')}
                onChange={(e) => set(lang === 'en' ? 'content' : 'contentAm', e.target.value)}
                required={lang === 'en'}
                minRows={5}
                autosize
                error={parseError || undefined}
              />
            )}
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <div className="border border-slate-200 rounded-md p-3">
            <div className="text-sm font-semibold text-slate-700 mb-2">Settings</div>
            <div className="space-y-3">
              <Select
                label="Section Key"
                data={SECTION_KEY_OPTIONS}
                value={form.sectionKey}
                onChange={(v) => set('sectionKey', v || '')}
                required
                size="xs"
                searchable
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
