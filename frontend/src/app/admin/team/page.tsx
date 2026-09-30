'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Group, Title, Text, Button, Table, Badge, Modal, Loader, Center, Stack, ActionIcon, Tooltip,
} from '@mantine/core';
import { useGetTeamMembersQuery, useDeleteTeamMemberMutation } from '@/lib/redux/api';

export default function AdminTeamPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: members, isLoading, error } = useGetTeamMembersQuery();
  const [deleteMember, { isLoading: deleting }] = useDeleteTeamMemberMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMember(deleteId);
    setDeleteId(null);
  };

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Team</Title>
          <Text size="sm" c="dimmed">Manage team members</Text>
        </div>
        <Button component={Link} href="/admin/team/new">New Member</Button>
      </Group>

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load team members</Text>}

      {members && members.length === 0 && (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <Text c="dimmed" size="sm">No team members yet</Text>
            <Button component={Link} href="/admin/team/new" variant="light" size="compact-sm">Add first member</Button>
          </Stack>
        </Center>
      )}

      {members && members.length > 0 && (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>#</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Active</Table.Th>
              <Table.Th w={100}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {members.map((m, i) => (
              <Table.Tr key={m.id}>
                <Table.Td><Text size="sm" c="dimmed">{i + 1}</Text></Table.Td>
                <Table.Td><Text size="sm" fw={500}>{m.nameEn}</Text></Table.Td>
                <Table.Td><Text size="xs" c="dimmed">{m.titleEn}</Text></Table.Td>
                <Table.Td><Badge size="sm" color={m.category === 'founder' ? 'yellow' : 'blue'}>{m.category}</Badge></Table.Td>
                <Table.Td><Badge size="sm" color={m.active ? 'green' : 'gray'}>{m.active ? 'Active' : 'Inactive'}</Badge></Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip label="Edit">
                      <ActionIcon component={Link} href={`/admin/team/${m.id}`} variant="light" color="blue" size="sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <ActionIcon variant="light" color="red" size="sm" onClick={() => setDeleteId(m.id)}>
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

      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Member" centered>
        <Text size="sm" mb="md">Are you sure you want to delete this team member?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="red" loading={deleting} onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
}
