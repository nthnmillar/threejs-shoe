
// Create an empty scene
var scene = new THREE.Scene();

function main(){

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});

  var raycaster = new THREE.Raycaster();
  var objects = [];
  var model;
  var cube;
  var crate;
  var scale = .05;
  var lightMap = "models/light-map.png" ;
  var normMap = "models/normal-map.png";
  //var manager = new THREE.LoadingManager();

  // LOADING MANAGER
  //manager.onStart = function (url, itemsLoaded, itemsTotal) {
    THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal){
      	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    THREE.DefaultLoadingManager.onLoad = function (){
      console.log('Loading Complete!');
      init();
    };



  // MATERIALS
  var partMat = new THREE.MeshLambertMaterial({color: 0x7A7A7A});
  var modelMat = new THREE.MeshPhongMaterial({color: 0x393939});
  var clearMat = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  var airMat = new THREE.MeshPhongMaterial({color: 0x170078});
  // CAMERA
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 4;

  // RENDERER
  // var renderer = new THREE.WebGLRenderer({antialias:true});
  // Configure renderer clear color
  renderer.setClearColor("#ffffff");
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // CONTROLS
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.update();

  /*
  // LIGHTS
   const color = 0xFFFFFF;
   const intensity = 1;
   const light = new THREE.DirectionalLight(color, intensity);
   light.position.set(-1, 2, 4);
   light.castShadow = true;
   scene.add(light);

   var ambLight = new THREE.AmbientLight(0xffffff, 0.25);
   ambLight.position.y = 5;
   scene.add(ambLight);
  */

  // MODEL LOAD
  var texLoad = new THREE.TextureLoader();
  texLoad.load(lightMap, function(light){
    texLoad.load(normMap, function(norm){
      var modelLoad = new THREE.GLTFLoader();
      modelLoad.load(
          'models/Shoe2019.glb',
          function (gltf){
              model = gltf.scene;

              model.scale.x = scale;
              model.scale.z = scale;
              model.scale.y = scale;

              model.position.set(0, -.5, 0);

              model.traverse(function(o) {
                  if (o.isMesh){

                  //  o.material = new THREE.MeshPhongMaterial({color: 0x393939});


                    if (o.name == "001_laces" || o.name == "005_swoosh" || o.name == "100_midsolebrand"){
                      o.material = modelMat;
                    }

                    if (o.name == "012_sole"){
                      o.material = new THREE.MeshPhongMaterial({color: 0x393939});
                    }

                    if (o.name == "003_upper"){
                      o.material = new THREE.MeshPhongMaterial({color: 0x393939});
                    }

                    if (o.name == "006_airbags"){
                      o.material = airMat;
                  //    o.material.blending = THREE.AdditiveBlending;
                      o.material.opacity = 0.8;
                      o.material.reflectivity = 3;
                    }

                    o.material.lightMap = light;
                    o.material.normalMap = norm;

                    // airMat
                    if (o.name == "100_transparent"){
                     o.material = clearMat;
                     o.material.blending = THREE.AdditiveBlending;
                     o.material.opacity = 0.5;
                     o.material.transparent = true;
                     o.material.reflectivity = 3;
                    }

            

                    objects.push( o );
                  }
              });

              scene.add (model);

          },
          function (xhr){
            console.log ((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error){
            console.log('An error happended');
          }
      );
    });
  });

  function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize){
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function init(){

   //projector = new THREE.Projector();

   canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );

   function onDocumentMouseDown(event){

     console.log("Clicked");
     var mouse3D = new THREE.Vector3( (event.clientX / window.innerWidth ) * 2 - 1,
                                   - ( event.clientY / window.innterHeight ) * 2 + 1,
                                     0.5 );
     mouse3D.unproject(camera);
     mouse3D.sub ( camera.position);
     mouse3D.normalize();
     var raycaster = new THREE.Raycaster (camera.position, mouse3D);
     var intersects = raycaster.intersectObjects (objects);
     // Change color if hit block
     if (intersects.length > 0 ){
       console.log(intersects[0].material);
       intersects[0].object.material.color.setHex (Math.random() * 0xffffff);
     }
   }

    // RENDER
    function render() {


      if (resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      controls.update();
      // Render the scene
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    }

}

main();