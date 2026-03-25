import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const OceanScene = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;

    // Prevent double init
    sceneRef.current = true;

    const container = containerRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      outputBufferType: THREE.HalfFloatType,
    });
    // Cap pixel ratio at 1.5 to save massive amounts of RAM on high-DPI (retina) displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.1;
    container.appendChild(renderer.domElement);

    // Bloom
    const bloomPass = new UnrealBloomPass(
      // Halve the bloom resolution to save significant memory and GPU overhead
      new THREE.Vector2(container.clientWidth / 2, container.clientHeight / 2),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.2;
    bloomPass.strength = 0.09;
    bloomPass.radius = 0.5;
    renderer.setEffects([bloomPass]);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      20000
    );
    camera.position.set(30, 30, 100);

    // Sun
    const sun = new THREE.Vector3();

    // Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new Water(waterGeometry, {
      textureWidth: 256, // Reduced from 512 to save reflection render target VRAM
      textureHeight: 256, // Reduced from 512
      waterNormals: new THREE.TextureLoader().load(
        '/textures/waternormals.jpg',
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;
    skyUniforms['cloudCoverage'].value = 0.4;
    skyUniforms['cloudDensity'].value = 0.9;
    skyUniforms['cloudElevation'].value = 0.9;

    const parameters = {
      elevation: 90,
      azimuth: 180,
    };

    // Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sceneEnv = new THREE.Scene();
    let renderTarget;

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms['sunPosition'].value.copy(sun);
      water.material.uniforms['sunDirection'].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      sceneEnv.add(sky);
      renderTarget = pmremGenerator.fromScene(sceneEnv);
      scene.add(sky);

      scene.environment = renderTarget.texture;
    }

    updateSun();



    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495; // Don't allow camera to go below water
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true; // Set to false to stop the automatic slow rotation
    controls.autoRotateSpeed = 0.01;
    controls.update();

    // Mouse movement tracking for parallax
    let mouseX = 0;
    const onMouseMove = (event) => {
      // Normalize mouse X to range [-1, 1]
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      const time = performance.now() * 0.001;

      // Floating cube


      // Update water & sky time
      water.material.uniforms['time'].value += 1.0 / 60.0;
      sky.material.uniforms['time'].value = time;

      // Smoothly shift the camera target based on horizontal mouse movement
      controls.target.x = THREE.MathUtils.lerp(controls.target.x, mouseX * 40, 0.02);

      // Update controls
      controls.update();

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      pmremGenerator.dispose();
      if (renderTarget) renderTarget.dispose();
      waterGeometry.dispose();
      water.material.dispose();
      sky.material.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default OceanScene;
