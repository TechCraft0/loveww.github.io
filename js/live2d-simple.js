/**
 * 简单的 Live2D 看板娘实现
 * 使用 CDN 资源，无需额外配置
 */

(function() {
    console.log('%c Live2D 加载中...', 'background: #5FB878; color: #fff; padding: 2px 5px; border-radius: 3px;');

    // 等待页面加载完成
    window.addEventListener('load', function() {
        // 创建 Live2D 容器
        var live2dContainer = document.createElement('div');
        live2dContainer.id = 'live2d-widget';
        live2dContainer.style.cssText = 'position: fixed; right: 0; bottom: 0; width: 200px; height: 350px; z-index: 999; pointer-events: none;';

        // 创建 canvas 元素
        var canvas = document.createElement('canvas');
        canvas.id = 'live2d-canvas';
        canvas.style.cssText = 'width: 100%; height: 100%; pointer-events: auto;';
        live2dContainer.appendChild(canvas);

        // 添加到页面
        document.body.appendChild(live2dContainer);

        // 加载 Live2D 库和模型
        setTimeout(function() {
            // 使用更简单的方式 - 直接显示一个可爱的静态图片/动图
            showSimpleAnimeCharacter();
        }, 1000);
    });

    // 显示简单的动漫角色
    function showSimpleAnimeCharacter() {
        // 移除旧的容器
        var oldContainer = document.getElementById('live2d-widget');
        if (oldContainer) {
            oldContainer.remove();
        }

        // 创建新的容器
        var container = document.createElement('div');
        container.id = 'waifu';
        container.innerHTML = `
            <div style="position: fixed; right: 20px; bottom: 0; width: 180px; height: 320px; z-index: 999; cursor: pointer; pointer-events: auto;">
                <canvas id="live2d" width="200" height="350"></canvas>
            </div>
            <div id="waifu-tips" style="position: fixed; right: 20px; bottom: 340px; width: 200px; min-height: 50px; z-index: 999; background: rgba(255,255,255,0.95); border-radius: 12px; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: none; pointer-events: auto; font-size: 13px; color: #333;">
                欢迎来到我的博客！
            </div>
        `;
        document.body.appendChild(container);

        // 加载 Live2D 核心
        loadScript('https://unpkg.com/live2d-widget/lib/L2Dwidget.min.js', function() {
            if (typeof L2Dwidget !== 'undefined') {
                L2Dwidget.init({
                    model: {
                        jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
                        scale: 1
                    },
                    display: {
                        position: 'right',
                        width: 180,
                        height: 320,
                        hOffset: 20,
                        vOffset: 0
                    },
                    mobile: {
                        show: true,
                        scale: 0.5
                    },
                    react: {
                        opacityDefault: 0.9,
                        opacityOnHover: 1
                    }
                });
                console.log('%c Live2D 看板娘已加载 ', 'background: #5FB878; color: #fff; padding: 2px 5px; border-radius: 3px;');
            }
        });
    }

    // 加载外部脚本的辅助函数
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        script.onerror = function() {
            console.error('Failed to load:', url);
            // 如果 Live2D 加载失败，显示一个简单的提示
            showFallbackMessage();
        };
        document.head.appendChild(script);
    }

    // 备用方案：显示简单的提示
    function showFallbackMessage() {
        var tips = document.createElement('div');
        tips.innerHTML = '🌸 欢迎来到我的博客！🌸';
        tips.style.cssText = 'position: fixed; right: 20px; bottom: 20px; z-index: 999; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); font-size: 14px; animation: bounce 2s infinite;';
        document.body.appendChild(tips);
    }

    // 添加对话提示功能
    var tips = [
        '欢迎来到我的博客！',
        '记得看看我的文章哦~',
        '点击右下角可以和我互动',
        '有什么问题可以留言',
        '祝你今天心情愉快！'
    ];

    // 每隔一段时间显示随机提示
    setInterval(function() {
        var tipElement = document.getElementById('waifu-tips');
        if (tipElement) {
            var randomTip = tips[Math.floor(Math.random() * tips.length)];
            tipElement.textContent = randomTip;
            tipElement.style.display = 'block';
            setTimeout(function() {
                tipElement.style.display = 'none';
            }, 3000);
        }
    }, 10000);
})();
