/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';

import { Input, Text } from '@nextui-org/react';

export type TextInputProps = {
  label: string;
  name: string;
  control: any;
  rules: any;
  placeholder: any;
  disabled: boolean;
};

const TextInputController = (props: TextInputProps): any => {
  const { label, name, control, rules, placeholder, disabled } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label={label}
            clearable
            bordered
            fullWidth
            size="lg"
            color="secondary"
            disabled={disabled}
            placeholder={placeholder}
            contentLeft={<Text>💳</Text>}
            helperColor="error"
            helperText={fieldState.error?.message}
          />
        )}
      />
    </>
  );
};

export default TextInputController;
