$(function() {

    //three.js main logic

    var scene, camera, renderer, controls, hemiLight, pointLight;
    var tetrahedron, objects;
    var raycaster, mouse;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var domEvents;
    var mq = window.matchMedia("(min-width: 500px)");

    function init() {

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        controls = new THREE.OrbitControls(camera);
        controls.damping = 0.5;
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height);
        $("#three").append(renderer.domElement);

        //Guillotine!
        // var listener = new THREE.AudioListener();
        // camera.add(listener);
        // var audio = new Audio('./audio/GTinst.ogg');
        // audio.play();


        //resize helper
        $(window).resize(function() {

            width = window.innerWidth;
            height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        camera.position.z = 30;
        camera.position.y = -2;

        //test tetrahedron

        //texture
        var scloudPic = THREE.ImageUtils.loadTexture("./images/bump.jpg");
        scloudPic.wrapS = THREE.RepeatWrapping;
        scloudPic.wrapT = THREE.RepeatWrapping;
        scloudPic.repeat.set(3, 3);




        //lights
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        pointLight = new THREE.PointLight(0x00ffff, 0.5, 100);
        pointLight.position.set(0, 0, -40);
        scene.add(pointLight);

        var empty1 = new THREE.Object3D();

        empty1.position.set(0, 0, 0);
        scene.add(empty1);



        // water tetrahedron if desktop, scale-bumpmapped if mobile
        // logic from http://www.sitepoint.com/javascript-media-queries/
        if (mq.matches) {
          //water
          // Load textures
          var waterNormals = new THREE.ImageUtils.loadTexture('./js/shaders/Ocean/assets/img/waternormals.jpg');
          waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

          // Create the water effect
          this.ms_Water = new THREE.Water(renderer, camera, scene, {
              textureWidth: 512,
              textureHeight: 512,
              waterNormals: waterNormals,
              alpha: 1,
              sunDirection: pointLight.position.normalize(),
              sunColor: 0xFFEB99,
              waterColor: 0x5495D6,
              distortionScale: 50.0,
          });

          var geometry = new THREE.TetrahedronGeometry(12, 0);
          geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
          tetrahedron = new THREE.Mesh(geometry, this.ms_Water.material);
          tetrahedron.add(this.ms_Water);
          // tetrahedron.rotation.x = - Math.PI * 0.5;
          // tetrahedron.position.y = -30;
          scene.add(tetrahedron);
          // tetrahedron.position.y = 0;

        //if mobile
        } else {

            var geometry = new THREE.TetrahedronGeometry(12, 0);
            geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
            var material = new THREE.MeshPhongMaterial({
                color: 0x5495D6,
                bumpMap: scloudPic
            });
            tetrahedron = new THREE.Mesh(geometry, material);

            scene.add(tetrahedron);
            tetrahedron.position.y = 10;
            tetrahedron.rotation.z = 1;
            tetrahedron.rotation.y = .4;

            //tetrahedron click event access, requires domEvents
            // domEvents.addEventListener(tetrahedron, 'click', function(event){
            // console.log('you clicked on mesh', tetrahedron)
            // // tetrahedron.scale.x*=1.2;
            // tetrahedron.scale.y*=1.2;
            // tetrahedron.scale.z*=1.2;
            // tetrahedron.rotation.y +=50;
            //   console.log(tetrahedron.rotation.x, tetrahedron.rotation.y, tetrahedron.rotation.z);
            // }, false)
        }
    }



    function render() {

        tetrahedron.rotation.x += 0.001;

        //if desktop, render water
        if (mq.matches) {
            var timer = Date.now() * 0.01;
            this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
            this.ms_Water.render();
        }

        renderer.render(scene, camera);

        controls.update();
        requestAnimationFrame(render);



    }

    init();
    render();

});
