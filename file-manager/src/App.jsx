import { createContext, useState } from 'react'
import './App.css'
import { data } from './data'
import FileManager from './components/FileManager'

export const FileManagerContext = createContext(null);

function App() {
  const [fileData, setFileData] = useState(data)

  const addFolder = (newFolderData, parentId) => {
    const tempData = {...fileData, [newFolderData.id] : {...newFolderData}};
    tempData[parentId].children.unshift(newFolderData.id)
    setFileData(tempData);
  }

  const handleEdit = (value, id) => {
    const updatedData = {...fileData};
    updatedData[id].label = value;
    setFileData(updatedData);
  }

  

  const removeFolder = (id, parentId) => {
    const tempData = {...fileData};
    delete tempData[id];
    tempData[parentId].children = tempData[parentId].children.filter((childId) => childId !== id)

    const queue = [id];

    while(queue.length > 0) {
        const idToBeRemoved = queue.shift();
        queue.push(...fileData[idToBeRemoved].children)
        delete tempData[idToBeRemoved];
    }

    setFileData(tempData);
  }

  return (
    <div className="main-container">
      <FileManagerContext.Provider value={{ addFolder, removeFolder, handleEdit, fileData }} >
        <FileManager data={fileData[0]} fileData={fileData}/>
     </FileManagerContext.Provider>
    </div>
  )
}

export default App
