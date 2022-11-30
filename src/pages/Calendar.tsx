import 'bulma/css/bulma.css'
import { useState, Fragment } from 'react'
import format from 'date-fns/format'
import './Calendar.css'

// Image imports
import bff from '../images/bff.jpg'
import setuppi from '../images/se_olikin_setuppi.png'
import respect from '../images/respect.jpg'
import teheran from '../images/teheran.png'
import jalis from '../images/Jalisquotes.png'

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

function addKeys(arr: Array<Data[]>) {
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push({ key: `row-${i}`, columns: arr[i] })
  }
  return newArr
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

// Variables
const today = Number(format(new Date(), 'd'))

// Components

function ModalTopic({ media }: { media: Topic }) {
  return (
    <p className='is-size-4 is-align-self-center py-4 px-2' key={media}>
      {media}
    </p>
  )
}
function ModalVideo({ media }: { media: Video }) {
  return (
    <div key={media}>
      <iframe
        width='100%'
        height='480'
        src={`https://www.youtube.com/embed/${media}`}
        title='YouTube video player'
      ></iframe>
      <p className='my-3 py-2 is-size-4-mobile'>
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
  return <img src={media} alt='' height={300} width={300} key={media} />
}

function Door(props: Data) {
  const { day, topic, mediaType } = props

  const [isActive, setIsActive] = useState(false)
  const [locked, setLocked] = useState(String(day))

  const handleClick = (el: Element) => {
    if (day > today) {
      setLocked('🎅')
      setTimeout(() => setLocked(String(day)), 500)
    }
    if (day <= today) {
      setIsActive(true)
      openModal(el)
    }
  }
  return (
    <div
      className={`column has-text-centered is-3-desktop block door-${day}`}
      key={`door-${day}`}
    >
      <button
        className={`door-front is-size-2 ${day > today ? 'locked' : ''} ${
          isActive ? 'active' : ''
        }
        `}
        type='button'
        onClick={() =>
          handleClick(document.getElementById(`doorModal-${day}`)!)
        }
        key={`door-front-button-${day}`}
      >
        <p className={`${day === new Date().getDate() ? 'today' : ''}`}>
          {day === new Date().getDate() ? 'Avaa' : `${locked}`}
        </p>
      </button>
      <button
        className={`door-back is-size-2 ${day > today ? 'locked' : ''} ${
          isActive ? 'active' : ''
        }
        `}
        type='button'
        onClick={() =>
          handleClick(document.getElementById(`doorModal-${day}`)!)
        }
        key={day}
      >
        {locked}
      </button>
      <div className='modal' id={`doorModal-${day}`} key={`modal-${day}`}>
        <div className='modal-background' key={`modal-bg-${day}`}></div>
        <div className='modal-card' key={`modal-${day}`}>
          <header className='modal-card-head' key={`modal-head-${day}`}>
            <p
              className='modal-card-title'
              key={`modal-title-${day}`}
            >{`Luukku ${day}`}</p>
          </header>
          <div
            className={`modal-card-body polka ${
              mediaType === 'text' ? 'is-flex' : ''
            }`}
            key={`modal-body-${day}`}
          >
            {(() => {
              switch (mediaType) {
                case 'text':
                  return (
                    <ModalTopic
                      {...{
                        media: day <= today ? topic : 'Tonttu kurkkii...'
                      }}
                    />
                  )
                case 'video':
                  return (
                    <ModalVideo
                      {...{
                        media: day <= today ? topic : 'Tonttu kurkkii...'
                      }}
                    />
                  )
                case 'image':
                  return (
                    <ModalImage
                      {...{
                        media: day <= today ? topic : 'Tonttu kurkkii...'
                      }}
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

    if (e.key === 'ESC' || e.keyCode === 27) {
      // Escape key
      closeAllModals()
    }
  })

  const data: Data[] = [
    {
      day: 1,
      topic: '-Ea_1vStswA',
      mediaType: 'video'
    },
    {
      day: 2,
      topic: 'Mikä oli ensimmäinen tappelupelisi?',
      mediaType: 'text'
    },
    {
      day: 3,
      topic: respect,
      mediaType: 'image'
    },
    {
      day: 4,
      topic: 'Esittele mainisi ja miksi päädyit tähän/näihin',
      mediaType: 'text'
    },
    {
      day: 5,
      topic: '44depsi7b1E',
      mediaType: 'video'
    },
    {
      day: 6,
      topic: 'Hienoin liike tappelupeleissä on…?',
      mediaType: 'text'
    },
    {
      day: 7,
      topic: 'Mitkä ovat parhaat pelaamasi pelit tänä vuonna?',
      mediaType: 'text'
    },
    {
      day: 8,
      topic: bff,
      mediaType: 'image'
    },
    {
      day: 9,
      topic: 'vpYdEjvAg3k',
      mediaType: 'video'
    },
    {
      day: 10,
      topic: '_ykAXB3JFy4',
      mediaType: 'video'
    },
    {
      day: 11,
      topic: 'aZGKXhkzkAY',
      mediaType: 'video'
    },
    {
      day: 12,
      topic: jalis,
      mediaType: 'image'
    },
    {
      day: 13,
      topic: 'Mitä ohjainta käytät ja aiotko siirtyä toiseen?',
      mediaType: 'text'
    },
    {
      day: 14,
      topic: 'Jaa vuoden suosikkivideosi',
      mediaType: 'text'
    },
    {
      day: 15,
      topic: 'Päivän historia: Mitä sanoit aiempana vuonna tähän aikaan?',
      mediaType: 'text'
    },
    {
      day: 16,
      topic:
        'Flex Friday: Mitkä ovat parhaat saavutuksesi tänä vuonna taistelupeleissä?',
      mediaType: 'text'
    },
    {
      day: 17,
      topic: teheran,
      mediaType: 'image'
    },
    {
      day: 18,
      topic: 'Päivän musiikkivalinta',
      mediaType: 'text'
    },
    {
      day: 19,
      topic: 'Grapplerit: puolesta vai vastaan?',
      mediaType: 'text'
    },
    {
      day: 20,
      topic: 'Tee tier-lista jouluruoista',
      mediaType: 'text'
    },
    {
      day: 21,
      topic: 'Kiitä ja/tai anna tunnustusta toiselle kellarilaiselle',
      mediaType: 'text'
    },
    {
      day: 22,
      topic: `"They say the definition of insanity is repeating the same option over and over again and expecting different results. But hear me out - there's no way they'll expect me to do it again." - Deep Leffen Bot`,
      mediaType: 'text'
    },
    {
      day: 23,
      topic: setuppi,
      mediaType: 'image'
    },
    {
      day: 24,
      topic: 'Hyvää joulua! Mukavin muistosi Turpakellarista?',
      mediaType: 'text'
    }
  ]

  const chunks = chunk(data, 4)
  const rows = addKeys(chunks)

  return (
    <div className='calendar my-6'>
      <h1 className='p-6 is-size-3-desktop is-size-4-mobile has-text-centered'>
        TTP-joulukalenteri
      </h1>
      {rows.map((row) => {
        return (
          <div className='columns is-centered mt-3' key={row.key}>
            {row.columns.map((column: Data) => {
              return (
                <Fragment key={column.day}>
                  <Door {...column} />
                </Fragment>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
