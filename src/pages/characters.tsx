import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {gql, useQuery} from '@apollo/client';

export const CHARACTER_TILE_DATA = gql`
  fragment CharacterTile on Characters {
  __typename
    results {
      id
      name
      image
    }
    info {
      pages
    }
  }
`;

export const GET_ALL_CHARACTERS = gql`
  query GetCharacterList {
    characters {
        ...CharacterTile
    }
  }
  ${CHARACTER_TILE_DATA}
`;
interface CharactersProps extends RouteComponentProps {}

const Characters: React.FC<CharactersProps> = () => {
    const {
        data,
        loading,
        error
    } = useQuery(GET_ALL_CHARACTERS);

    if (loading) return <div>Loading</div>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data?.characters?.results.map((character: any) => (
                    <>
                        <div>{character.id}</div>
                        <div>{character.name}</div>
                        <img alt='' src={character.image}/>
                    </>
                ))}
        </>
    );
};

export default Characters;