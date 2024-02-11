import { useEffect, useState } from "react";

export default function Player() {
  const [ playerName, setPlayerName ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)

  const onClickSetPlayerName = () => {
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setPlayerName(e.target.value)
    setSubmitted(false)
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? playerName : 'Unknown player'}</h2>
      <p>
        <input type="text" onChange={handleChange} value={playerName} />
        <button onClick={onClickSetPlayerName} >Set Name</button>
      </p>
    </section>
  );
}
