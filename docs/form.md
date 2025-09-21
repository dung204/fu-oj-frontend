# The `<Form />` Component

## Tables of contents

- [1. Introduction](#1-introduction)
- [2. Basic Usage](#2-basic-usage)
- [3. Props](#3-props)
- [4. Form field](#4-form-field)
  - [4.1. Form field definition](#41-form-field-definition)
  - [4.2. Field controls](#42-field-controls)
    - [4.2.1. Available field control types](#421-available-field-control-types)
    - [4.2.2. Adding new field control types](#422-adding-new-field-control-types)
- [5. Custom rendering](#5-custom-rendering)
  - [5.1. Form field](#51-form-field)
  - [5.2. Submit button](#52-submit-button)
  - [5.3. Custom control rendering for `custom` field type](#53-custom-control-rendering-for-custom-field-type)
- [6. Using refs with `<Form />`](#6-using-refs-with-form)
- [7. Inferring types](#7-inferring-types)
  - [7.1. Inferring the type for the form props](#71-inferring-the-type-for-the-form-props)
  - [7.2. Inferring the type for the ref of the form](#72-inferring-the-type-for-the-ref-of-the-form)
- [8. Internationalization (i18n)](#8-internationalization-i18n)

## 1. Introduction

This component is based on the `<Form>` component and its subcomponents from <a href="https://ui.shadcn.com/docs/components/form" target="_blank">shadcn/ui</a>. However, it is rewritten to simplify the code.

From this:

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/base/components/ui/form";
import { PasswordInput } from "@/base/components/ui/password-input";
import { authService } from "@/modules/auth/services";
import { LoginSchema, loginSchema } from "@/modules/auth/types";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: triggerLogin, isPending } = useMutation({
    mutationFn: (payload: LoginSchema) => authService.login(payload),
    onSuccess: async ({ data }) => {
      await axios.post("/api/auth/set-cookie", { data });
      onLoginSuccess?.();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
```

to this:

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Form } from "@/base/components/ui/form";
import { authService } from "@/modules/auth/services";
import { LoginSchema, loginSchema } from "@/modules/auth/types";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { mutateAsync: triggerLogin, isPending } = useMutation({
    mutationFn: (payload: LoginSchema) => authService.login(payload),
    onSuccess: async ({ data }) => {
      await axios.post("/api/auth/set-cookie", { data });
      onLoginSuccess?.();
    },
  });

  return (
    <Form
      className="flex flex-col gap-6"
      i18nNamespace="modules.auth.components.LoginForm"
      schema={loginSchema}
      fields={[
        { name: "email", type: "text", disabled: isPending },
        {
          name: "password",
          type: "password",
          disabled: isPending,
        },
      ]}
      renderSubmitButton={(Button) => <Button>Login</Button>}
      onSuccessSubmit={(data) => triggerLogin(data)}
    />
  );
}
```

## 2. Basic Usage

1. Import the component:

```tsx
import { Form } from "@/base/components/ui/form";
```

2. Define the Zod schema for the form:

```tsx
import { z } from "zod";

// ...

<Form
  schema={z.object({
    email: z.string().nonempty().email(),
    password: z.string().nonempty(),
  })}
/>;
```

3. Define the fields for the form:

```tsx
<Form
  // ...
  fields={[
    {
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
    },
  ]}
/>
```

4. Since this is a login form, let's change the submit button to "Login":

```tsx
<Form
  // ...
  renderSubmitButton={(Button) => <Button>Login</Button>}
/>
```

5. Finally, add the `onSuccessSubmit` prop to handle the form submission:

```tsx
<Form
  // ...
  onSuccessSubmit={(data) => {
    // Handle form submission
    console.log('Form submitted:', data);
  }}
```

## 3. Props

`<Form>` is a component with generic types. It accepts two following type arguments:

| Type name            | Description                                                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TFieldValues`       | The type of the field values in the form. This is usually an object with keys corresponding to the field names and values corresponding to the field values. For example, if the form has fields for "email" and "password", the type would be `{ email: string; password: string }`. |
| `TTransformedValues` | The type of form values after being validated & transformed by Zod. This type is equivalent to `z.infer<TFieldValues>`                                                                                                                                                                |

Those two type arguments will be inferred automatically from the `schema` prop, so you don't need to specify them manually.

The following table lists the props that `<Form />` accepts:

| Prop                 | Type                                                         | Description                                                                                                                                                                                                                    | Required | Default                               |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------- |
| `schema`             | `ZodType<TTransformedValues, TFieldValues>`                  | The Zod schema for the form. This is used to infer the fields used in the form & validate the form values before submission.                                                                                                   | ✅       | N/A                                   |
| `fields`             | `FormFieldSpec<TFieldValues>[]`                              | The specification of the fields in the form. This is an array of objects, each object is a detailed description of the fields.                                                                                                 | ✅       | N/A                                   |
| `i18nNamespace`      | `string`                                                     | The namespace for the i18n messages used in the form. This is used to group the i18n messages for the form fields. See [8.2. Using `i18nNamespace` prop of `<Form />`](#82-using-i18nnamespace-prop-of-form) for more details. | ❌       | N/A                                   |
| `onSuccessSubmit`    | `(data: TTransformedValues) => unknown`                      | The function to call when the form is successfully submitted (successfully validated by React Hook Form & Zod). This function receives the form values (already validated & transformed by Zod) as an argument.                | ❌       | `() => {}`                            |
| `onErrorSubmit`      | `(data: TTransformedValues) => unknown`                      | The function to call when the form submission fails (validation fails). This function receives the form errors as an argument.                                                                                                 | ❌       | `() => {}`                            |
| `defaultValues`      | `(Button: (props) => React.ReactElement) => React.ReactNode` | A object containing the default values for the form fields. Not every fields need to be defined here, the fields that are not defined will be initialized with the default value of their types.                               | ❌       | N/A                                   |
| `renderSubmitButton` | `DefaultValues<TFieldValues>`                                | A function that receives the submit button component as an argument and returns a React node. This is used to customize the submit button in the form.                                                                         | ❌       | `(Button) => <Button>Submit</Button>` |

## 4. Form field

### 4.1. Form field definition

A form field definition is an object that describes a field in the form. It contains the following properties:

| Prop            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Required |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`          | `string`   | A string denotes the name of the field, inferred from the Zod `schema`. You can use the IntelliSense feature of your IDE to find the correct name.                                                                                                                                                                                                                                                                                                                                                        | ✅       |
| `type`          | `string`   | The type for the control of the field. This is used to determine which control to render for the field. The available types are: `select`, `textarea`, `time`, `image`, `switch`, `text`, `checkbox`, `slider`, `custom`, `date`, `password`, `datetime`, `otp`. See [4.2.1. Available field control types](#421-available-field-control-types) for the components used for each available type, [4.2.2. Adding new control types](#422-adding-new-field-control-types) for how to add new control types. | ✅       |
| `label`         | `string`   | The label of the field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ❌       |
| `description`   | `string`   | The description of the field                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ❌       |
| `placeholder`   | `string`   | The placeholder of the field. Placeholder is **NOT available** for these types: `checkbox`, `switch`, `slider`                                                                                                                                                                                                                                                                                                                                                                                            | ❌       |
| `className`     | `string`   | The TailwindCSS class name for the container of the field                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ❌       |
| `render`        | `function` | A function that receives an object of all the components of the fields as an argument and returns a `React.ReactNode`. This is used to customize the rendering of the field.                                                                                                                                                                                                                                                                                                                              | ❌       |
| `controlRender` | `function` | The function returns a `React.ReactNode`. This is used to customize the rendering of the control component. Available to `custom` type only.                                                                                                                                                                                                                                                                                                                                                              | ❌       |
| `range`         | `boolean`  | Indicates whether the field value is a range (an object containing two properties: `from` and `to`) or not. Available to these types only: `date`, `time`, `datetime`                                                                                                                                                                                                                                                                                                                                     | ❌       |
| `async`         | `boolean`  | Available to `select` type only. This indicates whether the select options are loaded asynchronously or not.                                                                                                                                                                                                                                                                                                                                                                                              | ❌       |
| `multiple`      | `boolean`  | Indicates whether the field value is an array of scalar values or not. Available to `select` type only.                                                                                                                                                                                                                                                                                                                                                                                                   | ❌       |

> ⚠️**Note**: The above table is not exhaustive, since each control type has its own set of properties (not all props of that control will be available). Be sure to check the documentation of each control type for more details.

### 4.2. Field controls

#### 4.2.1. Available field control types

The following table lists the available types and their corresponding components used:

| Type       | Range?  | Multiple?        | Async?  | Component/JSX used                                                                |
| ---------- | ------- | ---------------- | ------- | --------------------------------------------------------------------------------- |
| `text`     | N/A     | N/A              | N/A     | [`<Input type="text" />`](../src/base/components/ui/input.tsx)                    |
| `password` | N/A     | N/A              | N/A     | [`<PasswordInput />`](../src/base/components/ui/password-input.tsx)               |
| `textarea` | N/A     | N/A              | N/A     | [`<Textarea />`](../src/base/components/ui/textarea.tsx)                          |
| `checkbox` | N/A     | N/A              | N/A     | [`<Checkbox />`](../src/base/components/ui/checkbox.tsx)                          |
| `date`     | `false` | N/A              | N/A     | [`<DatePicker />`](../src/base/components/ui/date-picker.tsx)                     |
| `date`     | `true`  | N/A              | N/A     | [`<DateRangePicker />`](../src/base/components/ui/date-range-picker.tsx)          |
| `time`     | `false` | N/A              | N/A     | [`<TimePicker />`](../src/base/components/ui/time-picker.tsx)                     |
| `time`     | `true`  | N/A              | N/A     | [`<TimeRangePicker />`](../src/base/components/ui/time-range-picker.tsx)          |
| `datetime` | `false` | N/A              | N/A     | [`<DateTimePicker />`](../src/base/components/ui/date-time-picker.tsx)            |
| `datetime` | `true`  | N/A              | N/A     | [`<DateTimeRangePicker />`](../src/base/components/ui/date-time-range-picker.tsx) |
| `select`   | N/A     | `true` & `false` | `false` | [`<Select />`](../src/base/components/ui/select.tsx)                              |
| `select`   | N/A     | `true` & `false` | `true`  | [`<AsyncSelect />`](../src/base/components/ui/async.tsx)                          |
| `slider`   | N/A     | N/A              | N/A     | [`<Slider />`](../src/base/components/ui/slider.tsx)                              |
| `switch`   | N/A     | N/A              | N/A     | [`<Switch />`](../src/base/components/ui/switch.tsx)                              |
| `checkbox` | N/A     | N/A              | N/A     | [`<Checkbox />`](../src/base/components/ui/checkbox.tsx)                          |
| `image`    | N/A     | `true` & `false` | N/A     | [`<ImageUploader />`](../src/base/components/ui/image-uploader.tsx)               |
| `otp`      | N/A     | N/A              | N/A     | [`<InputOTP />`](../src/base/components/ui/input-otp.tsx)                         |
| `custom`   | N/A     | N/A              | N/A     | N/A. Use `controlRender` to render the control                                    |

#### 4.2.2. Adding new field control types

To add a new field control type, you need to do the following steps:

1. Define your new control component. For example, let's say we want to add a `rating` control type:

```tsx
// src/base/components/ui/rating-input.tsx
import { Rating } from "@/base/components/ui/rating";

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingInput({ value, onChange, disabled }: RatingInputProps) {
  return <Rating value={value} onValueChange={onChange} disabled={disabled} />;
}
```

> Make sure the component has a prop for the value (in this case, `value`), a prop for the change handler (in this case, `onChange`), and any other necessary props (like `disabled`).

2. Update the `FormFieldSpec` type to include the new control type:

````tsx
// src/base/components/ui/form.tsx
import { RatingInput } from "@/base/components/ui/rating-input";

// ...

type FormFieldSpec<TFieldValues extends FieldValues = FieldValues> = {
  // Other field types...
  | {
      type: 'rating';
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
      render?: FormFieldRenderFn<React.ComponentProps<typeof RatingInput>>;
    }
}
````

3. Define a component that renders the control, and bind React Hook Form to it:

```tsx
// src/base/components/ui/form.tsx
import { useFormContext, useController } from "react-hook-form";

// ...

function RatingFormControl({
  formField,
}: {
  formField: Extract<FormFieldSpec, { type: "rating" }>;
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
      <RatingInput
        {...formField}
        images={value}
        onImagesChange={onChange}
        render={formField.controlRender}
      />
    </FormControl>
  );
}
```

4. Go to the `getFormControl()` function and add a case for the new control type:

```tsx
// src/base/components/ui/form.tsx
function getFormControl(formField: FormFieldSpec) {
  switch (formField.type) {
    // Other cases...
    case "rating":
      return RatingFormControl;
  }
}
```

## 5. Custom rendering

### 5.1. Form field

The `render` prop of [a field definition](#41-form-field-definition) is a function that receives an object containing all the components of the field as an argument and returns a `React.ReactNode`. The complete type of the `render` prop is as follows:

```tsx
type FormFieldRenderFn<ControlCompProps> = (comps: {
  /**
   * The component that renders the label of the field
   */
  Label: (
    props: Omit<React.ComponentProps<typeof InternalFormLabel>, "children">,
  ) => React.ReactElement;
  /**
   * The component that renders the control (input, picker, switch, select, ...) of the field
   */
  Control: (props: ControlCompProps) => React.ReactElement;
  /**
   * The component that renders the description of the field
   */
  Description: (props: React.ComponentProps<typeof InternalFormDescription>) => React.ReactElement;
  /**
   * The component that renders the error/success messages of the field
   */
  Message: (props: React.ComponentProps<typeof InternalFormMessage>) => React.ReactNode;
}) => React.ReactNode;
```

By default, a field is rendered like this (assuming the field is of type `text`):

```tsx
({ Label, Control, Description, Message }) => (
  <>
    <Label />
    <Control />
    <Description />
    <Message />
  </>
);
```

> ⚠️**Note**: There are some field type requires control before label, e.g. `checkbox`, `switch`, `slider`.

The following example shows how to customize the rendering of a field, description & message is omitted for simplicity:

```tsx
import { z } from "zod";
import { Form } from "@/base/components/ui/form";

// ...

<Form
  schema={z.object({ email: z.email() })}
  fields={[
    {
      name: "email",
      type: "text",
      render: ({ Label, Control, Description, Message }) => (
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-gray-700" />
          <Control />
        </div>
      ),
    },
  ]}
/>;
```

### 5.2. Submit button

The `renderSubmitButton` prop of `<Form>` is a function that receives the submit button component as an argument and returns a `React.ReactNode`. The complete type of the `renderSubmitButton` prop is as follows:

```tsx
type RenderSubmitButton = (
  Button: (props: React.ComponentProps<typeof Button>) => React.ReactElement,
) => React.ReactNode;
```

The following example shows how to customize the rendering of the submit button:

```tsx
<Form
  renderSubmitButton={(Button) => (
    <Button className="bg-blue-500 text-white hover:bg-blue-600">Login</Button>
  )}
/>
```

### 5.3. Custom control rendering for `custom` field type

The `controlRender` prop is a function that accepts the [`form` context - the results returned from `useForm()` hook of React Hook Form](https://react-hook-form.com/docs/useform) and results returned from the [`useController()` hook of React Hook Form](https://react-hook-form.com/docs/usecontroller), and returns a `React.ReactNode`. This is used to customize the rendering of the control component. This way, you can render the control, while binding RHF to the control at the same time. The complete type of the `controlRender` prop is as follows:

```tsx
controlRender: (
  props: UseControllerReturn & {
    form: UseFormReturn<FieldValues, any, FieldValues>;
    className?: string;
  },
) => React.ReactNode;
```

The following example shows how to use the `controlRender` prop to render a custom control:

```tsx
import { z } from "zod";
import { Form } from "@/base/components/ui/form";
import { CustomInput } from "@/base/components/ui/custom-input";

// ...

<Form
  schema={z.object({ customField: z.string().nonempty() })}
  fields={[
    {
      name: "customField",
      type: "custom",
      controlRender: ({ value, onChange, form }) => (
        <CustomInput value={value} onChange={onChange} />
      ),
    },
  ]}
/>;
```

## 6. Using refs with `<Form />`

You can use `ref` prop to bind a ref that controls the form. You can use this ref to submit the form programmatically, reset the form, set the error message for a field, etc.

The following example in the [`LoginForm` component](../src/modules/auth/components/login-form.tsx) shows how to use the ref to set the error message for a field when the login fails due to incorrect email or password:

```tsx
export function LoginForm() {
  const formRef = useRef<LoginFormRef>(null);

  // ...

  const { mutate: triggerLogin, isPending: isLoggingIn } = useMutation({
    // ...
    onError: (error) => {
      // If the error is 401 Unauthorized, set the error message for the email & password fields
      if (error instanceof AxiosError && error.status === HttpStatusCode.Unauthorized) {
        formRef.current?.setError("email", {
          message: "The email or password is incorrect",
        });
        formRef.current?.setError("password", {
          message: "The email or password is incorrect",
        });
      }
    },
  });

  return (
    <Form
      ref={formRef}
      // ...
    />
  );
}
```

> To know how to get the type for the ref, in this case `LoginFormRef`, see [8.2. Inferring the type for the ref of the form](#82-inferring-the-type-for-the-ref-of-the-form).

## 7. Inferring types

### 7.1. Inferring the type for the form props

Let's say you have a Zod schema, and you've already inferred the type of that schema:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z.string().nonempty("Password must not be blank"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
```

Then you define a `LoginForm`, and pass the `loginSchema` to the `schema` prop of `<Form>`. You can infer the type of the props of `LoginForm` like this:

```tsx
import { DeepPartial } from "react-hook-form";
import { FormProps } from "@/base/components/ui/form";

type LoginFormProps = FormProps<DeepPartial<LoginSchema>, LoginSchema>;
```

You can also add the `Omit` utility type to omit some props that you don't want to expose, this is useful when you already specify the `schema` prop and `fields` prop, and you don't want others to override them:

```tsx
import { DeepPartial } from "react-hook-form";
import { FormProps } from "@/base/components/ui/form";

// We don't want to expose `schema` & `fields` props, because they are already defined in the `LoginForm` component
type LoginFormProps = Omit<
  FormProps<DeepPartial<LoginSchema>, LoginSchema>,
  "schema" | "fields"
>;

export function LoginForm(props: LoginFormProps) {
  return (
    <Form
      {...props}
      schema={loginSchema}
      fields={[
        {
          name: "email",
          type: "text",
          placeholder: "Enter your email"
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your password"
        },
      ]}
    />
  );
}

// Usage
<LoginForm onSuccessSubmit={(data) => console.log(data)} /> // ✅ Okay
<LoginForm fields={[]} /> // ❌ Error, because `fields` prop is omitted
```

### 7.2. Inferring the type for the ref of the form

If you want to get the type for the ref, that can be passed to the `useRef` hook later, you can do it like this:

```tsx
import { ComponentRef } from "react";
import { DeepPartial } from "react-hook-form";
import { FormProps } from "@/base/components/ui/form";

type LoginFormRef = ComponentRef<typeof Form<DeepPartial<LoginSchema>, LoginSchema>>;

// Then later in your component
const formRef = useRef<LoginFormRef>(null);
```

## 8. Internationalization (i18n)

There are two ways to use i18n messages in the `<Form />` component:

### 8.1. Manual way

Given the following i18n messages in `messages/en.json`:

```jsonc
{
  "modules": {
    "auth": {
      "components": {
        "LoginForm": {
          "email": {
            "label": "Email",
            "placeholder": "Enter your email",
            "required": "Email is required",
            "invalid": "Email is invalid",
          },
          "password": {
            "label": "Password",
            "placeholder": "Enter your password",
            "required": "Password is required",
          },
          "submitButton": {
            "text": "Login",
          },
        },
      },
    },
  },
}
```

You can use the `getTranslation()` utility function to get the i18n messages like this:

```tsx
import { z } from "zod";
import { getTranslation } from "@/base/utils";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty(getTranslation("modules.auth.components.LoginForm.email.required"))
    .email(getTranslation("modules.auth.components.LoginForm.email.invalid")),
  password: z
    .string()
    .nonempty(getTranslation("modules.auth.components.LoginForm.password.required")),
});

export function LoginForm() {
  return (
    <Form
      ref={formRef}
      className="flex flex-col gap-6"
      loading={isLoggingIn}
      schema={loginSchema}
      fields={[
        {
          name: "email",
          type: "text",
          label: getTranslation("modules.auth.components.LoginForm.email.label"),
          placeholder: getTranslation("modules.auth.components.LoginForm.email.placeholder"),
        },
        {
          name: "password",
          type: "password",
          label: getTranslation("modules.auth.components.LoginForm.password.label"),
          placeholder: getTranslation("modules.auth.components.LoginForm.password.placeholder"),
        },
      ]}
    />
  );
}
```

Using this way, you can customize the structure of the i18n messages as you want. However, it is quite verbose, since you have to call `getTranslation()` for each message.

### 8.2. Using `i18nNamespace` prop of `<Form />`

The `<Form />` component has a prop called `i18nNamespace`, which is a string that denotes the namespace of the i18n messages for the form. However, **the structure of the i18n messages should be strictly as follows**:

```jsonc
{
  "modules": {
    "auth": {
      "components": {
        "LoginForm": {
          "fields": {
            "email": {
              "label": "Email",
              "placeholder": "Enter your email",
              "errors": {
                "too_small": "Email is required",
                "invalid_string": "Invalid email address",
                "email_password_incorrect": "Email or password is incorrect. Please try again.",
              },
            },
            "password": {
              "label": "Password",
              "placeholder": "Enter your password",
              "forgotPassword": "Forgot password?",
              "errors": {
                "email_password_incorrect": "Email or password is incorrect. Please try again.",
              },
            },
          },
          "submitButtonLabel": "Login",
        },
      },
    },
  },
}
```

Then you can use the `i18nNamespace` prop like this:

```tsx
import { z } from "zod";
import { getTranslation } from "@/base/utils";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export function LoginForm() {
  return (
    <Form
      i18nNamespace="modules.auth.components.LoginForm" // <--- Here
      ref={formRef}
      className="flex flex-col gap-6"
      loading={isLoggingIn}
      schema={loginSchema}
      fields={[
        {
          name: "email",
          type: "text",
        },
        {
          name: "password",
          type: "password",
        },
      ]}
    />
  );
}
```

> The namespace should follows the convention mentioned in the [3. Conventions for i18n messages](./i18n.md#3-conventions-for-i18n-messages) of the i18n document.

### 8.3. i18n for the error messages (apply for the `i18nNamespace` way only):

When submitting a form, there two types of errors can occur: **validation errors** and **submission errors**.

Validation errors are handled by React Hook Form & Zod, and the error messages are displayed automatically by the `<Form />` component. The error messages for validation errors are defined in the `errors` object of each field in the i18n messages.

Looking back at the above example, the error messages for the `email` field are defined as follows:

```jsonc
"email": {
  // ...
  "errors": {
    "too_small": "Email is required",
    "invalid_string": "Invalid email address",
    "email_password_incorrect": "Email or password is incorrect. Please try again.",
  },
},
```

The `too_small` and `invalid_string` are the error codes returned by Zod when the validation fails. You can find the list of error codes in the [here](https://v3.zod.dev/ERROR_HANDLING?id=zodissuecode).

> 💡 Tips: you can check the error code when the validation fails by specifying the `onErrorSubmit` prop of `<Form />` to log the errors to the console.
>
> ```tsx
> <Form
>   // ...
>   onErrorSubmit={(errors) => console.log(errors)}
> />
> ```

Submission errors are the errors that occur when the form is successfully validated, but the submission fails (e.g. incorrect email or password when logging in). You can set the error messages for submission errors manually by using the `setError` method of the [ref of the form](#6-using-refs-with-form). The error messages for submission errors should also be defined in the `errors` object of each field in the i18n messages.

Hence, in the above example, you can set the error message for the `email` field when the login fails due to incorrect email or password like this:

```tsx
formRef.current?.setError("email", {
  type: "email_password_incorrect", // <--- this is defined in the i18n messages
});
```

or

```tsx
formRef.current?.setError("password", {
  message: getTranslation(
    "modules.auth.components.LoginForm.fields.password.errors.email_password_incorrect",
  ),
});
```
