import { Button } from '@/components/ui/Button';
import { SignOutButton } from '@clerk/nextjs';

const DashboardPage = () => {
  return (
    <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
      <h1 className='mb-2 text-3xl font-bold tracking-tight'>Dashboard</h1>
      <p>You shouldn&apos;t be here unless you&apos;re authenticated.</p>
      <Button asChild className='mt-4'>
        <SignOutButton />
      </Button>
    </div>
  );
};

export default DashboardPage;
