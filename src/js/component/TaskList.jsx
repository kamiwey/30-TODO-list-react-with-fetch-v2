import React, { useState } from 'react'

const ListaTareas = () => {

    const [task, setTask] = useState('');
    const [list, setList] = useState([]);
    const [isHide, setIsHide] = useState('hidden');

    const delItem = indiElem =>{
        const newArr = [...list]
        newArr.splice(indiElem,1)
        setList(newArr)
     }
    
    return (
        <div className="container">
            <h1 className="title text-muted text-center">Todos</h1>
            <div className="tasker">
                <input 
                    type="text"
                    placeholder="Type a new task"
                    className="tasker2 text-muted"
                    value={task} 
                    onChange={e => setTask(e.target.value)} 
                    
                     onKeyUp={event => event.keyCode === 13 ? list.push(task) && setTask("") : setList}/>
            </div>
        
        <div>
            <ul className="list-group">
                {list.length == 0 ? "" : list.map((t,index) => (<li 
                key={index} 
                className="list-group-item text-muted" 
                
                onMouseEnter={() => setIsHide(index)}
                onMouseLeave={() => setIsHide("hidden")}> {t}
                <span className="hidden" onClick={()=> delItem(index) }
                >
                    <i 
                        className="papelera fa-regular fa-trash-can" 
                        style={{visibility: isHide == index ? "" : "hidden"}}
                        >
                            </i>
                            </span></li>))}
            </ul>
        </div>
        <div className="itemsleft text-muted ml-5 mt-2">
			{list.length == 0
			? " No tasks, add a task"
			: list.length + " item left"}</div>
    </div>
    );
};

export default ListaTareas