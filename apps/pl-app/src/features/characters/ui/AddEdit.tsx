import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import {
  Character,
  characterService,
} from '@pl-app/features/characters/api/model';
import { basePath } from '../config/basePath';

function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    CharacterID: Yup.string().required('CharacterID is required'),
    CharacterName: Yup.string().required('Character is required'),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Character>({
    resolver: yupResolver(validationSchema),
  });

  async function createUser(data: Character) {
    await characterService.create(data);
    alert('Character added');
  }

  async function updateUser(userId: string, data: Character) {
    await characterService.update(userId, data);
    alert('Character updated');
  }
  async function onSubmit(data: Character) {
    await (isAddMode ? createUser(data) : updateUser(id, data));
    navigate(`${basePath}`);
  }
  useEffect(() => {
    if (isAddMode) {
      setValue('CharacterID', v4());
      return;
    }
    characterService.getById(id).then((c) => {
      const fields = ['CharacterID', 'CharacterName'] as const;
      fields.forEach((field) => setValue(field, c[field]));
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
      <div className="form-row">
        <div className="form-group col-5">
          <label htmlFor="CharacterName">Character Name</label>
          <input
            type="text"
            {...register('CharacterName')}
            className={`form-control ${errors.CharacterName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {errors.CharacterName?.message}
          </div>
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link to={basePath} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export { AddEdit };
