const locationSearch = document.querySelector("#locationSearch");
const roomCards = [...document.querySelectorAll(".room-card")];
const searchMessage = document.querySelector("#searchMessage");

document.querySelector("#searchButton").addEventListener("click", () => {
  const query = locationSearch.value.trim().toLowerCase();
  let visible = 0;
  roomCards.forEach((card) => {
    const matches = !query || card.dataset.location.includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  });
  searchMessage.textContent = visible
    ? `${visible} room option${visible === 1 ? "" : "s"} found${query ? ` for "${locationSearch.value.trim()}"` : ""}.`
    : `No demo rooms found for "${locationSearch.value.trim()}". Try Hyderabad, Guntur, Vijayawada, Vizag, or Bengaluru.`;
});

document.querySelectorAll(".book-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#roomChoice").value = button.dataset.room;
    document.querySelector("#bookingCheckin").value = document.querySelector("#checkin").value;
    document.querySelector("#bookingCheckout").value = document.querySelector("#checkout").value;
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#guestName").focus({ preventScroll: true });
  });
});

const bookingCheckin = document.querySelector("#bookingCheckin");
const bookingCheckout = document.querySelector("#bookingCheckout");
const bookingForm = document.querySelector("#bookingForm");

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = formatLocalDate(new Date());
bookingCheckin.min = today;
bookingCheckout.min = today;
bookingCheckin.addEventListener("change", () => {
  bookingCheckout.min = bookingCheckin.value || today;
  bookingCheckout.setCustomValidity("");
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingCheckout.setCustomValidity("");
  if (bookingCheckout.value <= bookingCheckin.value) {
    bookingCheckout.setCustomValidity("Check-out must be after check-in.");
    bookingCheckout.reportValidity();
    return;
  }

  const name = document.querySelector("#guestName").value.trim();
  const room = document.querySelector("#roomChoice").value;
  document.querySelector("#bookingMessage").textContent =
    `Demo request prepared for ${name}: ${room}, ${bookingCheckin.value} to ${bookingCheckout.value}. No reservation was sent or stored.`;
});
