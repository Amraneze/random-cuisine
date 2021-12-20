export const findPoint = (x: number, y: number, radius: number, cornerAngle: number): { x: number; y: number } => {
    const cornerAngleRadius = (cornerAngle * Math.PI) / 180;
    return { x: Math.cos(cornerAngleRadius) * radius + x, y: Math.sin(cornerAngleRadius) * radius + y };
};

interface Circle {
    innerRadius: number;
    outerRadius: number;
    endDegrees: number;
    startDegrees: number;
}

const circleWithDefaults = (options: Circle) => ({
    x: 100,
    y: 100,
    startRadians: (options.startDegrees * Math.PI) / 180,
    closeRadians: (options.endDegrees * Math.PI) / 180,
    radius1: options.innerRadius,
    radius2: options.outerRadius,
});

export const annularSector = (options: Circle): string => {
    const opts = circleWithDefaults(options);
    const p = [
        [opts.x + opts.radius2 * Math.cos(opts.startRadians), opts.y + opts.radius2 * Math.sin(opts.startRadians)],
        [opts.x + opts.radius2 * Math.cos(opts.closeRadians), opts.y + opts.radius2 * Math.sin(opts.closeRadians) + 3],
        [opts.x + opts.radius1 * Math.cos(opts.closeRadians), opts.y + opts.radius1 * Math.sin(opts.closeRadians)],
        [opts.x + opts.radius1 * Math.cos(opts.startRadians), opts.y + opts.radius1 * Math.sin(opts.startRadians)],
    ];
    const angleDiff = opts.closeRadians - opts.startRadians;
    const largeArc = angleDiff % (Math.PI * 2) > Math.PI ? 1 : 0;
    return `M${p[0].join()} A${[opts.radius1, opts.radius1, 0, largeArc, 1, p[1]].join()} L${p[2].join()} A${[
        opts.radius1,
        opts.radius1,
        0,
        largeArc,
        0,
        p[3],
    ].join()} z`;
};

export function isMarkerInSliceView(element: Element, marker: Element, threeshold = 0.8): boolean {
    const markerRect = marker.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const xmin = Math.max(markerRect.left, elementRect.left);
    const xmax1 = markerRect.left + markerRect.right;
    const xmax2 = elementRect.left + elementRect.right;
    const xmax = Math.min(xmax1, xmax2);
    if (xmax > xmin) {
        const ymin = Math.max(markerRect.top, elementRect.top);
        const ymax1 = markerRect.top + markerRect.bottom;
        const ymax2 = elementRect.top + elementRect.bottom;
        const ymax = Math.min(ymax1, ymax2);
        if (ymax > ymin) {
            const surfaceMarker = markerRect.right * markerRect.bottom;
            const surfaceIntersection = (xmax - xmin) * (ymax - ymin);
            return surfaceIntersection / surfaceMarker >= threeshold;
        }
    }
    return false;
}
