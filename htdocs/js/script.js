window.onload = function() {

  let moveActive = false;

  function scrollDown() {
    if(!moveActive) {
      let cards = document.querySelector('#cards');
      if(cards) {
        cards.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        moveActive = true;
      }
      
    }
  }

  window.addEventListener('scroll', function() {
    
    if (window.pageYOffset > 100) {
      moveActive = true;
    } else if (window.pageYOffset == 0) {
      moveActive = false;
      setTimeout(scrollDown, 5000);
    }
  });

  
  setTimeout(scrollDown, 5000);


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

  //send form
 let form = document.querySelector('#subscribe');
 if(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', '/mail.php', true);
    request.send(formData);
    request.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText)
       let data = JSON.parse(this.responseText);
        if(data.success == 1) {
           console.log('Форма отправлена');
           document.querySelector('.success').classList.add('active');
        } else {        
         document.querySelector('#subscribe input[name="email"]').classList.add(data.email);
        }
        
      }
    });
  });
 }

 let overlay = document.querySelector('.success-overlay');
 let closeBtn = document.querySelector('.success-close ');

 overlay.addEventListener('click', function(e) {
  document.querySelector('.success').classList.remove('active');
 });

 closeBtn.addEventListener('click', function(e) {
  document.querySelector('.success').classList.remove('active');
 });
 

  //tabs
  let tabs = document.querySelectorAll('.tabs-top .tab');
  let tabText = document.querySelectorAll('.tabs-wrap .tab');

  for (let i=0; i<tabs.length;i++) {
   tabs[i].addEventListener("click", function(e) {
    e.preventDefault();
    tabs[i].classList.add('active');
    tabText[i].classList.add('active');
    for (let m=0; m<tabs.length;m++) {
         if(i != m) {
             tabs[m].classList.remove('active');
         }
    }
    for (let m=0; m<tabText.length;m++) {
         if(i != m) {
             tabText[m].classList.remove('active');
         }
    }     
   });
  }

 

}


