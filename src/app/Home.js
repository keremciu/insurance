import {
  useNavigate
} from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  function handleStart() {
    navigate('/wizard')
  }
  return (
    <button onClick={handleStart} type="button">Start</button>
  );
}

export default Home