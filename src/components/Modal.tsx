interface IModal {
  open: boolean
  day: number
  message: string
}

export default function Modal(props: IModal) {
  const { open, day, message } = props
  if (!open) return null
  return (
    <div className='modal' tabIndex={-1} id={`doorModal-${day}`} key={message}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <h5 className='modal-title'>{message}</h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
        <div className='modal-body bg-primary'>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-dismiss='modal'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
