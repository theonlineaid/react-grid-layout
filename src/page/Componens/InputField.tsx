import React, { ChangeEvent, useState } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string | null;
  options?: { label: string; value: string; key: string }[]; // Include key in options
  fieldName: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  error,
  options,
  fieldName
}) => {
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className=' mb-4'>
      <label
        htmlFor={id}
        className=' block  text-sm  font-medium  text-gray-700 dark:text-gray-300'
      >
        {fieldName}:
      </label>
      {type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={` border hover:border-gray-500 dark:border-gray-400  mt-1  p-2  w-full  rounded-md  focus:ring-indigo-500  focus: border-indigo-500  block  shadow-sm  sm: text-sm ${error && !focused ? ' border-red-500 shake' : ''}`}
        >
          <option value=''>{label}</option>
          {options?.map(option => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={` border hover:border-gray-500 dark:border-gray-400  mt-1  p-2  w-full  rounded-md  focus:ring-indigo-500  focus: border-indigo-500  block  shadow-sm  sm: text-sm ${error && !focused ? ' border-red-500 shake' : ''}`}
          placeholder={placeholder}
        />
      )}
      {error && <p className=" text-red-500  text-sm">{error}</p>}
    </div>
  );
};

export default InputField;