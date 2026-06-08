'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Group, Title, Text, Button, Table, Badge, Modal, Loader, Center, Stack,
  ActionIcon, Tooltip, TextInput,
} from '@mantine/core';
import { useGetAboutSectionsQuery, useDeleteAboutSectionMutation } from '@/lib/redux/api';

type SortField = 'sectionKey' | 'title' | 'active';
type SortDir = 'asc' | 'desc';

export default function AdminAboutPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('sectionKey');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const { data: sections, isLoading, error } = useGetAboutSectionsQuery();
  const [deleteSection, { isLoading: deleting }] = useDeleteAboutSectionMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteSection(deleteId);
    setDeleteId(null);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  const filtered = useMemo(() => {
    if (!sections) return [];
    let items = [...sections];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.sectionKey.toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'sectionKey') cmp = a.sectionKey.localeCompare(b.sectionKey);
      else if (sortField === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortField === 'active') cmp = (a.active === b.active ? 0 : a.active ? -1 : 1);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [sections, search, sortField, sortDir]);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>About Sections</Title>
          <Text size="sm" c="dimmed">Manage about page content sections</Text>
        </div>
        <Button component={Link} href="/admin/about/new">New Section</Button>
      </Group>

      <TextInput
        placeholder="Search by title or key..."
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load sections</Text>}

      {sections && sections.length === 0 && !search && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No sections yet</Text>
            <Button component={Link} href="/admin/about/new" variant="light" size="compact-sm">Create first section</Button>
          </Stack>
        </Center>
      )}

      {filtered.length === 0 && search && (
        <Center py="xl">
          <Text c="dimmed" size="sm">No sections match &quot;{search}&quot;</Text>
        </Center>
      )}

      {filtered.length > 0 && (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>#</Table.Th>
              <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('sectionKey')}>Key{sortIcon('sectionKey')}</Table.Th>
              <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>Title (EN){sortIcon('title')}</Table.Th>
              <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('active')}>Active{sortIcon('active')}</Table.Th>
              <Table.Th w={100}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((s, i) => (
              <Table.Tr key={s.id}>
                <Table.Td><Text size="sm" c="dimmed">{i + 1}</Text></Table.Td>
                <Table.Td><Badge size="sm" variant="light">{s.sectionKey}</Badge></Table.Td>
                <Table.Td><Text size="sm">{s.title}</Text></Table.Td>
                <Table.Td><Badge size="sm" color={s.active ? 'green' : 'gray'}>{s.active ? 'Active' : 'Inactive'}</Badge></Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip label="Edit">
                      <ActionIcon component={Link} href={`/admin/about/${s.id}`} variant="light" color="blue" size="sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <ActionIcon variant="light" color="red" size="sm" onClick={() => setDeleteId(s.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Section" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this section?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
