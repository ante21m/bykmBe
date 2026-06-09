import type { Metadata } from 'next';
import AdminLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin — BYKM Trading PLC',
    default: 'Admin — BYKM Trading PLC',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
