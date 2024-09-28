import { createBrowserRouter } from 'react-router-dom';
import { AddEdit } from '@pl-app/characters/AddEdit';
import { List } from '@pl-app/characters/List';

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
