/**
 * Nombre de secondes
 * @type {number}
 */
const MINUTES = 60
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS

/**
 * Elements du DOM
 * @type {{HTMLElement}}
 */
const elements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
}

/**
 * Element du DOM
 * @type {HTMLElement}
 */
const countdown = document.getElementById('countdown')

/**
 * Date définie dans le dataset en seconde
 * @type {number}
 */
const launchDate = Date.parse(countdown.dataset.time) / 1000

/**
 * Sauvegarde la différence précédente
 * @type {{}}
 */
let previousDiff = {}

/**
 * Execute toute les secondes un calcul pour connaitre la différence en secondes entre la date définie et la date actuelle
 * Donne en paramètre un objet avec les valeurs calculées à la fonction updateDom()
 */
function refreshCountdown() {
  const difference = launchDate - Date.now() / 1000

  const diff = {
    days: Math.floor(difference / DAYS),
    hours: Math.floor(difference % DAYS / HOURS),
    minutes: Math.floor(difference % HOURS / MINUTES),
    seconds: Math.floor(difference % MINUTES),
  }

  updateDom(diff)

  window.setTimeout(() => {
    window.requestAnimationFrame(refreshCountdown)
  }, 1000)
}

/**
 *  Mets à jours le DOM avec les nouvelles valeurs
 * @param {{days: number, hours: number, minutes: number, seconds: number}} diff
 */
function updateDom(diff) {
  Object.keys(diff).forEach((key) => {
    if (previousDiff[key] !== diff[key]) {
      elements[key].innerText = diff[key]
      console.log(`Updating: ${key}`)
    }
  })

  previousDiff = diff
}

refreshCountdown()
