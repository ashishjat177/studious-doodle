import './App.css'
import data from './data.json';
import commentData from './commentData.json'
import ReccursiveCommentsContainer from './components/reccursiveComments/ReccursiveCommentsContainer';
import CommentsContainerV2 from './components/commentsContainerV2/CommentsContainerV2';

function App() {
  return (
    <div style={{display: 'flex', gap: '100px'}}>
      <ReccursiveCommentsContainer data={data}/>
      <CommentsContainerV2 data={commentData} />
    </div>
  )
}

export default App
