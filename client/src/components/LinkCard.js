import React, {useState, useEffect} from 'react'

export const LinkCard = ({link}) => {
  const [counter, setCounter] = useState(link.clicks)

  return (
    <>
      <h2>Ссылка</h2>
      
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer" onClick={() => setCounter(counter + 1)}>{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer" >{link.from}</a></p>
      <p>Количесвто кликов по ссылке: <strong>{counter}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}
