
        // Модальное окно входа
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const loginForm = document.getElementById('loginForm');
        
        // Загрузка сохраненных данных из localStorage
        window.addEventListener('DOMContentLoaded', () => {
            const savedUsername = localStorage.getItem('ligabank_username');
            const savedPassword = localStorage.getItem('ligabank_password');
            
            if (savedUsername) {
                document.getElementById('username').value = savedUsername;
            }
            
            if (savedPassword) {
                document.getElementById('password').value = savedPassword;
            }
        });
        
        // Открытие модального окна
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
            document.getElementById('username').focus();
        });
        
        // Закрытие модального окна
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        
        // Закрытие по клику вне окна
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
        
        // Закрытие по Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal.style.display === 'block') {
                loginModal.style.display = 'none';
            }
        });
        
        // Переключение видимости пароля
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
        
        // Сохранение данных формы
        // Сохранение данных формы входа
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            localStorage.setItem('ligabank_username', username);
            localStorage.setItem('ligabank_password', password);
            
            // Только закрываем окно входа, не открываем заявку
            loginModal.style.display = 'none';
            alert('Вход выполнен! (заглушка)');
        });
        
        // Слайдер
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Автопереключение слайдов
        setInterval(nextSlide, 5000);
        
        // Переключение по точкам
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Табы услуг
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Кредитный калькулятор
        // Кредитный калькулятор - замена purposeOptions на выпадающий список
        const purposeSelect = document.getElementById('loan-purpose-select');
        const submitBtn = document.querySelector('.submit-btn');

        // Обработчик изменения выбора цели кредита
        purposeSelect.addEventListener('change', () => {
            updateInterestRate();
            calculateLoan();
        });

        function updateInterestRate() {
            const purpose = purposeSelect.value;
            let rate = 0;
            
            switch(purpose) {
                case 'mortgage':
                    rate = 9.4;
                    break;
                case 'auto':
                    rate = 3.5;
                    break;
                case 'consumer':
                    rate = 14.5;
                    break;
            }
            
            document.getElementById('interest-rate').textContent = rate.toFixed(2).replace('.', ',') + '%';
        }

        function calculateLoan() {
            const propertyCost = parseFloat(document.getElementById('property-cost').value) || 0;
            const initialPayment = parseFloat(document.getElementById('initial-payment').value) || 0;
            const loanTerm = parseFloat(document.getElementById('loan-term').value) || 1;
            
            const loanAmount = Math.max(0, propertyCost - initialPayment);
            document.getElementById('loan-amount').textContent = formatMoney(loanAmount) + ' рублей';
            
            const purpose = purposeSelect.value;
            let annualRate = 0;
            
            switch(purpose) {
                case 'mortgage':
                    annualRate = 9.4;
                    break;
                case 'auto':
                    annualRate = 3.5;
                    break;
                case 'consumer':
                    annualRate = 14.5;
                    break;
            }
            
            const monthlyRate = annualRate / 12 / 100;
            const totalMonths = loanTerm * 12;
            const totalRate = Math.pow(1 + monthlyRate, totalMonths);
            
            let monthlyPayment = 0;
            if (totalRate !== 1) {
                monthlyPayment = loanAmount * monthlyRate * totalRate / (totalRate - 1);
            }
            
            document.getElementById('monthly-payment').textContent = formatMoney(Math.round(monthlyPayment)) + ' рублей';
            document.getElementById('required-income').textContent = formatMoney(Math.round(monthlyPayment * 2.22)) + ' рублей';
        }

        function formatMoney(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        // Инициализация калькулятора
        updateInterestRate();

        // Слушатели изменений для калькулятора
        document.getElementById('property-cost').addEventListener('input', calculateLoan);
        document.getElementById('initial-payment').addEventListener('input', calculateLoan);
        document.getElementById('loan-term').addEventListener('input', calculateLoan);
        submitBtn.addEventListener('click', () => {
            alert('Заявка отправлена! (заглушка)');
        });



        // Заявка на кредит
        const applicationModal = document.getElementById('applicationModal');
        const closeApplicationModal = document.getElementById('closeApplicationModal');
        const submitApplicationBtn = document.querySelector('.submit-application-btn');

        // Обновите обработчик кнопки "Оформить заявку"
        // Обновите обработчик кнопки "Оформить заявку"
        const zaya = document.querySelector('.zaya');
        zaya.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Заполняем данные в модальном окне
            document.getElementById('application-purpose').textContent = 
                purposeSelect.options[purposeSelect.selectedIndex].text;
            document.getElementById('application-cost').textContent = 
                formatMoney(document.getElementById('property-cost').value) + ' рублей';
            document.getElementById('application-payment').textContent = 
                formatMoney(document.getElementById('initial-payment').value) + ' рублей';
            document.getElementById('application-term').textContent = 
                document.getElementById('loan-term').value + ' лет';
            
            // Показываем модальное окно заявки
            applicationModal.style.display = 'block';
        });

        // Закрытие модального окна заявки
        closeApplicationModal.addEventListener('click', () => {
            applicationModal.style.display = 'none';
        });

        // Закрытие по клику вне окна
        window.addEventListener('click', (e) => {
            if (e.target === applicationModal) {
                applicationModal.style.display = 'none';
            }
        });

        // Обработка отправки формы заявки
        document.querySelector('.application-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Здесь должна быть логика отправки данных на сервер
            alert('Ваша заявка успешно отправлена!');
            applicationModal.style.display = 'none';
            
            // Генерируем новый номер заявки
            const currentNumber = parseInt(document.getElementById('application-number').textContent.slice(2));
            document.getElementById('application-number').textContent = '№ ' + (currentNumber + 1).toString().padStart(4, '0');
            
            // Очищаем форму
            document.getElementById('full-name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
        });

        // Мобильное меню
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        const navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);

        // Открытие/закрытие меню
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Закрытие меню по клику на overlay
        navOverlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
