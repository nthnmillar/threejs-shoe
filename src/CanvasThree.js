import React, { useEffect } from 'react';
import store from "./store";
import {colAction, nameAction} from './actions/actions';

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import lightMap from './models/light-map.jpg';
import normMap from './models/normal-map.jpg';
import shoeModel from './models/Shoe2019.glb';

const CanvasThree = () =>{

  const colDispatched = (col) =>{
    store.dispatch(colAction(col));
  }

  const nameDispatched = (name) => {
    store.dispatch(nameAction(name));
  }
    
  useEffect(() => {
    var scene = new THREE.Scene();
    function main() {
      const canvas = document.querySelector('#c');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      //scene.background = new THREE.Color('blue');
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
  
      var objects = [];
      var model;
      var scale = 0.05;
      var mouse3D;
  
      // LOADING MANAGER
      THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
        console.log(
          'Started loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
        );
      };
      THREE.DefaultLoadingManager.onLoad = function() {
        console.log('Loading Complete!');
          init();
        };
  
        // MATERIALS
        //var partMat = new THREE.MeshLambertMaterial({ color: 0x7a7a7a });
        var modelMat = new THREE.MeshPhongMaterial({ color: 0x393939 });
        var clearMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
       // var airMat = new THREE.MeshPhongMaterial({ color: 0x170078 });
        // CAMERA
        var camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 4;
  
        // RENDERER
        renderer.setClearColor('#ffffff');
        // Configure renderer size
        renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
  
        // CONTROLS
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
  
       
        // LIGHTS
        const hemiLight = new THREE.HemisphereLight(0xffffef, 0x200029,.1 )
        scene.add(hemiLight);
        
        /*
        let topLight = new THREE.DirectionalLight(0xFFFFFF, .1);
        topLight.position.set(0, 200, 0);
        const topLightHelper = new THREE.DirectionalLightHelper(topLight);  
        scene.add(topLightHelper);
        scene.add(topLight);
        topLightHelper.update();
        topLight.castShadow = true;
        */
        
        let rightLight = new THREE.DirectionalLight(0xFFFFFF, .8);
        rightLight.position.set(200, 0,0 );
     //   const rightLightHelper = new THREE.DirectionalLightHelper(rightLight);  
     //   camera.add(rightLightHelper);
        camera.add(rightLight);
        scene.add(camera);
    //    rightLightHelper.update();
        rightLight.castShadow = true;

        let leftLight = new THREE.DirectionalLight(0xFFFFFF, .8);
        leftLight.position.set(-200, 0,0 );
      //  const leftLightHelper = new THREE.DirectionalLightHelper(leftLight);  
     //   camera.add(leftLightHelper);
        camera.add(leftLight);
        scene.add(camera);
     //   leftLightHelper.update();
        leftLight.castShadow = true;
        
        /*
        let ambLight = new THREE.AmbientLight(0xffffff, 0.25);
        ambLight.position.y = .1;
        scene.add(ambLight);
        */      
  
        // MODEL LOAD
        var texLoad = new THREE.TextureLoader();
        texLoad.load(lightMap, function(light) {
          texLoad.load(normMap, function(norm) {
            var modelLoad = new GLTFLoader();
            modelLoad.load(
              shoeModel,
              function(gltf) {
                model = gltf.scene;
                model.scale.x = scale;
                model.scale.z = scale;
                model.scale.y = scale;
                model.position.set(0, -0.5, 0);
  
                model.traverse(function(o) {
                  if (o.isMesh) {
                    if (
                      o.name === '001_laces' ||
                      o.name === '005_swoosh' ||
                      o.name === '100_midsolebrand'
                    ) {
                      o.material = modelMat;
                    }
  
                    if (o.name === '012_sole') {
                      o.material = new THREE.MeshPhongMaterial({ color: 0x393939 });
                    }
  
                    if (o.name === '003_upper') {
                      o.material = new THREE.MeshPhongMaterial({ color: 0x393939 });
                    }
  
                    if (o.name === '006_airbags') {
                      o.material = new THREE.MeshPhongMaterial({ color: 0x393939 });
                   
                    //  o.material = airMat;
                      o.material.opacity = 0.8;
                      o.material.reflectivity = 3;
                   
                    }
  
                    o.material.lightMap = light;
                    o.material.normalMap = norm;
  
                    if (o.name === '100_transparent') {
                      o.material = clearMat;
                      o.material.blending = THREE.AdditiveBlending;
                      o.material.opacity = 0.5;
                      o.material.transparent = true;
                      o.material.reflectivity = 3;
                      console.log(o);
                    }
                    
                    if (o.name !== '100_transparent'){
                      objects.push(o);
                    }
                    
                  }
                });
  
                scene.add(model);
              },
              function(xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
              },
              function(error) {
                console.log('An error happended');
              }
            );
          });
        });
  
        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }
  
        // RAYCAST
        function init() {
          canvas.addEventListener('mousedown', onDocumentMouseDown, false);
          canvas.addEventListener('touchstart', onDocumentTouchDown, false);
  
          function onDocumentMouseDown(event) {
            console.log('Clicked');
            mouse3D = new THREE.Vector3(
              (event.clientX / window.innerWidth) * 2 - 1,
              -(event.clientY / window.innerHeight) * 2 + 1,
              0.5
            );
            mouse3D.unproject(camera);
            mouse3D.sub(camera.position);
            mouse3D.normalize();
            intersected(event);
          }
  
          function onDocumentTouchDown(event) {
            console.log('Touched');
            mouse3D = new THREE.Vector3(
              (event.targetTouches[0].clientX / window.innerWidth) * 2 - 1,
              -(event.targetTouches[0].clientY / window.innerHeight) * 2 + 1,
              0.5
            );
            mouse3D.unproject(camera);
            mouse3D.sub(camera.position);
            mouse3D.normalize();
            intersected(event);
          }
          
          function intersected(event){
            var raycaster = new THREE.Raycaster(camera.position, mouse3D);
            var intersects = raycaster.intersectObjects(objects);
            // Change color if hit
            if (intersects.length > 0) {
              let setColor = Math.random() * 0xffffff;
              intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
              intersects[0].object.material.color.setHex(setColor);
              colDispatched("rgb(" + intersects[0].object.material.color.r * 255 + "," + intersects[0].object.material.color.g * 255 + "," + intersects[0].object.material.color.b * 255 + ")");
              nameDispatched(intersects[0].object.name.substring(intersects[0].object.name.indexOf("_") + 1));
            }
          }
    
          // RENDER
          function render() {
            if (resizeRendererToDisplaySize(renderer)) {
              const canvas = renderer.domElement;
              camera.aspect = canvas.clientWidth / canvas.clientHeight;
              camera.updateProjectionMatrix();
            }
  
            controls.update();
            // Render the scene
            renderer.render(scene, camera);
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);
        }
  
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
        }
      }
  
      main();
    });
    
    return (
      <>
        <canvas id= "c"></canvas>
      </> 
    )
  }
  
  
  export default CanvasThree;