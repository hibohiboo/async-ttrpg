import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AddEdit } from '@pl-app/characters/AddEdit';
import { List } from '@pl-app/characters/List';
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
