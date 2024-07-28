// import { getCharacter } from '@yakumi-app/domain/api/crud';

import { AddEdit } from '@pl-app/characters/AddEdit';
import { List } from '@pl-app/characters/List';
import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <List />,
    },
    {
      path: '/add',
      element: <AddEdit />,
    },
    {
      path: '/edit/:id',
      element: <AddEdit />,
    },
  ]);
