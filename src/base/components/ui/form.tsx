/** biome-ignore-all lint/suspicious/noExplicitAny: this form depends a lot on runtime, not type level */
/** biome-ignore-all lint/correctness/noNestedComponentDefinitions: nested components declaration is needed for this form */

import { zodResolver } from '@hookform/resolvers/zod';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { InfoIcon } from 'lucide-react';
import * as React from 'react';
import {
  type DefaultValues,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseControllerReturn,
  type UseFormReturn,
  useController,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/base/components/ui/button';
import { Checkbox } from '@/base/components/ui/checkbox';
import { DatePicker } from '@/base/components/ui/date-picker';
import { DateRangePicker } from '@/base/components/ui/date-range-picker';
import { DateTimePicker } from '@/base/components/ui/date-time-picker';
import { DateTimeRangePicker } from '@/base/components/ui/date-time-range-picker';
import { Input } from '@/base/components/ui/input';
import { Label } from '@/base/components/ui/label';
import { PasswordInput } from '@/base/components/ui/password-input';
import { Select } from '@/base/components/ui/select';
import { Slider } from '@/base/components/ui/slider';
import { Switch } from '@/base/components/ui/switch';
import { Textarea } from '@/base/components/ui/textarea';
import { TimePicker } from '@/base/components/ui/time-picker';
import { TimeRangePicker } from '@/base/components/ui/time-range-picker';
import { cn } from '@/base/lib';
import { getTranslation, hasTranslationKey, withProps } from '@/base/utils';

import { AsyncSelect, type AsyncSelectProps } from './async-select';
import { ImageUploader } from './image-uploader';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp';

type FormFieldRenderFn<ControlCompProps> = (comps: {
  /**
   * The component that renders the label of the field
   */
  Label: (props: Omit<React.ComponentProps<typeof FormLabel>, 'children'>) => React.ReactElement;
  /**
   * The component that renders the control (input, picker, switch, select, ...) of the field
   */
  Control: (props: ControlCompProps) => React.ReactElement;
  /**
   * The component that renders the description of the field
   */
  Description: (props: React.ComponentProps<typeof FormDescription>) => React.ReactElement;
  /**
   * The component that renders the error/success messages of the field
   */
  Message: (props: React.ComponentProps<typeof FormMessage>) => React.ReactNode;
}) => React.ReactNode;

type FormFieldSpec<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
} & (
  | {
      type: 'text';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Input>>;
    }
  | {
      type: 'password';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof PasswordInput>>;
    }
  | {
      type: 'textarea';
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Textarea>>;
    }
  | {
      type: 'checkbox';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Checkbox>>;
    }
  | {
      type: 'date';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DatePicker>>;
    }
  | {
      type: 'date';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateRangePicker>>;
    }
  | {
      type: 'time';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof TimePicker>>;
    }
  | {
      type: 'time';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof TimeRangePicker>>;
    }
  | {
      type: 'datetime';
      range?: false;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateTimePicker>>;
    }
  | {
      type: 'datetime';
      range: true;
      placeholder?: string;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof DateTimeRangePicker>>;
    }
  | ({
      type: 'select';
      async?: false;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<
        Pick<React.ComponentProps<typeof Select>, 'className' | 'triggerClassName'>
      >;
    } & Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange'>)
  | ({
      type: 'select';
      async: true;
      onChange?: (value: string | string[]) => void;
      render?: FormFieldRenderFn<Pick<AsyncSelectProps<any>, 'className' | 'triggerClassName'>>;
    } & Omit<AsyncSelectProps<any>, 'value' | 'onChange'>)
  | {
      type: 'slider';
      step?: number;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Slider>>;
    }
  | {
      type: 'switch';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<React.ComponentProps<typeof Switch>>;
    }
  | {
      type: 'otp';
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<{
        inputProps?: Omit<React.ComponentProps<typeof InputOTP>, 'render' | 'maxLength'>;
        groupProps?: React.ComponentProps<typeof InputOTPGroup>;
        slotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>;
      }>;
    }
  | ({
      type: 'image';
      controlRender?: React.ComponentProps<typeof ImageUploader>['render'];
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */

      // biome-ignore lint/complexity/noBannedTypes: this needs to be any due to ImageUploader props
      render?: FormFieldRenderFn<{}>;
    } & Omit<React.ComponentProps<typeof ImageUploader>, 'images' | 'onImagesChange' | 'render'>)
  | {
      type: 'custom';
      controlRender: (
        props: UseControllerReturn & {
          form: UseFormReturn<FieldValues, any, FieldValues>;
          className?: string;
        }
      ) => React.ReactNode;
      /**
       * A custom render function for the form field.
       *
       * @default
       * ```tsx
       * ({ Control, Label, Description, Message }) => (
       *   <>
       *     <Label />
       *     <Control />
       *     <Description />
       *     <Message />
       *   </>
       * )
       * ```
       */
      render?: FormFieldRenderFn<{ className?: string }>;
    }
);

export interface FormProps<TFieldValues extends FieldValues, TTransformedValues> {
  schema: z.ZodType<TTransformedValues, TFieldValues>;
  fields: FormFieldSpec<TFieldValues>[];
  i18nNamespace?: string;
  onSuccessSubmit?: SubmitHandler<TTransformedValues>;
  onErrorSubmit?: SubmitErrorHandler<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  renderSubmitButton?: (
    Comp: (
      props: Omit<React.ComponentProps<typeof Button>, 'type' | 'loading' | 'disabled'>
    ) => React.ReactElement
  ) => React.ReactNode;
  className?: string;
  ref?: React.Ref<
    UseFormReturn<TFieldValues, any, TTransformedValues> & {
      submit: () => Promise<void>;
    }
  >;
  loading?: boolean;
}

/**
 * A generic form component for handling form state, validation, and submission using React Hook Form and Zod schema validation.
 *
 * For more information, see [`docs/form.md`](../../../../docs/form.md).
 */
function Form<TFieldValues extends FieldValues, TTransformedValues>({
  schema,
  fields,
  className,
  ref,
  defaultValues,
  i18nNamespace,
  onSuccessSubmit = () => {},
  onErrorSubmit,
  renderSubmitButton,
  loading,
}: FormProps<TFieldValues, TTransformedValues>) {
  const form = useForm({
    resolver: zodResolver(schema as z.ZodType<TTransformedValues, TFieldValues>),
    defaultValues: getDefaultValues(schema, defaultValues),
  });

  const SubmitButton = Button;

  React.useImperativeHandle(
    ref,
    () => ({
      ...form,
      submit: form.handleSubmit(onSuccessSubmit, onErrorSubmit),
    }),
    [form, onErrorSubmit, onSuccessSubmit]
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccessSubmit, onErrorSubmit)}
        className={cn('grid gap-4', className)}
      >
        {fields.map((formField) => {
          const Label = FormLabel;
          const Control = getFormControl(formField) as any;
          const Description = FormDescription;
          const Message = FormMessage;
          const isFieldRequired = !(
            ((schema.def as any).shape[formField.name] as unknown) instanceof z.ZodOptional
          );
          const description =
            formField.description ||
            hasTranslationKey(`${i18nNamespace}.fields.${formField.name}.description`)
              ? getTranslation(`${i18nNamespace}.fields.${formField.name}.description`)
              : null;

          return (
            <FormField key={formField.name} name={formField.name}>
              <FormItem i18nNamespace={i18nNamespace} className={formField.className}>
                {!formField.render ? (
                  <>
                    <Label required={isFieldRequired}>{formField.label}</Label>
                    <Control formField={formField} disabled={loading || formField.disabled} />

                    {description && <Description>{description}</Description>}
                    <Message />
                  </>
                ) : (
                  formField.render({
                    Label: withProps(Label, {
                      required: isFieldRequired,
                      children: formField.label,
                    }),
                    Control: withProps(Control as any, {
                      formField,
                      disabled: loading || formField.disabled,
                    }),
                    Description: (props) =>
                      description ? (
                        <Description {...props}>{description}</Description>
                      ) : (
                        // biome-ignore lint/complexity/noUselessFragments: this is needed for layout
                        <></>
                      ),
                    Message,
                  })
                )}
              </FormItem>
            </FormField>
          );
        })}
        {!renderSubmitButton ? (
          <SubmitButton type='submit' loading={loading}>
            {getTranslation(`${i18nNamespace}.submitButtonLabel`)}
          </SubmitButton>
        ) : (
          renderSubmitButton(withProps(SubmitButton, { type: 'submit', loading }))
        )}
      </form>
    </FormProvider>
  );
}

function getFormControl(formField: FormFieldSpec) {
  switch (formField.type) {
    case 'text':
      return TextFormControl;

    case 'password':
      return PasswordFormControl;

    case 'textarea':
      return TextareaFormControl;

    case 'checkbox':
      return CheckboxFormControl;

    case 'date':
      if (formField.range) {
        return DateRangeFormControl;
      }

      return DateFormControl;

    case 'time':
      if (formField.range) {
        return TimeRangeFormControl;
      }

      return TimeFormControl;

    case 'datetime':
      if (formField.range) {
        return DateTimeRangeFormControl;
      }

      return DateTimeFormControl;

    case 'select':
      if (formField.async) {
        return AsyncSelectFormControl;
      }

      return SelectFormControl;

    case 'slider':
      return SliderFormControl;

    case 'switch':
      return SwitchFormControl;

    case 'otp':
      return OtpFormControl;

    case 'image':
      return ImageFormControl;

    case 'custom':
      return CustomFormControl;
  }
}

function TextFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Input> & {
  formField: Extract<FormFieldSpec, { type: 'text' }>;
}) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <Input
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function PasswordFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof PasswordInput> & {
  formField: Extract<FormFieldSpec, { type: 'password' }>;
}) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <PasswordInput
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function TextareaFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  formField: Extract<FormFieldSpec, { type: 'textarea' }>;
}) {
  const form = useFormContext();
  const { i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <Textarea
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        {...form.register(formField.name)}
        {...props}
      />
    </FormControl>
  );
}

function CheckboxFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Checkbox> & {
  formField: Extract<FormFieldSpec, { type: 'checkbox' }>;
}) {
  const form = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: formField.name,
    control: form.control,
  });

  return (
    <FormControl>
      <Checkbox checked={value} onChange={onChange} {...props} />
    </FormControl>
  );
}

function DateRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DateRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'date'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <DateRangePicker
        dateRange={form.getValues(formField.name)}
        onDateRangeChange={(dateRange) =>
          form.setValue(formField.name, dateRange, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DatePicker> & {
  formField: Extract<FormFieldSpec, { type: 'date' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <DatePicker
        date={form.getValues(formField.name)}
        onDateChange={(date) =>
          form.setValue(formField.name, date, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function TimeRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof TimeRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'time'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const {
    field: { value: dateRange, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <TimeRangePicker
        dateRange={dateRange}
        onDateRangeChange={onChange}
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function TimeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof TimePicker> & {
  formField: Extract<FormFieldSpec, { type: 'time' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const {
    field: { value: date, onChange },
  } = useController({
    control: form.control,
    name: formField.name,
  });
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <TimePicker
        date={date}
        onDateChange={onChange}
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateTimeRangeFormControl({
  formField,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof DateTimeRangePicker> & {
  formField: Extract<FormFieldSpec, { type: 'datetime'; range: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <DateTimeRangePicker
        dateRange={form.getValues(formField.name)}
        onDateRangeChange={(dateRange) =>
          form.setValue(formField.name, dateRange, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function DateTimeFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof DateTimePicker>, 'date' | 'onDateChange'> & {
  formField: Extract<FormFieldSpec, { type: 'datetime' }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();
  const messageKey = `${i18nNamespace}.fields.${formField.name}.placeholder`;

  return (
    <FormControl>
      <DateTimePicker
        date={form.getValues(formField.name)}
        onDateChange={(date) =>
          form.setValue(formField.name, date, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        disabled={formField.disabled}
        placeholder={formField.placeholder ?? getTranslation(messageKey)}
        triggerClassName={cn(
          { 'ring-error/20! dark:ring-error/40! border-error!': !!error },
          triggerClassName
        )}
        {...props}
      />
    </FormControl>
  );
}

function AsyncSelectFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof AsyncSelect>, 'value' | 'onChange'> & {
  formField: Extract<FormFieldSpec, { type: 'select'; async: true }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();

  return (
    <AsyncSelect
      {...formField}
      value={form.getValues(formField.name)}
      onChange={(value: string | string[]) => {
        form.setValue(formField.name, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        formField.onChange?.(value);
      }}
      placeholder={
        formField.placeholder ??
        getTranslation(`${i18nNamespace}.fields.${formField.name}.placeholder`)
      }
      triggerClassName={cn(
        {
          'ring-error/20! dark:ring-error/40! border-error!': !!error,
        },
        triggerClassName
      )}
      {...props}
    />
  );
}

function SelectFormControl({
  formField,
  triggerClassName,
  ...props
}: Omit<React.ComponentProps<typeof Select>, 'options' | 'multiple' | 'value' | 'onChange'> & {
  formField: Extract<FormFieldSpec, { type: 'select'; async?: false }>;
}) {
  const form = useFormContext();
  const { error, i18nNamespace } = useFormField();

  return (
    // @ts-expect-error multiple is indeed optional in Select
    <Select
      {...formField}
      value={form.getValues(formField.name)}
      onChange={(value: string | string[]) =>
        form.setValue(formField.name, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
      }
      placeholder={
        formField.placeholder ??
        getTranslation(`${i18nNamespace}.fields.${formField.name}.placeholder`)
      }
      triggerClassName={cn(
        {
          'ring-error/20! dark:ring-error/40! border-error!': !!error,
        },
        triggerClassName
      )}
      {...props}
    />
  );
}

function SliderFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Slider> & {
  formField: Extract<FormFieldSpec, { type: 'slider' }>;
}) {
  const form = useFormContext();

  return (
    <FormControl>
      <Slider
        value={form.getValues(formField.name)}
        onValueChange={([value]) =>
          form.setValue(formField.name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        {...props}
      />
    </FormControl>
  );
}

function SwitchFormControl({
  formField,
  ...props
}: React.ComponentProps<typeof Switch> & {
  formField: Extract<FormFieldSpec, { type: 'switch' }>;
}) {
  const form = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: formField.name,
    control: form.control,
  });

  return (
    <FormControl>
      <Switch disabled={formField.disabled} checked={value} onCheckedChange={onChange} {...props} />
    </FormControl>
  );
}

function OtpFormControl({
  formField,
  inputProps = {},
  groupProps = {},
  slotProps = {},
}: {
  inputProps?: Omit<React.ComponentProps<typeof InputOTP>, 'render' | 'maxLength'>;
  groupProps?: React.ComponentProps<typeof InputOTPGroup>;
  slotProps?: Omit<React.ComponentProps<typeof InputOTPSlot>, 'index'>;
  formField: Extract<FormFieldSpec, { type: 'otp' }>;
}) {
  const form = useFormContext();
  const { className: inputClassName, ...otherInputProps } = inputProps;
  const { className: groupClassName, ...otherGroupProps } = groupProps;
  const { className: slotClassName, ...otherSlotProps } = slotProps;

  return (
    <FormControl>
      <InputOTP
        {...form.register(formField.name)}
        onChange={(value) =>
          form.setValue(formField.name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
        maxLength={6}
        className={inputClassName}
        {...otherInputProps}
      >
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={0} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={1} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={2} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={3} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={4} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
        <InputOTPGroup className={cn('aspect-square grow', groupClassName)} {...otherGroupProps}>
          <InputOTPSlot index={5} className={cn('size-full', slotClassName)} {...otherSlotProps} />
        </InputOTPGroup>
      </InputOTP>
    </FormControl>
  );
}

function ImageFormControl({ formField }: { formField: Extract<FormFieldSpec, { type: 'image' }> }) {
  const form = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: formField.name,
    control: form.control,
  });

  return (
    <FormControl>
      <ImageUploader
        {...formField}
        images={value}
        onImagesChange={onChange}
        render={formField.controlRender}
      />
    </FormControl>
  );
}

function CustomFormControl({
  formField,
  className,
}: {
  formField: Extract<FormFieldSpec, { type: 'custom' }>;
  className?: string;
}) {
  const form = useFormContext();
  const controller = useController({
    name: formField.name,
    control: form.control,
  });

  return <FormControl>{formField.controlRender({ ...controller, form, className })}</FormControl>;
}

function getDefaultValues<TFieldValues extends FieldValues, TTransformedValues>(
  schema: z.ZodType<TTransformedValues, TFieldValues>,
  defaultValues?: DefaultValues<TFieldValues>
) {
  const zodDefaults = Object.fromEntries(
    Object.entries((schema.def as any).shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) {
        return [key, value.def.defaultValue];
      }

      if (value instanceof z.ZodString) {
        return [key, ''];
      }

      if (value instanceof z.ZodBoolean) {
        return [key, false];
      }

      if (value instanceof z.ZodArray) {
        return [key, []];
      }

      return [key, undefined];
    })
  );

  return {
    ...zodDefaults,
    ...defaultValues,
  } as DefaultValues<TFieldValues>;
}

type InternalFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const InternalFormFieldContext = React.createContext<InternalFormFieldContextValue>(
  {} as InternalFormFieldContextValue
);

type InternalFormFieldProps<TFieldValues extends FieldValues = FieldValues> =
  React.PropsWithChildren<{
    name: FieldPath<TFieldValues>;
  }>;

function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  children,
}: InternalFormFieldProps<TFieldValues>) {
  return (
    <InternalFormFieldContext.Provider value={{ name }}>
      {children}
    </InternalFormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(InternalFormFieldContext);
  const itemContext = React.useContext(InternalFormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    i18nNamespace: itemContext.i18nNamespace,
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type InternalFormItemContextValue = {
  id: string;
  i18nNamespace?: string;
};

const InternalFormItemContext = React.createContext<InternalFormItemContextValue>(
  {} as InternalFormItemContextValue
);

function FormItem({
  className,
  i18nNamespace,
  ...props
}: React.ComponentProps<'div'> & { i18nNamespace?: string }) {
  const id = React.useId();

  return (
    <InternalFormItemContext.Provider value={{ id, i18nNamespace }}>
      <div data-slot='form-item' className={cn('grid gap-2', className)} {...props} />
    </InternalFormItemContext.Provider>
  );
}

function FormLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  const { error, formItemId, i18nNamespace, name } = useFormField();

  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      className={cn('data-[error=true]:text-error', className)}
      htmlFor={formItemId}
      {...props}
    >
      {children ?? getTranslation(`${i18nNamespace}.fields.${name}.label`)}
      {required && (
        <span className='text-error' aria-hidden>
          *
        </span>
      )}
    </Label>
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId, i18nNamespace, name } = useFormField();

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    >
      {children ?? getTranslation(`${i18nNamespace}.fields.${name}.description`)}
    </p>
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId, i18nNamespace, name } = useFormField();

  const i18nMessageKey = `${i18nNamespace}.fields.${name}.errors.${error?.type}`;
  let body: React.ReactNode;

  if (error) {
    body = hasTranslationKey(i18nMessageKey) ? getTranslation(i18nMessageKey) : error.message;
  } else body = props.children;

  if (!body) {
    return null;
  }

  return (
    <div className='flex items-center gap-2'>
      <InfoIcon className='text-error size-4' />
      <p
        data-slot='form-message'
        id={formMessageId}
        className={cn('text-error text-sm', className)}
        {...props}
      >
        {body}
      </p>
    </div>
  );
}

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
