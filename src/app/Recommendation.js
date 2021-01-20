import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

function Recommendation() {
  const [items, setItems] = useState([])
  const [cookies] = useCookies(['Authorization']);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecommendations = () => {
      fetch(new URL('recommendation', process.env.REACT_APP_API_URL), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.Authorization
        },
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
           return response.json()
          } else {
            throw new Error('Network error')
          }
        })
        .then(recommendations => {
          setItems(recommendations)
        })
        .catch(err => console.log(err))
    }

    getRecommendations()
  }, [cookies.Authorization])

  function handleReset() {
    localStorage.removeItem('user_input')
    navigate("/");
  }

  const renderList = items.map(
    (item) => {
      const price = item.price.amount.toFixed(2)
      const priceText = `${price} per ${item.price.periodicity.toLowerCase()}`

      return (
        <li key={item.type}>
          <h3>{item.type}</h3>
          <span>{priceText}</span>
        </li>
      );
    },
  );

  return (
    <>
      <h2>We got your recommendation</h2>
      <p>Based on your answers, this is what make sense for you and what you should pay.</p>
      <ul>
        {renderList}
      </ul>
      <button type="button" onClick={handleReset}>Start again</button>
    </>
  );
}

export default Recommendation;
