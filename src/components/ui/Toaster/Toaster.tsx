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
group-[.toaster]:text-foreground group-[.toaster]:shadow-lg
group-[.toaster]:data-[type=error]:text-destructive
group-[.toaster]:data-[type=error]:bg-gradient-to-t
group-[.toaster]:data-[type=error]:from-destructive/5
group-[.toaster]:data-[type=error]:to-destructive/5
group-[.toaster]:data-[type=error]:border-destructive/15`,
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
