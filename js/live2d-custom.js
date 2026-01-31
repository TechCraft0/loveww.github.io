/**
 * Live2D 看板娘自定义配置
 * 支持多种动漫角色模型
 */

// 可用模型列表
const live2dModels = [
    {
        name: 'shizuku',
        displayName: '萌萌的 shizuku',
        path: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
    },
    {
        name: 'koharu',
        displayName: '可爱的小春',
        path: 'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json'
    },
    {
        name: 'haruto',
        displayName: '温柔的 haruto',
        path: 'https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json'
    },
    {
        name: 'izumi',
        displayName: '活泼的 izumi',
        path: 'https://unpkg.com/live2d-widget-model-izumi@1.0.5/assets/izumi.model.json'
    },
    {
        name: 'hibiki',
        displayName: '元气少女 hibiki',
        path: 'https://unpkg.com/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json'
    },
    {
        name: 'miku',
        displayName: '初音未来',
        path: 'https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json'
    },
    {
        name: 'wanko',
        displayName: '汪汪 wanko',
        path: 'https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json'
    },
    {
        name: 'z16',
        displayName: 'z16 少女',
        path: 'https://unpkg.com/live2d-widget-model-z16@1.0.5/assets/z16.model.json'
    },
    {
        name: 'chitose',
        displayName: '千岁 chitose',
        path: 'https://unpkg.com/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json'
    },
    {
        name: 'tsumiki',
        displayName: '积木 tsumiki',
        path: 'https://unpkg.com/live2d-widget-model-tsumiki@1.0.5/assets/tsumiki.model.json'
    },
    {
        name: 'Epsilon2.1',
        displayName: 'Epsilon 2.1',
        path: 'https://unpkg.com/live2d-widget-model-epsilon2_1@1.0.5/assets/Epsilon2.1.model.json'
    },
    {
        name: 'tororo',
        displayName: '萌萌 tororo',
        path: 'https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json'
    },
    {
        name: 'hijiki',
        displayName: '萌萌 hijiki',
        path: 'https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json'
    },
    {
        name: 'haru/01',
        displayName: 'haru 01',
        path: 'https://unpkg.com/live2d-widget-model-haru@1.0.5/assets/haru-01.model.json'
    },
    {
        name: 'haru/02',
        displayName: 'haru 02',
        path: 'https://unpkg.com/live2d-widget-model-haru@1.0.5/assets/haru-02.model.json'
    },
    {
        name: 'unitychan',
        displayName: 'unitychan',
        path: 'https://unpkg.com/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json'
    }
];

// 默认配置
const live2dConfig = {
    // 模型选择 (可以选择多个，会随机切换)
    model: {
        jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
        scale: 1
    },
    display: {
        position: 'right', // 显示位置：left 或 right
        width: 150,        // 看板娘宽度
        height: 300,       // 看板娘高度
        hOffset: 0,        // 水平偏移
        vOffset: -20       // 垂直偏移
    },
    mobile: {
        show: false,       // 移动端是否显示
        scale: 0.5
    },
    react: {
        opacityDefault: 0.9,
        opacityOnHover: 1
    }
};

// 初始化 Live2D
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 如果页面已经加载了 live2d-widget，使用其 API
        if (typeof L2Dwidget !== 'undefined') {
            L2Dwidget.init(live2dConfig);
        }
    } catch (e) {
        console.log('Live2D widget not loaded yet');
    }
});

console.log('%c Live2D 看板娘已加载 ', 'background: #5FB878; color: #fff; border-radius: 3px;');
