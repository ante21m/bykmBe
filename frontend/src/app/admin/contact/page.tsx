'use client';

import { useState, useMemo } from 'react';
import {
  Group, Title, Text, Badge, Table, Select, Loader, Center, Stack, Card, SimpleGrid, Pagination, TextInput,
} from '@mantine/core';
import { useGetContactSubmissionsQuery, useUpdateContactStatusMutation } from '@/lib/redux/api';

const STATUS_COLORS: Record<string, string> = {
  pending: 'yellow', read: 'blue', replied: 'green', archived: 'gray',
};

const INQUIRY_COLORS: Record<string, string> = {
  partnership: 'violet', construction: 'orange', trade: 'cyan', careers: 'pink', general: 'gray',
};

const PAGE_SIZE = 15;

type SortField = 'name' | 'email' | 'inquiryType' | 'subject' | 'status' | 'createdAt';
type SortDir = 'asc' | 'desc';

export default function AdminContactPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const { data, isLoading, error } = useGetContactSubmissionsQuery({ page, limit: PAGE_SIZE, status: statusFilter || undefined });
  const [updateStatus] = useUpdateContactStatusMutation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const submissions = data?.data || [];
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  const handleStatusChange = (id: string, status: string | null) => {
    if (status) updateStatus({ id, status });
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
    let items = [...submissions];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        (s.organization || '').toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      else if (sortField === 'email') cmp = a.email.localeCompare(b.email);
      else if (sortField === 'inquiryType') cmp = a.inquiryType.localeCompare(b.inquiryType);
      else if (sortField === 'subject') cmp = a.subject.localeCompare(b.subject);
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortField === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [submissions, search, sortField, sortDir]);

  return (
    <>
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Contact Submissions</Title>
          <Text size="sm" c="dimmed">{data?.total || 0} total submissions</Text>
        </div>
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(v) => { setStatusFilter(v); setPage(1); }}
          clearable
          data={[
            { value: 'pending', label: 'Pending' },
            { value: 'read', label: 'Read' },
            { value: 'replied', label: 'Replied' },
            { value: 'archived', label: 'Archived' },
          ]}
          w={160}
        />
      </Group>

      <TextInput
        placeholder="Search by name, email, subject, or organization..."
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        mb="md"
        style={{ maxWidth: 400 }}
      />

      {isLoading && <Center py="xl"><Loader /></Center>}
      {error && <Text c="red" size="sm">Failed to load submissions</Text>}

      {filtered.length === 0 && !isLoading && (
        <Center py="xl"><Text c="dimmed" size="sm">No submissions found</Text></Center>
      )}

      {filtered.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>Name{sortIcon('name')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('email')}>Email{sortIcon('email')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('inquiryType')}>Type{sortIcon('inquiryType')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('subject')}>Subject{sortIcon('subject')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('status')}>Status{sortIcon('status')}</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => toggleSort('createdAt')}>Date{sortIcon('createdAt')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filtered.map((s) => (
                <>
                  <Table.Tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                    <Table.Td><Text size="sm" fw={500}>{s.firstName} {s.lastName}</Text></Table.Td>
                    <Table.Td><Text size="sm">{s.email}</Text></Table.Td>
                    <Table.Td><Badge size="sm" color={INQUIRY_COLORS[s.inquiryType] || 'gray'} variant="light">{s.inquiryType}</Badge></Table.Td>
                    <Table.Td><Text size="sm" lineClamp={1} maw={200}>{s.subject}</Text></Table.Td>
                    <Table.Td>
                      <Select
                        size="xs"
                        value={s.status}
                        onChange={(v) => handleStatusChange(s.id, v)}
                        data={[
                          { value: 'pending', label: 'Pending' },
                          { value: 'read', label: 'Read' },
                          { value: 'replied', label: 'Replied' },
                          { value: 'archived', label: 'Archived' },
                        ]}
                        w={110}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">{new Date(s.createdAt).toLocaleDateString()}</Text></Table.Td>
                  </Table.Tr>
                  {expanded === s.id && (
                    <Table.Tr>
                      <Table.Td colSpan={6}>
                        <Card withBorder p="sm" bg="gray.0">
                          <Text size="sm" fw={600} mb={4}>Message:</Text>
                          <Text size="sm" mb="sm">{s.message}</Text>
                          <SimpleGrid cols={3} spacing="xs">
                            {s.phone && <Text size="xs" c="dimmed">Phone: {s.phone}</Text>}
                            {s.organization && <Text size="xs" c="dimmed">Org: {s.organization}</Text>}
                            {s.country && <Text size="xs" c="dimmed">Country: {s.country}</Text>}
                          </SimpleGrid>
                        </Card>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </>
              ))}
            </Table.Tbody>
          </Table>

          {totalPages > 1 && (
            <Center mt="lg">
              <Pagination total={totalPages} value={page} onChange={setPage} />
            </Center>
          )}
        </>
      )}
    </>
  );
}
