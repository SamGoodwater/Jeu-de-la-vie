    
    const btn = document.querySelector('.settings_btn');
    const modal = document.querySelector('.settings_box');
    const background = document.querySelector('.background-modal');
    btn.addEventListener('click',  (e) => {
       modal.classList.toggle('settings_box--open'); 
       background.classList.toggle('background-modal--visible'); 
    });
    background.addEventListener('click', (e) => {
        modal.classList.toggle('settings_box--open'); 
        background.classList.toggle('background-modal--visible'); 
    });

    const reload = document.querySelector('.reload');
    const cellSize_input = document.querySelector('#cellSize');
    const animationSpeed_input = document.querySelector('#animationSpeed');
    const cellDeathThreshold_input = document.querySelector('#cellDeathThreshold');
    const template_input = document.querySelector('#template');
    reload.addEventListener('click', (e) => {
        modal.classList.toggle('settings_box--open'); 
        background.classList.toggle('background-modal--visible'); 

        cellSize = cellSize_input.value;
        animationSpeed = animationSpeed_input.value;
        cellDeathThreshold = cellDeathThreshold_input.value;
        template = template_input.value;
        cols = Math.floor(canvas.width / cellSize);
        rows = Math.floor(canvas.height / cellSize);

        resizeCanvas();
        grid = createGrid(cols, rows);
        randomizeGrid(grid, template);
    });

    const canvas = document.getElementById('gameOfLifeCanvas');
    const ctx = canvas.getContext('2d');
    window.addEventListener('resize', () => {
        resizeCanvas();
        grid = createGrid(cols, rows);
        randomizeGrid(grid);
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let cellSize = 7;
    let animationSpeed = 200; // Temps en millisecondes entre chaque mise à jour
    const aliveColor = '#178790'; // Couleur des cellules vivantes
    const deadColor = '#303232';  // Couleur des cellules mortes
    let cellDeathThreshold = 0.7;
    let template = "random";

    let cols = Math.floor(canvas.width / cellSize);
    let rows = Math.floor(canvas.height / cellSize);

    let grid = createGrid(cols, rows);
    randomizeGrid(grid, template);

    function createGrid(cols, rows) {
        let grid = new Array(cols);
        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows).fill(0);
        }
        return grid;
    }

    function randomizeGrid(grid, pattern = 'random') {
        switch (pattern) {
            case 'glider':
                applyGliderPattern(grid);
                break;
            case 'block':
                applyBlockPattern(grid);
                break;
            case 'beehive':
                applyBeehivePattern(grid);
                break;
            case 'blinker':
                applyBlinkerPattern(grid);
                break;
            case 'toad':
                applyToadPattern(grid);
                break;
            case 'gosperGliderGun':
                applyGosperGliderGunPattern(grid);
                break;
            default:
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        grid[i][j] = Math.random() < 0.5 ? 1 : 0;
                    }
                }
                break;
        }
    }

    function applyGliderPattern(grid) {
        // Position de départ pour le glider (au centre de la grille)
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        // Glider pattern
        grid[midX][midY] = 1;
        grid[midX + 1][midY + 1] = 1;
        grid[midX + 1][midY + 2] = 1;
        grid[midX][midY + 2] = 1;
        grid[midX - 1][midY + 2] = 1;
    }

    function applyBlockPattern(grid) {
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        grid[midX][midY] = 1;
        grid[midX + 1][midY] = 1;
        grid[midX][midY + 1] = 1;
        grid[midX + 1][midY + 1] = 1;
    }

    function applyBeehivePattern(grid) {
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        grid[midX][midY] = 1;
        grid[midX + 1][midY - 1] = 1;
        grid[midX + 2][midY - 1] = 1;
        grid[midX + 3][midY] = 1;
        grid[midX + 1][midY + 1] = 1;
        grid[midX + 2][midY + 1] = 1;
    }

    function applyBlinkerPattern(grid) {
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        grid[midX][midY] = 1;
        grid[midX][midY + 1] = 1;
        grid[midX][midY + 2] = 1;
    }

    function applyToadPattern(grid) {
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        grid[midX][midY] = 1;
        grid[midX + 1][midY] = 1;
        grid[midX + 2][midY] = 1;
        grid[midX + 1][midY + 1] = 1;
        grid[midX + 2][midY + 1] = 1;
        grid[midX + 3][midY + 1] = 1;
    }

    function applyGosperGliderGunPattern(grid) {
        const midX = Math.floor(cols / 2);
        const midY = Math.floor(rows / 2);

        const pattern = [
            [midX - 18, midY],
            [midX - 17, midY],
            [midX - 18, midY + 1],
            [midX - 17, midY + 1],

            [midX - 8, midY],
            [midX - 8, midY + 1],
            [midX - 8, midY + 2],
            [midX - 7, midY - 1],
            [midX - 7, midY + 3],
            [midX - 6, midY - 2],
            [midX - 6, midY + 4],
            [midX - 5, midY - 2],
            [midX - 5, midY + 4],
            [midX - 4, midY + 1],
            [midX - 3, midY - 1],
            [midX - 3, midY + 3],
            [midX - 2, midY],
            [midX - 2, midY + 1],
            [midX - 2, midY + 2],
            [midX - 1, midY + 1],

            [midX + 2, midY],
            [midX + 2, midY - 1],
            [midX + 2, midY - 2],
            [midX + 3, midY],
            [midX + 3, midY - 1],
            [midX + 3, midY - 2],
            [midX + 4, midY + 1],
            [midX + 4, midY - 3],
            [midX + 6, midY + 1],
            [midX + 6, midY + 2],
            [midX + 6, midY - 3],
            [midX + 6, midY - 4],

            [midX + 16, midY - 1],
            [midX + 16, midY - 2],
            [midX + 17, midY - 1],
            [midX + 17, midY - 2]
        ];

        for (const [x, y] of pattern) {
            grid[x][y] = 1;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                ctx.fillStyle = grid[i][j] === 1 ? aliveColor : deadColor;
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function updateGrid() {
        let newGrid = createGrid(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let neighbors = countNeighbors(grid, i, j);
                if (grid[i][j] === 1) {
                    if (neighbors < 2 || neighbors > 3) {
                        newGrid[i][j] = 0;
                    } else {
                        newGrid[i][j] = 1;
                    }
                } else {
                    if (neighbors === 3) {
                        newGrid[i][j] = 1;
                    }
                }
            }
        }
        grid = newGrid;
    }

    function countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;
                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }

    function animate() {
        draw();
        updateGrid();
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, animationSpeed);
    }

    animate();
