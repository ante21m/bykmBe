'use client';

import '@mantine/core/styles.css';
import {
  MantineProvider,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Center,
  Box,
  Anchor,
  Divider,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/lib/redux/api';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ username, password }).unwrap();
      localStorage.setItem('admin_token', res.token);
      router.replace('/admin/dashboard');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <MantineProvider>
      <Center mih="100vh" bg="#f5f4ef">
        <Paper shadow="md" p="xl" withBorder miw={400} maw={440}>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Box ta="center">
                <img
                  src="/images/logo-bykm.jpg"
                  alt="BYKM Trading PLC"
                  style={{ height: 52, marginBottom: 16, objectFit: 'contain' }}
                />
                <Title order={3}>Official Administrator Portal</Title>
                <Text size="sm" c="dimmed" mt={4}>
                  BYKM Trading PLC
                </Text>
              </Box>

              <Text size="xs" ta="center" c="dimmed" px="md">
                This portal is for authorized BYKM Trading PLC staff only.
                Unauthorized access is prohibited.
              </Text>

              <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Text size="xs" c="red">
                  {error}
                </Text>
              )}
              <Button type="submit" loading={isLoading} fullWidth color="dark">
                Sign In
              </Button>

              <Divider />

              <Text size="xs" c="dimmed" ta="center">
                Contact:{' '}
                <Anchor href="mailto:support@bykmgroup.com" size="xs">
                  support@bykmgroup.com
                </Anchor>
              </Text>

              <Text size="xs" c="dimmed" ta="center">
                <Anchor href="https://bykmgroup.com" size="xs" target="_blank" rel="noopener noreferrer">
                  Back to Main Website
                </Anchor>
                {' · '}
                <Anchor href="/privacy" size="xs">
                  Privacy Policy
                </Anchor>
                {' · '}
                <Anchor href="/terms" size="xs">
                  Terms of Service
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Center>
    </MantineProvider>
  );
}
