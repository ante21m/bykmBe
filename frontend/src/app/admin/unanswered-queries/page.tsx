'use client';

import { useState } from 'react';
import {
  Group, Title, Text, Table, Badge, Modal, Loader,
  Center, Stack, Button, ActionIcon, Tooltip, Pagination,
} from '@mantine/core';
import { useGetUnansweredQueriesQuery, useDeleteUnansweredQueryMutation } from '@/lib/redux/api';

const PAGE_SIZE = 15;

export default function AdminUnansweredQueriesPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading, error } = useGetUnansweredQueriesQuery({ page, limit: PAGE_SIZE });
  const [deleteQuery, { isLoading: deleting }] = useDeleteUnansweredQueryMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteQuery(deleteId);
    setDeleteId(null);
  };

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Unanswered Queries</Title>
          <Text size="sm" c="dimmed">Chat queries that the assistant could not answer</Text>
        </div>
      </Group>

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load queries</Text>}

      {data && data.data.length === 0 && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No unanswered queries</Text>
            <Text c="dimmed" size="xs">All chat queries are being answered by the assistant.</Text>
          </Stack>
        </Center>
      )}

      {data && data.data.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>#</Table.Th>
                <Table.Th>Query</Table.Th>
                <Table.Th w={80}>Lang</Table.Th>
                <Table.Th w={180}>Date</Table.Th>
                <Table.Th w={80}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.data.map((q, i) => (
                <Table.Tr key={q.id}>
                  <Table.Td><Text size="sm" c="dimmed">{(page - 1) * PAGE_SIZE + i + 1}</Text></Table.Td>
                  <Table.Td><Text size="sm" maw={400} lineClamp={2}>{q.query}</Text></Table.Td>
                  <Table.Td>
                    <Badge size="sm" color={q.lang === 'am' ? 'teal' : 'blue'} variant="light">
                      {q.lang === 'am' ? 'አማ' : 'EN'}
                    </Badge>
                  </Table.Td>
                  <Table.Td><Text size="sm" c="dimmed">{new Date(q.createdAt).toLocaleString()}</Text></Table.Td>
                  <Table.Td>
                    <Tooltip label="Delete">
                      <ActionIcon variant="light" color="red" size="sm" onClick={() => setDeleteId(q.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </ActionIcon>
                    </Tooltip>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {data.total > PAGE_SIZE && (
            <Center mt="lg">
              <Pagination total={Math.ceil(data.total / PAGE_SIZE)} value={page} onChange={setPage} />
            </Center>
          )}
          <Text size="xs" c="dimmed" mt="sm">{data.total} total queries</Text>
        </>
      )}

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Query" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this query?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
