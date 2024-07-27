import * as React from 'react';
import { useForm } from 'react-hook-form';
import { client } from './client';
import type { InferRequestType } from 'hono';

type Character = InferRequestType<typeof client.api.characters.$post>['json'];
export default function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Character>();
  const onSubmit = handleSubmit((data) => {
    client.api.characters.$post({ json: data });
  });
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register('')} />
      <label>Last Name</label>
      <input {...register('lastName')} />
      <button
        type="button"
        onClick={() => {
          setValue('lastName', 'luo'); // ✅
          setValue('firstName', true); // ❌: true is not string
          errors.bill; // ❌: property bill does not exist
        }}
      >
        SetValue
      </button>
    </form>
  );
}
