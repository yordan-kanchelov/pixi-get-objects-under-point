import * as PIXI from "pixi.js";

export default (app: PIXI.Application, e: PIXI.interaction.InteractionEvent): PIXI.Container[] => {
    console.time("get objects under point");

    const pool = [];
    const buffer = [app.stage as PIXI.DisplayObject];

    let displayObj: PIXI.Container;

    while (((displayObj as PIXI.DisplayObject) = buffer.splice(0, 1)[0])) {
        pool.push(displayObj);
        buffer.push(...displayObj.children);
    }

    const objectsUnderPoint = pool.filter(container => {
        return (
            container.x <= e.data.global.x &&
            e.data.global.x <= container.x + container.width &&
            container.y <= e.data.global.y &&
            e.data.global.y <= container.y + container.height
        );
    });

    console.timeEnd("get objects under point");

    return objectsUnderPoint;
};
