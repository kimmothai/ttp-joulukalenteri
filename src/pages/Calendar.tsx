import 'bulma/css/bulma.css'
import { useState } from 'react'
import format from 'date-fns/format'
import bffCool from './bff.jpg'

// Types
type Video = string
type Image = string
type Topic = string

// Interfaces
interface Data {
  day: number
  topic: string
  mediaType: string
}

// Helper functions

function chunk(array: Data[], size: number): Array<Data[]> {
  const chunkedArr: Array<Data[]> = []
  let index = 0
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index))
    index += size
  }
  return chunkedArr
}

function openModal(el: Element) {
  el.classList.add('is-active')
}

function closeModal(el: Element) {
  el.classList.remove('is-active')
}

function closeAllModals() {
  ;(document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal)
  })
}

// Components

function ModalTopic({ media }: { media: Topic }) {
  return <p>Topic {media}</p>
}
function ModalVideo({ media }: { media: Video }) {
  return (
    <div>
      <iframe
        width='480'
        height='360'
        src={`https://www.youtube.com/embed/${media}`}
        title='YouTube video player'
      ></iframe>
      <p>
        <a
          href={`https://www.youtube.com/watch?v=${media}`}
          rel='noopener noreferrer'
          target='_blank'
        >{`https://www.youtube.com/watch?v=${media}`}</a>
      </p>
    </div>
  )
}
function ModalImage({ media }: { media: Image }) {
  return <img src={media} alt='' height={300} width={300} />
}

function Door(props: Data) {
  const { day, topic, mediaType } = props
  const today = Number(format(new Date(), 'd'))

  const [isActive, setIsActive] = useState(false)
  const [locked, setLocked] = useState(String(day))

  const handleClick = (el: Element) => {
    if (day > today) {
      setLocked('🎅')
      setTimeout(() => setLocked(String(day)), 500)
    }
    if (day <= today) {
      setIsActive((current) => !current)
      openModal(el)
    }
  }
  return (
    <div className={`column is-3 block door door-${day}`} key={`column-${day}`}>
      <button
        className={`door-front  ${isActive ? 'active' : ''}
        `}
        type='button'
        onClick={() =>
          handleClick(document.getElementById(`doorModal-${day}`)!)
        }
      >
        {locked}
      </button>
      <div className='modal' id={`doorModal-${day}`}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{`Luukku ${day}`}</p>
          </header>
          <div className='modal-card-body'>
            {(() => {
              switch (mediaType) {
                case 'text':
                  return (
                    <ModalTopic
                      {...{ media: day <= today ? topic : 'Tonttu kurkkii...' }}
                    />
                  )
                case 'video':
                  return (
                    <ModalVideo
                      {...{ media: day <= today ? topic : 'Tonttu kurkkii...' }}
                    />
                  )
                case 'image':
                  return (
                    <ModalImage
                      {...{ media: day <= today ? topic : 'Tonttu kurkkii...' }}
                    />
                  )
                default:
                  return <p>Tonttu kurkkii...</p>
              }
            })()}
            <button
              className='modal-close is-large'
              aria-label='close'
              onClick={() =>
                closeModal(document.getElementById(`doorModal-${day}`)!)
              }
            ></button>
          </div>
          <footer className='modal-card-foot'></footer>
        </div>
      </div>
    </div>
  )
}

export default function Calendar() {
  ;(
    document.querySelectorAll(
      '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest('.modal')

    $close.addEventListener('click', () => {
      closeModal($target!)
    })
  })

  document.addEventListener('keydown', (event) => {
    const e = event || window.event

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals()
    }
  })

  const data: Data[] = [
    {
      day: 30,
      topic:
        '1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla.',
      mediaType: 'text'
    },
    {
      day: 2,
      topic: '_ykAXB3JFy4',
      mediaType: 'video'
    },
    {
      day: 3,
      topic: bffCool,
      mediaType: 'image'
    },
    {
      day: 4,
      topic:
        '4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla.',
      mediaType: 'text'
    },
    {
      day: 5,
      topic: 'n2wjjPmjIOk',
      mediaType: 'video'
    },
    {
      day: 6,
      topic: bffCool,
      mediaType: 'image'
    }
  ]

  const rows = chunk(data, 4)
  return (
    <div className='calendar-jeejee'>
      <h1>TTP-joulukalenteri</h1>
      {rows.map((row) => {
        return (
          <div className='columns' key={`${row[0].day}`}>
            {row.map((column: Data) => {
              return <Door {...column} />
            })}
          </div>
        )
      })}
    </div>
  )
}
