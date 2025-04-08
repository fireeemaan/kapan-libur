const remindBtn = document.getElementById("btn-remind-main");
const closeFormBtn = document.getElementById("btn-close-form");
const form = document.getElementById("form-bg");

const dayoffName = document.getElementById("dayoff-name");
const formSubtitle = document.getElementById("form-subtitle");

function showForm(e) {
   const trigger = e.currentTarget.id;

   if (trigger === "btn-remind-main") {
      formSubtitle.innerText = `"${dayoffName.innerText}"`;
   }

   form.style.display = "flex";
   form.classList.add("animate-fade-in");
   form.classList.remove("animate-fade-out");
}

function hideForm() {
   form.classList.add("animate-fade-out");
   form.classList.remove("animate-fade-in");

   const onAnimationEnd = () => {
      form.style.display = "none";
      form.removeEventListener("animationend", onAnimationEnd);
   };

   form.addEventListener("animationend", onAnimationEnd);
}

remindBtn.addEventListener("click", showForm);
closeFormBtn.addEventListener("click", hideForm);

function isEmailValid(email) {
   const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return reg.test(email);
}
