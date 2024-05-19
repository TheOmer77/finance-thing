import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='grid min-h-dvh w-full flex-col place-items-center'>
      <SignUp path='/signup' />
    </div>
  );
};

export default SignUpPage;
