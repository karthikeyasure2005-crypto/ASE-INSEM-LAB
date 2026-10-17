const locationSearch = document.querySelector("#locationSearch");
const roomCards = [...document.querySelectorAll(".room-card")];
const searchMessage = document.querySelector("#searchMessage");
const searchForm = document.querySelector("#searchForm");
const checkin = document.querySelector("#checkin");
const checkout = document.querySelector("#checkout");

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = formatLocalDate(new Date());
checkin.min = today;
checkout.min = today;

checkin.addEventListener("change", () => {
  checkout.min = checkin.value || today;
  checkout.setCustomValidity("");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkin.setCustomValidity("");
  checkout.setCustomValidity("");

  if (Boolean(checkin.value) !== Boolean(checkout.value)) {
    const missingDate = checkin.value ? checkout : checkin;
    missingDate.setCustomValidity("Enter both dates or leave both dates empty.");
    missingDate.reportValidity();
    searchMessage.textContent = "Enter both travel dates, or leave both blank.";
    return;
  }

  if (checkin.value && checkout.value <= checkin.value) {
    checkout.setCustomValidity("Check-out must be after check-in.");
    checkout.reportValidity();
    searchMessage.textContent = "Check-out must be after check-in.";
    return;
  }

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
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#guestName").focus({ preventScroll: true });
  });
});

document.querySelector("#bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#guestName").value.trim();
  const room = document.querySelector("#roomChoice").value;
  document.querySelector("#bookingMessage").textContent =
    `Thanks, ${name}! Your demo request for the ${room} has been recorded on this page. No real reservation was made.`;
});
