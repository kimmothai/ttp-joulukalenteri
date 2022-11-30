export default function Footer() {
  const names = [
    'Fyrkka-Pekka Setelius',
    'xX_PIG_DESTROYER_Xx',
    'Jeff Pesos',
    'LinkedIn Pöhinä Ukko',
    'Kimmo Thai',
    '"No thx" Jefferson',
    'Musclevania Bronicles',
    'Bodybuilders Against Tipping',
    'Killer Instinct MMO',
    'Edward Gordohands'
  ]
  return (
    <footer className='footer p-3 m-3 is-size-4 is-size-4-mobile'>
      <p className='text-end'>
        (c) {names[Math.floor(Math.random() * names.length)]}, 2022
      </p>
    </footer>
  )
}
