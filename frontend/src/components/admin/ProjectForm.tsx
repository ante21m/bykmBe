'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Stack, Title,
  Paper, Text, ActionIcon, Tabs, Image, Box, SimpleGrid,
} from '@mantine/core';
import { useUploadFileMutation } from '@/lib/redux/api';
import type { ProjectFormData } from '@/lib/redux/api';
import { Upload } from 'lucide-react';
import { CollapsibleSection } from './FormControls';

interface Props {
  initial?: Partial<ProjectFormData> & { id?: string };
  onSave: (data: ProjectFormData) => Promise<void>;
  saving?: boolean;
  cancelPath?: string;
}

interface KpiRow {
  val: string;
  labelEn: string;
  labelAm: string;
}

function parseKpis(raw: string): KpiRow[] {
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map((k: any) => ({
      val: String(k.val ?? ''),
      labelEn: String(k.labelEn ?? ''),
      labelAm: String(k.labelAm ?? ''),
    }));
  } catch {
    return [];
  }
}

function serializeKpis(rows: KpiRow[]): string {
  const cleaned = rows.filter((r) => r.val || r.labelEn);
  return cleaned.length ? JSON.stringify(cleaned, null, 2) : '';
}

export default function ProjectForm({ initial, onSave, saving, cancelPath }: Props) {
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

  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    classification: true,
    client: false,
    dates: false,
    details: false,
    image: true,
    kpis: false,
  });
  const [kpiRows, setKpiRows] = useState<KpiRow[]>(() => parseKpis(form.kpis || ''));

  const toggle = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

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
    } catch { }
  };

  const updateKpi = (i: number, key: keyof KpiRow, val: string) => {
    setKpiRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [key]: val };
      set('kpis', serializeKpis(next));
      return next;
    });
  };

  const addKpi = () => {
    setKpiRows((prev) => {
      const next = [...prev, { val: '', labelEn: '', labelAm: '' }];
      set('kpis', serializeKpis(next));
      return next;
    });
  };

  const removeKpi = (i: number) => {
    setKpiRows((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      set('kpis', serializeKpis(next));
      return next;
    });
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
          {cancelPath && <Button component={Link} href={cancelPath} variant="default">Cancel</Button>}
          <Button type="submit" loading={saving}>Save</Button>
        </Group>
      </Group>

      <div className="flex gap-6 items-start flex-col lg:flex-row">
        <div className="flex-1 min-w-0 space-y-4">

          <Paper withBorder p="xs" className="sticky top-0 z-10 bg-white">
            <Tabs value={lang} onChange={(v) => v && setLang(v as 'en' | 'am')}>
              <Tabs.List grow>
                <Tabs.Tab value="en">English</Tabs.Tab>
                <Tabs.Tab value="am">Amharic</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Paper>

          <CollapsibleSection label="Basic Information" open={openSections.basic} onToggle={() => toggle('basic')}>
              <Stack gap="sm">
                {lang === 'en' ? (
                  <>
                    <TextInput
                      label="Title"
                      value={form.title}
                      onChange={(e) => set('title', e.target.value)}
                      required
                      placeholder="e.g. Addis Ababa Mega-Corridor Project"
                    />
                    <Textarea
                      label="Description"
                      value={form.description}
                      onChange={(e) => set('description', e.target.value)}
                      required
                      minRows={4}
                      placeholder="Detailed description of the project..."
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      label="Title (Amharic)"
                      value={form.titleAm || ''}
                      onChange={(e) => set('titleAm', e.target.value)}
                      placeholder="የፕሮጀክት ስም"
                    />
                    <Textarea
                      label="Description (Amharic)"
                      value={form.descAm || ''}
                      onChange={(e) => set('descAm', e.target.value)}
                      minRows={4}
                      placeholder="የፕሮጀክት መግለጫ"
                    />
                  </>
                )}
              </Stack>
          </CollapsibleSection>

          <CollapsibleSection label="Details" open={openSections.details} onToggle={() => toggle('details')}>
              <Stack gap="sm">
                {lang === 'en' ? (
                  <>
                    <Textarea label="Scope" value={form.scope || ''} onChange={(e) => set('scope', e.target.value)} minRows={3} placeholder="Project scope..." />
                    <Textarea label="Achievement" value={form.achievement || ''} onChange={(e) => set('achievement', e.target.value)} minRows={3} placeholder="Key achievements..." />
                    <Textarea label="Impact" value={form.impact || ''} onChange={(e) => set('impact', e.target.value)} minRows={3} placeholder="Project impact..." />
                  </>
                ) : (
                  <>
                    <Textarea label="Scope (Amharic)" value={form.scopeAm || ''} onChange={(e) => set('scopeAm', e.target.value)} minRows={3} />
                    <Textarea label="Achievement (Amharic)" value={form.achievAm || ''} onChange={(e) => set('achievAm', e.target.value)} minRows={3} />
                    <Textarea label="Impact (Amharic)" value={form.impactAm || ''} onChange={(e) => set('impactAm', e.target.value)} minRows={3} />
                  </>
                )}
              </Stack>
          </CollapsibleSection>

          <CollapsibleSection label="Client & Location" open={openSections.client} onToggle={() => toggle('client')}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {lang === 'en' ? (
                  <>
                    <TextInput label="Client" value={form.client || ''} onChange={(e) => set('client', e.target.value)} placeholder="Client name" />
                    <TextInput label="Location" value={form.location || ''} onChange={(e) => set('location', e.target.value)} placeholder="Project location" />
                  </>
                ) : (
                  <>
                    <TextInput label="Client (Amharic)" value={form.clientAm || ''} onChange={(e) => set('clientAm', e.target.value)} />
                    <TextInput label="Location (Amharic)" value={form.locationAm || ''} onChange={(e) => set('locationAm', e.target.value)} />
                  </>
                )}
              </SimpleGrid>
          </CollapsibleSection>

          <CollapsibleSection label="Image" open={openSections.image} onToggle={() => toggle('image')}>
              <Stack gap="sm">
                {form.imageUrl && (
                  <Box className="relative rounded overflow-hidden border border-slate-200">
                    <Image
                      src={form.imageUrl}
                      alt="Project image"
                      h={200}
                      fit="cover"
                      radius="sm"
                    />
                    <ActionIcon
                      className="absolute top-2 right-2"
                      color="red"
                      variant="filled"
                      size="sm"
                      onClick={() => set('imageUrl', '')}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </ActionIcon>
                  </Box>
                )}
                <Group gap="sm">
                  <Button
                    variant="light"
                    size="compact-sm"
                    onClick={() => fileRef.current?.click()}
                    loading={uploading}
                    leftSection={<Upload size={16} />}
                  >
                    {form.imageUrl ? 'Replace Image' : 'Upload Image'}
                  </Button>
                  <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  {form.imageUrl && (
                    <Text size="xs" c="dimmed" truncate maw={200}>
                      {form.imageUrl.split('/').pop()}
                    </Text>
                  )}
                </Group>
              </Stack>
          </CollapsibleSection>

          <CollapsibleSection label="KPIs" open={openSections.kpis} onToggle={() => toggle('kpis')}>
              <Stack gap="xs">
                {kpiRows.map((row, i) => (
                  <Group key={i} gap="xs" align="end">
                    <TextInput
                      label={i === 0 ? 'Value' : undefined}
                      placeholder="e.g. 20.5km"
                      value={row.val}
                      onChange={(e) => updateKpi(i, 'val', e.target.value)}
                      className="flex-1"
                      size="xs"
                    />
                    <TextInput
                      label={i === 0 ? 'Label (EN)' : undefined}
                      placeholder="e.g. Length"
                      value={row.labelEn}
                      onChange={(e) => updateKpi(i, 'labelEn', e.target.value)}
                      className="flex-1"
                      size="xs"
                    />
                    <TextInput
                      label={i === 0 ? 'Label (AM)' : undefined}
                      placeholder="የጅምላ"
                      value={row.labelAm}
                      onChange={(e) => updateKpi(i, 'labelAm', e.target.value)}
                      className="flex-1"
                      size="xs"
                    />
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      size="sm"
                      onClick={() => removeKpi(i)}
                      mb={i === 0 ? 1 : 0}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </ActionIcon>
                  </Group>
                ))}
                <Button variant="light" size="compact-xs" onClick={addKpi} mt="xs">
                  + Add KPI
                </Button>
              </Stack>
          </CollapsibleSection>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-20">
          <Paper withBorder p="md">
            <Text fw={600} size="sm" mb="sm" className="text-slate-700">Classification</Text>
            <Stack gap="sm">
              <Select
                label="Pillar"
                value={form.pillar}
                onChange={(v) => set('pillar', v || 'infrastructure')}
                data={[
                  { value: 'infrastructure', label: 'Infrastructure & Real Estate' },
                  { value: 'logistics', label: 'Global Trade & Logistics' },
                  { value: 'hospitality', label: 'Hospitality & Retail' },
                  { value: 'agro', label: 'Agro-Industrialization' },
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
              />
            </Stack>
          </Paper>

          <Paper withBorder p="md">
            <Text fw={600} size="sm" mb="sm" className="text-slate-700">Dates & Ordering</Text>
            <Stack gap="sm">
              <NumberInput
                label="Start Year"
                value={form.startYear || ''}
                onChange={(v) => set('startYear', typeof v === 'number' ? v : undefined)}
                min={1900} max={2100}
                placeholder="e.g. 2023"
              />
              <NumberInput
                label="End Year"
                value={form.endYear || ''}
                onChange={(v) => set('endYear', typeof v === 'number' ? v : undefined)}
                min={1900} max={2100}
                placeholder="e.g. 2025"
              />
              <NumberInput
                label="Sort Order"
                value={form.sortOrder || 0}
                onChange={(v) => set('sortOrder', typeof v === 'number' ? v : 0)}
                min={0}
              />
            </Stack>
          </Paper>

          {initial && (
            <Paper withBorder p="md" className="bg-slate-50">
              <Text fw={600} size="sm" mb="xs" className="text-slate-700">Quick Info</Text>
              <Text size="xs" c="dimmed">ID: {initial.title ? (initial as any).id || '—' : '—'}</Text>
            </Paper>
          )}
        </div>
      </div>
    </form>
  );
}
