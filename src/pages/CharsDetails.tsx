
import { data, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
  location: {
    name: string;
    url: string;
  };
}


export default function Details() {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);  

  useEffect(() => {
      const fetchChar = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
          
            setCharacter(data); 
        } catch (error) {
          console.error("Failed to fetch character:", error);
        }
      };
      fetchChar();
    }, []);
  if (!character) return <h2>Please wait, loading character details...</h2>;

  return (
    <div>
        <div>
            <button id="backButton" onClick={() => window.history.back()}>Back</button>
        </div>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            {(!character.type) ? <p>No type available</p> : <p>Type: {character.type}</p>}
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Location: {character.location.name}</p>
    </div>
  );
}