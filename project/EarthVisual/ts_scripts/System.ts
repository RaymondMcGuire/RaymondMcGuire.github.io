/* =========================================================================
 *
 *  System.ts
 *  game execute logical
 *
 * ========================================================================= */
/// <reference path="./Entity.ts" />
/// <reference path="./LoadData.ts" />
/// <reference path="./HashSet.ts" />
/// <reference path="./Utils.ts" />
module ECS {

    

    export class System {
        name: string;
        GlobalDatas: ECS.Entity;
        MainSystem: ECS.System;
        constructor(name: string) {
            this.name = name;
        }
        Execute() {
            console.log("[" + this.name + "]System Execute!");
        }
    }

    export class LoadingSystem extends System {

        entities: Utils.HashSet<Entity>;
        constructor(entities: Utils.HashSet<Entity>) {
            super("loading");
            this.entities = entities;
        }
        InitDataStructure(data: any, cityCode: any) {
            var data_2008_value = data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
            var MovementBeforeNode = cityCode.MovementBeforeNode.Value;
            var MoveAfterNode = cityCode.MoveAfterNode.Value;
            let MovementBeforeNodeList = new Utils.HashSet<JapanCityDataComponent>();
            for (let mb of MovementBeforeNode) {
                MovementBeforeNodeList.set(mb.id, new JapanCityDataComponent(mb.id, +mb.lon, +mb.lat));
            }
            let MoveAfterNodeList = new Utils.HashSet<JapanCityDataComponent>();
            for (let ma of MoveAfterNode) {
                MoveAfterNodeList.set(ma.id, new JapanCityDataComponent(ma.id, +ma.lon, +ma.lat));
            }

            let BeforeNotAllowedList = new Utils.HashSet<string>();
            BeforeNotAllowedList.set("001", "001");
            BeforeNotAllowedList.set("049", "049");
            BeforeNotAllowedList.set("050", "050");
            BeforeNotAllowedList.set("051", "051");
            BeforeNotAllowedList.set("052", "052");
            let AfterNotAllowedList = new Utils.HashSet<string>();
            AfterNotAllowedList.set("00999", "00999");
            AfterNotAllowedList.set("48000", "48000");
            AfterNotAllowedList.set("49000", "49000");
            AfterNotAllowedList.set("50000", "50000");
            AfterNotAllowedList.set("00413", "00413");
            AfterNotAllowedList.set("99000", "99000");
            AfterNotAllowedList.set("99100", "99100");


            let ConflictList = new Utils.HashSet<string>();
            let MovementArray = new Array<Entity>();
            for (let d of data_2008_value) {
                var b = d["@cat01"];
                var a = d["@area"];
                var n = d["$"];

                //select data load (014 Tokyo)
                if (b != "014") continue;

                //not need data
                if (BeforeNotAllowedList.get(b) != undefined) continue;
                if (AfterNotAllowedList.get(a) != undefined) continue;
                if (n == "-") continue;

                let before_data = MovementBeforeNodeList.get(b);
                let after_data = MoveAfterNodeList.get(a);
                if (before_data == undefined) {
                    if (ConflictList.get(b) == undefined) {
                        ConflictList.set(b, b);
                    }
                }

                if (after_data == undefined) {
                    if (ConflictList.get(a) == undefined) {
                        ConflictList.set(a, a);
                    }
                }





                let entity_move = new Entity("move_entity");
                entity_move.addComponent(new HumanMovementDataComponent(before_data.id, before_data.lon, before_data.lat, after_data.id, after_data.lon, after_data.lat));
                MovementArray.push(entity_move);
                //console.log("before cood:"+before_data.lon+","+before_data.lat);
                //console.log("after cood:"+after_data.lon+","+after_data.lat);
            }

            // for(let m of MovementArray){
            //     console.log("b:"+(<HumanMovementDataComponent>m.components.get("humanmove")).b_id+",a:"+(<HumanMovementDataComponent>m.components.get("humanmove")).a_id);
            // }

            ConflictList.forEach(function (f: string) {
                console.log("please check city code!need code:" + f);
            });

            return MovementArray;
        }
        Execute() {
            super.Execute();
            // var mapImage = new Image();
            // mapImage.src = './images/2_no_clouds_4k.jpg';
            //console.log("load image data finished!");
            // Utils.loadData('./data/tip.json', <JsonDataComponent>this.entities.get("tip_entity").components.get("jsondata"), function () {
            //     console.log("load tip data finished!");
            //     Utils.loadData('./data/country.json', <JsonDataComponent>this.entities.get("country_entity").components.get("jsondata"), function () {
            //         console.log("load country data finished!");
            //         Utils.loadData('./data/missile.json', <JsonDataComponent>this.entities.get("missile_entity").components.get("jsondata"), function () {
            //             console.log("load missile data finished!");
            //             Utils.loadData('./data/history.json', <JsonDataComponent>this.entities.get("history_entity").components.get("jsondata"), function () {
            //                 console.log("load history data finished!");
            //                 var timeBins = JSON.parse((<JsonDataComponent>this.entities.get("history_entity").components.get("jsondata")).data).timeBins;
            //                 var missileLookup = JSON.parse((<JsonDataComponent>this.entities.get("missile_entity").components.get("jsondata")).data);
            //                 var latlonData = JSON.parse((<JsonDataComponent>this.entities.get("country_entity").components.get("jsondata")).data);

            //                 let entity_GlobalData = new ECS.Entity("global_entity");
            //                 let global_data = new Utils.HashSet<any>();
            //                 var outcomeLookup = {
            //                     'success': 'Success',
            //                     'failure': 'Failure',
            //                     'unknown': 'Unknown'
            //                 };
            //                 var missileColors = {
            //                     'er-scud': 0x1A62A5,
            //                     'hwasong-12': 0x6C6C6C,
            //                     'hwasong-14': 0xAEB21A,
            //                     'hwasong-15': 0x1DB2C4,
            //                     'kn-02': 0xB68982,
            //                     'musudan': 0x9FBAE3,
            //                     'nodong': 0xFD690F,
            //                     'polaris-1': 0xFEAE65,
            //                     'polaris-2': 0xDA5CB6,
            //                     'scud-b': 0x279221,
            //                     'scud-b-marv': 0xD2D479,
            //                     'scud-c': 0x89DC78,
            //                     'scud-c-marv': 0xBBBBBB,
            //                     'taepodong-1': 0xCA0F1E,
            //                     'unha': 0x814EAF,
            //                     'unha-3': 0xB89FCB,
            //                     'unknown': 0x78433B
            //                 };
            //                 global_data.set("timeBins", timeBins);
            //                 global_data.set("missileLookup", missileLookup);
            //                 global_data.set("latlonData", latlonData);
            //                 global_data.set("outcomeLookup", outcomeLookup);
            //                 global_data.set("missileColors", missileColors);
            //                 entity_GlobalData.addComponent(new ECS.GlobalComponent(global_data));

            //                 let threejs_system = new ECS.ThreeJsSystem();
            //                 let eventlistener_system = new ECS.EventListenerSystem();
            //                 let other_systems = new Utils.HashSet<System>();
            //                 other_systems.set(threejs_system.name, threejs_system);
            //                 other_systems.set(eventlistener_system.name, eventlistener_system);
            //                 let main_system = new ECS.MainSystem(entity_GlobalData, other_systems);
            //                 main_system.Execute();

            //             });
            //         });
            //     });
            // });


            Utils.loadData('./data/citycode.json', <ECS.JsonDataComponent>this.entities.get("citycode_entity").components.get("jsondata"), () => {
                Utils.loadData('./data/0003008383.json', <ECS.JsonDataComponent>this.entities.get("2008data_entity").components.get("jsondata"), () => {
                    var cityCode = JSON.parse((<ECS.JsonDataComponent>this.entities.get("citycode_entity").components.get("jsondata")).data);
                    var data_2008 = JSON.parse((<ECS.JsonDataComponent>this.entities.get("2008data_entity").components.get("jsondata")).data);
                    var moveData = this.InitDataStructure(data_2008, cityCode);

                    let entity_GlobalData = new ECS.Entity("global_entity");
                    let global_data = new Utils.HashSet<any>();

                    global_data.set("moveData", moveData);
                    entity_GlobalData.addComponent(new ECS.GlobalComponent(global_data));

                    let threejs_system = new ECS.ThreeJsSystem();
                    let eventlistener_system = new ECS.EventListenerSystem();
                    let other_systems = new Utils.HashSet<System>();
                    other_systems.set(threejs_system.name, threejs_system);
                    other_systems.set(eventlistener_system.name, eventlistener_system);
                    let main_system = new ECS.MainSystem(entity_GlobalData, other_systems);
                    main_system.Execute();

                });
            });
        }
    }


    export class MainSystem extends System {
        OtherSystems: Utils.HashSet<System>;
        constructor(GlobalDatas: ECS.Entity, othSystems: Utils.HashSet<System>) {
            super("main");
            this.GlobalDatas = GlobalDatas;
            this.OtherSystems = othSystems;
            this.MainSystem = this;
        }
        Execute() {
            super.Execute();
            var g = this.GlobalDatas;
            var m = this.MainSystem;
            this.OtherSystems.forEach(function (key, val) {
                (<System>val).GlobalDatas = g;
                (<System>val).MainSystem = m;
                (<System>val).Execute();
            });
        }
    }

    declare var Hammer: any;
    declare var THREE: any;
    declare var THREEx: any;
    declare var $: any;
    declare var Math: any;
    declare var Stats: any;
    declare var dat: any;
    // declare var d3Graphs:any;

    export class ThreeJsSystem extends System {
        GlobalParams: Utils.HashSet<any>;
        CityCodeMap:any;
        CityShowMap:any;
        constructor() {
            super("threejs");
            this.GlobalParams = new Utils.HashSet<any>();
            this.CityCodeMap = {
                Hokaido : "01000",
                Aomori : "02000"
            };

            this.CityShowMap = {
                Hokaido : true,
                Aomori : true
            };

        }
        wrap(value: any, min: any, rangeSize: any) {
            rangeSize -= min;
            while (value < min) {
                value += rangeSize;
            }
            return value % rangeSize;
        }
        GetVisualizedMesh(lineArray: any) {

           
            var LineMeshArray = [];
            var randomColor = [0x1A62A5, 0x6C6C6C, 0xAEB21A, 0x1DB2C4, 0xB68982, 0x9FBAE3, 0xFD690F, 0xFEAE65, 0xDA5CB6, 0x279221, 0xD2D479, 0x89DC78, 0xBBBBBB, 0xCA0F1E, 0x814EAF, 0xB89FCB, 0x78433B];
           

            //	go through the data from year, and find all relevant geometries
            for (let l of lineArray) {

                var particlesGeo = new THREE.BufferGeometry();
                var particlePositions = [];
                var particleSizes = [];
                var particleColors = [];
                particlesGeo.vertices = [];
                var randomIndex = Utils.randomInt(0, 15);
                var lineColor = new THREE.Color(randomColor[randomIndex]);

                var lastColor;
                var lineColors = [];
                //	grab the colors from the vertices
                for (let s of l.vertices) {
                    var v = l.vertices[s];
                    lineColors.push(lineColor);
                    lastColor = lineColor;
                }

                var linesGeo = new THREE.Geometry();
                linesGeo.merge(l);

                var particleColor = lastColor.clone();
                var points = l.vertices;
                var particleCount = 1;
                var particleSize = l.size * this.GlobalParams.get("dpr");

                for (var rIndex = 0; rIndex < points.length - 1; rIndex++) {
                    for (var s = 0; s < particleCount; s++) {
                        var point = points[rIndex];
                        var particle = point.clone();
                        particle.moveIndex = rIndex;
                        particle.nextIndex = rIndex + 1;
                        if (particle.nextIndex >= points.length)
                            particle.nextIndex = 0;
                        particle.lerpN = 0;
                        particle.path = points;
                        particlesGeo.vertices.push(particle);
                        particle.size = particleSize;

                        particlePositions.push(particle.x, particle.y, particle.z);
                        particleSizes.push(particleSize);
                        particleColors.push(particleColor.r, particleColor.g, particleColor.b);
                    }
                }

                linesGeo.colors = lineColors;

                
                //	make a final mesh out of this composite
                var splineOutline = new THREE.Line(linesGeo, new THREE.LineBasicMaterial(
                    {
                        color: 0xffffff, opacity: 1.0, blending:
                            THREE.AdditiveBlending, transparent: true,
                        depthWrite: false, vertexColors: true,
                        linewidth: 1
                    })
                );


                particlesGeo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(particlePositions), 3));
                particlesGeo.addAttribute('size', new THREE.BufferAttribute(new Float32Array(particleSizes), 1));
                particlesGeo.addAttribute('customColor', new THREE.BufferAttribute(new Float32Array(particleColors), 3));

                var uniforms = {
                    amplitude: { type: "f", value: 1.0 },
                    color: { type: "c", value: new THREE.Color(0xffffff) },
                    texture: { type: "t", value: new THREE.TextureLoader().load("./images/particleA.png") },
                };

                var shaderMaterial = new THREE.ShaderMaterial({

                    uniforms: uniforms,
                    vertexShader: document.getElementById('vertexshader').textContent,
                    fragmentShader: document.getElementById('fragmentshader').textContent,

                    blending: THREE.AdditiveBlending,
                    depthTest: true,
                    depthWrite: false,
                    transparent: true,
                    // sizeAttenuation: true,
                });



                var pSystem = new THREE.Points(particlesGeo, shaderMaterial);
                pSystem.dynamic = true;
                splineOutline.add(pSystem);

                pSystem.update = function () {
                    // var time = Date.now();
                    var positionArray = this.geometry.attributes.position.array;
                    var index = 0;
                    for (var i in this.geometry.vertices) {
                        var particle = this.geometry.vertices[i];
                        var path = particle.path;
                        var moveLength = path.length;

                        particle.lerpN += 0.05;
                        if (particle.lerpN > 1) {
                            particle.lerpN = 0;
                            particle.moveIndex = particle.nextIndex;
                            particle.nextIndex++;
                            if (particle.nextIndex >= path.length) {
                                particle.moveIndex = 0;
                                particle.nextIndex = 1;
                            }
                        }

                        var currentPoint = path[particle.moveIndex];
                        var nextPoint = path[particle.nextIndex];


                        particle.copy(currentPoint);
                        particle.lerp(nextPoint, particle.lerpN);

                        positionArray[index++] = particle.x;
                        positionArray[index++] = particle.y;
                        positionArray[index++] = particle.z;
                    }
                    this.geometry.attributes.position.needsUpdate = true;
                };
                LineMeshArray.push(splineOutline);
            }

           


            return LineMeshArray;
        }
        getHistoricalData(timeBins: any) {
            var history = [];
            var selectionData = <Utils.Selection>this.GlobalParams.get("selectionData");
            var outcomeCategories = selectionData.getOutcomeCategories();
            var missileCategories = selectionData.getMissileCategories();

            for (var i in timeBins) {
                var yearBin = timeBins[i].data;
                var value = { successes: 0, failures: 0, unknowns: 0 };
                for (var s in yearBin) {
                    var set = yearBin[s];
                    var outcomeName = set.outcome;
                    var missileName = set.missile;

                    var relevantCategory = ($.inArray(outcomeName, outcomeCategories) >= 0) &&
                        ($.inArray(missileName, missileCategories) >= 0);

                    if (relevantCategory == false)
                        continue;

                    if (outcomeName === 'success')
                        value.successes++;
                    else if (outcomeName === 'failure')
                        value.failures++;
                    else
                        value.unknowns++;
                }
                history.push(value);
            }
            // console.log(history);
            return history;
        }

        VisualizationLine(lineArray: any) {
            var visualizationMesh = this.GlobalParams.get("visualizationMesh");
            //	clear children
            while (visualizationMesh.children.length > 0) {
                var c = visualizationMesh.children[0];
                visualizationMesh.remove(c);
            }


            //	build the mesh
            var mesh = this.GetVisualizedMesh(lineArray);
            
            //	add it to scene graph
            for(var i=0;i<mesh.length;i++){
                visualizationMesh.add(mesh[i]);
            }
    

            
            this.GlobalParams.set("visualizationMesh", visualizationMesh);
        }
        UpdateOSMTile(p_lon: any, p_lat: any, zoom: any) {

            var xtile = Utils.long2tile(p_lon, zoom);
            var ytile = Utils.lat2tile(p_lat, zoom);
            var osmSwitch = this.GlobalParams.get("osmSwitch");

            var tiles = {};
            var nextMinXtile, nextMaxXtile;
            var rotating = this.GlobalParams.get("rotating");
            var tileGroup = this.GlobalParams.get("tileGroup");
            var tileGroups = this.GlobalParams.get("tileGroups");
            var ZOOM_MIN = this.GlobalParams.get("ZOOM_MIN");
            var ZOOM_SHIFT_SIZE = this.GlobalParams.get("ZOOM_SHIFT_SIZE");
            var MAX_TILEMESH = this.GlobalParams.get("MAX_TILEMESH");
            var TILE_PROVIDER = this.GlobalParams.get("TILE_PROVIDER");
            var radius = this.GlobalParams.get("radius");

            rotating.remove(tileGroups);
            tileGroups = new THREE.Object3D(); //create an empty container
            rotating.add(tileGroups);
            //console.log('zoom_ start:', Math.max(zoom, ZOOM_MIN));
            //console.log('zoom_ end:', Math.max(zoom - ZOOM_SHIFT_SIZE, ZOOM_MIN) + 1);

            if (osmSwitch) {
                for (var zoom_ = Math.max(zoom, ZOOM_MIN); zoom_ > Math.max(zoom - ZOOM_SHIFT_SIZE, ZOOM_MIN); zoom_--) {
                    var zShift = zoom - zoom_;
                    tileGroup[zShift] = new THREE.Object3D();
                    tileGroups.add(tileGroup[zShift]);
                    // var zoom_ = zoom - zShift;
                    if (zoom_ < 0 && zShift > 0) {
                        continue;
                    }

                    var size = 2;
                    var factor = Math.pow(2, zShift);
                    var xtile_ = Math.floor(xtile / factor);
                    var ytile_ = Math.floor(ytile / factor);

                    if (zoom < 8) {
                        var size = 2;
                    } else if (zoom < 10) {
                        var size = 2;
                    } else {
                        size = 1;
                    }
                    var minXtile = Math.floor((xtile_ - (Math.pow(2, (size - 1)) - 1)) / 2) * 2;
                    var maxXtile = Math.floor((xtile_ + (Math.pow(2, (size - 1)) - 1)) / 2) * 2 + 1;
                    var minYtile = Math.floor((ytile_ - (Math.pow(2, (size - 1)) - 1)) / 2) * 2;
                    var maxYtile = Math.floor((ytile_ + (Math.pow(2, (size - 1)) - 1)) / 2) * 2 + 1;

                    if (minXtile < 0 && maxXtile >= 0) {
                        var minXOffset = Math.abs(minXtile) % 32;
                        var realMinX = 32 - minXOffset;
                        var realMaxX = 32 + maxXtile;
                        minXtile = realMinX;
                        maxXtile = realMaxX;
                    } else if (minXtile < 0 && maxXtile < 0) {
                        var minXOffset = Math.abs(minXtile) % 32;
                        var realMinX = 32 - minXOffset;
                        var maxXOffset = Math.abs(maxXtile) % 32;
                        var realMaxX = 32 - maxXOffset;
                        minXtile = realMinX;
                        maxXtile = realMaxX;
                    }

                    // console.log({
                    //     'zoom_': zoom_,
                    //     'xtile_': xtile_,
                    //     'ytile_': ytile_,
                    //     'minXtile': minXtile,
                    //     'maxXtile': maxXtile,
                    //     'minYtile': minYtile,
                    //     'maxYtile': maxYtile,
                    //     'lon':p_lon,
                    //     'p_lat':p_lat
                    // })


                    var modulus = (zoom_ > 0) ? Math.pow(2, zoom_) : 0;

                    for (var atile = minXtile; atile <= maxXtile; atile++) {
                        for (var btile = minYtile; btile <= maxYtile; btile++) {
                            var lon1 = Utils.tile2long(atile, zoom_);
                            var lat1 = Utils.tile2lat(btile, zoom_);
                            var lon2 = Utils.tile2long(atile + 1, zoom_);
                            var lat2 = Utils.tile2lat(btile + 1, zoom_);
                            var lat = (lat1 + lat2) / 2;
                            var lon = (lon1 + lon2) / 2;

                            var widthUp = Utils.measure(radius, lat1, lon1, lat1, lon2);
                            var widthDown = Utils.measure(radius, lat2, lon1, lat2, lon2);
                            var widthSide = Utils.measure(radius, lat1, lon1, lat2, lon1);

                            var id = 'z_' + zoom_ + '_' + atile + "_" + btile;
                            for (var zzz = 1; zzz <= 2; zzz++) {
                                var idNext = 'z_' + (zoom_ - zzz) + '_' + Math.floor(atile / Math.pow(2, zzz)) + "_" + Math.floor(btile / Math.pow(2, zzz));
                                tiles[idNext] = {};
                            }
                            if (!tiles.hasOwnProperty(id)) {

                                var tileEarth = new THREE.Object3D(); //create an empty container
                                tileEarth.rotation.set(0, (lon1 + 180) * Math.PI / 180, 0);
                                tileGroup[zShift].add(tileEarth);
                                var tileMesh = Utils.getTileMesh(radius, zoom_, btile, MAX_TILEMESH);
                                tileEarth.add(tileMesh);


                                (function (yourTileMesh, yourZoom, yourXtile, yourYtile) {


                                    var onLoaded = function (texture) {
                                        // MeshFaceMaterial
                                        yourTileMesh.material = new THREE.MeshBasicMaterial({
                                            map: texture
                                        });
                                    };
                                    Utils.textureFactory(TILE_PROVIDER, MAX_TILEMESH, yourZoom, yourXtile, yourYtile, onLoaded);
                                })(tileMesh, zoom_, atile % modulus, btile % modulus);
                            }
                        }
                    }
                }
            }


            this.GlobalParams.set("xtile", xtile);
            this.GlobalParams.set("ytile", ytile);
            this.GlobalParams.set("rotating", rotating);
            this.GlobalParams.set("tileGroups", tileGroups);
            this.GlobalParams.set("tileGroup", tileGroup);
        }

        initUi() {

            //init user UI


            var GlobalParams = this.GlobalParams;
            var osmSwitch = GlobalParams.get("osmSwitch");
            var earthParam = {
                NightView: true,
                LoadOSM: osmSwitch,
                Hokaido:true,
                Aomori:true
            };
            GlobalParams.set("earthParam", earthParam);
            var gui = new dat.GUI();

            function guiChanged() {

                var camera = GlobalParams.get("camera");
                var renderer = GlobalParams.get("renderer");
                var scene = GlobalParams.get("scene");
                var nighttexture = GlobalParams.get("earthParam").NightView;
                var osmSwitchNow = GlobalParams.get("earthParam").LoadOSM;
                var earthSphere = GlobalParams.get("earthSphere");

                if (nighttexture) {
                    earthSphere.material.map = new THREE.TextureLoader().load('./images/nightearth2016.jpg');
                    earthSphere.material.needsUpdate = true;
                } else {
                    earthSphere.material.map = new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg');
                    earthSphere.material.needsUpdate = true;
                }

                if (osmSwitchNow) GlobalParams.set("osmSwitch", true);
                else GlobalParams.set("osmSwitch", false);

                GlobalParams.set("earthSphere", earthSphere);
                renderer.render(scene, camera);

            }

            gui.add(earthParam, "NightView", false).onChange(guiChanged);
            gui.add(earthParam, "LoadOSM", true).onChange(guiChanged);
            var startPosTokyo = gui.addFolder("Tokyo"); //014
            var hokaido = startPosTokyo.add(earthParam,"Hokaido").listen();
            var aomori = startPosTokyo.add(earthParam,"Aomori").listen();

            hokaido.onChange((val)=> {
                this.CityShowMap.Hokaido = val;
                var rotateContainer =this.GlobalParams.get("rotating");

                for(var cc in rotateContainer.children){
                    if(rotateContainer.children[cc].name == "lineMesh"){
                        rotateContainer.children[cc].children[0].visible = val;
                    }
                }
                
            });

            
            aomori.onChange((val)=> {
                this.CityShowMap.Aomori = val;
                var rotateContainer =this.GlobalParams.get("rotating");

                for(var cc in rotateContainer.children){
                    if(rotateContainer.children[cc].name == "lineMesh"){
                        rotateContainer.children[cc].children[1].visible = val;
                    }
                }
            });

            guiChanged();
        }
        InitThreeJs() {

            var glContainer = document.getElementById('glContainer');
            var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
            this.GlobalParams.set("dpr", dpr);
            this.GlobalParams.set("selectedTest", null);

            var selectableTests = [];
            //osm tile groups
            var TILE_PROVIDER = 'https://a.tile.openstreetmap.org';
            var ZOOM_SHIFT_SIZE = 10;
            var ZOOM_MIN = 5;
            var MAX_TILEMESH = 500;
            var tileGroup = [];
            var tileGroups;

            //Global Data
            var global_data = (<GlobalComponent>this.GlobalDatas.components.get("global")).data;
            // var latlonData = global_data.get("latlonData");
            // var missileLookup = global_data.get("missileLookup");
            // var timeBins = global_data.get("timeBins");
            // var outcomeLookup = global_data.get("outcomeLookup");
            // var missileColors = global_data.get("missileColors");
            var moveData = global_data.get("moveData");

            var scene = new THREE.Scene();
            scene.matrixAutoUpdate = false;
            scene.add(new THREE.AmbientLight(0x505050));


            var light1 = new THREE.SpotLight(0xeeeeee, 2);
            light1.position.x = 1730;
            light1.position.y = 1520;
            light1.position.z = 626;
            light1.castShadow = true;
            scene.add(light1);

            var light2 = new THREE.PointLight(0x222222, 14);
            light2.position.x = -640;
            light2.position.y = -500;
            light2.position.z = -1000;
            scene.add(light2);

            var rotating = new THREE.Object3D();
            scene.add(rotating);

            var mapMaterial = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg'),
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            });

            // var mapMaterial = new THREE.MeshPhongMaterial({
            //     map: new THREE.TextureLoader().load('./images/2_no_clouds_4k.jpg'),
            //     bumpMap: new THREE.TextureLoader().load('./images/elev_bump_4k.jpg'),
            //     bumpScale: 0.005,
            //     specularMap: new THREE.TextureLoader().load('./images/water_4k.png'),
            //     specular: new THREE.Color('grey'),
            //     polygonOffset: true,
            //     polygonOffsetFactor: 1,
            //     polygonOffsetUnits: 1
            // })

            var radius = 100;
            var segments = 40;

            var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius - 1, segments, segments), mapMaterial);
            sphere.doubleSided = false;
            sphere.rotation.x = Math.PI;
            sphere.rotation.y = -Math.PI / 2;
            sphere.rotation.z = Math.PI;
            sphere.id = "base";
            rotating.add(sphere);

            //map index
            var lookupCanvas = document.createElement('canvas');
            lookupCanvas.width = 256;
            lookupCanvas.height = 1;

            var lookupTexture = new THREE.Texture(lookupCanvas);
            lookupTexture.magFilter = THREE.NearestFilter;
            lookupTexture.minFilter = THREE.NearestFilter;
            lookupTexture.needsUpdate = true;

            var indexedMapTexture = new THREE.TextureLoader().load('./images/map_indexed.png');

            indexedMapTexture.needsUpdate = true;
            indexedMapTexture.magFilter = THREE.NearestFilter;
            indexedMapTexture.minFilter = THREE.NearestFilter;

            //clouds

            var cloudsMesh = new THREE.Mesh(
                new THREE.SphereGeometry(radius + 1, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: new THREE.TextureLoader().load('./images/fair_clouds_4k.png'),
                    transparent: true
                })
            );
            rotating.add(cloudsMesh)


            var atmosphereMaterial = new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
                fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent,
                side: THREE.BackSide
            });

            var atmosphere = new THREE.Mesh(sphere.geometry.clone(), atmosphereMaterial);
            atmosphere.scale.x = atmosphere.scale.y = atmosphere.scale.z = 1.8;
            rotating.add(atmosphere);


            //country coordinates
            //var facilityData = Utils.loadGeoData(latlonData);

            //convert gis data to 3d sphere data
            var moveDataForSphere = new Array<ThreeJsMoveEntity>();
            for (let m of moveData) {
                var current_humanmove = <HumanMovementDataComponent>m.components.get("humanmove");
                //console.log("b:" + (<HumanMovementDataComponent>m.components.get("humanmove")).b_id + ",a:" + (<HumanMovementDataComponent>m.components.get("humanmove")).a_id);
                //check code is selected or not
                for(var key in this.CityCodeMap){
                    if(this.CityCodeMap[key] == (<HumanMovementDataComponent>m.components.get("humanmove")).a_id){
                       
                        //have key then check selected status
                        if(this.CityShowMap[key]){
                            var start_lon = current_humanmove.b_lon;
                            var start_lat = current_humanmove.b_lat;
                            var end_lon = current_humanmove.a_lon;
                            var end_lat = current_humanmove.a_lat;
                            //console.log(start_lon,start_lat);
                            //console.log(end_lon,end_lat);
                            var start_pos = Utils.ConvertGISDataTo3DSphere(start_lon, start_lat);
                            var end_pos = Utils.ConvertGISDataTo3DSphere(end_lon, end_lat);
                            moveDataForSphere.push(new ThreeJsMoveEntity([start_pos.x, start_pos.y, start_pos.z], [end_pos.x, end_pos.y, end_pos.z]));
                        }
                    }
                }

            }

            //data visual
            var lineArray = Utils.BuildSphereDataVizGeometries(moveDataForSphere);

            var visualizationMesh = new THREE.Object3D();
            this.GlobalParams.set("visualizationMesh", visualizationMesh);
            visualizationMesh.name = "lineMesh";
            rotating.add(visualizationMesh);

            this.GlobalParams.set("rotating", rotating);
            this.VisualizationLine(lineArray);



            //	-----------------------------------------------------------------------------
            //	Setup renderer
            var renderer = new THREE.WebGLRenderer({ antialias: false });
            renderer.setPixelRatio(dpr);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = false;

            renderer.sortObjects = false;
            renderer.generateMipmaps = false;




            //event listener
            //(<EventListenerSystem>(<MainSystem>this.MainSystem).OtherSystems.get("eventlistener")).InitEventListener();


            //	-----------------------------------------------------------------------------
            //	Setup camera
            var aspect = window.innerWidth / window.innerHeight;
            var camera = new THREE.PerspectiveCamera(12 / Math.min(aspect, 1), aspect, 1, 20000);

            camera.up.set(0, 0, 1);
            camera.position.z = 800;
            camera.position.y = 0;
            camera.lookAt(scene.position);
            camera.zoom = 0.5;
            scene.add(camera);


            var controls = new THREE.EarthControls(camera, renderer.domElement);
            glContainer.appendChild(renderer.domElement);
            var stats = new Stats();
            glContainer.appendChild(stats.dom);

            this.GlobalParams.set("scene", scene);
            this.GlobalParams.set("zoom", 0);
            this.GlobalParams.set("controls", controls);
            this.GlobalParams.set("lonStamp", 0);
            this.GlobalParams.set("latStamp", 0);
            this.GlobalParams.set("camera", camera);
            this.GlobalParams.set("renderer", renderer);
            this.GlobalParams.set("cloudsMesh", cloudsMesh);
            this.GlobalParams.set("tileGroup", tileGroup);
            this.GlobalParams.set("tileGroups", tileGroups);
            this.GlobalParams.set("ZOOM_SHIFT_SIZE", ZOOM_SHIFT_SIZE);
            this.GlobalParams.set("ZOOM_MIN", ZOOM_MIN);
            this.GlobalParams.set("MAX_TILEMESH", MAX_TILEMESH);
            this.GlobalParams.set("TILE_PROVIDER", TILE_PROVIDER);
            this.GlobalParams.set("radius", radius);
            this.GlobalParams.set("earthSphere", sphere);
            this.GlobalParams.set("osmSwitch", false);
            this.GlobalParams.set("stats", stats);
            this.GlobalParams.set("timeLast", Date.now());
        }
        render() {
            this.GlobalParams.get("renderer").clear();
            this.GlobalParams.get("renderer").render(this.GlobalParams.get("scene"), this.GlobalParams.get("camera"));
        }

        AnimeUpdate() {
            var camera = this.GlobalParams.get("camera");
            var renderer = this.GlobalParams.get("renderer");
            var scene = this.GlobalParams.get("scene");
            var cloudMesh = this.GlobalParams.get("cloudsMesh");
            var EventListenerGlobalParams = (<EventListenerSystem>(<MainSystem>this.MainSystem).OtherSystems.get("eventlistener")).GlobalParams;
            var rotateVX = EventListenerGlobalParams.get("rotateVX");
            var rotateVY = EventListenerGlobalParams.get("rotateVY");
            var rotateX = EventListenerGlobalParams.get("rotateX");
            var rotateY = EventListenerGlobalParams.get("rotateY");
            var rotateTargetX = EventListenerGlobalParams.get("rotateTargetX");
            var rotateTargetY = EventListenerGlobalParams.get("rotateTargetY");
            var dragging = EventListenerGlobalParams.get("dragging");
            var rotateXMax = EventListenerGlobalParams.get("rotateXMax");
            var tiltTarget = EventListenerGlobalParams.get("tiltTarget");
            var tilt = EventListenerGlobalParams.get("tilt");
            var scaleTarget = EventListenerGlobalParams.get("scaleTarget");
            var rotating = this.GlobalParams.get("rotating");
            var osmTile = this.GlobalParams.get("osmTile");
            var ZOOM_MIN = this.GlobalParams.get("ZOOM_MIN");
            var ZOOM_SHIFT_SIZE = this.GlobalParams.get("ZOOM_SHIFT_SIZE");
            var oldZoom = this.GlobalParams.get("zoom");
            var zoom = this.GlobalParams.get("zoom");
            var controls = this.GlobalParams.get("controls");
            var targetPos = this.GlobalParams.get("targetPos");


            this.GlobalParams.set("timeNow", Date.now());
            cloudMesh.rotation.y += (1 / 16 * (this.GlobalParams.get("timeNow") - this.GlobalParams.get("timeLast"))) / 1000;


            var dist = new THREE.Vector3().copy(controls.object.position).sub(controls.target).length();

            var zoom = Math.floor(Math.max(Math.min(Math.floor(15 - Math.log2(dist)), ZOOM_MIN + ZOOM_SHIFT_SIZE), ZOOM_MIN));

            var latStamp = this.GlobalParams.get("latStamp");
            var lonStamp = this.GlobalParams.get("lonStamp");
            var xtile = this.GlobalParams.get("xtile");
            var ytile = this.GlobalParams.get("ytile");

            if (lonStamp != controls.getLongitude() || latStamp != controls.getLatitude()) {
                lonStamp = controls.getLongitude();
                latStamp = controls.getLatitude();

                rotating.rotation.set(
                    latStamp * Math.PI / 180,
                    (-lonStamp) * Math.PI / 180,
                    0);
                var oldXtile = xtile;
                var oldYtile = ytile;
                xtile = Utils.long2tile(lonStamp, zoom);
                ytile = Utils.lat2tile(latStamp, zoom);
                if (Math.abs(oldXtile - xtile) >= 1 ||
                    Math.abs(oldYtile - ytile) >= 1) {
                    this.UpdateOSMTile(lonStamp, latStamp, zoom);
                }
            } else if (Math.abs(zoom - oldZoom) >= 1) {

                this.UpdateOSMTile(lonStamp, latStamp, zoom);
            }

            this.GlobalParams.set("zoom", zoom);
            this.GlobalParams.set("latStamp", latStamp);
            this.GlobalParams.set("lonStamp", lonStamp);
            this.GlobalParams.set("xtile", xtile);
            this.GlobalParams.set("ytile", ytile);




            this.GlobalParams.set("timeLast", Date.now());
            EventListenerGlobalParams.set("rotateTargetX", rotateTargetX);
            EventListenerGlobalParams.set("rotateTargetY", rotateTargetY);
            EventListenerGlobalParams.set("rotateX", rotateX);
            EventListenerGlobalParams.set("rotateY", rotateY);
            EventListenerGlobalParams.set("rotateVY", rotateVY);
            EventListenerGlobalParams.set("rotateVX", rotateVX);
            EventListenerGlobalParams.set("tilt", tilt);
            EventListenerGlobalParams.set("tiltTarget", tiltTarget);
            EventListenerGlobalParams.set("scaleTarget", scaleTarget);
            this.GlobalParams.set("controls", controls);
            this.GlobalParams.set("rotating", rotating);
            this.GlobalParams.set("osmTile", osmTile);
            this.GlobalParams.set("camera", camera);
        }
        animate = () => {

            this.AnimeUpdate();

            this.render();

            requestAnimationFrame(this.animate);

            var stats = this.GlobalParams.get("stats");
            stats.update();

            this.GlobalParams.get("rotating").traverse(function (mesh) {
                if (mesh.update !== undefined) {
                    mesh.update();
                }
            });
        }
        Execute() {
            super.Execute();
            //console.log("three.js main system:"+this.MainSystem.name);
            this.InitThreeJs();
            this.initUi();
            this.animate();
        }
    }

    export class EventListenerSystem extends System {
        GlobalParams: Utils.HashSet<any>;
        constructor() {
            super("eventlistener");
            this.GlobalParams = new Utils.HashSet<any>();
            var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
            var pressX = 0, pressY = 0;
            var pscale = 0;
            this.GlobalParams.set("mouseX", mouseX);
            this.GlobalParams.set("mouseY", mouseY);
            this.GlobalParams.set("pmouseX", pmouseX);
            this.GlobalParams.set("pmouseY", pmouseY);
            this.GlobalParams.set("pressX", pressX);
            this.GlobalParams.set("pressY", pressY);
            this.GlobalParams.set("pscale", pscale);

            var dragging = false;
            var touchEndTime = 0;
            this.GlobalParams.set("dragging", dragging);
            this.GlobalParams.set("touchEndTime", touchEndTime);

            var rotateX = 0, rotateY = 0;
            var rotateVX = 0, rotateVY = 0;
            var rotateXMax = 90 * Math.PI / 180;
            this.GlobalParams.set("rotateX", rotateX);
            this.GlobalParams.set("rotateY", rotateY);
            this.GlobalParams.set("rotateVX", rotateVX);
            this.GlobalParams.set("rotateVY", rotateVY);
            this.GlobalParams.set("rotateXMax", rotateXMax);

            var rotateTargetX = undefined;
            var rotateTargetY = undefined;
            this.GlobalParams.set("rotateTargetX", rotateTargetX);
            this.GlobalParams.set("rotateTargetY", rotateTargetY);

            var tilt = 0;
            var tiltTarget = undefined;
            var scaleTarget = undefined;
            this.GlobalParams.set("tilt", tilt);
            this.GlobalParams.set("tiltTarget", tiltTarget);
            this.GlobalParams.set("scaleTarget", scaleTarget);

        }
        constrain(v, min, max) {
            if (v < min)
                v = min;
            else
                if (v > max)
                    v = max;
            return v;
        }

        handleMWheel(delta) {
            var camera = (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.get("camera");
            camera.zoom += delta * 0.1;
            camera.zoom = this.constrain(camera.zoom, 0.5, 5.0);
            camera.updateProjectionMatrix();
            (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.set("camera", camera);

            this.GlobalParams.set("scaleTarget", undefined);
        }

        onMouseWheel(event) {
            event.preventDefault();
            var delta = 0;

            if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta / 120;
            } else if (event.detail) { // firefox
                delta = -event.detail / 3;
            }

            if (delta) {
                this.handleMWheel(delta);
            }

            event.returnValue = false;
        }
        handleTiltWheel(delta) {
            var camera = (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.get("camera");

            var tilt = this.GlobalParams.get("tilt");
            tilt -= delta * 0.1;
            tilt = this.constrain(tilt, 0, Math.PI / 2);
            this.GlobalParams.set("tilt", tilt);

            camera.position.y = 300 * Math.sin(-tilt);
            camera.position.z = 100 + 300 * Math.cos(-tilt);
            camera.lookAt(new THREE.Vector3(0, 0, 100));
            (<ThreeJsSystem>(<MainSystem>this.MainSystem).OtherSystems.get("threejs")).GlobalParams.set("camera", camera);

            this.GlobalParams.set("tiltTarget", undefined);
        }
        InitEventListener() {
         
        }
        Execute() {
            super.Execute();
        }
    }


}