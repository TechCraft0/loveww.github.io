/**
 * 动态背景特效
 * 包含：数字雨、飘落的樱花、飘落的爱心
 */

(function() {
    'use strict';

    // 配置：选择特效类型
    // 可选值: 'matrix' (数字雨), 'sakura' (樱花), 'heart' (爱心), 'star' (星星)
    const EFFECT_TYPE = 'star'; // 在这里修改特效类型

    // Canvas 设置
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -3;';
    document.body.appendChild(canvas);

    let width, height;
    let animationId;
    let elements = [];

    // 调整 Canvas 大小
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // ==================== Matrix 数字雨效果 ====================
    class MatrixEffect {
        constructor() {
            this.fontSize = 14;
            this.columns = Math.floor(width / this.fontSize);
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = Math.random() * -100; // 随机初始位置
            }
            // 技术字符集
            this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        draw() {
            // 半透明黑色背景，形成拖尾效果
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // 绿色字符
            ctx.font = this.fontSize + 'px monospace';

            for (let i = 0; i < this.drops.length; i++) {
                // 随机字符
                const text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;

                // 随机亮度变化
                const brightness = Math.random();
                if (brightness > 0.95) {
                    ctx.fillStyle = '#FFF'; // 偶尔出现白色高亮
                } else if (brightness > 0.8) {
                    ctx.fillStyle = '#0F0'; // 绿色
                } else {
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // 半透明绿色
                }

                ctx.fillText(text, x, y);

                // 如果超出屏幕底部，随机重置到顶部
                if (y > height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }

                // 下落速度
                this.drops[i]++;
            }
        }
    }

    // ==================== 飘落的樱花效果 ====================
    class SakuraEffect {
        constructor() {
            this.petals = [];
            this.maxPetals = 50;
        }

        createPetal() {
            return {
                x: Math.random() * width,
                y: -20,
                size: Math.random() * 10 + 5,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 + 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.5
            };
        }

        draw() {
            ctx.clearRect(0, 0, width, height);

            // 补充花瓣
            while (this.petals.length < this.maxPetals) {
                this.petals.push(this.createPetal());
            }

            this.petals.forEach((petal, index) => {
                ctx.save();
                ctx.translate(petal.x, petal.y);
                ctx.rotate(petal.rotation * Math.PI / 180);

                // 绘制花瓣
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 183, 197, ${petal.opacity})`;
                ctx.ellipse(0, 0, petal.size, petal.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                // 更新位置
                petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
                petal.y += petal.speedY;
                petal.rotation += petal.rotationSpeed;

                // 移除超出屏幕的花瓣
                if (petal.y > height + 20) {
                    this.petals[index] = this.createPetal();
                }
            });
        }
    }

    // ==================== 飘落的爱心效果 ====================
    class HeartEffect {
        constructor() {
            this.hearts = [];
            this.maxHearts = 30;
        }

        createHeart() {
            return {
                x: Math.random() * width,
                y: -20,
                size: Math.random() * 15 + 10,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                color: ['#FF6B6B', '#FF8E8E', '#FFB4B4', '#FFD1D1'][Math.floor(Math.random() * 4)]
            };
        }

        draw() {
            ctx.clearRect(0, 0, width, height);

            while (this.hearts.length < this.maxHearts) {
                this.hearts.push(this.createHeart());
            }

            this.hearts.forEach((heart, index) => {
                ctx.save();
                ctx.translate(heart.x, heart.y);

                // 绘制爱心
                ctx.beginPath();
                ctx.fillStyle = heart.color;
                ctx.globalAlpha = heart.opacity;

                // 爱心公式
                const size = heart.size;
                ctx.moveTo(0, -size / 4);
                ctx.bezierCurveTo(size / 2, -size / 2, size, 0, 0, size);
                ctx.bezierCurveTo(-size, 0, -size / 2, -size / 2, 0, -size / 4);
                ctx.fill();

                ctx.restore();

                // 更新位置
                heart.x += heart.speedX + Math.sin(heart.y * 0.02) * 0.3;
                heart.y += heart.speedY;

                // 移除超出屏幕的爱心
                if (heart.y > height + 20) {
                    this.hearts[index] = this.createHeart();
                }
            });
        }
    }

    // ==================== 星星效果 ====================
    class StarEffect {
        constructor() {
            this.stars = [];
            this.maxStars = 100;
        }

        createStar() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                opacity: Math.random(),
                speed: Math.random() * 0.5 + 0.1,
                twinkle: Math.random() * 0.02 + 0.01
            };
        }

        draw() {
            ctx.clearRect(0, 0, width, height);

            while (this.stars.length < this.maxStars) {
                this.stars.push(this.createStar());
            }

            this.stars.forEach(star => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // 闪烁效果
                star.opacity += star.twinkle;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.twinkle = -star.twinkle;
                }

                // 缓慢向下移动
                star.y += star.speed;
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
            });
        }
    }

    // ==================== 初始化和动画循环 ====================
    let effect;

    switch(EFFECT_TYPE) {
        case 'matrix':
            effect = new MatrixEffect();
            break;
        case 'sakura':
            effect = new SakuraEffect();
            break;
        case 'heart':
            effect = new HeartEffect();
            break;
        case 'star':
            effect = new StarEffect();
            break;
        default:
            effect = new MatrixEffect();
    }

    function animate() {
        effect.draw();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // 添加控制面板（可选）
    console.log('%c 动态背景特效已加载 ', 'background: linear-gradient(90deg, #667eea, #764ba2); color: #fff; padding: 3px 8px; border-radius: 4px;');
    console.log('%c 当前特效: ' + EFFECT_TYPE, 'color: #5FB878; font-weight: bold;');
    console.log('%c 可选特效: matrix, sakura, heart, star', 'color: #49b1f5;');

    // 暴露切换函数到全局（方便调试）
    window.changeBackgroundEffect = function(type) {
        cancelAnimationFrame(animationId);
        switch(type) {
            case 'matrix':
                effect = new MatrixEffect();
                break;
            case 'sakura':
                effect = new SakuraEffect();
                break;
            case 'heart':
                effect = new HeartEffect();
                break;
            case 'star':
                effect = new StarEffect();
                break;
            default:
                effect = new MatrixEffect();
        }
        animate();
        console.log('%c 特效已切换为: ' + type, 'color: #5FB878; font-weight: bold;');
    };

})();
