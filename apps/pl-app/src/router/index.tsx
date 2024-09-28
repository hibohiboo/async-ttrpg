import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AddEdit } from '@pl-app/characters/AddEdit';
import { List } from '@pl-app/characters/List';
import { CharacterPage } from '@pl-app/pages/character-page';
import { AsyncTrpgLayout } from '@pl-app/widgets/layout/AsyncTrpgLayout';

export const createRouter = () =>
  createBrowserRouter([
    {
      element: (
        <AsyncTrpgLayout>
          <Outlet />
        </AsyncTrpgLayout>
      ),
      children: [
        {
          path: '/characters',
          element: <CharacterPage />,
        },
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
      ],
    },
  ]);
