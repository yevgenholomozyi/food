window.addEventListener('DOMContentLoaded', () => {

    // TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        })
    }
    hideTabContent();

    function showTabContent(num=0) {
        tabContent[num].style.display = 'block';
    }
    showTabContent(); 

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach ((item, i) => {
                item.classList.remove('tabheader__item_active');
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
            target.classList.add('tabheader__item_active');
        }
    });

    // Timer

    const deadline = '2020-06-30';

    function getTimeRemaining (remainingTime) {
        let t = Date.parse(remainingTime) - Date.parse(new Date()), // converts dates to milsec and finds a diff
        seconds = Math.floor((t / 1000) % 60),      // converts milsec to sec; divides into 60 (as minutes) and get a remainder
        minutes = Math.floor((t / 1000 / 60) % 60), // converts milsec  to min; divides into 60 twice (as min and hours) and get a remainder 
        hours = Math.floor((t / (1000 *60 * 60)) % 24),    // converts mil mec to hours; divides into 60 twice 
        days = Math.floor(t / 1000 / 60 / 60 / 24); // // converts milmec to days;
        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    } // end of getTimeRemaining function

    function addZero(num) {
        if (num < 10 && num >=0) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (endtime) {
        days = document.getElementById('days'),
        hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds'),
        timeInterval = setInterval(upDateClock, 1000);
        
        upDateClock(); // udDateClock is called here to prevent a 1 second break between  DOM loading and the timer update

        function upDateClock() {
            let t =  getTimeRemaining(endtime);
            if (t.total > 0) {
            days.textContent = addZero(t.days), 
            hours.textContent = addZero(t.hours),
            minutes.textContent = addZero(t.minutes),
            seconds.textContent = addZero(t.seconds);
            } else {
                days.textContent = '0', 
                hours.textContent = '0',
                minutes.textContent = '0',
                seconds.textContent = '0';
                clearInterval(timeInterval);
            }
        }
    }
    setClock(deadline);

    // MODAL 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

            // open modal window 
    function callModal() {
        modal.classList.add('modal_active');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeout);
    }      
    
    function callModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            callModal();
            window.removeEventListener('scroll', callModalByScroll);
        }
    }
            // close modal window
    function closeModal() {
        modal.classList.remove('modal_active');
        document.body.style.overflow = 'visible';
    }
        // Call modal window on click of the button
    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            callModal();
        });
    });
        // call modal window every 40 sec
        const modalTimeout = setTimeout(callModal, 40000);

        // call modal window on scrolldown 
        window.addEventListener('scroll', callModalByScroll);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('modal_active')) {
            closeModal();
        }
    });

    // Cards
    const сardContent = [
        ['Это первый заголовок', 'это первый текст', 'это первая цена'],
        ['Это второй заголовок', 'это второй текст', 'это вторая цена'],
    ];
    class Card {
        constructor (classname, number) {
            this.number = number,
            this.elem = document.querySelectorAll(`.${classname}`)[number],
            this.subtitle = this.elem.querySelector(`.${classname}-subtitle`),
            this.descr = this.elem.querySelector(`.${classname}-descr`),
            this.totalPrice = this.elem.querySelector(`.${classname}-total`)
        }
        assignSubtitle(number=this.number) {
            this.subtitle.textContent = сardContent[number][0];
        }
        assignDescr(number=this.number) {
            this.descr.textContent = сardContent[number][1];
        }
        assignTotalPrice(number=this.number) {
            this.totalPrice.textContent = сardContent[number][2];
        }
    }

    const firstCard = new Card('menu__item', 0);

    firstCard.assignSubtitle();
    firstCard.assignDescr();
    firstCard.assignTotalPrice();

    const secondCard = new Card('menu__item', 1);
    secondCard.assignSubtitle();
    secondCard.assignDescr();
    secondCard.assignTotalPrice();

    // СOMMUNICATION WITH THE SERVER

    const forms = document.querySelectorAll('form'),
        message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    // function to send data from the forms to the server
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // show spinner for loading
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            // communication with the server
            const formData = new FormData(form);

            // data from the forms can not be stringified to JSON directly. An interim object must be created
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    
    // function to show a message on sending data to the server

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.style.display = 'none';
        callModal(); 
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>&times</div>
                <div class = 'modal__title'>${message}</div> 
            </div>
        `
        document.querySelector('.modal').append(thanksModal);
        // remove notice
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeModal();
        }, 4500)
    }
})