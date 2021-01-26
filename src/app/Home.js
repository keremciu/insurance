import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function handleStart() {
    // this should be just /wizard but there's a problem in v6 react-router
    // https://github.com/ReactTraining/react-router/pull/7462
    navigate(`${process.env.PUBLIC_URL}/wizard`);
  }
  return (
    <button onClick={handleStart} type="button">
      Start
    </button>
  );
}

export default Home;
