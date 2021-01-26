import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

import ErrorFallback from './ErrorFallback'

function Recommendation() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cookies] = useCookies(['Authorization']);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true)
      try {
        const requestURL = new URL('recommendation', process.env.REACT_APP_API_URL)
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.Authorization
          },
        }
        const response = await fetch(requestURL, requestOptions)
        const result = await response.json()
        if (response.ok) {
          setItems(result)
        } else {
          setError(result.error)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getRecommendations()
  }, [cookies.Authorization])

  function handleReset() {
    localStorage.removeItem('user_input')
    navigate(`${process.env.PUBLIC_URL}/`);
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
      {isLoading && "Loading best recommendations for you..."}
      {error ?
        <ErrorFallback error={error} />
        :
        <ul>
          {renderList}
        </ul>
      }
      <button type="button" onClick={handleReset}>Try again</button>
    </>
  );
}

export default Recommendation;
