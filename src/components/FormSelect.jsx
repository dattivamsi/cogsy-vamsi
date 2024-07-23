// FormInput.js

import { Select } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormSelect = ({ name, label, control, errors, rules, options,placeholder }) => {
  return (
    <div style={{width:"10rem"}}>
        <div>
      <label htmlFor={name}>
      <sup className="required super">* </sup>
        {label}</label>
        </div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select {...field} placeholder={placeholder}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      />
      {errors[name] && <p className="required">{errors[name].message}</p>}
    </div>
  );
};

export default FormSelect;
