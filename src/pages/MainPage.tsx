
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Characters {
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
}

interface pagination {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

interface ApiResponse {
    info: pagination;
  results: Characters[];
}


export default function Home() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [currUrl, setCurrUrl] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [pageInf, setPageInf] = useState<pagination | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCharacters = characters.filter((char) => char.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const fetchAllChars = async () => {
      try {
        const response = await fetch(currUrl);
        const characters = (await response.json()) as ApiResponse;
        
        setCharacters(characters.results); 
        setPageInf(characters.info);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };
    fetchAllChars();
  }, [currUrl]);

  return (
    
    
    <div>
        <div>
        <button id='prevButton' onClick={() => setCurrUrl(pageInf!.prev)}>
          Previous
        </button>
        <button id='nextButton' onClick={() => setCurrUrl(pageInf!.next)}>
          Next
        </button>
        <input id='inputField' type="text" placeholder="Search characters..." onChange={(event) => setSearchTerm(event.target.value)} />
    </div>

      {filteredCharacters.map((chars) => {
        return <div key={chars.id} style={{ border: '1px solid #ccc' }}>
          <img src={chars.image} alt="" />
          <h2 key={chars.id}>
            <Link to={`/character/${chars.id}`}>{chars.name}</Link>
          </h2>
          <p>{chars.species}</p>
          <p>{chars.status}</p>
        </div>
      })}
      
      <div>
        <button id='prevButton' onClick={() => setCurrUrl(pageInf!.prev)}>
          Previous
        </button>
        <button id='nextButton' onClick={() => setCurrUrl(pageInf!.next)}>
          Next
        </button>
      </div>
    </div>
  );
}