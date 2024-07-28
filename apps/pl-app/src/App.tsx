import { useForm } from 'react-hook-form';
import { client } from './client';
import type { InferRequestType } from 'hono';
import { v4 } from 'uuid';

type Character = InferRequestType<typeof client.api.characters.$post>['json'];
export default function App() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Character>();
  const onSubmit = handleSubmit((data) => {
    if (errors.root) {
      alert(errors.root.message);
      return;
    }
    client.api.characters.$post({ json: { ...data, CharacterID: v4() } });
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label>キャラクター名</label>
      <input {...register('CharacterName')} />
      <button type="submit">送信</button>
    </form>
  );
}
