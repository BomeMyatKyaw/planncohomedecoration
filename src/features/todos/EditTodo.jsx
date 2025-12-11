import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { edittodo } from './../../store/todosreducer';

export default function Edittodo(){

    const { id } = useParams();
    const currenttodo = useSelector((state)=>state.todos.todos.find((todo) => String(todo.id) === String(id)))
    const [title,setTitle] = useState(currenttodo?.title || '');
    const [completed,setCompleted] = useState(currenttodo?.completed || false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(edittodo({id,title,completed}))
            .unwrap()
            .then(()=>{
                navigate('/');
            });

    }

    if(!currenttodo) return <p>todo not found.</p>

    return (
        <div>
            <h3>Add New todo</h3>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter Todo Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input type="checkbox" checked={completed} onChange={(e)=>setCompleted(e.target.checked)} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}