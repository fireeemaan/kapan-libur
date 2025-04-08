const remindBtn = $("#btn-remind-main");
const closeFormBtn = $("#btn-close-form");
const btnSubmit = $("#btn-submit");
const form = $("#form-bg");
const email = $("#email");

const dayoffName = $("#dayoff-name");
const formSubtitle = $("#form-subtitle");

function showForm(e) {
   const trigger = $(e.currentTarget).attr("id");

   console.log(trigger);

   if (trigger === "btn-remind-main") {
      formSubtitle.text(`"${dayoffName.text()}"`);
   }

   form
      .css("display", "flex")
      .removeClass("animate-fade-out")
      .addClass("animate-fade-in");
}

function hideForm() {
   form.removeClass("animate-fade-in").addClass("animate-fade-out");

   email.val("");

   form.one("animationend", function () {
      form.css("display", "none");
   });
}

remindBtn.on("click", showForm);
closeFormBtn.on("click", hideForm);

function isEmailValid(email) {
   const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return reg.test(email);
}

function submitForm() {
   if (!isEmailValid(email.val())) {
      showAlert("error", "Email tidak valid!");
      return;
   } else {
      hideForm();
      showAlert("success", "Berhasil, anda akan mendapatkan pengingat!");
   }
}

btnSubmit.on("click", submitForm);

function showAlert(type, message) {
   const alertBox = $(
      `<div class="alert ${type} animate-slide-in">${message}</div>`
   );
   $("#alert-container").append(alertBox);

   setTimeout(() => {
      alertBox.removeClass("animate-slide-in").addClass("animate-slide-out");

      setTimeout(() => {
         alertBox.remove();
      }, 500);
   }, 2000);
}
