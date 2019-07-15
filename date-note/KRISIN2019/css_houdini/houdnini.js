'use strict'
registerPaint('overdraw', class {
    static get inputProperties() { return ['--border-width']; }
    paint(ctx, geom, properties) {
        const borderWidth = parseInt(properties.get('--border-width'));
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = borderWidth;

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(borderWidth,
                     borderWidth,
                     geom.width - 2 * borderWidth,
                     geom.height - 2 * borderWidth);
    }
});