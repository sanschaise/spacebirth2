import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from "three";
//import { Math } from 'three';
import { random } from 'mathjs'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';





function App() {
    useEffect(() => {

      var credits = {
  "1": {
    "title": "Directed by",
    "names": "Richard Keith\n & \nMarius Jopen"
  },
  "2": {
    "title": "Written by",
    "names": "Richard Keith\n & \nMarius Jopen"
  },
  "3": {
    "title": "Produced by",
    "names": "Marius Jopen\n & \nAudrey Belaud"
  },
  "4": {
    "title": "Director\n of \nphotography",
    "names": "Jamie Touche"
  },
  "5": {
    "title": "Production designer",
    "names": "Richard Keith"
  },
  "6": {
    "title": "Edited by",
    "names": "Felix Maxwell\nKarliczek"
  },
  "7": {
    "title": "Music by",
    "names": "Arthur Robert\nHortolomei"
  },
  "8": {
    "title": "Costume designer",
    "names": "Richard Keith"
  },
  "9": {
    "title": "Visual effect supervisors",
    "names": "Audrey Belaud\n & \nMarius Jopen"
  },
  "10": {
    "title": "Casting by",
    "names": "Audrey Belaud\n & \nMarius Jopen"
  },
  "11": {
    "title": "(The Cosmonaut)",
    "names": "Marcello"
  },
  "12": {
    "title": "(The Alien Girl)",
    "names": "Mary Lilith Fischer"
  },
  "13": {
    "title": "(The Data Base)",
    "names": "Lesala Mampa"
  }
};

      var creditsOld =   [
        "Marius Jopen",
        "Richard Keith",
        "Riccardo",
        "Ellie",
        "Hannah",
        "Pietro",
        "Audrey Belaud",
        "Simon",
        "Hannah Kindler",
        "Zach",
        "Julia",
        "Carlotta",
        "Lea",
        "Robert",
        "Hagar",
        "Alexander ten Cate",
        "Arthur",
        "Grace",
        "Jamie",
        "Henning",
        "Joanna",
        "Magnus",
        "Sebastian Haslauer",
        "Tom Laterveer",
        "Christoph Jopen",
        "Henk, Gassiedlung",
        "Gas Facility",
        "Bike Welt",
        "Lotta",
        "Simon",
        "Eva",
        "Nico",
        "Katja",
        "Rob Gilham",
        "Marika Ley",
        "Maria Craig",
        "Eliza",
        "Harriet",
        "Alex",
    ];

var texts = [];
   
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
     const color = 0x000000;
  const density = 0.08;
  scene.fog = new THREE.FogExp2(color, density);
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

//var composer = new EffectComposer( renderer );


    var geometry = new THREE.TorusGeometry( 30, 6, 310, 860 );
var material = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.BackSide } );
var torus = new THREE.Mesh( geometry, material );
//torus.scale(1.1);
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true, side: THREE.BackSide } );
var torus2 = new THREE.Mesh( geometry, material );



    camera.position.z = 40;
    camera.position.z = 0;
    camera.position.y = 3;


// var fontPath = '../node_modules/three/examples/fonts/helvetiker_regular.typeface.json';

// var fontLoader = new THREE.FontLoader();
// fontLoader.load(fontPath,function(tex){ 
//     var  textGeo = new THREE.TextGeometry('Test', {
//             size: 10,
//             height: 5,
//             curveSegments: 6,
//             font: tex,
//     });
//     var  color = new THREE.Color();
//     color.setRGB(255, 250, 250);
//     var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
//     var  text = new THREE.Mesh(textGeo , textMaterial);
//     scene.add(text);
// })


//create image
// var bitmap = document.createElement('canvas');
// var g = bitmap.getContext('2d');
// bitmap.width = 800;
// bitmap.height = 300;
// g.font = '45px Space Mono';
// var text= 'Marius Jopen';
// g.fillStyle = 'white';
// g.fillText(text, bitmap.width/3, bitmap.height/2);
// // g.strokeStyle = 'red';
// // g.strokeText(text, bitmap.width/2, bitmap.height/2);

// // canvas contents will be used for a texture
// var texture = new THREE.Texture(bitmap) 
// var material = new THREE.MeshBasicMaterial({
//             map : texture,
//             side: THREE.FrontSide,
//             transparent: true
//           });
// texture.needsUpdate = true;
// var textMesh = new THREE.Mesh(new THREE.PlaneGeometry(bitmap.width/60, bitmap.height/60, 10, 10), material);
// textMesh.overdraw = true;
var group = new THREE.Group();

var myAxis = new THREE.Vector3(0, 0, 1);
var delta = 0;

var i = 0;
var creditsLength = Object.keys(credits).length;




var offset = Math.PI/2;

for (var key in credits) {
  i++
  delta = (i/creditsLength)*(Math.PI*1.5);
  var deltaDeg = (i/creditsLength)*360;
  //console.log(delta);
  //delta = delta*360; 
  var titleMesh = createText(credits[key].title);
  var textMesh = createText(credits[key].names);
  texts.push(titleMesh);
  texts.push(textMesh);
  //console.log(texts[i]);
  console.log(credits[key].names);
  
  // textMesh.rotation.x = -Math.PI/4;
  //textMesh.rotation.z = Math.sin(deltaDeg);
  //textMesh.rotateOnWorldAxis(myAxis, delta);
  textMesh.rotation.z = Math.sin(delta)*360;
  //textMesh.rotation.y = delta;

  titleMesh.position.x = Math.sin(delta-0.1 - offset)*30;
  titleMesh.position.y = Math.cos(delta-0.1 - offset )*30;
  group.add(titleMesh);

  textMesh.position.x = Math.sin(delta - offset)*30;
  textMesh.position.y = Math.cos(delta - offset)*30;
  group.add(textMesh);
}

// var textMesh = createText(credits['1'].names);
// textMesh.rotation.x = -90;
// textMesh.position.x = -30;
// group.add(textMesh);
// var textMesh = createText(credits['2'].names);
// textMesh.rotation.x = -90;
// textMesh.rotation.y = 180;
// textMesh.position.x = 30;
// group.add(textMesh);
// var textMesh = createText(credits['3'].names);
// textMesh.rotation.x = -90;
// textMesh.rotation.y = 90;
// textMesh.position.y = 30;
// group.add(textMesh);
// var textMesh = createText(credits['4'].names);
// textMesh.rotation.x = -90;
// textMesh.rotation.y = -90;
// textMesh.position.y = -30;
// group.add(textMesh);


var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
//sphere.position.z = -10;
//sphere.position.x = -30;


//group.add(torus);
group.add(torus2);
group.add(sphere);

scene.add( group );

group.rotation.x = 90;
group.position.x = 30;
//group.rotation.z += 1.5;




  

  const loader = new THREE.FontLoader();
// const json = JSON.parse( "../node_modules/three/examples/fonts/helvetiker_regular.typeface.json" ); // you have to parse the data so it becomes a JS object 
// const font = loader.parse( json );
// torus2.rotation.x = 90;
// torus2.position.x = 30;


// scene.add( sphere );
// scene.add( torus2 );
// scene.add( torus );

var time = 0;

    var animate = function () {
      requestAnimationFrame( animate );
      time += 0.0005;
      camera.fov = 50 + Math.sin(time)*20;
      
       //textMesh.rotation.z += 0.001;
        //torus2.rotation.z -= 0.002;
       // torus.rotation.y += 0.01;

 
       // textMesh.lookAt( camera.position );
       
       var randy = random(-0.0001,0.0001);
       var randx = random(-0.001,0.001);

       // camera.rotation.y += randy;
       // camera.rotation.x += randx;
       camera.rotation.z = Math.cos(time)*Math.PI*0.01;
       group.rotation.z = time;

      for (var i = 0; i<creditsLength*2; i++){
        texts[i].lookAt( camera.position );
        // texts[i].rotation.x = camera.rotation.x - Math.PI/2;
        // texts[i].rotation.y = camera.rotation.y ;
        // texts[i].rotation.x = camera.rotation.z  ;
        
        
        //texts[i].lookAt( camera.rotation );
        
       }
       // textMesh.rotation.y += randy;
       // textMesh.rotation.x += randx;
       // textMesh.rotation.z = Math.sin(time);
        
      renderer.render( scene, camera );

      //composer.render();
//       var renderPass = new RenderPass( scene, camera );
// composer.addPass( renderPass );
// var luminosityPass = new ShaderPass( LuminosityShader );
// composer.addPass( luminosityPass );
// var glitchPass = new GlitchPass();
// composer.addPass( glitchPass );
    };
    animate();



        function remap(value, low1, high1, low2, high2) {
          return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      }

      function createText(text) {
        var bitmap = document.createElement('canvas');
        var g = bitmap.getContext('2d');
        bitmap.width = 512*3;
        bitmap.height = 256*3;
        g.font = '50px EK FLUT';
        //var text= text;

        var txt = text;
        var x = bitmap.width/2;
        var y = bitmap.height/3;
        var lineheight = 60;
        var lines = txt.split('\n');
        g.textAlign = "center";
        g.fillStyle = 'white';
        for (var i = 0; i<lines.length; i++) {
          g.fillText(lines[i], x, y + (i*lineheight) );
        }

        
        // g.fillText(text, bitmap.width/2, bitmap.height/2);



        // g.strokeStyle = 'red';
        // g.strokeText(text, bitmap.width/2, bitmap.height/2);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(bitmap) 
        var material = new THREE.MeshBasicMaterial({
                    map : texture,
                    side: THREE.DoubleSide,
                    transparent: true
                  });
        texture.needsUpdate = true;
        var textMesh = new THREE.Mesh(new THREE.PlaneGeometry(bitmap.width/250, bitmap.height/250, 10, 10), material);
        textMesh.overdraw = true;
        return textMesh;
      }


    // === THREE.JS EXAMPLE CODE END ===
  
    });
  return (
    <div className="App">

    </div>
  );
}

export default App;
