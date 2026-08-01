'use client';

import { useState } from 'react';
import {
  TextInput, Textarea, Button, Group, Stack, Switch, Select, NumberInput, Divider, ActionIcon, Tooltip, FileInput, Text,
} from '@mantine/core';
import Link from 'next/link';
import { Upload, Trash2 } from 'lucide-react';
import { useUploadFileMutation } from '@/lib/redux/api';

interface EducationItem { degree: string; institution: string; year?: string; description?: string }
interface ExperienceItem { role: string; organization: string; startYear?: string; endYear?: string; description?: string }
interface CertificateItem { name: string; issuer: string; year?: string; url?: string }
interface AwardItem { title: string; year?: string; description?: string }

interface FormData {
  nameEn: string; nameAm?: string;
  titleEn: string; titleAm?: string;
  descEn: string; descAm?: string;
  imageUrl?: string; category?: string;
  active?: boolean; sortOrder?: number;
  linkedinUrl?: string; email?: string;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  certificates?: CertificateItem[];
  awards?: AwardItem[];
}

export default function TeamForm({ initial, onSave, saving, cancelPath }: { initial?: Partial<FormData>; onSave: (data: any) => void; saving: boolean; cancelPath?: string }) {
  const [form, setForm] = useState<FormData>({
    nameEn: '', nameAm: '', titleEn: '', titleAm: '', descEn: '', descAm: '',
    imageUrl: '', category: 'leadership', active: true, sortOrder: 0,
    linkedinUrl: '', email: '', education: [], experience: [], certificates: [], awards: [],
    ...initial,
  });
  const [uploadFile] = useUploadFileMutation();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const set = (key: keyof FormData, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadFile(formData).unwrap();
      set('imageUrl', result.url);
    } catch (err: any) {
      setUploadError(
        err?.status === 401
          ? 'Session expired. Please sign out and log in again, then retry the upload.'
          : `Upload failed${err?.status ? ` (${err.status})` : ''}. Please try again.`,
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  type ArrayField = 'education' | 'experience' | 'certificates' | 'awards';

  const addItem = (field: ArrayField) => {
    const empty: Record<ArrayField, any> = {
      education: { degree: '', institution: '', year: '', description: '' },
      experience: { role: '', organization: '', startYear: '', endYear: '', description: '' },
      certificates: { name: '', issuer: '', year: '', url: '' },
      awards: { title: '', year: '', description: '' },
    };
    set(field, [...(form[field] || []), empty[field]]);
  };

  const removeItem = (field: ArrayField, index: number) => {
    set(field, (form[field] || []).filter((_, i) => i !== index));
  };

  const updateItem = (field: ArrayField, index: number, key: string, value: string) => {
    const items = [...(form[field] || [])];
    items[index] = { ...items[index], [key]: value };
    set(field, items);
  };

  const renderArraySection = (
    field: ArrayField,
    title: string,
    fields: { key: string; label: string; type?: 'text' | 'textarea' }[],
  ) => (
    <Stack gap="sm">
      <Group justify="space-between">
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mantine-color-gray-7)' }}>{title}</span>
        <Button size="compact-xs" variant="light" onClick={() => addItem(field)}>Add</Button>
      </Group>
      {(form[field] || []).map((item, i) => (
        <Group key={i} gap="xs" align="flex-start" wrap="nowrap" style={{ border: '1px solid var(--mantine-color-gray-2)', padding: 8, borderRadius: 4 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {fields.map((f) => (
              f.type === 'textarea' ? (
                <Textarea key={f.key} size="xs" label={f.label} value={(item as any)[f.key] || ''} onChange={(e) => updateItem(field, i, f.key, e.currentTarget.value)} autosize minRows={1} maxRows={3} />
              ) : (
                <TextInput key={f.key} size="xs" label={f.label} value={(item as any)[f.key] || ''} onChange={(e) => updateItem(field, i, f.key, e.currentTarget.value)} />
              )
            ))}
          </div>
          <Tooltip label="Remove">
            <ActionIcon color="red" variant="light" size="sm" onClick={() => removeItem(field, i)} style={{ marginTop: 18 }}><Trash2 size={14} /></ActionIcon>
          </Tooltip>
        </Group>
      ))}
    </Stack>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <Group gap="md" align="flex-start" grow>
          <TextInput label="Name (English)" required value={form.nameEn} onChange={(e) => set('nameEn', e.currentTarget.value)} />
          <TextInput label="Name (Amharic)" value={form.nameAm || ''} onChange={(e) => set('nameAm', e.currentTarget.value)} />
        </Group>

        <Group gap="md" align="flex-start" grow>
          <TextInput label="Title (English)" required value={form.titleEn} onChange={(e) => set('titleEn', e.currentTarget.value)} />
          <TextInput label="Title (Amharic)" value={form.titleAm || ''} onChange={(e) => set('titleAm', e.currentTarget.value)} />
        </Group>

        <Group gap="md" align="flex-start" grow>
          <Textarea label="Description (English)" value={form.descEn} onChange={(e) => set('descEn', e.currentTarget.value)} autosize minRows={3} />
          <Textarea label="Description (Amharic) (Optional)" value={form.descAm || ''} onChange={(e) => set('descAm', e.currentTarget.value)} autosize minRows={3} />
        </Group>

        <Divider label="Details" labelPosition="center" />

        <Group gap="md" align="flex-start" grow>
          <FileInput label="Image" accept="image/*" onChange={handleImageUpload} clearable leftSection={<Upload size={16} />} />
          {form.imageUrl && <TextInput label="Image URL" value={form.imageUrl} onChange={(e) => set('imageUrl', e.currentTarget.value)} />}
        </Group>
        {uploadError && <Text c="red" size="xs">{uploadError}</Text>}

        <Group gap="md" align="flex-start" grow>
          <Select label="Category" data={['founder', 'leadership']} value={form.category || 'leadership'} onChange={(v) => set('category', v || 'leadership')} />
          <NumberInput label="Sort Order" value={form.sortOrder ?? 0} onChange={(v) => set('sortOrder', typeof v === 'string' ? parseInt(v) || 0 : v)} min={0} />
          <Switch label="Active" checked={form.active ?? true} onChange={(e) => set('active', e.currentTarget.checked)} mt={24} />
        </Group>

        <Group gap="md" align="flex-start" grow>
          <TextInput label="LinkedIn URL" value={form.linkedinUrl || ''} onChange={(e) => set('linkedinUrl', e.currentTarget.value)} />
          <TextInput label="Email" value={form.email || ''} onChange={(e) => set('email', e.currentTarget.value)} />
        </Group>

        <Divider label="Profile Sections" labelPosition="center" />

        {renderArraySection('education', 'Education', [
          { key: 'degree', label: 'Degree' },
          { key: 'institution', label: 'Institution' },
          { key: 'year', label: 'Year' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ])}

        {renderArraySection('experience', 'Experience', [
          { key: 'role', label: 'Role' },
          { key: 'organization', label: 'Organization' },
          { key: 'startYear', label: 'Start Year' },
          { key: 'endYear', label: 'End Year' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ])}

        {renderArraySection('certificates', 'Certificates', [
          { key: 'name', label: 'Name' },
          { key: 'issuer', label: 'Issuer' },
          { key: 'year', label: 'Year' },
          { key: 'url', label: 'URL' },
        ])}

        {renderArraySection('awards', 'Awards', [
          { key: 'title', label: 'Title' },
          { key: 'year', label: 'Year' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ])}

        <Group justify="flex-end" mt="md">
          {cancelPath && <Button component={Link} href={cancelPath} variant="default">Cancel</Button>}
          <Button type="submit" loading={saving}>{initial ? 'Update' : 'Create'} Member</Button>
        </Group>
      </Stack>
    </form>
  );
}
