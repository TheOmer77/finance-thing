import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme='light'
    className='toaster group'
    toastOptions={{
      classNames: {
        toast: `toast group group-[.toaster]:border-border
group-[.toaster]:bg-background group-[.toaster]:text-sm
group-[.toaster]:text-foreground group-[.toaster]:shadow-lg`,
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }}
    {...props}
  />
);
