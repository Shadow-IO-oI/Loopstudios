

export function menuInit() {
   if (document.querySelector(".menu-button")) {
      document.addEventListener("click", function (e) {
         if (bodyLockStatus && e.target.closest('.menu-button')) {
            bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
         }
      });
   };
}
export function menuOpen() {
   bodyLock();
   document.documentElement.classList.add("menu-open");
}
export function menuClose() {
   bodyUnlock();
   document.documentElement.classList.remove("menu-open");
}