'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Group, Title, Text, Button, Table, Badge, Modal, Loader, Center, Stack,
  ActionIcon, Tooltip, Pagination, TextInput,
} from '@mantine/core';
import { useGetServicesQuery, useDeleteServiceMutation } from '@/lib/redux/api';

const PILLAR_COLORS: Record<string, string> = {
  agro: 'green', infrastructure: 'indigo', logistics: 'blue',
  digital: 'teal', hospitality: 'yellow',
};

const PAGE_SIZE = 10;

type SortField = 'title' | 'pillarKey' | 'active';
type SortDir = 'asc' | 'desc';

export default function AdminServicesPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const { data: services, isLoading, error } = useGetServicesQuery();
  const [deleteService, { isLoading: deleting }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteService(deleteId);
    setDeleteId(null);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  const filtered = useMemo(() => {
    if (!services) return [];
    let items = [...services];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s =>
        s.title.toLowerCase().includes(q) ||
        (s.pillarKey || '').toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortField === 'pillarKey') cmp = (a.pillarKey || '').localeCompare(b.pillarKey || '');
      else if (sortField === 'active') cmp = (a.active === b.active ? 0 : a.active ? -1 : 1);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [services, search, sortField, sortDir]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Services</Title>
          <Text size="sm" c="dimmed">Manage service offerings</Text>
        </div>
        <Button component={Link} href="/admin/services/new">New Service</Button>
      </Group>

      <TextInput
        placeholder="Search by title or pillar..."
        value={search}
        onChange={e => { setSearch(e.currentTarget.value); setPage(1); }}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load services</Text>}

      {services && services.length === 0 && !search && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No services yet</Text>
            <Button component={Link} href="/admin/services/new" variant="light" size="compact-sm">Create first service</Button>
          </Stack>
        </Center>
      )}

      {filtered.length === 0 && search && (
        <Center py="xl">
          <Text c="dimmed" size="sm">No services match &quot;{search}&quot;</Text>
        </Center>
      )}

      {filtered.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>#</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>Title{sortIcon('title')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('pillarKey')}>Pillar{sortIcon('pillarKey')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('active')}>Active{sortIcon('active')}</Table.Th>
                <Table.Th w={100}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.map((s, i) => (
                <Table.Tr key={s.id}>
                  <Table.Td><Text size="sm" c="dimmed">{(page - 1) * PAGE_SIZE + i + 1}</Text></Table.Td>
                  <Table.Td><Text size="sm" fw={500}>{s.title}</Text></Table.Td>
                  <Table.Td><Badge size="sm" color={PILLAR_COLORS[s.pillarKey] || 'gray'} variant="light">{s.pillarKey}</Badge></Table.Td>
                  <Table.Td><Badge size="sm" color={s.active ? 'green' : 'gray'}>{s.active ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon component={Link} href={`/admin/services/${s.id}`} variant="light" color="blue" size="sm">
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
          {filtered.length > PAGE_SIZE && (
            <Center mt="lg">
              <Pagination total={Math.ceil(filtered.length / PAGE_SIZE)} value={page} onChange={setPage} />
            </Center>
          )}
        </>
      )}

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Service" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this service?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
