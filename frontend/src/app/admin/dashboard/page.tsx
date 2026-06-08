'use client';

import {
  Group, Title, Text, Paper, SimpleGrid, Grid, Table, Badge,
  Loader, Center, Stack,
} from '@mantine/core';
import { useGetProjectsQuery, useGetServicesQuery, useGetAboutSectionsQuery, useGetNewsQuery, useGetContactSubmissionsQuery, useGetContactStatsQuery } from '@/lib/redux/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#228be6', '#40c057', '#fab005', '#fa5252', '#7950f2', '#fd7e14', '#12b886'];

const PILLAR_COLORS: Record<string, string> = {
  agro: '#40c057',
  infrastructure: '#228be6',
  logistics: '#fab005',
  digital: '#7950f2',
  hospitality: '#fd7e14',
};

export default function AdminDashboardPage() {
  const { data: projects, isLoading: loadP } = useGetProjectsQuery();
  const { data: services, isLoading: loadS } = useGetServicesQuery();
  const { data: about, isLoading: loadA } = useGetAboutSectionsQuery();
  const { data: news, isLoading: loadN } = useGetNewsQuery();
  const { data: contactRes, isLoading: loadC } = useGetContactSubmissionsQuery({ limit: 5 });
  const { data: contactStats, isLoading: loadCS } = useGetContactStatsQuery();

  const loading = loadP || loadS || loadA || loadN || loadC || loadCS;

  if (loading) {
    return <Center py={80}><Loader size="lg" /></Center>;
  }

  const totalProjects = projects?.length || 0;
  const totalServices = services?.length || 0;
  const totalAbout = about?.length || 0;
  const totalNews = news?.length || 0;
  const totalContacts = contactStats ? Object.values(contactStats).reduce((a, b) => a + b, 0) : 0;

  const projectsByPillar = projects
    ? Object.entries(
        projects.reduce<Record<string, number>>((acc, p) => {
          acc[p.pillar] = (acc[p.pillar] || 0) + 1;
          return acc;
        }, {}),
      ).map(([name, value]) => ({ name, value }))
    : [];

  const projectsByStatus = projects
    ? Object.entries(
        projects.reduce<Record<string, number>>((acc, p) => {
          const label = p.status === 'ongoing' ? 'Ongoing' : p.status === 'completed' ? 'Completed' : p.status === 'planned' ? 'Planned' : p.status;
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        }, {}),
      ).map(([name, value]) => ({ name, value }))
    : [];

  const newsActive = news?.filter(n => n.active).length || 0;
  const newsInactive = news?.filter(n => !n.active).length || 0;
  const servicesActive = services?.filter(s => s.active).length || 0;
  const servicesInactive = services?.filter(s => !s.active).length || 0;

  const contactByStatus = contactStats
    ? Object.entries(contactStats).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
    : [];

  const recentContacts = contactRes?.data?.slice(0, 5) || [];

  return (
    <>
      <Title order={2} mb="xs">Dashboard</Title>
      <Text size="sm" c="dimmed" mb="lg">Overview of your site content and activity</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} mb="xl">
        <Paper withBorder p="md" radius="md">
          <Text size="xs" tt="uppercase" c="dimmed" fw={600}>Projects</Text>
          <Text size="28px" fw={700} mt={4}>{totalProjects}</Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" tt="uppercase" c="dimmed" fw={600}>Services</Text>
          <Text size="28px" fw={700} mt={4}>{totalServices}</Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" tt="uppercase" c="dimmed" fw={600}>News</Text>
          <Text size="28px" fw={700} mt={4}>{totalNews}</Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" tt="uppercase" c="dimmed" fw={600}>About Sections</Text>
          <Text size="28px" fw={700} mt={4}>{totalAbout}</Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text size="xs" tt="uppercase" c="dimmed" fw={600}>Contact Submissions</Text>
          <Text size="28px" fw={700} mt={4}>{totalContacts}</Text>
        </Paper>
      </SimpleGrid>

      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Text size="sm" fw={600} mb="md">Projects by Pillar</Text>
            {projectsByPillar.length === 0 ? (
              <Text size="xs" c="dimmed">No project data</Text>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={projectsByPillar} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name }) => name}>
                    {projectsByPillar.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Text size="sm" fw={600} mb="md">Projects by Status</Text>
            {projectsByStatus.length === 0 ? (
              <Text size="xs" c="dimmed">No project data</Text>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={projectsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#228be6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Text size="sm" fw={600} mb="md">Contact Submissions by Status</Text>
            {contactByStatus.length === 0 ? (
              <Text size="xs" c="dimmed">No contact data</Text>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={contactByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#40c057" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Text size="sm" fw={600} mb="md">Content Activity</Text>
            {(news || services) ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={[
                  { name: 'News', Active: newsActive, Inactive: newsInactive },
                  { name: 'Services', Active: servicesActive, Inactive: servicesInactive },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="Active" fill="#40c057" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Inactive" fill="#fa5252" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Text size="xs" c="dimmed">No data</Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>

      {recentContacts.length > 0 && (
        <Paper withBorder p="md" radius="md">
          <Text size="sm" fw={600} mb="md">Recent Contact Submissions</Text>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentContacts.map((c) => (
                <Table.Tr key={c.id}>
                  <Table.Td><Text size="sm">{c.firstName} {c.lastName}</Text></Table.Td>
                  <Table.Td><Text size="xs" c="dimmed">{c.email}</Text></Table.Td>
                  <Table.Td>
                    <Badge size="sm" variant="light" color="blue">{c.inquiryType}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="sm" color={c.status === 'pending' ? 'yellow' : c.status === 'read' ? 'blue' : c.status === 'replied' ? 'green' : 'gray'}>
                      {c.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td><Text size="xs" c="dimmed">{new Date(c.createdAt).toLocaleDateString()}</Text></Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      )}
    </>
  );
}
