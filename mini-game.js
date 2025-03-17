document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('mini-game-player');
    const obstacle = document.getElementById('mini-game-obstacle');
    const scoreDisplay = document.getElementById('mini-game-score').querySelector('span');
    const highScoreDisplay = document.getElementById('mini-game-high-score').querySelector('span');
    const startText = document.getElementById('mini-game-start-text');
    let isJumping = false;
    let isGameRunning = false;
    let score = 0;
    let highScore = 0;

    // Проверка, что элементы существуют
    if (!player || !obstacle || !scoreDisplay || !highScoreDisplay || !startText) {
        console.error("Элементы игры не найдены в DOM!");
        return;
    }

    console.log("Мини-игра загружена!");

    // Обработка нажатия пробела или касания
    function handleStart() {
        if (!isGameRunning) {
            startGame();
        } else if (!isJumping) {
            jump();
        }
    }

    // Запуск игры
    function startGame() {
        isGameRunning = true;
        startText.classList.add('hide'); // Скрываем текст начала игры
        score = 0;
        scoreDisplay.textContent = score;
        obstacle.style.animation = 'move 2s linear infinite'; // Запускаем препятствие
    }

    // Перезапуск игры
    function restartGame() {
        isGameRunning = false;
        startText.classList.remove('hide'); // Показываем текст начала игры
        obstacle.style.animation = 'none'; // Останавливаем препятствие
    }

    // Обработка нажатия пробела
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            handleStart();
        }
    });

    // Обработка касания на телефоне
    document.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение
        handleStart();
    });

    // Функция прыжка
    function jump() {
        isJumping = true;
        player.classList.add('jump'); // Добавляем класс для прыжка

        setTimeout(() => {
            player.classList.remove('jump'); // Убираем класс после завершения прыжка
            isJumping = false;
        }, 500); // Время прыжка (0.5 секунды)
    }

    // Проверка столкновений
    function checkCollision() {
        if (!isGameRunning) return; // Не проверяем столкновения, если игра не запущена

        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.bottom > obstacleRect.top
        ) {
            // Игра окончена
            if (score > highScore) {
                highScore = score; // Обновляем рекорд
                highScoreDisplay.textContent = highScore;
            }
            restartGame(); // Перезапускаем игру
            alert('Игра окончена! Нажмите пробел или коснитесь экрана, чтобы начать заново.');
        } else {
            // Увеличиваем счет
            score++;
            scoreDisplay.textContent = score;
        }
    }

    // Постоянная проверка столкновений
    setInterval(checkCollision, 10);

    // Масштабирование игры
    function scaleGame() {
        const gameContainer = document.querySelector('.mini-game-container');
        const scale = Math.min(window.innerWidth / 600, 1); // Масштабируем до 600px
        gameContainer.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', scaleGame);
    scaleGame(); // Инициализация при загрузке
});