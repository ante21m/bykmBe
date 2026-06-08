'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Group,
  Title,
  Text,
  Button,
  Table,
  Badge,
  Select,
  Modal,
  Loader,
  Center,
  Stack,
  ActionIcon,
  Tooltip,
  Pagination,
  TextInput,
} from '@mantine/core';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/lib/redux/api';

const PILLAR_COLORS: Record<string, string> = {
  agro: 'green',
  infrastructure: 'indigo',
  logistics: 'blue',
  digital: 'teal',
  hospitality: 'yellow',
};

const STATUS_COLORS: Record<string, string> = {
  completed: 'green',
  active: 'yellow',
  pipeline: 'blue',
};

const PAGE_SIZE = 10;

type SortField = 'title' | 'pillar' | 'status';
type SortDir = 'asc' | 'desc';

export default function AdminProjectsPage() {
  const [page, setPage] = useState(1);
  const [pillarFilter, setPillarFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const { data: projects, isLoading, error } = useGetProjectsQuery(
    pillarFilter || statusFilter
      ? { pillar: pillarFilter || undefined, status: statusFilter || undefined }
      : undefined,
  );
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProject(deleteId);
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
    if (!projects) return [];
    let items = [...projects];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.client || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortField === 'pillar') cmp = a.pillar.localeCompare(b.pillar);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [projects, search, sortField, sortDir]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Projects</Title>
          <Text size="sm" c="dimmed">Manage your project portfolio</Text>
        </div>
        <Button component={Link} href="/admin/projects/new">
          New Project
        </Button>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Search by title, client, or location..."
          value={search}
          onChange={e => { setSearch(e.currentTarget.value); setPage(1); }}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <Select
          placeholder="All Pillars"
          value={pillarFilter}
          onChange={(v) => { setPillarFilter(v); setPage(1); }}
          clearable
          data={[
            { value: 'agro', label: 'Agro-Industrialization' },
            { value: 'infrastructure', label: 'Infrastructure' },
            { value: 'logistics', label: 'Global Trade & Logistics' },
            { value: 'digital', label: 'Digital Economy' },
            { value: 'hospitality', label: 'Hospitality & Retail' },
          ]}
          w={220}
        />
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(v) => { setStatusFilter(v); setPage(1); }}
          clearable
          data={[
            { value: 'completed', label: 'Completed' },
            { value: 'active', label: 'Active' },
            { value: 'pipeline', label: 'Pipeline' },
          ]}
          w={160}
        />
      </Group>

      {isLoading && (
        <Center py="xl">
          <Loader />
        </Center>
      )}

      {error && (
        <Text c="red" size="sm">Failed to load projects</Text>
      )}

      {projects && projects.length === 0 && !search && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No projects yet</Text>
            <Button component={Link} href="/admin/projects/new" variant="light" size="compact-sm">
              Create your first project
            </Button>
          </Stack>
        </Center>
      )}

      {filtered.length === 0 && search && (
        <Center py="xl">
          <Text c="dimmed" size="sm">No projects match &quot;{search}&quot;</Text>
        </Center>
      )}

      {filtered.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>#</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>Title{sortIcon('title')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('pillar')}>Pillar{sortIcon('pillar')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('status')}>Status{sortIcon('status')}</Table.Th>
                <Table.Th w={120}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.map((p, i) => (
                <Table.Tr key={p.id}>
                  <Table.Td>
                    <Text size="sm" c="dimmed">{(page - 1) * PAGE_SIZE + i + 1}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>{p.title}</Text>
                      {p.featured && <Badge size="xs" variant="light" color="yellow">Featured</Badge>}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="sm" color={PILLAR_COLORS[p.pillar] || 'gray'} variant="light">
                      {p.pillar}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="sm" color={STATUS_COLORS[p.status] || 'gray'}>
                      {p.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon
                          component={Link}
                          href={`/admin/projects/${p.id}`}
                          variant="light"
                          color="blue"
                          size="sm"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => setDeleteId(p.id)}
                        >
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

      <Modal
        opened={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Project"
        centered
      >
        <Text size="sm" mb="md">Are you sure you want to delete this project? This action cannot be undone.</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
