'use client';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import {
  MantineProvider, AppShell, Group, Text, UnstyledButton, Stack, Divider,
} from '@mantine/core';
import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Building2, Info, Mail, LogOut, FolderKanban, ExternalLink, Newspaper, Home, Image, HelpCircle,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/home', label: 'Home', icon: Home },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/services', label: 'Services', icon: Building2 },
  { href: '/admin/about', label: 'About', icon: Info },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/unanswered-queries', label: 'Unanswered', icon: HelpCircle },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
];

function NavLink({ href, label, icon: Icon, pathname, exact }: { href: string; label: string; icon: any; pathname: string | null; exact?: boolean }) {
  const active = exact ? pathname === href : pathname?.startsWith(href);
  return (
    <UnstyledButton
      component={Link}
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 8,
        backgroundColor: active ? 'var(--mantine-color-blue-0)' : 'transparent',
        color: active ? 'var(--mantine-color-blue-7)' : 'var(--mantine-color-gray-7)',
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        transition: 'all 0.15s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e: any) => { if (!active) { e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'; }}}
      onMouseLeave={(e: any) => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; }}}
    >
      <Icon size={18} />
      <span>{label}</span>
    </UnstyledButton>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin') return;
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin');
    }
  }, [pathname, router]);

  if (pathname === '/admin') {
    return <MantineProvider>{children}</MantineProvider>;
  }

  return (
    <MantineProvider>
      <AppShell
        navbar={{ width: 240, breakpoint: 0 }}
        padding="lg"
        styles={{
          main: { backgroundColor: 'var(--mantine-color-gray-0)', minHeight: '100vh' },
        }}
      >
        <AppShell.Navbar p="md" style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}>
          <Stack justify="space-between" h="100%">
            <div>
              <Group gap={10} mb="xl" px={8}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-bykm.jpg" alt="BYKM" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
                <div>
                  <Text size="sm" fw={700} lh={1.2}>BYKM Admin</Text>
                  <Text size="xs" c="dimmed" lh={1.2}>Management Portal</Text>
                </div>
              </Group>

              <Divider mb="sm" />

              <NavLink href="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} pathname={pathname} exact />

              <div style={{ height: 8 }} />

              <Stack gap={2}>
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.href} {...item} pathname={pathname} />
                ))}
              </Stack>
            </div>

            <div>
              <Divider mb="sm" />

              <UnstyledButton
                component="a"
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 16px', borderRadius: 8, width: '100%',
                  color: 'var(--mantine-color-gray-6)', fontSize: 14, textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e: any) => { e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'; e.currentTarget.style.color = 'var(--mantine-color-blue-6)'; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--mantine-color-gray-6)'; }}
              >
                <ExternalLink size={18} />
                <span>View Website</span>
              </UnstyledButton>

              <UnstyledButton
                onClick={() => { localStorage.removeItem('admin_token'); router.push('/admin'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 16px', borderRadius: 8, width: '100%',
                  color: 'var(--mantine-color-gray-6)', fontSize: 14,
                  transition: 'all 0.15s ease', marginTop: 2,
                }}
                onMouseEnter={(e: any) => { e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'; e.currentTarget.style.color = 'var(--mantine-color-red-6)'; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--mantine-color-gray-6)'; }}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </UnstyledButton>
            </div>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
