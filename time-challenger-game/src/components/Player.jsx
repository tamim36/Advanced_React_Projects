import { useRef, useState } from "react";

export default function Player() {
  const inputPlayerName = useRef()
  const [ playerName, setPlayerName ] = useState(null)

  const onClickSetPlayerName = () => {
    setPlayerName(inputPlayerName.current.value)
    inputPlayerName.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'Unknown player'}</h2>
      <p>
        <input type="text" ref={inputPlayerName} />
        <button onClick={onClickSetPlayerName} >Set Name</button>
      </p>
    </section>
  );
}
