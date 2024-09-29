// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(
    'http://localhost:7071/api/characters',
    () =>
      new HttpResponse(
        JSON.stringify([
          {
            CharacterID: 'test-aaaa-bbbb-cccc-29ddfc9efee1',
            CharacterName: 'モックキャラクター',
          },
          {
            CharacterID: 'test-aaaa-bbbb-cccc-49ddfc9efee1',
            CharacterName: 'モックキャラクター2',
          },
        ]),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
  ),
  http.get(
    'http://localhost:7071/api/characters/:id',
    () =>
      new HttpResponse(
        JSON.stringify({
          CharacterID: 'test-aaaa-bbbb-cccc-29ddfc9efee1',
          CharacterName: 'モックキャラクター',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
  ),
  http.delete(
    'http://localhost:7071/api/characters/:id',
    () => new HttpResponse('', { status: 200 }),
  ),
];
