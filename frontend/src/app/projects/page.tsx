import type { Metadata } from 'next';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects — BYKM Trading PLC',
  description:
    'Explore BYKM Trading PLC\'s portfolio of infrastructure, agro-industrial, global trade, and multi-sectoral projects driving Ethiopia\'s industrial transformation.',
  openGraph: {
    title: 'Projects — BYKM Trading PLC',
    description: 'Flagship projects and initiatives across all five strategic pillars.',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
