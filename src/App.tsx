import './App.css'
import EasyQuery from './store/useQuery/EasyQuery'
import NormalQuery from './store/useQuery/NormalQuery'
import EasyMutation from './store/useMutation/EasyMutation'
import NormalMutation from './store/useMutation/NormalMutation'
import QueryAndMutation from './store/QueryAndMutation'

function App() {

  return (
    <>
      {/* разкомментируйте нужный компонент */}
      {/* <EasyQuery /> */}
      {/* <NormalQuery /> */}
      {/* <EasyMutation /> */}
      {/* <NormalMutation /> */}
      <QueryAndMutation />
    </>
  )
}

export default App
