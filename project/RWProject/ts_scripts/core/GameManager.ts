/* =========================================================================
 *
 *  GameManager.ts
 *  .....
 *
 * ========================================================================= */
/// <reference path="./GameItems.ts" />
module ECS {
    declare var PIXI: any;
    declare var data: any;
    declare var FidoAudio: any;
    

    export class GameObjectPool{
        classType:any;
        pool:any;
        constructor(classType:any){
            this.classType=classType;
            this.pool = [];
        }

        getObject()
        {
            var object = this.pool.pop();
            if(!object)
            {
                object =  new this.classType();
                
            }
            return object;
        }
    }


    export class SegmentManager{
        engine:any;
        sections:any;
        count:number;
        currentSegment:any;
        startSegment:any;
        chillMode:boolean;
        last:number;
        position:number;
  

        constructor(engine:any){
          console.log("init segmeng manager!");
          this.engine = engine;  
          this.sections = data;
          this.count = 0;
          this.currentSegment = data[0]
          this.startSegment = {length:1135 * 2, floor:[0,1135], blocks:[], coins:[]},
          this.chillMode = true;
          this.last = 0; 
          this.position = 0;
        }

        reset(dontReset:boolean)
        {
            if(dontReset)this.count = 0;
            this.currentSegment = this.startSegment;
            this.currentSegment.start = -200;
            
            for ( var i = 0; i < this.currentSegment.floor.length; i++) 
            {
                this.engine.floorManager.addFloor( this.currentSegment.start + this.currentSegment.floor[i]);
            }
        }

        update()
        {
            this.position = GameConfig.camera.x + GameConfig.width * 2;
            // look at where we are..
            var relativePosition = this.position - this.currentSegment.start;
            
            if(relativePosition > this.currentSegment.length)
            {
                
                    
                if(this.engine.joyrideMode)
                {
                    var nextSegment = this.startSegment
                    nextSegment.start = this.currentSegment.start + this.currentSegment.length;
                    this.currentSegment = nextSegment;
            
                    for ( var i = 0; i < this.currentSegment.floor.length; i++) 
                    {
                        this.engine.floorManager.addFloor(this.currentSegment.start + this.currentSegment.floor[i]);
                    }
                    
                    return;
                }
                
                
                var nextSegment = this.sections[this.count % this.sections.length];

                // section finished!
                nextSegment.start = this.currentSegment.start + this.currentSegment.length;
                
                this.currentSegment = nextSegment;
            
                // add the elements!
                for ( var i = 0; i < this.currentSegment.floor.length; i++) 
                {
                    this.engine.floorManager.addFloor(this.currentSegment.start + this.currentSegment.floor[i]);
                }
                
                var blocks = this.currentSegment.blocks;
                var length = blocks.length/2;
                
                for ( var i = 0; i < length; i++) 
                {
                    //this.engine.enemyManager.addEnemy(this.currentSegment.start + blocks[i*2], blocks[(i*2)+1]);
                }
                
                var pickups = this.currentSegment.coins;
                var length = pickups.length/2;
                
                for ( var i = 0; i < length; i++) 
                {
                    this.engine.pickupManager.addPickup(this.currentSegment.start + pickups[i*2], pickups[(i*2)+1]);
                }
                
                this.count ++;
                
            }
            
        }
    
    }


    export class EnemyManager{
        engine:any;
        enemies:any;
        enemyPool:any;
        spawnCount:number;
        explosion:any;
        isHit:boolean;
        view:any;
        position:any;
        constructor(engine:any){
            console.log("init enemy manager!");
            this.engine = engine;
            this.enemies = [];
            this.enemyPool = new GameObjectPool(GameEnemy);
            this.spawnCount = 0;
        }

        update()
        {
            for (var i = 0; i < this.enemies.length; i++) 
            {
                var enemy = this.enemies[i]
                enemy.update();
                
                if(enemy.view.position.x < -100 -GameConfig.xOffset && !this.engine.player.isDead)
                {
                    //this.enemyPool.returnObject(enemy);
                    this.enemies.splice(i, 1);
                    
                    this.engine.view.gameFront.removeChild(enemy.view);
                    i--;
                }
            }
        }
        
        addEnemy(x, y)
        {
            var enemy = this.enemyPool.getObject();
            enemy.position.x = x
            enemy.position.y = y
            this.enemies.push(enemy);
            this.engine.view.gameFront.addChild(enemy.view);
        }
        
        destroyAll()
        {
            for (var i = 0; i < this.enemies.length; i++) 
            {
                var enemy = this.enemies[i];
                enemy.reset();
                //this.enemyPool.returnObject(enemy);
                this.engine.view.gameFront.removeChild(enemy.view);
            }
            
            this.enemies = [];
        }
        
        destroyAllOffScreen()
        {
            for (var i = 0; i < this.enemies.length; i++) 
            {
                var enemy = this.enemies[i];
                
                if(enemy.x > GameConfig.camera.x + GameConfig.width)
                {
                    //this.enemyPool.returnObject(enemy);
                    this.engine.view.game.removeChild(enemy.view);
                    this.enemies.splice(i, 1);
                    i--;
                }
            }
        }
    }

    export class PickupManager{
        engine:any;
        pickups:any;
        pickupPool:any;
        spawnCount:number;
        pos:any;
        constructor(engine:any){
            console.log("init pick up manager!");
            this.engine=engine;
            this.pickups = [];
            this.pickupPool = new GameObjectPool(PickUp);        
            this.spawnCount = 0;
            this.pos = 0

        }

        update(){
            if(this.engine.joyrideMode)
            {
                this.spawnCount += GameConfig.time.DELTA_TIME;
                
                if(this.spawnCount > 5)
                {
                    this.pos += 0.15;
                    this.spawnCount = 0;
                    this.addPickup(GameConfig.camera.x + GameConfig.width, 280 + Math.sin(this.pos) * 180)
                }
            }
            
            for (var i = 0; i < this.pickups.length; i++) 
            {
                var pickup = this.pickups[i]
                
                pickup.update();
                
                if(pickup.isPickedUp)
                {

                        
                    pickup.ratio += (1-pickup.ratio)*0.3 * GameConfig.time.DELTA_TIME;

                    if(pickup.ratio > 0.99)
                    {
                                    
                        //this.pickupPool.returnObject(pickup);
                        this.pickups.splice(i, 1);
                        this.engine.view.game.removeChild(pickup.view);
                        i--;
                    }
            
                }
                else
                {
                    
                    
                    if(pickup.view.position.x < -100-GameConfig.xOffset)
                    {
                        // remove!
                        this.engine.view.game.removeChild(pickup.view);
                        //this.pickupPool.returnObject(pickup);
                        this.pickups.splice(i, 1);
                        i--;
                    }
                }
                
            }
        }

        addPickup(x, y)
        {
            var pickup = this.pickupPool.getObject();
            pickup.position.x = x
            pickup.position.y = y
            
            this.pickups.push(pickup);
            this.engine.view.game.addChild(pickup.view);
        }

        removePickup(index)
        {
            var pickup = this.pickups[index];
            pickup.isPickedUp = true;
            pickup.player = this.engine.player;
            pickup.pickupPosition = {x:pickup.position.x, y:pickup.position.y}//.clone();
            pickup.ratio = 0;
        }


        destroyAll()
        {
            for (var i = 0; i < this.pickups.length; i++) 
            {
                var pickup = this.pickups[i]
                    // remove!
                //this.pickupPool.returnObject(pickup);
                this.engine.view.game.removeChild(pickup.view);
            }
            
            this.pickups = [];
        }

        destroyAllOffScreen()
        {
            for (var i = 0; i < this.pickups.length; i++) 
            {
                var pickup = this.pickups[i];
                
                if(pickup.x > GameConfig.camera.x + GameConfig.width)
                {
                    //this.pickupPool.returnObject(pickup);
                    this.engine.view.game.removeChild(pickup.view);
                    this.pickups.splice(i, 1);
                    i--;
                }

            }
            
        }
    }

    export class Floor{
        constructor(){
            PIXI.Sprite.call(this,PIXI.Texture.fromFrame("00_forest_floor.png"));
        }
    }
    Floor.prototype = Object.create( PIXI.Sprite.prototype );

    export class FloorManager{
        engine:any;
        count:number;
        floors:any;
        floorPool:any;
        constructor(engine:any){
            console.log("init floor manager!");
            this.engine = engine;
            this.count = 0;
            this.floors = [];
            this.floorPool = new GameObjectPool(Floor);
        }

        update(){
            for ( var i = 0; i < this.floors.length; i++) 
            {
                var floor = this.floors[i];
                floor.position.x = floor.x - GameConfig.camera.x -16;
                
                if(floor.position.x < -1135 - GameConfig.xOffset -16)
                {
                    //this.floorPool.returnObject(floor)
                    this.floors.splice(i, 1);
                    i--;
                    this.engine.view.gameFront.removeChild(floor);
                }
            }
        }

        addFloor(floorData)
        {
            var floor = this.floorPool.getObject();
            floor.x = floorData;
            floor.position.y = 640 - 158;
            this.engine.view.gameFront.addChild(floor);
            this.floors.push(floor);
        }

        destroyAll()
        {
            for (var i = 0; i < this.floors.length; i++) 
            {
                var floor = this.floors[i];
                //this.floorPool.returnObject(floor);
                this.engine.view.gameFront.removeChild(floor);
            }
            
            this.floors = [];
        }
    }

    export class CollisionManager{
        engine:any;
        constructor(engine){    
            console.log("init collision manager!");
            this.engine = engine;
        }

        update(){
            //this.playerVsBlock();
            this.playerVsPickup();
            this.playerVsFloor();
        }

        playerVsBlock(){
            var enemies = this.engine.enemyManager.enemies;
            var player = this.engine.player;
            
            for (var i = 0; i < enemies.length; i++) 
            {
                var enemy = enemies[i]
                
                var xdist = enemy.position.x - player.position.x;
                if(xdist > -enemy.width/2 && xdist < enemy.width/2)
                {
                    var ydist = enemy.position.y - player.position.y;
                
                    if(ydist > -enemy.height/2 - 20 && ydist < enemy.height/2 )
                    {
                        if(!player.joyRiding)
                        {
                            player.die();
                            this.engine.gameover();
                            enemy.hit();
                        }
                    }
                }
            }
        }

        playerVsPickup(){
            
            var pickups = this.engine.pickupManager.pickups;
            var player = this.engine.player;
            
            for (var i = 0; i < pickups.length; i++) 
            {
                var pickup = pickups[i]
                if(pickup.isPickedUp) continue;
                
                var xdist = pickup.position.x - player.position.x;
                if(xdist > -pickup.width/2 && xdist < pickup.width/2)
                {
                    var ydist = pickup.position.y - player.position.y;
                
                    if(ydist > -pickup.height/2 && ydist < pickup.height/2)
                    {
                        this.engine.pickupManager.removePickup(i);
                        this.engine.pickup();

                    }
                }
            }
        }

        playerVsFloor(){
            var floors = this.engine.floorManager.floors;
            var player = this.engine.player;
            
            var max = floors.length;
            player.onGround = false;
            
            if(player.position.y > 610)
            {
                if(this.engine.isPlaying)
                {
                    player.boil();
                    this.engine.view.doSplash();
                    this.engine.gameover();
                }
                else
                {
                    player.speed.x *= 0.95;
                    
                    if(!GameConfig.interactive)
                    {
                        //game end
                        //showGameover();
                        GameConfig.interactive = true;
                    }
                    
                    if(player.bounce === 0) {
                        player.bounce++;
                        player.boil();
                        this.engine.view.doSplash();
                    }

                    return;
                }
            }
            
            for (var i = 0; i < max; i++) 
            {
                var floor = floors[i];
                var xdist = floor.x - player.position.x + 1135;
                
                if(player.position.y > 477)
                {
                    if(xdist > 0 && xdist < 1135)
                    {
                        if(player.isDead)
                        {
                            player.bounce++;
                            
                            if(player.bounce > 2)
                            {						
                                return;
                            }
                            //FidoAudio.play('thudBounce');
                            player.view.setTexture(player.crashFrames[player.bounce])
                                
                            player.speed.y *= -0.7;
                            player.speed.x *= 0.8;
                            
                            if(player.rotationSpeed > 0)
                            {
                                player.rotationSpeed = Math.random() * -0.3;
                            }
                            else if(player.rotationSpeed === 0)
                            {
                                player.rotationSpeed = Math.random() * 0.3;
                            }
                            else
                            {
                                player.rotationSpeed = 0;
                            }
                        }
                        else
                        {
                            player.speed.y = -0.3;
                        }
                        
                        if(!player.isFlying)
                        {
                            player.position.y = 478;
                            player.onGround = true;
                            
                        }	
                    }
                }
            }

            if(player.position.y < 0)
            {
                player.position.y = 0;
                player.speed.y *= 0;
            }
        }
    }

}