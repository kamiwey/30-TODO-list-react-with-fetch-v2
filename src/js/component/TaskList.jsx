import React, { useEffect, useState } from 'react'

const TaskList = () => {

    const [task, setTask] = useState("");
	const [list, setList] = useState(null);
	const [isHide, setIsHide] = useState("hidden");

	const delItem = (indiElem) => {
		const newArr = [...list];
		newArr.splice(indiElem, 1);
		setList(newArr);
	};

	const addItem = (e) => {
		if (e.keyCode === 13) {
			setList([...list, task]);
			setTask("");
		}
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kamiwey", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("Request Success");
					return resp.json();
				} else {
					console.log("Request ERROR " + resp.status);
				}
			})
			.then((body) => {				
				console.log(body.map((e) => e.label));
				setList(body.map((e) => e.label));
			})
			.catch((error) => {
				//error handling
				console.error("ERROR:", error);
			});
	}, []);

	useEffect(() => {
		if (list != null) {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/kamiwey", {
				method: "PUT",
				body: JSON.stringify(
					list.map((item) => ({ label: item, done: false }))
				),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (res.ok) {
						console.log("PUT Request Success");
						return res.json();
					} else {
						console.log(
							"PUT Request ERROR " + res.status 
						);
					}
				})
				.then(async (response) => {
					console.log("Success", await response);
				})
				.catch((error) => console.error(error));
		}
	}, [list]);

	if (list == null) {
		return null;
	}

	return (

        <div>		
            <div className="container">
                <h1 className="title text-muted text-center">Todos</h1>
                <div className="tasker">
                    <input 
                        type="text"
                        placeholder="Type a new task"
                        className="tasker2 text-muted"
                        value={task} 
                        onChange={e => setTask(e.target.value)} 
                        onKeyUp={(event) => addItem(event)}/>
                </div>
            
            <div>
                <ul className="list-group">
                    {list.length == 0 ? "" : list.map((task, index) => (
                    <li 
                        key={index} 
                        className="list-group-item text-muted" 
                        onMouseEnter={() => setIsHide(index)}
                        onMouseLeave={() => setIsHide("hidden")}
                    >
                    {" "}
                    {task}
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
		
		
		
		
		
		
		
		
		
		
		
		
		
		</div>

	);
};

export default TaskList