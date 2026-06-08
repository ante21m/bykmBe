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
      <Center mih="100vh" bg="gray.0">
        <Paper shadow="sm" p="xl" withBorder miw={360}>
          <form onSubmit={handleSubmit}>
            <Stack>
              <div>
                <Title order={3}>Admin</Title>
                <Text size="sm" c="dimmed">BYKM Trading PLC</Text>
              </div>
              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <Text size="xs" c="red">{error}</Text>}
              <Button type="submit" loading={isLoading} fullWidth>
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Center>
    </MantineProvider>
  );
}
