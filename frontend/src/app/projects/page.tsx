import type { Metadata } from 'next';
import { ProjectsClient } from './ProjectsClient';

const TITLE = 'Projects — BYKM Trading PLC';
const DESC = 'Flagship projects and initiatives across all five strategic pillars driving Ethiopia\'s industrial transformation.';
const OG_IMAGE = { url: '/images/logo-bykm.jpg', width: 600, height: 600, alt: 'BYKM Trading PLC' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/images/logo-bykm.jpg'],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
