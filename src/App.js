import React,{useEffect,useState}from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const App_id="ca512ab8"
  const App_key="2dc04997b3cb311e475db00472af9f25"
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken");


  useEffect(()=>{
    getRecipes();
    //console.log("effect is happening")
  },[query]);

    const getRecipes=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_key}`);
    const data=await response.json();
    setRecipes(data.hits)
  };
  const updateSearch=e=>{
    setSearch(e.target.value)
    console.log(search)
  };
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search)

  }
  return (
   
     <div className="App">
     <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button"type="submit">search</button>
      </form>
      <div className="recipe">
      {recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>

    
     
    </div>
  );
}

export default App;
