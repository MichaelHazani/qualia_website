$(function(){function e(){a=new THREE.Scene,i=new THREE.PerspectiveCamera(75,m/h,.1,1e3),r=new THREE.OrbitControls(i),r.damping=.5,n=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),n.setSize(m,h),$("#three").append(n.domElement),$(window).resize(function(){m=window.innerWidth,h=window.innerHeight,n.setSize(m,h),i.aspect=m/h,i.updateProjectionMatrix()}),i.position.z=30,i.position.y=-2;var e=THREE.ImageUtils.loadTexture("./images/bump.jpg");e.wrapS=THREE.RepeatWrapping,e.wrapT=THREE.RepeatWrapping,e.repeat.set(3,3),o=new THREE.HemisphereLight(16777215,16777215,.5),o.position.set(0,50,0),a.add(o),s=new THREE.PointLight(65535,.5,100),s.position.set(0,0,-40),a.add(s);var t=new THREE.Object3D;if(t.position.set(0,0,0),a.add(t),T.matches){var p=new THREE.ImageUtils.loadTexture("./js/shaders/Ocean/assets/img/waternormals.jpg");p.wrapS=p.wrapT=THREE.RepeatWrapping,this.ms_Water=new THREE.Water(n,i,a,{textureWidth:512,textureHeight:512,waterNormals:p,alpha:1,sunDirection:s.position.normalize(),sunColor:16771993,waterColor:5543382,distortionScale:50});var w=new THREE.TetrahedronGeometry(12,0);w.applyMatrix((new THREE.Matrix4).makeRotationAxis(new THREE.Vector3(1,0,-1).normalize(),Math.atan(Math.sqrt(2)))),E=new THREE.Mesh(w,this.ms_Water.material),E.add(this.ms_Water),a.add(E)}else{var w=new THREE.TetrahedronGeometry(12,0);w.applyMatrix((new THREE.Matrix4).makeRotationAxis(new THREE.Vector3(1,0,-1).normalize(),Math.atan(Math.sqrt(2))));var d=new THREE.MeshPhongMaterial({color:5543382,bumpMap:e});E=new THREE.Mesh(w,d),a.add(E),E.position.y=10,E.rotation.z=1,E.rotation.y=.4}}function t(){if(E.rotation.x+=.001,T.matches){var e=.01*Date.now();this.ms_Water.material.uniforms.time.value+=1/60,this.ms_Water.render()}n.render(a,i),r.update(),requestAnimationFrame(t)}var a,i,n,r,o,s,E,p,w,d,m=window.innerWidth,h=window.innerHeight,R,T=window.matchMedia("(min-width: 500px)");e(),t()});