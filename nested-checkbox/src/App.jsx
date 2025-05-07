import { useState } from 'react'
import './App.css'
import { data, STATUS } from './constant'
import NestedCheckboxes from './components/nestedCheckboxes/NestedCheckboxes'
import { createContext } from 'react'

const NestedCheckBoxContext = createContext();
function App() {
  const [checkboxData, setCheckBoxData] = useState(data)
  
  const handleOnChange = (e, id) => {
  
    const computeStatus = (nodes) => {
      let checkedCount = 0;
      let unCheckedCount = 0;
      let indeterminateCount = 0;
      nodes.forEach((node) => {
        if(node.status === STATUS.CHECKED) {
          checkedCount++
        } else if(node.status === STATUS.UNCHECKED) {
           unCheckedCount++
        } else if(node.status === STATUS.INDETERMINATE) {
          indeterminateCount ++;
        }
      })

      if(checkedCount === nodes.length) {
        return STATUS.CHECKED;
      } else if(unCheckedCount === nodes.length) {
        return STATUS.UNCHECKED;
      } else if(checkedCount > 0 || indeterminateCount > 0) {
        return STATUS.INDETERMINATE;
      } 
      return STATUS.UNCHECKED;
    }

    const traverse = (node, isDecendent, itemStatus) => {
      if(node.id === id) {
        node.status = e.target.checked ? STATUS.CHECKED : STATUS.UNCHECKED;
      } 
      if(isDecendent) {
        node.status = itemStatus;
      }
      if('children' in node && Array.isArray(node.children) && node.children.length) {
        node.children.forEach((item) => {
          traverse(item, (node.id === id || isDecendent), node.status);
        })
        node.status = computeStatus(node.children);
      }
    }

    const clonedBoxes = JSON.parse(JSON.stringify(checkboxData)); 

    clonedBoxes.forEach((boxes) => {
      return traverse(boxes, false, null);
    })
    setCheckBoxData(clonedBoxes) 
  }

  return (
    <NestedCheckBoxContext.Provider value={{handleOnChange}}>
     <NestedCheckboxes data={checkboxData} handleOnChange={handleOnChange}/>
    </NestedCheckBoxContext.Provider>
  )
}

export default App
