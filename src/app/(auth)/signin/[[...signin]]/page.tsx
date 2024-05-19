import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='grid min-h-dvh w-full flex-col place-items-center'>
      <SignIn path='/signin' />
    </div>
  );
};

export default SignInPage;
