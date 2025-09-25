import KycClient from '@/app/(dashboard)/kyc/KycClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function KYCPage() {
  return <KycClient />;
}
