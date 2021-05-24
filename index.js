class CountdownTimer {
   constructor({ selector, targetDate}) {
     this.selector = selector;
     this.targetDate = targetDate;
     this.intervalId = null;
     this.refs = {
       days: document.querySelector(
         `${this.selector} span[data-value="days"]`
       ),
       hours: document.querySelector(
         `${this.selector} span[data-value="hours"]`
       ),
       minutes: document.querySelector(
         `${this.selector} span[data-value="mins"]`
       ),
       seconds: document.querySelector(
         `${this.selector} span[data-value="secs"]`
       ),
     };
   }
 
   startTimer = () => {
      this.intervalId = setInterval(() => {
       const currentTime = Date.now();
       const startTime = this.targetDate;
       const deltaTime = startTime - currentTime;
       const time = this.getTimeComponents(deltaTime);
       this.updateClockface(time);
     }, 1000);
   }
 
   stopTimer() {
       clearInterval(this.intervalId);
       const time = this.getTimeComponents(0);
       this.updateClockface(time); 
   }
 
   getTimeComponents(time) {
     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
     const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
 
     return { days, hours, mins, secs };
   }
   pad(value) {
     return String(value).padStart(2, 0);
   }
   
   updateClockface({ days ='00', hours = '00', mins ='00', secs='00' }) {
   this.refs.days.textContent = `${days}`;
   this.refs.hours.textContent = `${hours}`;
   this.refs.minutes.textContent = `${mins}`;
   this.refs.seconds.textContent = `${secs}`;
   } 
}
 
 const countDownTimer = new CountdownTimer({
   selector: '#timer-1',
   targetDate: new Date('Jun 08, 2021'),
 });
 
 
 
 if (countDownTimer.targetDate < Date.now()) {
   countDownTimer.stopTimer();
 } else {
   countDownTimer.startTimer();
 }