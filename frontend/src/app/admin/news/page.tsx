'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Group, Title, Text, Button, Table, Badge, Modal, Loader,
  Center, Stack, ActionIcon, Tooltip, Pagination, TextInput,
} from '@mantine/core';
import { useGetNewsQuery, useDeleteNewsMutation } from '@/lib/redux/api';

const PAGE_SIZE = 10;

type SortField = 'title' | 'author';
type SortDir = 'asc' | 'desc';

export default function AdminNewsPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const { data: news, isLoading, error } = useGetNewsQuery();
  const [deleteNews, { isLoading: deleting }] = useDeleteNewsMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteNews(deleteId);
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
    if (!news) return [];
    let items = [...news];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(n =>
        n.title.toLowerCase().includes(q) ||
        (n.author || '').toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortField === 'author') cmp = (a.author || '').localeCompare(b.author || '');
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [news, search, sortField, sortDir]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>News</Title>
          <Text size="sm" c="dimmed">Manage news articles</Text>
        </div>
        <Button component={Link} href="/admin/news/new">New Article</Button>
      </Group>

      <TextInput
        placeholder="Search by title or author..."
        value={search}
        onChange={e => { setSearch(e.currentTarget.value); setPage(1); }}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load news</Text>}

      {news && news.length === 0 && !search && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No news articles yet</Text>
            <Button component={Link} href="/admin/news/new" variant="light" size="compact-sm">Write first article</Button>
          </Stack>
        </Center>
      )}

      {filtered.length === 0 && search && (
        <Center py="xl">
          <Text c="dimmed" size="sm">No articles match &quot;{search}&quot;</Text>
        </Center>
      )}

      {filtered.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>#</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>Title{sortIcon('title')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('author')}>Author{sortIcon('author')}</Table.Th>
                <Table.Th>Active</Table.Th>
                <Table.Th w={100}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.map((n, i) => (
                <Table.Tr key={n.id}>
                  <Table.Td><Text size="sm" c="dimmed">{(page - 1) * PAGE_SIZE + i + 1}</Text></Table.Td>
                  <Table.Td><Text size="sm" fw={500} lineClamp={1} maw={250}>{n.title}</Text></Table.Td>
                  <Table.Td><Text size="xs" c="dimmed">{n.author || '—'}</Text></Table.Td>
                  <Table.Td><Badge size="sm" color={n.active ? 'green' : 'gray'}>{n.active ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon component={Link} href={`/admin/news/${n.id}`} variant="light" color="blue" size="sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon variant="light" color="red" size="sm" onClick={() => setDeleteId(n.id)}>
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

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Article" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this article?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
