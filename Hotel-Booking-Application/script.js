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
