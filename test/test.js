import watermark from '../dist/index.js';
const remove = watermark(
    {
        content: '啊啊啊-123456',
        x: -20,
        pageWidth: 2000,
    },
    document.getElementById('test'),
);

setTimeout(() => {
    remove();
}, 3000);
