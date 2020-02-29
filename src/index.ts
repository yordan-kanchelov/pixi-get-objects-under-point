import * as PIXI from "pixi.js";

import rabbitImage from "./assets/rabbit.png";
import getObjectsUnderPoint from "./getObjectsUnderPoint";

export class Main {
    private static readonly GAME_WIDTH = 1280;
    private static readonly GAME_HEIGHT = 720;

    private app: PIXI.Application | undefined;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", rabbitImage);
        loader.add("spriteExample", "./spritesData.json"); // example of loading spriteSheet

        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        //
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        this.intervalAddDisplayObjects(this.app.stage);

        this.app.stage.interactive = true;
        this.app.stage.addListener("click", e => {
            console.log(getObjectsUnderPoint(this.app, e));
        });
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        const stage = this.app.stage;
        stage.addChild(this.getRect(0xff0000, Main.GAME_WIDTH, Main.GAME_HEIGHT));

        document.body.appendChild(this.app.view);
    }

    private intervalAddDisplayObjects(stage: PIXI.Container) {
        setInterval(() => {
            switch (this.getRandomIntInclusive(0, 2)) {
                case 0:
                    const bunny = this.getBunny();
                    bunny.x = this.getRandomIntInclusive(0, Main.GAME_WIDTH);
                    bunny.y = this.getRandomIntInclusive(0, Main.GAME_HEIGHT);
                    stage.addChild(bunny);
                    break;
                case 1:
                    const rect = this.getRect(
                        this.getRandomIntInclusive(0, 4000000),
                        this.getRandomIntInclusive(100, 300),
                        this.getRandomIntInclusive(100, 300)
                    );
                    rect.x = this.getRandomIntInclusive(0, Main.GAME_WIDTH);
                    rect.y = this.getRandomIntInclusive(0, Main.GAME_HEIGHT);
                    stage.addChild(rect);
                    break;
                case 2:
                    const bird = this.getBird();
                    bird.x = this.getRandomIntInclusive(0, Main.GAME_WIDTH);
                    bird.y = this.getRandomIntInclusive(0, Main.GAME_HEIGHT);
                    stage.addChild(bird);
                    break;
            }
        }, 1000);
    }

    private getRect(color: number, width: number, height: number): PIXI.Graphics {
        let g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawRect(0, 0, width, height);
        g.endFill();
        g.alpha = 0.2;

        return g;
    }

    private getBunny(): PIXI.Sprite {
        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.scale.set(2, 2);
        bunny.alpha = 0.3;
        bunny.tint = this.getRandomIntInclusive(0, 100000000);

        return bunny;
    }

    private getBird(): PIXI.AnimatedSprite {
        const bird = new PIXI.AnimatedSprite([
            PIXI.Texture.from("birdUp.png"),
            PIXI.Texture.from("birdMiddle.png"),
            PIXI.Texture.from("birdDown.png"),
        ]);
        bird.tint = this.getRandomIntInclusive(0, 100000000);
        bird.loop = true;
        bird.animationSpeed = 0.1;
        bird.play();
        bird.scale.set(3);

        return bird;
    }

    private getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
}

new Main();
