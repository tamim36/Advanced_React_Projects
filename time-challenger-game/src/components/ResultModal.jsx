import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(({timeRemaining, targetTime, resetTime}, ref) => {

  const dialogRef = useRef()

  const userLost = timeRemaining <= 0
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2)
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)

  useImperativeHandle(ref, () => {
    return {
      openDialog () {
        dialogRef.current.showModal()
      }
    }
  })

  return createPortal(
    <dialog ref={dialogRef} className='result-modal' onClose={resetTime}>
      {userLost ? <h3>You Lost</h3> : <h3>Your score is {score}</h3>}
      <p>Your target time was <strong>{targetTime} seconds</strong></p>
      <p>Your stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left</p>
      <form method='dialog' onSubmit={resetTime}>
        <button>Close</button>
      </form>
    </dialog>, 
    document.getElementById("modal")
  )
})

export default ResultModal