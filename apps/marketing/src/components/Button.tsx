import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-body font-medium transition-colors duration-400 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-brand-black text-white border border-brand-black hover:bg-pure-black',
        accent: 'bg-brand-teal text-brand-black border border-brand-teal hover:bg-[#5de8c0]',
        outline: 'bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-white',
        'underline-link': 'bg-transparent text-brand-black underline underline-offset-4 decoration-brand-black hover:decoration-dark-gray p-0 border-0',
      },
      size: {
        default: 'text-[18px] py-4 px-8 rounded',
        sm: 'text-[15px] py-2.5 px-6 rounded',
        lg: 'text-[18px] py-4 px-8 rounded',
        link: 'text-[16px] py-0 px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
