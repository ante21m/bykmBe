'use client';

import { useState } from 'react';
import {
  TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Title, Tabs,
} from '@mantine/core';
import Link from 'next/link';
import { CollapsibleSection } from './FormControls';

interface Props {
  initial?: {
    pillarKey?: string;
    pillarTitle?: string;
    pillarTitleAm?: string;
    pillarDescription?: string;
    pillarDescriptionAm?: string;
    title?: string;
    titleAm?: string;
    description?: string;
    descriptionAm?: string;
    features?: string[];
    featuresAm?: string[];
    icon?: string;
    sortOrder?: number;
    active?: boolean;
  };
  onSave: (data: any) => Promise<void>;
  saving?: boolean;
  cancelPath?: string;
}

const PILLARS = [
  { value: 'infrastructure', label: 'Infrastructure & Real Estate Development' },
  { value: 'logistics', label: 'Global Trade, Logistics & Transport' },
  { value: 'hospitality', label: 'Hospitality, Retail & Consumer Ecosystems' },
  { value: 'agro', label: 'Agro-Industrialization & Natural Resources' },
];

export default function ServiceForm({ initial, onSave, saving, cancelPath }: Props) {
  const [form, setForm] = useState({
    pillarKey: initial?.pillarKey || 'infrastructure',
    pillarTitle: initial?.pillarTitle || '',
    pillarTitleAm: initial?.pillarTitleAm || '',
    pillarDescription: initial?.pillarDescription || '',
    pillarDescriptionAm: initial?.pillarDescriptionAm || '',
    title: initial?.title || '',
    titleAm: initial?.titleAm || '',
    description: initial?.description || '',
    descriptionAm: initial?.descriptionAm || '',
    features: initial?.features?.join('\n') || '',
    featuresAm: initial?.featuresAm?.join('\n') || '',
    icon: initial?.icon || '',
    sortOrder: initial?.sortOrder || 0,
    active: initial?.active ?? true,
  });
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pillarInfo: true,
    serviceDetails: true,
  });

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      ...form,
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      featuresAm: (form.featuresAm || '').split('\n').map((f) => f.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>{initial ? 'Edit Service' : 'New Service'}</Title>
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

          <CollapsibleSection label="Pillar Info" open={openSections.pillarInfo} onToggle={() => toggle('pillarInfo')}>
            {lang === 'en' ? (
              <>
                <TextInput label="Pillar Title" value={form.pillarTitle} onChange={(e) => set('pillarTitle', e.target.value)} required />
                <Textarea label="Pillar Description" value={form.pillarDescription} onChange={(e) => set('pillarDescription', e.target.value)} minRows={2} mt="sm" />
              </>
            ) : (
              <>
                <TextInput label="Pillar Title (Amharic)" value={form.pillarTitleAm || ''} onChange={(e) => set('pillarTitleAm', e.target.value)} />
                <Textarea label="Pillar Description (Amharic)" value={form.pillarDescriptionAm || ''} onChange={(e) => set('pillarDescriptionAm', e.target.value)} minRows={2} mt="sm" />
              </>
            )}
          </CollapsibleSection>

          <CollapsibleSection label="Service Details" open={openSections.serviceDetails} onToggle={() => toggle('serviceDetails')}>
            {lang === 'en' ? (
              <>
                <TextInput label="Title" value={form.title} onChange={(e) => set('title', e.target.value)} required />
                <Textarea label="Description" value={form.description} onChange={(e) => set('description', e.target.value)} required minRows={3} mt="sm" />
                <Textarea
                  label="Features (one per line)"
                  value={form.features}
                  onChange={(e) => set('features', e.target.value)}
                  minRows={4}
                  mt="sm"
                  description="Enter each feature on a new line"
                />
              </>
            ) : (
              <>
                <TextInput label="Title (Amharic)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.target.value)} />
                <Textarea label="Description (Amharic)" value={form.descriptionAm || ''} onChange={(e) => set('descriptionAm', e.target.value)} minRows={3} mt="sm" />
                <Textarea
                  label="Features (Amharic, one per line)"
                  value={form.featuresAm || ''}
                  onChange={(e) => set('featuresAm', e.target.value)}
                  minRows={4}
                  mt="sm"
                />
              </>
            )}
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <div className="border border-slate-200 rounded-md p-3">
            <div className="text-sm font-semibold text-slate-700 mb-2">Settings</div>
            <div className="space-y-3">
              <Select
                label="Pillar"
                value={form.pillarKey}
                onChange={(v) => set('pillarKey', v || 'infrastructure')}
                data={PILLARS}
                size="xs"
              />
              <TextInput
                label="Icon"
                value={form.icon}
                onChange={(e) => set('icon', e.target.value)}
                description="e.g. coffee, wheat, building"
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
