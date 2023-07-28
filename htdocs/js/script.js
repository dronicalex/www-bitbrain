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
           document.querySelector('.success-inner-title').innerHTML = 'Ваш e-mail адрес добавлен в рассылку';
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



  //popups
  let popupBtns = document.querySelectorAll('.popup-btn');
  let btnsCloseMenu = document.querySelectorAll('.popup-close');
  let body = document.querySelector('body');

  function createOverlay() {
    let overlays = document.querySelectorAll('.overlay');
    if(overlays.length < 1) {
      let overlay = document.createElement("div");
      overlay.classList.add('overlay');
      body.appendChild(overlay);
    }
  }

  if(popupBtns) {
    for (let m=0; m<popupBtns.length;m++) {
      popupBtns[m].addEventListener('click', function(e) {
        e.preventDefault();
        
        body.classList.add('mobile');
        createOverlay();

        let link = this.getAttribute('href');
        document.querySelector(link).classList.add('active');
      });
    }
  }
  if(btnsCloseMenu) {
    for (let m=0; m<btnsCloseMenu.length;m++) {
      btnsCloseMenu[m].addEventListener('click', function() {
        closePopup();
      });
    }
  }

  function closePopup() {
    let popups = document.querySelectorAll('.popup');
    body.classList.remove('mobile');
    detach(document.querySelector('.overlay'));
    if(popups) {
      for (let m=0; m<popups.length;m++) {
        popups[m].classList.remove('active');
      }
    }
  }

  function detach(node) {
    return node.parentElement.removeChild(node);
  }


  body.addEventListener('click', function(e) {
    let eClassName = e.target.className;
    if(eClassName.length > 0) {
      eClassName = eClassName.split(' ')[0];
    } 
    
    if(eClassName == 'overlay' || eClassName == 'popup') {
      closePopup();
    }
  });



 //form input text
 let inputsAll = document.querySelectorAll('input, textarea');
 let labels = document.querySelectorAll('.form-group label');
 for (let m=0; m<inputsAll.length;m++) {
  inputsAll[m].addEventListener('focus', function() {
     this.closest('.form-group').classList.add('has_value');
   });
   inputsAll[m].addEventListener('focusout', function() {
    
     if(this.value.length === 0) {
       this.closest('.form-group').classList.remove('has_value');
     } else {
       this.closest('.form-group').classList.add('has_value');
     }
   });
 }

 if(labels) {
   for (let m=0; m<labels.length;m++) {
     labels[m].addEventListener('click', function() {
       this.closest('.form-group').classList.add('has_value');
       let input = this.closest('.form-group').querySelector('input');
       let textarea = this.closest('.form-group').querySelector('textarea');
       if(input) {
         input.focus();
       }
       if(textarea) {
         textarea.focus();
       }
     });
   }
 }

 //send form 2
 let form2 = document.querySelector('#callback');
 if(form2) {
  form2.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData2 = new FormData(form2);
    let request = new XMLHttpRequest();
    request.open('POST', '/mail.php', true);
    request.send(formData2);
    request.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText)
       let data = JSON.parse(this.responseText);
        if(data.success == 1) {
           console.log('Форма отправлена');
           closePopup();
           document.querySelector('.success-inner-title').innerHTML = 'Наш менеджер свяжется с вами в тение 15 минут';
           document.querySelector('.success').classList.add('active');
        } else {        
          document.querySelector('#callback input[name="username"]').parentElement.classList.add(data.username);
          document.querySelector('#callback input[name="email"]').parentElement.classList.add(data.email);
          document.querySelector('#callback input[name="whatsapp"]').parentElement.classList.add(data.whatsapp);
          document.querySelector('#callback input[name="telegram"]').parentElement.classList.add(data.telegram);
        }
        
      }
    });
  });
 }

 
 let inputs = document.querySelectorAll('#callback input');
 for (let i=0; i<inputs.length;i++) {
  inputs[i].addEventListener('change', function() {
    this.parentElement.classList.remove('is-invalid');
  });

  inputs[i].addEventListener('keydown', function() {
    this.parentElement.classList.remove('is-invalid');
  });
 }

 //form trigger
 setTimeout(startWidget, 10000);
 
 function startWidget() {
    document.querySelector('.widget-icon').click();
 }

}


