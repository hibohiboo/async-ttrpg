import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Character, characterService } from '../_services/character.service';

function List() {
  const [characters, setCharacters] = useState<
    (Character & { isDeleting: boolean })[] | null
  >(null);

  useEffect(() => {
    characterService
      .getAll()
      .then((x) => setCharacters(x.map((y) => ({ ...y, isDeleting: false }))));
  }, []);

  async function deleteUser(id: string) {
    if (!characters) return;
    setCharacters(
      characters.map((x) =>
        x.CharacterID !== id ? x : { ...x, isDeleting: true },
      ),
    );
    await characterService.delete(id);
    setCharacters(characters.filter((x) => x.CharacterID !== id));
  }

  return (
    <div>
      <h1>キャラクター一覧</h1>
      <Link to={`/add`} className="btn btn-sm btn-success mb-2">
        キャラクターを追加
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>ID</th>
            <th style={{ width: '60%' }}>Name</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {characters &&
            characters.map((character) => (
              <tr key={character.CharacterID}>
                <td>{character.CharacterID}</td>
                <td>{character.CharacterName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link
                    to={`/edit/${character.CharacterID}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(character.CharacterID)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={character.isDeleting}
                  >
                    {character.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!characters && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {characters && !characters.length && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { List };
