$(function() {

    //three.js main logic

    var scene, sceneGL, camera, renderer, rendererGL, hemiLight, pointLight, pivot, pivotGL;
    var tetrahedron, objects;
    var raycaster, mouse;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var domEvents;
    var mq = window.matchMedia("(min-width: 500px)");
    var mouseX = mouseY = 0;
    var windowHalfX = width / 2;
    var windowHalfY = height / 2;
    var particleGroup, emitter;
    var camLoc = 2;

    function init() {

        scene = new THREE.Scene();
        sceneGL = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(width, height);

        rendererGL = new THREE.WebGLRenderer({alpha: true});
        rendererGL.setSize(width, height);
        rendererGL.domElement.style.position = 'absolute';
        rendererGL.domElement.style.zIndex = 0;

        // rendererGL.setClearColor(0x00ff00, 0.0);
        // renderer.domElement.appendChild(rendererGL.domElement);

        $("#three").append(rendererGL.domElement);
        $("#three").append(renderer.domElement);

        // pivot for the objects
        // pivotGL is used to sync particles in other renderer
        pivot = new THREE.Object3D();
        pivotGL = new THREE.Object3D();

        scene.add(pivot);

        // css3d Bandcamp
        var bandcamp = document.createElement('iframe');
        bandcamp.src = 'https://bandcamp.com/EmbeddedPlayer/album=1406266098/size=large/bgcol=ffffff/linkcol=7137dc/tracklist=false/transparent=true/';
        bandcamp.width = 400;
        bandcamp.height = 600;
        bandcamp.setAttribute('frameborder', '0');

        CSSbandcamp = new THREE.CSS3DObject(bandcamp);
        CSSbandcamp.position.set(200,-60,-300);
        CSSbandcamp.rotation.y= 120 * Math.PI / 180;
        pivot.add(CSSbandcamp);

        // css3d Guillotine
        var guillovid = document.createElement('iframe');
        guillovid.src = 'https://www.youtube.com/embed/HeefP7_0CbM?fs=0' ;
        guillovid.width = 640;
        guillovid.height = 385;
        guillovid.setAttribute('frameborder', '0');
        CSSguillovid = new THREE.CSS3DObject(guillovid);
        CSSguillovid.position.set = (0,550,0);
        pivot.add(CSSguillovid);

        // instagram
        var insta = document.createElement('iframe');
        insta.src = 'http://neon-moon.com/qualia/repo/twitter.html';
        insta.width = 580;
        insta.height = 580;
        insta.setAttribute('frameborder', '0');

        CSSinsta = new THREE.CSS3DObject(insta);
        CSSinsta.position.set(-200,-40,-300);
        CSSinsta.rotation.y = 240 * Math.PI / 180;
        pivot.add(CSSinsta);


        //particles thanks to squarefeet's lovely engine
        //at squarefeet.github.io
        particleGroup = new SPE.Group({
            texture: THREE.ImageUtils.loadTexture('./repo/images/snowpart.png'),
            maxAge: 2,
                blending: THREE.AdditiveBlending
          });

          emitter = new SPE.Emitter({
            positionSpread: new THREE.Vector3(2000, 2000, 2000),

                acceleration: new THREE.Vector3(0, 0, 0),

            velocity: new THREE.Vector3(0, 0, 0),

            colorStart: new THREE.Color('white'),
            colorEnd: new THREE.Color('white'),
            sizeStart: 3,
            sizeEnd: 3,
                opacityStart: 0,
                opacityMiddle: 1,
                opacityEnd: 0,

            particleCount: 40000
          });

          particleGroup.addEmitter( emitter );
          pivotGL.add( particleGroup.mesh );

        //resize helper
        $(window).resize(function() {

            width = window.innerWidth;
            height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        //add mousemove
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        camera.position.z = 900;
        // camera.position.y = -2;




        //lights
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        pointLight = new THREE.PointLight(0x00ffff, 0.5, 100);
        pointLight.position.set(0, 0, -40);
        scene.add(pointLight);

    sceneGL.add(pivotGL);

        //arrow tween functionality
        $(".larrow").click(function(){

            var rotation = { y : pivot.rotation.y};
            console.log(rotation);
            var target = { y : pivot.rotation.y + 120 * Math.PI / 180};
            var tween = new TWEEN.Tween(rotation).to(target, 1500);
            tween.easing(TWEEN.Easing.Cubic.InOut);
                tween.onUpdate(function(){
                pivot.rotation.y = rotation.y;
                pivotGL.rotation.y = rotation.y;
            });
            tween.start();
        });

        $(".rarrow").click(function(){
                var rotation = { y : pivot.rotation.y};
                var target = { y : pivot.rotation.y - 120 * Math.PI / 180};
                var tween = new TWEEN.Tween(rotation).to(target, 1500);
                tween.easing(TWEEN.Easing.Cubic.InOut);
                    tween.onUpdate(function(){
                    pivot.rotation.y = rotation.y;
                    pivotGL.rotation.y = rotation.y;
                });
                tween.start();
        });


    }



    function render() {

        requestAnimationFrame(render);
        particleGroup.tick( 0.02 );
        rendererGL.render(sceneGL, camera);
        renderer.render(scene, camera);
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (- mouseY - camera.position.y) * 0.05;
        camera.lookAt(pivot.position);
        TWEEN.update();

    }

    function onDocumentMouseMove(e) {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    }


    init();
    render();

});
