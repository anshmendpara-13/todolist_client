// import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/Navbar'
// import styles from './ToDoList.module.css';
// import { Button, Divider, Empty, Input, Modal, Select, Tag, Tooltip, message } from 'antd';
// import {getErrorMessage} from '../../util/GetError';
// import { getUserDetails } from '../../util/GetUser';
// import ToDoServices from '../../services/toDoServices';
// import { useNavigate } from 'react-router';
// import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


// function ToDoList() {
//    const [title,setTitle] = useState("");
//    const [description,setDescription] = useState("");
//    const [isAdding,setIsAdding] = useState(false);
//   const [loading,setLoading] = useState(false);
//   const [allToDo,setAllToDo] = useState([]);
//   const [currentEditItem,setCurrentEditItem] = useState("");
//   const [isEditing,setIsEditing] = useState(false);
//   const [updatedTitle,setUpdatedTitle] = useState("");
//   const [updatedDescription,setUpdatedDescription] = useState("");
//   const [updatedStatus,setUpdatedStatus] = useState("");
//   const [currentTaskType,setCurrentTaskType] = useState("incomplete");
//   const [completedTodo,setCompletedTodo] = useState([]);
//   const [incompletedTodo,setIncompletedTodo] = useState([]);
//   const [currentTodoTask,setCurrentToDoTask] = useState([]);
//   const [filteredToDo,setFilteredToDo] = useState([]);

//   const navigate = useNavigate();

//   const getAllToDo = async ()=>{
//     try{
//       let user = getUserDetails();
//       console.log(user?.userId);
//       const response = await ToDoServices.getAllToDo(user?.userId);
//       console.log(response.data);
//       setAllToDo(response.data);
//     }catch(err){
//       console.log(err);
//       message.error(getErrorMessage(err));
//     }
//   }

//   useEffect(()=>{
//       let user = getUserDetails();
//         const getAllToDo = async ()=>{
//           try{
//             console.log(user?.userId);
//             const response = await ToDoServices.getAllToDo(user?.userId);
//             console.log(response.data);
//             setAllToDo(response.data);
//           }catch(err){
//             console.log(err);
//             message.error(getErrorMessage(err));
//           }
//         }
//       if(user && user?.userId){
//         getAllToDo();
//       }else{
//         navigate('/login');
//       }

//   },[navigate]);

//   useEffect(()=>{
//       const incomplete = allToDo.filter((item)=>item.isCompleted===false);
//       const complete = allToDo.filter((item)=>item.isCompleted===true);
//       setIncompletedTodo(incomplete);
//       setCompletedTodo(complete);
//       if(currentTaskType==='incomplete'){
//         setCurrentToDoTask(incomplete);
//       }else{
//         setCurrentToDoTask(complete)
//       }
//   },[allToDo])

//    const handleSubmitTask = async ()=>{
//     setLoading(true);
//     try{
//       const userId = getUserDetails()?.userId;
//       const data = {
//         title,
//         description,
//         isCompleted:false,
//         createdBy:userId
//       }
//       const response = await ToDoServices.createToDo(data);
//       console.log(response.data);
//       setLoading(false);
//       message.success("To Do Task Added Successfully!");
//       setIsAdding(false);
//       getAllToDo();
//     }catch(err){
//       console.log(err);
//       setLoading(false);
//       message.error(getErrorMessage(err))
//     }
//    }

//    const getFormattedDate = (value)=>{
//     let  date = new Date(value);
//     let dateString = date.toDateString();
//     let hh = date.getHours();
//     let min = date.getMinutes();
//     let ss = date.getSeconds();
//     let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
//     return finalDate;
//   }

//   const handleEdit = (item)=>{
//     console.log(item);
//     setCurrentEditItem(item);
//     setUpdatedTitle(item?.title);
//     setUpdatedDescription(item?.description);
//     setUpdatedStatus(item?.isCompleted);
//     setIsEditing(true);
//   };

//   const handleDelete = async (item)=>{
//     try{
//       const response = await ToDoServices.deleteToDo(item._id);
//       console.log(response.data);
//       message.success(`${item.title} is Deleted Successfully!`);
//       getAllToDo();
//     }catch(err){
//       console.log(err);
//       message.error(getErrorMessage(err));
//     }
//   }

//   const handleUpdateStatus = async (id,status)=>{
//     console.log(id);
//     try{
//       const response = await ToDoServices.updateToDo(id,{isCompleted:status});
//       console.log(response.data);
//       message.success("Task Status Updated Successfully!");
//       getAllToDo();
//     }catch(err){
//       console.log(err);
//       message.error(getErrorMessage(err));
//     }
//   }

//   const handleUpdateTask = async ()=>{
//       try{
//         setLoading(true);
//         const data = {
//           title:updatedTitle,
//           description:updatedDescription,
//           isCompleted:updatedStatus
//         };
//         console.log(data);
//         const response = await ToDoServices.updateToDo(currentEditItem?._id,data);
//         console.log(response.data);
//         message.success(`${currentEditItem?.title} Updated Successfully!`);
//         setLoading(false);
//         setIsEditing(false);
//         getAllToDo();
//       }catch(err){
//         console.log(err);
//         setLoading(false);
//         message.error(getErrorMessage(err))
//       }
//   }

//   const handleTypeChange = (value)=>{
//     console.log(value);
//     setCurrentTaskType(value);
//     if(value==='incomplete'){
//       setCurrentToDoTask(incompletedTodo);
//     }else{
//       setCurrentToDoTask(completedTodo);
//     }
//   }

//   const handleSearch = (e)=>{
//     let query = e.target.value;
//     let filteredList = allToDo.filter((item)=>item.title.toLowerCase().match(query.toLowerCase()));
//     console.log(filteredList);
//     if(filteredList.length > 0 && query){
//       setFilteredToDo(filteredList);
//     }else{
//       setFilteredToDo([]);
//     }
//   }
//   return (
//     <>
//     <Navbar  active={"myTask"}/>
//     <section className={styles.toDoWrapper}>
//         <div className={styles.toDoHeader}>
//             <h2>Your Tasks</h2>
//             <Input style={{width:'50%'}} onChange={handleSearch} placeholder='Search Your Task Here...' />
//             <div>
//               <Button onClick={()=>setIsAdding(true)} type="primary" size="large">Add Task</Button>
//               <Select
//                 value={currentTaskType}
//                 style={{width:180,marginLeft:'10px'}}
//                 onChange={handleTypeChange}
//                 size="large"

//                 options={[
//                   {value:"incomplete",label:'Incomplete'},
//                   {value:"complete",label:'Complete'}
//                 ]}
//               />


//             </div>
//         </div>
//         <Divider />

//         <div className={styles.toDoListCardWrapper}>
//           {filteredToDo.length > 0 ? filteredToDo.map((item)=>{
//             return(
//               <div key={item?._id} className={styles.toDoCard}>
//               <div >
//               <div className={styles.toDoCardHeader}>
//               <h3>{item?.title}</h3>
//               {item?.isCompleted ? <Tag color="cyan">Completed</Tag> : <Tag color="red">Incomplete</Tag>}
//               </div> 
//               <p>{item?.description}</p>
//                </div>

//                <div className={styles.toDoCardFooter}>
//                <Tag>{getFormattedDate(item?.createdAt)}</Tag>
//                <div className={styles.toDoFooterAction}>
//                <Tooltip title="Edit Task?"><EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon} /></Tooltip>
//                  <Tooltip title="Delete Task?"><DeleteOutlined onClick={()=>handleDelete(item)} style={{color:'red'}}   className={styles.actionIcon}/></Tooltip>
//                  {item?.isCompleted ? <Tooltip title="Mark as Incomplete"><CheckCircleFilled onClick={()=>handleUpdateStatus(item._id,false)} style={{color:'green'}}  className={styles.actionIcon} /></Tooltip> :<Tooltip title="Mark as Completed"><CheckCircleOutlined onClick={()=>handleUpdateStatus(item._id,true)}  className={styles.actionIcon}/></Tooltip>}
//                </div>  
//                </div>

//            </div>  
//             )
//           }) : currentTodoTask.length > 0  ? currentTodoTask.map((item)=>{
//             return(
//               <div key={item?._id} className={styles.toDoCard}>
//               <div >
//               <div className={styles.toDoCardHeader}>
//               <h3>{item?.title}</h3>
//               {item?.isCompleted ? <Tag color="cyan">Completed</Tag> : <Tag color="red">Incomplete</Tag>}
//               </div> 
//               <p>{item?.description}</p>
//                </div>

//                <div className={styles.toDoCardFooter}>
//                <Tag>{getFormattedDate(item?.createdAt)}</Tag>
//                <div className={styles.toDoFooterAction}>
//                <Tooltip title="Edit Task?"><EditOutlined onClick={()=>handleEdit(item)} className={styles.actionIcon} /></Tooltip>
//                  <Tooltip title="Delete Task?"><DeleteOutlined onClick={()=>handleDelete(item)} style={{color:'red'}}   className={styles.actionIcon}/></Tooltip>
//                  {item?.isCompleted ? <Tooltip title="Mark as Incomplete"><CheckCircleFilled onClick={()=>handleUpdateStatus(item._id,false)} style={{color:'green'}}  className={styles.actionIcon} /></Tooltip> :<Tooltip title="Mark as Completed"><CheckCircleOutlined onClick={()=>handleUpdateStatus(item._id,true)}  className={styles.actionIcon}/></Tooltip>}
//                </div>  
//                </div>

//            </div>  
//             )
//           }) : 

//           <div className={styles.noTaskWrapper}>
//           <Empty />
//         </div> 

//           }
//         </div>


//         <Modal confirmLoading={loading} title="Add New To Do Task" open={isAdding} onOk={handleSubmitTask} onCancel={()=>setIsAdding(false)}>
//         <Input style={{marginBottom:'1rem'}} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
//         <Input.TextArea placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
//       </Modal>

//       <Modal confirmLoading={loading} title={`Update ${currentEditItem.title}`} open={isEditing} onOk={handleUpdateTask} onCancel={()=>setIsEditing(false)}>
//         <Input style={{marginBottom:'1rem'}} placeholder='Updated Title' value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)} />
//         <Input.TextArea style={{marginBottom:'1rem'}} placeholder='Updated Description' value={updatedDescription} onChange={(e)=>setUpdatedDescription(e.target.value)} />
//         <Select

//       onChange={(value)=>setUpdatedStatus(value)}
//       value={updatedStatus}
//       options={[

//         {
//           value: false,
//           label: 'Not Completed',
//         },

//         {
//           value: true,
//           label: 'Completed',
//         },

//       ]}
//     />
//       </Modal>
//     </section>
//     </>
//   )
// }

// export default ToDoList


import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import styles from './ToDoList.module.css';
import { Button, Divider, Empty, Input, Modal, Select, Tag, Tooltip, message } from 'antd';
import { getErrorMessage } from '../../util/GetError';
import { getUserDetails } from '../../util/GetUser';
import ToDoServices from '../../services/toDoServices';
import { useNavigate } from 'react-router';
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ToDoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentTaskType, setCurrentTaskType] = useState("incomplete");
  const [currentToDoTask, setCurrentToDoTask] = useState([]);
  const [filteredToDo, setFilteredToDo] = useState([]);

  const navigate = useNavigate();

  // Fetch all ToDos for the logged-in user
  const getAllToDo = useCallback(async () => {
    try {
      const user = getUserDetails();
      if (!user?.userId) {
        navigate('/login');
        return;
      }
      const response = await ToDoServices.getAllToDo(user.userId);
      setAllToDo(response.data);
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  }, [navigate]);

  useEffect(() => {
    getAllToDo();
  }, [getAllToDo]);

  // Filter ToDos based on completion status
  useEffect(() => {
    const incomplete = allToDo.filter(item => !item.isCompleted);
    const complete = allToDo.filter(item => item.isCompleted);
    setCurrentToDoTask(currentTaskType === 'incomplete' ? incomplete : complete);
  }, [allToDo, currentTaskType]);

  // Handle Add Task
  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = { title, description, isCompleted: false, createdBy: userId };
      await ToDoServices.createToDo(data);
      message.success("To Do Task Added Successfully!");
      setIsAdding(false);
      setTitle("");
      setDescription("");
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Edit Task Handlers
  const handleEdit = item => {
    setCurrentEditItem(item);
    setUpdatedTitle(item.title);
    setUpdatedDescription(item.description);
    setUpdatedStatus(item.isCompleted);
    setIsEditing(true);
  };

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const data = { title: updatedTitle, description: updatedDescription, isCompleted: updatedStatus };
      await ToDoServices.updateToDo(currentEditItem._id, data);
      message.success(`${currentEditItem.title} Updated Successfully!`);
      setIsEditing(false);
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Delete Task Handler
  const handleDelete = async item => {
    try {
      await ToDoServices.deleteToDo(item._id);
      message.success(`${item.title} is Deleted Successfully!`);
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  // Update Task Status Handler
  const handleUpdateStatus = async (id, status) => {
    try {
      await ToDoServices.updateToDo(id, { isCompleted: status });
      message.success("Task Status Updated Successfully!");
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  // Task Type Change Handler
  const handleTypeChange = value => {
    setCurrentTaskType(value);
  };

  // Search Handler
  const handleSearch = e => {
    const query = e.target.value.toLowerCase();
    const filteredList = allToDo.filter(item => item.title.toLowerCase().includes(query));
    setFilteredToDo(filteredList.length > 0 && query ? filteredList : []);
  };

  const getFormattedDate = value => {
    const date = new Date(value);
    return `${date.toDateString()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.flexcontent}>
          <div className={styles.toDoHeader}>
            <h2>Your Tasks</h2>
            <Input style={{ width: '50%', margin:'30px' }} onChange={handleSearch} placeholder='Search Your Task Here...' />
            <div>
              <Button onClick={() => setIsAdding(true)} type="primary" size="large">Add Task</Button>
              <Select
                value={currentTaskType}
                style={{ width: 180, marginLeft: '10px' }}
                onChange={handleTypeChange}
                size="large"
                options={[
                  { value: "incomplete", label: 'Incomplete' },
                  { value: "complete", label: 'Complete' }
                ]}
              />
            </div>
          </div>
        </div>
        <Divider />

        <div className={styles.toDoListCardWrapper}>
          {filteredToDo.length > 0
            ? filteredToDo.map(renderToDoCard)
            : currentToDoTask.length > 0
              ? currentToDoTask.map(renderToDoCard)
              : <div className={styles.noTaskWrapper}><Empty /></div>}
        </div>

        {/* Add Task Modal */}
        <div className={styles.flexcontent}>
          <Modal confirmLoading={loading} title="Add New To Do Task" open={isAdding} onOk={handleSubmitTask} onCancel={() => setIsAdding(false)}>
            <Input style={{ marginBottom: '1rem' }} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input.TextArea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Modal>
        </div>

        {/* Edit Task Modal */}
        <div className={styles.flexcontent}>
          <Modal confirmLoading={loading} title={`Update ${currentEditItem?.title}`} open={isEditing} onOk={handleUpdateTask} onCancel={() => setIsEditing(false)}>
            <Input style={{ marginBottom: '1rem' }} placeholder='Updated Title' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
            <Input.TextArea style={{ marginBottom: '1rem' }} placeholder='Updated Description' value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
            <Select
              onChange={setUpdatedStatus}
              value={updatedStatus}
              options={[
                { value: false, label: 'Not Completed' },
                { value: true, label: 'Completed' }
              ]}
            />
          </Modal>
        </div>
      </section>
    </>
  );

  // Render individual task card
  function renderToDoCard(item) {
    return (
      <div key={item._id} className={styles.toDoCard}>
        <div className={styles.toDoCardHeader}>
          <h3>{item.title}</h3>
          <Tag color={item.isCompleted ? "cyan" : "red"}>{item.isCompleted ? 'Completed' : 'Incomplete'}</Tag>
        </div>
        <p>{item.description}</p>
        <div className={styles.toDoCardFooter}>
          <Tag>{getFormattedDate(item.createdAt)}</Tag>
          <div className={styles.toDoFooterAction}>
            <Tooltip title="Edit Task?"><EditOutlined onClick={() => handleEdit(item)} className={styles.actionIcon} /></Tooltip>
            <Tooltip title="Delete Task?"><DeleteOutlined onClick={() => handleDelete(item)} style={{ color: 'red' }} className={styles.actionIcon} /></Tooltip>
            {item.isCompleted
              ? <Tooltip title="Mark as Incomplete"><CheckCircleFilled onClick={() => handleUpdateStatus(item._id, false)} style={{ color: 'green' }} className={styles.actionIcon} /></Tooltip>
              : <Tooltip title="Mark as Completed"><CheckCircleOutlined onClick={() => handleUpdateStatus(item._id, true)} className={styles.actionIcon} /></Tooltip>}
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
