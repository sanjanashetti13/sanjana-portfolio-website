import * as THREE from "three";

export const whiteGloss = new THREE.MeshPhysicalMaterial({
  color: "#f2f4fa",
  roughness: 0.06,
  metalness: 0.72,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  reflectivity: 1,
});

export const whiteSoft = new THREE.MeshPhysicalMaterial({
  color: "#e8ebf4",
  roughness: 0.1,
  metalness: 0.55,
  clearcoat: 0.85,
  clearcoatRoughness: 0.08,
});

export const grayPanel = new THREE.MeshPhysicalMaterial({
  color: "#b8becd",
  roughness: 0.18,
  metalness: 0.48,
  clearcoat: 0.5,
  clearcoatRoughness: 0.12,
});

export const blackFaceplate = new THREE.MeshPhysicalMaterial({
  color: "#06060c",
  roughness: 0.04,
  metalness: 0.9,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  envMapIntensity: 1.2,
});

export const blackBorder = new THREE.MeshStandardMaterial({
  color: "#1a1824",
  roughness: 0.25,
  metalness: 0.92,
});

export const jointBlack = new THREE.MeshStandardMaterial({
  color: "#0c0a12",
  roughness: 0.42,
  metalness: 0.78,
});

export const pinkEmissive = new THREE.MeshStandardMaterial({
  color: "#e879f9",
  emissive: "#e879f9",
  emissiveIntensity: 3.5,
  roughness: 0.12,
  metalness: 0.15,
});

export const pinkAccent = new THREE.MeshStandardMaterial({
  color: "#e879f9",
  emissive: "#d946ef",
  emissiveIntensity: 2.2,
  roughness: 0.15,
  metalness: 0.2,
});

export const whiteNose = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#ffffff",
  emissiveIntensity: 2.5,
  roughness: 0.1,
});

export const silverRing = new THREE.MeshStandardMaterial({
  color: "#9ca3af",
  roughness: 0.2,
  metalness: 0.95,
});
