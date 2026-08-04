// Edit this date/time if the event changes. Cairo is UTC+3 in August.
const EVENT_DATE =
new Date("2026-08-07T17:00:00+03:00");
function updateCountdown() {
  const gap = Math.max(0, EVENT_DATE.getTime() - Date.now());
  const values = {
    days: Math.floor(gap / 86400000),
    hours: Math.floor((gap / 3600000) % 24),
    minutes: Math.floor((gap / 60000) % 60),
    seconds: Math.floor((gap / 1000) % 60)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const start = new Date("2026-08-07T17:00:00+03:00");
const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

function toGoogleDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

const calendarParams = new URLSearchParams({
  action: "TEMPLATE",
  text: "Scientific Meeting",
  dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
  details: "Scientific meeting presented by Prof. Hend Shalaby discussing Nausea and Vomiting During Pregnancy.",
  location: "Qasr Elmashwyat, Mansoura"
});

document.getElementById("calendarLink").href =
  `https://calendar.google.com/calendar/render?${calendarParams}`;
document.getElementById("calendarLink").href = `https://calendar.google.com/calendar/render?${calendarParams}`;

document.querySelectorAll(".reveal").forEach((element, index) => {
  setTimeout(() => element.classList.add("visible"), 100 + index * 110);
});

// RSVP: paste your Formspree endpoint below, for example:
// const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
const FORMSPREE_ENDPOINT = "";
const form = document.getElementById("rsvpForm");
const message = document.getElementById("formMessage");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!FORMSPREE_ENDPOINT) {
    message.textContent = "Thank you — demo response confirmed. Add your Formspree endpoint in script.js to receive submissions.";
    form.reset();
    return;
  }
  message.textContent = "Sending…";
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
    if (!response.ok) throw new Error("Submission failed");
    message.textContent = "Thank you. Your attendance response has been received.";
    form.reset();
  } catch (error) {
    message.textContent = "Could not send your response. Please try again.";
  }
});
/* ========================================
   ENVELOPE OPENING INTRO
======================================== */

const envelopeIntro = document.getElementById("envelopeIntro");
const openInvitationButton = document.getElementById("openInvitation");

if (envelopeIntro && openInvitationButton) {
  openInvitationButton.addEventListener("click", function () {

    // منع الضغط أكثر من مرة
    if (envelopeIntro.classList.contains("opening")) {
      return;
    }

    // تشغيل حركة فتح الظرف
    envelopeIntro.classList.add("opening");

    // إظهار الموقع بعد خروج كارت الدعوة
    setTimeout(function () {
      envelopeIntro.classList.add("intro-finished");
      document.body.classList.remove("intro-locked");
    }, 2200);

    // إزالة شاشة الانترو بعد انتهاء الحركة
    setTimeout(function () {
      envelopeIntro.remove();
    }, 3400);

  });
}
