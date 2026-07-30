'use client';

import { useRouter } from 'next/navigation';
import TeamForm from '@/components/admin/TeamForm';
import { useCreateTeamMemberMutation } from '@/lib/redux/api';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [createMember, { isLoading }] = useCreateTeamMemberMutation();

  const handleSave = async (data: any) => {
    await createMember(data).unwrap();
    router.push('/admin/team');
  };

  return <TeamForm onSave={handleSave} saving={isLoading} cancelPath="/admin/team" />;
}
