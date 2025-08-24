const loginBtn = document.getElementById("btn-login");
const phoneNoValue = document.getElementById("phone-no");
const pinNoValue = document.getElementById("pin-no");
const main = document.getElementById("main");

// const allowedCredentials = [
//   {
//     phone: "01547889551",
//     pin: 5587,
//   },
//   {
//     phone: "01687102103",
//     pin: 8712,
//   },
//   {
//     phone: "01915574413",
//     pin: 1212,
//   },
// ];

const allowedPhone = "01547889551";
const allowedPin = "5587";

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (phoneNoValue.value === allowedPhone && pinNoValue.value === allowedPin) {
    window.location.href = "./home.html";
  } else {
    console.error("Failed");
    const toast = document.createElement("div");
    toast.classList.add("toast", "absolute", "right-3", "top-3", "h-max");
    toast.setAttribute("role", "toast");
    toast.innerHTML = `
    <div class="alert alert-error gap-2 text-white bg-red-600 border-red-500">
    <button id='close'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg></button>
    <span>Invalid Credentials! Try again</span>
  </div>`;
    main.appendChild(toast);
  }
  //   for (const cred of allowedCredentials) {
  // if (cred.phone === phoneNoValue && cred.pin === pinNoValue) {
  //   console.log("Success");
  // } else {
  //   console.error("Failed");
  // }
  //     console.log(cred.phone === phoneNoValue.value, phoneNoValue.value);
  //   }
  //   for (let i = 0; i < allowedCredentials.length; i++) {
  //     if (
  //       phoneNoValue === allowedCredentials[i].phone &&
  //       pinNoValue === allowedCredentials[i].pin
  //     ) {
  //       console.log("Success!");
  //     } else {
  //       console.error("Wrong inputs");
  //     }
  //   }
  document.getElementById("close").addEventListener("click", (e) => {
    const toast = e.target.parentNode.closest(".toast");
    toast.classList.add("fade");
    toast.addEventListener(
      "transitionend",
      () => {
        toast.remove();
      },
      { once: true }
    );
  });
});
