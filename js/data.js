function getData(callback) {
   const groupedDayoff = {};

   $.get("https://dayoffapi.vercel.app/api", (data) => {
      data.forEach((item) => {
         const desc = item.keterangan;
         const date = item.tanggal;

         if (!groupedDayoff[desc]) {
            groupedDayoff[desc] = {
               keterangan: desc,
               is_cuti: item.is_cuti,
               tanggal: [date],
            };
         } else {
            groupedDayoff[desc].tanggal.push(date);
         }
      });

      const result = Object.values(groupedDayoff).map((item) => {
         return {
            keterangan: item.keterangan,
            is_cuti: item.is_cuti,
            duration: {
               startDate: formatDate(item.tanggal[0]),
               endDate: formatDate(item.tanggal[item.tanggal.length - 1]),
            },
         };
      });

      callback(result);
   });
}

function displayData() {
   getData((data) => {
      console.log(data);
   });
}

// function displayData() {
//    getData().then((data) => {
//       const dayOffCount = {};

//       data.forEach((item) => {
//          const dayOffName = item.keterangan;
//          if (dayOffCount[dayOffName]) {
//             dayOffCount[dayOffName]++;
//          } else {
//             dayOffCount[dayOffName] = 1;
//          }
//       });

//       console.log(dayOffCount);

//       for (const [key, value] of Object.entries(dayOffCount)) {
//          const p = $("<p></p>");
//          p.text(`Ada ${value} hari untuk libur  ${key}`);
//          $("body").append(p);
//       }

//       const now = new Date();
//       // const upcomingDayOff = data.find((item) => new Date(item.tanggal) > now);
//       const upcomingDayOff = findUpcomingDayOff(data);

//       if (upcomingDayOff) {
//          startCountdown(upcomingDayOff.tanggal, upcomingDayOff.keterangan);
//       }
//    });
// }

// function findUpcomingDayOff(data) {
//    const now = new Date();
//    const nowDate = now.toISOString().split("T")[0];

//    let lastKeterangan = null;

//    for (let i = 0; i < data.length; i++) {
//       const item = data[i];
//       const formattedDate = formatDate(item.tanggal);
//       const currentDate = new Date(formattedDate);

//       if (currentDate >= now) {
//          if (formattedDate !== nowDate || item.keterangan !== lastKeterangan) {
//             return {
//                tanggal: formattedDate,
//                keterangan: item.keterangan,
//             };
//          } else {
//             lastKeterangan = item.keterangan;
//          }
//       }
//    }
// }

function formatDate(date) {
   const [year, month, day] = date.split("-");
   const formattedDay = day.padStart(2, "0");

   return `${year}-${month}-${formattedDay}`;
}

function startCountdown(date, dayOffName) {
   const targetDate = new Date(formatDate(date) + "T00:00:00");
   const cdEl = $("#countdown");

   let timer;

   // console.log(`${date} - ${targetDate}`);

   function updateCountdown() {
      const now = new Date();
      const distance = targetDate - now;

      // console.log(now);

      if (distance <= 0) {
         clearInterval(timer);
         return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      cdEl.text(
         `${days}d ${hours}h ${minutes}m ${seconds}s Menuju ${dayOffName}`
      );
   }
   updateCountdown();
   timer = setInterval(updateCountdown, 1000);
}

displayData();
