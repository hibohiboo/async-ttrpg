import { createBrowserRouter, Outlet } from 'react-router-dom';
import { CharacterEdit, CharacterList } from '@pl-app/features/characters';
import { CharacterPage } from '@pl-app/pages/character-page';
import { AsyncTrpgLayout } from '@pl-app/widgets/layout';

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
          element: (
            <CharacterPage>
              <Outlet />
            </CharacterPage>
          ),
          children: [
            {
              index: true,
              element: <CharacterList />,
            },
            {
              path: 'add',
              element: <CharacterEdit />,
            },
            {
              path: 'edit/:id',
              element: <CharacterEdit />,
            },
          ],
        },
      ],
    },
  ]);
