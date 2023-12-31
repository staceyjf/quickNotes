import { useState } from 'react';
import { getUser } from "../../utilities/users-service";
import { Routes, Route } from 'react-router-dom';
// Page components
import AuthPage from "../AuthPage/AuthPage";
import NewNotePage from "../NewNotePage/NewNotePage";
import NotesListPage from "../NotesListPage/NotesListPage";
// Components
import NavBar from "../../components/NavBar/NavBar";

import './App.css';

function App() {
  // updating now with the token logic defined
  const [user, setUser] = useState(getUser());

  const [notes, setNotes] = useState([]); // set to empty post testing
  
  return (
    <main className="App">
    {/* conditionally render based on user - this has the NavBar only for logged in users*/}
    { user ?
        <>
          <NavBar user={user} setUser={setUser}/>
            <Routes>
              {/* Routes components in here * - instance of the competent provided as a prop
              only renders the best matching path based on the address bar*/}
              <Route path="/notes/new" element={<NewNotePage notes={notes} setNotes={setNotes}/>} />
              <Route path="/notes" element={<NotesListPage user={user} notes={notes} setNotes={setNotes}/>} />
          </Routes>
        </> 
        :
        <AuthPage user={user} setUser={setUser} />
    }

    
  
    </main>
  );
}

export default App;
