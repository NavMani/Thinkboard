import {useState, useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitui from "../components/RateLimitui.jsx";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const Homepage = () => {
  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchNotes = async () => {
  try {
    const res = await api.get("/notes");
    console.log(res.data);
    setNotes(res.data);
  } catch (error) {
    console.error("Error fetching notes:", error);

    if (error.response?.status === 429) {
      setIsRateLimited(true);
    } else {
      toast.error("An error occurred while fetching notes.");
    }
  } finally {
    setIsLoading(false);
  }
};

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />
      {israteLimited && <RateLimitui/>}
       {isLoading && <div className="text-center text-primary py-10">Loading...</div>}
       {notes.length === 0 && !israteLimited && <NotesNotFound/>}
       {notes.length >0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note}  setNotes={setNotes}/>
          ))}
        </div>
       )}
    </div>
  )
}

export default Homepage;
