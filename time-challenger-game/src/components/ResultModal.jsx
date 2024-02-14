import { forwardRef } from 'react'

const ResultModal = forwardRef(({result, targetTime}, ref) => {

  return (
    <dialog ref={ref} className='result-modal'>
        <h3>You {result}</h3>
        <p>Your target time was <strong>{targetTime} seconds</strong></p>
        <p>Your stopped the timer with <strong>X seconds</strong> left</p>
        <form method='dialog'>
            <button>Close</button>
        </form>
    </dialog>
  )
})

export default ResultModal