window.onload = function() {

  /* scroll */
  let btnsScroll = document.querySelectorAll('.scroll-down');
  
  if(btnsScroll) {
    for(let i=0;i<btnsScroll.length;i++) {
      btnsScroll[i].addEventListener('click', function(e) {
        e.preventDefault();
        let wrap = document.querySelector(this.getAttribute('href'));
        setTimeout(function() {
          wrap.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
        
      });
    }
  }
 

}


