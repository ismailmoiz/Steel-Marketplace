import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-[#D85A30] border-[#D85A30] text-white hover:bg-[#993C1D] hover:border-[#993C1D]',
  secondary: 'bg-transparent border-[rgba(0,0,0,0.18)] text-[#5A574F] hover:bg-[#F0EDE8] hover:text-[#1A1917]',
  danger:    'bg-[#A32D2D] border-[#A32D2D] text-white hover:bg-[#7a1f1f]',
  ghost:     'bg-transparent border-transparent text-[#5A574F] hover:bg-[#F0EDE8]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[11px]',
  md: 'px-3.5 py-[7px] text-[12px]',
  lg: 'px-5 py-2.5 text-[13px]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'font-condensed font-bold tracking-[0.06em] uppercase rounded-md border transition-all duration-150 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </span>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
