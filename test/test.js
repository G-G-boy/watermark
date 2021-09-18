import watermark from '../dist/index.js';
watermark(
    {
        content: '啊啊啊-123456',
        x: -20,
    },
    document.getElementById('test'),
);
