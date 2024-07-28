import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Character,
  characterService,
} from '@pl-app/_services/character.service';
import { v4 } from 'uuid';

function AddEdit() {
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

  function onSubmit(data: Character) {
    return isAddMode ? createUser(data) : updateUser(id, data);
  }

  async function createUser(data: Character) {
    await characterService.create(data);
    alert('Character added');
  }

  async function updateUser(id: string, data: Character) {
    await characterService.update(id, data);
    alert('Character updated');
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
          <label>Character Name</label>
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
        <Link to={isAddMode ? '.' : '..'} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export { AddEdit };
