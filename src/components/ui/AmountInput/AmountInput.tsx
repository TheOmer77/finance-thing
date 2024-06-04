import { forwardRef, useState, type ElementRef } from 'react';
import CurrencyInput, {
  type CurrencyInputProps,
} from 'react-currency-input-field';
import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

export type AmountInputProps = Omit<
  CurrencyInputProps,
  'value' | 'onChange'
> & {
  value?: number;
  onChange?: (value?: number) => void;
};

export const AmountInput = forwardRef<
  ElementRef<typeof CurrencyInput>,
  AmountInputProps
>(({ value, onChange, prefix = '$', className, ...props }, ref) => {
  const [inputValue, setInputValue] = useState(
    value ? value.toString() : '0.00'
  );

  const isIncome = typeof value === 'number' && value > 0,
    isExpense = typeof value === 'number' && value < 0;

  const handleChange: CurrencyInputProps['onValueChange'] = (
    inputValue,
    _,
    values
  ) => {
    if (!inputValue) {
      setInputValue('0');
      return onChange?.(0);
    }
    setInputValue(inputValue);
    if (typeof values?.float === 'number' && !inputValue?.endsWith('.'))
      onChange?.(values?.float);
  };

  const handleReverseValue = () => {
    if (typeof value !== 'number') return;
    onChange?.(value * -1);
    setInputValue((value * -1).toFixed(2));
  };

  return (
    <div className='relative'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              size='icon'
              variant={
                isIncome ? 'primary' : isExpense ? 'destructive' : 'outline'
              }
              className='absolute start-1 top-1 size-8'
              onClick={handleReverseValue}
            >
              <InfoIcon className={cn('size-4', value && 'hidden')} />
              <PlusCircleIcon className={cn('size-4', !isIncome && 'hidden')} />
              <MinusCircleIcon
                className={cn('size-4', !isExpense && 'hidden')}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expenses.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input asChild>
        <CurrencyInput
          {...props}
          ref={ref}
          prefix={prefix}
          value={inputValue}
          onValueChange={handleChange}
          decimalScale={2}
          decimalsLimit={2}
          step={0.01}
          className={cn('ps-11', className)}
        />
      </Input>
    </div>
  );
});
AmountInput.displayName = 'AmountInput';
