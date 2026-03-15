"use client";

import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three/webgpu";

/** Handles camera controls for the 3D scene */
export default function CameraController() {
  const { camera } = useThree();
  useControls({
    cameraX: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.1,
      onChange: (value) => {
        camera.position.set(value, camera.position.y, camera.position.z);
        camera.updateProjectionMatrix();
      },
    },
    cameraY: {
      value: 5,
      min: 0,
      max: 20,
      step: 0.1,
      onChange: (value) => {
        camera.position.set(camera.position.x, value, camera.position.z);
        camera.updateProjectionMatrix();
      },
    },
    cameraZ: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.1,
      onChange: (value) => {
        camera.position.set(camera.position.x, camera.position.y, value);
        camera.updateProjectionMatrix();
      },
    },
    targetX: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.1,
      onChange: (value, _, { get }) => {
        const targetY = get("targetY");
        const targetZ = get("targetZ");
        camera.lookAt(new THREE.Vector3(value, targetY, targetZ));
      },
    },
    targetY: {
      value: 1,
      min: -20,
      max: 20,
      step: 0.1,
      onChange: (value, _, { get }) => {
        const targetX = get("targetX");
        const targetZ = get("targetZ");
        camera.lookAt(new THREE.Vector3(targetX, value, targetZ));
      },
    },
    targetZ: {
      value: 0,
      min: -20,
      max: 20,
      step: 0.1,
      onChange: (value, _, { get }) => {
        const targetX = get("targetX");
        const targetY = get("targetY");
        camera.lookAt(new THREE.Vector3(targetX, targetY, value));
      },
    },
  });
  return <></>;
}
