import { useDispatch, useSelector } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import { hideNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter(anecdote => 
      anecdote.content
      .toLowerCase()
      .includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAction(id));
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => 
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} 
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default AnecdoteList;