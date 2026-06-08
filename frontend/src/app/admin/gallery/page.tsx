'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Group, Title, Text, Button, Table, Badge, Modal, Loader,
  Center, Stack, ActionIcon, Tooltip, Pagination, TextInput,
} from '@mantine/core';
import { useGetGalleryQuery, useDeleteGalleryMutation } from '@/lib/redux/api';

const PAGE_SIZE = 10;

export default function AdminGalleryPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { data: gallery, isLoading, error } = useGetGalleryQuery();
  const [deleteGallery, { isLoading: deleting }] = useDeleteGalleryMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteGallery(deleteId);
    setDeleteId(null);
  };

  const filtered = useMemo(() => {
    if (!gallery) return [];
    let items = [...gallery];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(g =>
        g.title.toLowerCase().includes(q)
      );
    }
    return items;
  }, [gallery, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Gallery</Title>
          <Text size="sm" c="dimmed">Manage gallery items</Text>
        </div>
        <Button component={Link} href="/admin/gallery/new">New Item</Button>
      </Group>

      <TextInput
        placeholder="Search by title..."
        value={search}
        onChange={e => { setSearch(e.currentTarget.value); setPage(1); }}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load gallery</Text>}

      {gallery && gallery.length === 0 && !search && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No gallery items yet</Text>
            <Button component={Link} href="/admin/gallery/new" variant="light" size="compact-sm">Add first item</Button>
          </Stack>
        </Center>
      )}

      {filtered.length === 0 && search && (
        <Center py="xl">
          <Text c="dimmed" size="sm">No items match &quot;{search}&quot;</Text>
        </Center>
      )}

      {filtered.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>#</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Featured</Table.Th>
                <Table.Th>Active</Table.Th>
                <Table.Th w={100}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.map((g, i) => (
                <Table.Tr key={g.id}>
                  <Table.Td><Text size="sm" c="dimmed">{(page - 1) * PAGE_SIZE + i + 1}</Text></Table.Td>
                  <Table.Td><Text size="sm" fw={500} lineClamp={1} maw={250}>{g.title}</Text></Table.Td>
                  <Table.Td>
                    {g.imageUrl ? (
                      <Badge size="sm" color="blue" variant="light">Has Image</Badge>
                    ) : (
                      <Text size="xs" c="dimmed">—</Text>
                    )}
                  </Table.Td>
                  <Table.Td><Badge size="sm" color={g.featured ? 'yellow' : 'gray'}>{g.featured ? 'Featured' : '—'}</Badge></Table.Td>
                  <Table.Td><Badge size="sm" color={g.active ? 'green' : 'gray'}>{g.active ? 'Active' : 'Inactive'}</Badge></Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon component={Link} href={`/admin/gallery/${g.id}`} variant="light" color="blue" size="sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon variant="light" color="red" size="sm" onClick={() => setDeleteId(g.id)}>
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

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Gallery Item" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this item?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
