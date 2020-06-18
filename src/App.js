import React, {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect( ()=> {
    api.get('repositories')
      .then(response =>{
        setRepositories(response.data)
      })

    }, [])

  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/drbrucce",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    .then(response=>{
      if(response.status === 204){
        const index = repositories.findIndex(item => item.id === id)
        repositories.splice(index, 1)
        setRepositories([...repositories])
      }
      else
        console.log(response.statusText)
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item=> (
            <li key={item.id}> {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
