import { useEffect, useState } from 'react'
import './App.css'
import { getIssue, statuses, updateStatus } from './tasks'

function App() {
  const [issuesList, setIssuesList] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showSubTask, setShowSubTask] = useState(false)

  const getTasks = async() => {
    const response = await getIssue();
    setIssuesList(response);
    setSelectedStatus(response.status);
  }

  const onUpdate = async(e) => {
    const id = new Date().getTime()
    const value = e.target.value;
    const response = await updateStatus(id, value);
    setSelectedStatus(value);
  }

  const toggleSubtasks = () => {
    setShowSubTask((prev) => !prev);
  }

  useEffect(() => {
    getTasks();
  }, [])

  const handleClickOnTitle = () => {
    console.log('title clicked')
  }

  return (
    <div>
      <div className='header'>
        <h1 
          tabIndex={0}
          onKeyDown={(e) => { (e.key === 'Enter' || e.key === ' ') && handleClickOnTitle()}}
        >
          {issuesList.title}
        </h1>
        <select
          className='status-dropdown'
          value={selectedStatus}
          onChange={onUpdate}>
            <div className='status-dropdown-options'>
                {statuses.map((status, index) => (
                    <option key={index}>
                        {status}
                    </option>
              ))}
           </div>
        </select>
      </div>

      <div className='sub-tasks'>
        <button onClick={toggleSubtasks} title={`${issuesList.subtasks.length} substasks`}>show substasks</button>
       
       {showSubTask &&  
         (<ul>
          {issuesList.subtasks.map((taskId) => (
            <li key={taskId}>{taskId}</li>
          ))}
          
        </ul>)
        }
      </div>
    </div>
  )
}

export default App
