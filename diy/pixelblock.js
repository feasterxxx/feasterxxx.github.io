(function(){
    function init(){
        setupListeners();
        animate();
    }

    function setupListeners(){
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("touchmove", touchMoveHandler);
        document.addEventListener("touchstart", touchMoveHandler);
        window.addEventListener("resize", resizeHandler);
    }

    function resizeHandler(){
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    }

    function touchMoveHandler(event){
        if(event.touches.length > 0){
            for(let i = 0; i < event.touches.length; i++){
                createTrail(event.touches[i].clientX, event.touches[i].clientY, getRandomColor());
            }
        }
    }

    function mouseMoveHandler(event){
        cursorPosition.x = event.clientX;
        cursorPosition.y = event.clientY;
        createTrail(cursorPosition.x, cursorPosition.y, getRandomColor());
    }

    function createTrail(x, y, color){
        const trail = new PixelBlock();
        trail.init(x, y, color);
        trails.push(trail);
    }

    function updateTrails(){
        for(let i = 0; i < trails.length; i++){
            trails[i].update();
        }
        for(let i = trails.length - 1; i >= 0; i--){
            if(trails[i].lifeSpan < 0){
                trails[i].die();
                trails.splice(i, 1);
            }
        }
    }

    function animate(){
        requestAnimationFrame(animate);
        updateTrails();
    }

    function PixelBlock(){
        this.lifeSpan = 120;
        this.initialStyles = {
            position: "fixed",
            top: "0",
            display: "block",
            width: "10px",  // 设置为像素块
            height: "10px", // 设置为像素块
            background: "", // 颜色通过渐变设置
            pointerEvents: "none",
            zIndex: "10000000",
            willChange: "transform"
        };

        this.init = function(x, y, color){
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };
            this.position = { x: x - 5, y: y - 5 };
            this.initialStyles.background = color;
            this.element = document.createElement("div"); // 改为div元素
            applyStyles(this.element, this.initialStyles);
            this.update();
            document.body.appendChild(this.element);
        };

        this.update = function(){
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;
            this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${this.lifeSpan / 120})`;
        };

        this.die = function(){
            this.element.parentNode.removeChild(this.element);
        };
    }

    function applyStyles(element, styles){
        for(let key in styles){
            element.style[key] = styles[key];
        }
    }

    function getRandomColor(){
        // 渐变颜色数组，可以修改颜色值
        const gradientColors = [
            "linear-gradient(45deg, #ff9a9e, #fad0c4)",
            "linear-gradient(45deg, #a18cd1, #fbc2eb)",
            "linear-gradient(45deg, #fbc2eb, #a6c1ee)",
            "linear-gradient(45deg, #a1c4fd, #c2e9fb)"
        ];
        return gradientColors[Math.floor(Math.random() * gradientColors.length)];
    }

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    const cursorPosition = { x: screenWidth / 2, y: screenHeight / 2 };
    const trails = [];

    init();
})();
