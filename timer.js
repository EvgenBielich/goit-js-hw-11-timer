// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);


const refs = {
   startBtnEl: document.querySelector('.start'),
   stopBtnEl: document.querySelector('.stop'),
   daysEl: document.querySelector('.value[data-value="days"]'),
   hoursEl: document.querySelector('.value[data-value="hours"]'),
 minsEl: document.querySelector('.value[data-value="mins"]'),
 secsEl: document.querySelector('.value[data-value="secs"]'),
}

class CountdownTimer {
   constructor({ onTick, targetDate, selector }) {
      this.intervalId = null;
      this.isActive = false;
      this.onTick = onTick;
      this.targetDate = targetDate;
      this.selector = selector;
      this.init();
   }

   init() {
      const { days, hours, mins, secs } = this.getTimeComponents(0);
      this.onTick({ days, hours, mins, secs });
   }
   
   start() {
      if (this.isActive) {
          return;
      }
                     
      this.isActive = true;
      
      this.intervalId = setInterval(() => {
          const startTimer = this.targetDate;
          const currentTimer = Date.now();
          const deltaTime = startTimer - currentTimer;
          const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
          console.log(` ${days}: ${hours}: ${mins}: ${secs} `);
          // upDateClockFace({ days, hours, mins, secs });
    this.onTick({ days, hours, mins, secs });
      }, 1000);
   }
   
   stop() {
      console.log(this.intervalId),
         clearInterval(this.intervalId);
     this.isActive = false;
     const { days, hours, mins, secs } = this.getTimeComponents(0);
     this.onTick({ days, hours, mins, secs });
   }
   
   getTimeComponents(time) {
      const days =  this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours =  this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins =  this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
      return { days, hours, mins, secs };
      
      };
      
       pad(value) {
      return String(value).padStart(2, '0');
  }
}


const timer = new CountdownTimer({
   selector: '#timer-1',
   targetDate: new Date('Jul 17, 2021'),
  
   onTick: upDateClockFace,
});
     
function upDateClockFace({ days, hours, mins, secs }) {
   refs.daysEl.textContent = `${days}`,
       refs.hoursEl.textContent = `${hours}`,
       refs.minsEl.textContent = `${mins}`,
       refs.secsEl.textContent = `${secs}`
};

refs.startBtnEl.addEventListener('click', timer.start.bind(timer));
refs.stopBtnEl.addEventListener('click', timer.stop.bind(timer));