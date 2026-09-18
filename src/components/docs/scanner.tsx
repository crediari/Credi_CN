"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type FC } from "react";

import { cn } from "@/lib/utils";

type ScanDirection = "vertical" | "horizontal" | "diagonal";

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.trim().replace(/^#/, "");
  const match = /^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(value);
  if (!match) {
    return [1, 1, 1];
  }

  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ];
};

type ColorUniform = { value: Float32Array };
type NumericUniform = { value: number };

const setColor = (uniform: ColorUniform, hex: string) => {
  const color = hexToRgb(hex);
  uniform.value[0] = color[0];
  uniform.value[1] = color[1];
  uniform.value[2] = color[2];
};

const directionToFloat = (dir: ScanDirection): number => {
  if (dir === "horizontal") {
    return 1;
  }
  if (dir === "diagonal") {
    return 2;
  }
  return 0;
};

const vertex = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepFalloff;
uniform float uScale;
uniform float uFrequency;
uniform float uRipple;
uniform float uBandDensity;
uniform float uLineSharpness;
uniform float uGlow;
uniform float uColorSpread;
uniform float uBrightness;
uniform float uContrast;
uniform float uSoftness;
uniform float uVignette;
uniform float uOpacity;
uniform float uScanline;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uDirection;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

const float TAU = 6.2831853;

float signalField(vec2 p, float t) {
  float w = sin(p.x * 1.3 + t * 0.7);
  w += sin(p.y * 1.7 - t * 0.52) * 0.8;
  w += sin((p.x + p.y) * 0.9 + t * 0.91) * 0.6;
  w += sin((p.x - p.y) * 1.53 - t * 0.63) * 0.42;
  return w * 0.35;
}

vec3 palette(float f) {
  f = clamp(f, 0.0, 1.0);
  f = pow(f, uContrast);
  vec3 c = mix(uColor1, uColor2, smoothstep(0.08, 0.6, f));
  return mix(c, uColor3, smoothstep(0.68, 1.0, f));
}

float scanBand(float x, float aa, float sharp) {
  float v = mix(0.5, 0.5 + 0.5 * cos(x * TAU), aa);
  return pow(v, sharp);
}

void main() {
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 p = uv0 / max(uScale, 0.001);
  float t = iTime * uSpeed;

  float axis;
  if (uDirection < 0.5) axis = p.y;
  else if (uDirection < 1.5) axis = p.x;
  else axis = (p.x + p.y) * 0.70710678;

  float sig = signalField(p * uFrequency, t);
  float coord = axis + sig * uRipple;
  float phase = coord / max(uSweepWidth, 0.05) - t * uSweepSpeed;
  float sweep = pow(0.5 + 0.5 * cos(phase * TAU), max(uSweepFalloff, 0.1));

  float lc = coord * uBandDensity;
  float aa = 1.0 / (1.0 + uSoftness * fwidth(lc) * 3.0);
  aa = clamp(aa, 0.0, 1.0);

  float bodyBase = clamp(0.5 + 0.5 * sig, 0.0, 1.0);
  float body = bodyBase * bodyBase * uGlow * sweep;

  float sharp = max(uLineSharpness, 0.1);
  float split = uColorSpread * 0.16;
  float fr = clamp(scanBand(lc + split, aa, sharp) * sweep + body, 0.0, 1.0);
  float fg = clamp(scanBand(lc, aa, sharp) * sweep + body, 0.0, 1.0);
  float fb = clamp(scanBand(lc - split, aa, sharp) * sweep + body, 0.0, 1.0);

  float f = (fr + fg + fb) * 0.3333333;
  vec3 col = palette(f);
  float inten = f * uBrightness;

  if (uScanline > 0.5) {
    inten *= 1.0 - 0.18 * (0.5 + 0.5 * cos(gl_FragCoord.y * 1.7));
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    inten += (g - 0.5) * uGrainIntensity;
  }

  inten *= clamp(1.0 - uVignette * smoothstep(0.55, 1.65, length(uv0)), 0.0, 1.0);
  inten = clamp(inten, 0.0, 1.0);

  float a = clamp(inten * uOpacity, 0.0, 1.0);
  fragColor = vec4(clamp(col, 0.0, 1.0) * a, a);
}
`;

type ScannerUniforms = {
  iTime: NumericUniform;
  iResolution: ColorUniform;
  uSpeed: NumericUniform;
  uSweepSpeed: NumericUniform;
  uSweepWidth: NumericUniform;
  uSweepFalloff: NumericUniform;
  uScale: NumericUniform;
  uFrequency: NumericUniform;
  uRipple: NumericUniform;
  uBandDensity: NumericUniform;
  uLineSharpness: NumericUniform;
  uGlow: NumericUniform;
  uColorSpread: NumericUniform;
  uBrightness: NumericUniform;
  uContrast: NumericUniform;
  uSoftness: NumericUniform;
  uVignette: NumericUniform;
  uOpacity: NumericUniform;
  uScanline: NumericUniform;
  uGrain: NumericUniform;
  uGrainIntensity: NumericUniform;
  uDirection: NumericUniform;
  uColor1: ColorUniform;
  uColor2: ColorUniform;
  uColor3: ColorUniform;
};

type ScannerContext = {
  uniforms: ScannerUniforms;
  render: () => void;
  setPaused: (value: boolean) => void;
};

type ScannerProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  sweepSpeed?: number;
  sweepWidth?: number;
  sweepFalloff?: number;
  scale?: number;
  frequency?: number;
  ripple?: number;
  bandDensity?: number;
  lineSharpness?: number;
  glow?: number;
  scanDirection?: ScanDirection;
  colorSpread?: number;
  brightness?: number;
  contrast?: number;
  softness?: number;
  vignette?: number;
  scanline?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  opacity?: number;
  dpr?: number;
  paused?: boolean;
  className?: string;
};

const contexts = new WeakMap<HTMLDivElement, ScannerContext>();

const Scanner: FC<ScannerProps> = ({
  color1 = "#5f7d72",
  color2 = "#b7cfc4",
  color3 = "#3d5a50",
  speed = 0.5,
  sweepSpeed = 0.25,
  sweepWidth = 1.6,
  sweepFalloff = 6,
  scale = 1.5,
  frequency = 2,
  ripple = 0.22,
  bandDensity = 11,
  lineSharpness = 5.5,
  glow = 0.22,
  scanDirection = "vertical",
  colorSpread = 0.7,
  brightness = 1,
  contrast = 1.15,
  softness = 1.4,
  vignette = 0.45,
  scanline = true,
  grain = true,
  grainIntensity = 0.05,
  opacity = 1,
  dpr = 1,
  paused = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(Math.max(dpr, 0.5), 2),
      premultipliedAlpha: true,
      webgl: 2,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.setAttribute("aria-hidden", "true");
    container.append(canvas);

    const uniforms: ScannerUniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Float32Array([1, 1]) },
      uSpeed: { value: 0.5 },
      uSweepSpeed: { value: 0.25 },
      uSweepWidth: { value: 1.6 },
      uSweepFalloff: { value: 6 },
      uScale: { value: 1.5 },
      uFrequency: { value: 2 },
      uRipple: { value: 0.22 },
      uBandDensity: { value: 11 },
      uLineSharpness: { value: 5.5 },
      uGlow: { value: 0.22 },
      uColorSpread: { value: 0.7 },
      uBrightness: { value: 1 },
      uContrast: { value: 1.15 },
      uSoftness: { value: 1.4 },
      uVignette: { value: 0.45 },
      uOpacity: { value: 1 },
      uScanline: { value: 1 },
      uGrain: { value: 1 },
      uGrainIntensity: { value: 0.05 },
      uDirection: { value: 0 },
      uColor1: { value: new Float32Array(hexToRgb("#5f7d72")) },
      uColor2: { value: new Float32Array(hexToRgb("#b7cfc4")) },
      uColor3: { value: new Float32Array(hexToRgb("#3d5a50")) },
    };
    const program = new Program(gl, {
      vertex,
      fragment,
      cullFace: false,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let frameId = 0;
    let startedAt = performance.now();
    let isPaused = false;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = () => renderer.render({ scene: mesh });
    const stop = () => {
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
      }
      frameId = 0;
    };
    const canAnimate = () => isVisible && isPageVisible && !isPaused && !reducedMotion.matches;

    const loop = (now: number) => {
      frameId = 0;
      if (!canAnimate()) {
        return;
      }
      uniforms.iTime.value = (now - startedAt) * 0.001;
      render();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!canAnimate() || frameId !== 0) {
        return;
      }
      frameId = requestAnimationFrame(loop);
    };

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      render();
    };

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (canAnimate()) {
        start();
      } else {
        stop();
      }
    };
    const handleReducedMotion = () => {
      if (canAnimate()) {
        start();
      } else {
        stop();
        render();
      }
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (canAnimate()) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleReducedMotion);

    contexts.set(container, {
      uniforms,
      render,
      setPaused(value) {
        isPaused = value;
        if (canAnimate()) {
          start();
        } else {
          stop();
          render();
        }
      },
    });

    setSize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      contexts.delete(container);
      if (canvas.parentNode === container) {
        canvas.remove();
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [dpr]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const context = contexts.get(container);
    if (!context) {
      return;
    }

    const uniforms = context.uniforms;
    uniforms.uSpeed.value = speed;
    uniforms.uSweepSpeed.value = sweepSpeed;
    uniforms.uSweepWidth.value = sweepWidth;
    uniforms.uSweepFalloff.value = sweepFalloff;
    uniforms.uScale.value = scale;
    uniforms.uFrequency.value = frequency;
    uniforms.uRipple.value = ripple;
    uniforms.uBandDensity.value = bandDensity;
    uniforms.uLineSharpness.value = lineSharpness;
    uniforms.uGlow.value = glow;
    uniforms.uColorSpread.value = colorSpread;
    uniforms.uBrightness.value = brightness;
    uniforms.uContrast.value = contrast;
    uniforms.uSoftness.value = softness;
    uniforms.uVignette.value = vignette;
    uniforms.uOpacity.value = opacity;
    uniforms.uScanline.value = scanline ? 1 : 0;
    uniforms.uGrain.value = grain ? 1 : 0;
    uniforms.uGrainIntensity.value = grainIntensity;
    uniforms.uDirection.value = directionToFloat(scanDirection);
    setColor(uniforms.uColor1, color1);
    setColor(uniforms.uColor2, color2);
    setColor(uniforms.uColor3, color3);
    context.setPaused(paused);
    context.render();
  }, [
    bandDensity,
    brightness,
    color1,
    color2,
    color3,
    colorSpread,
    contrast,
    dpr,
    frequency,
    glow,
    grain,
    grainIntensity,
    lineSharpness,
    opacity,
    paused,
    ripple,
    scale,
    scanDirection,
    scanline,
    softness,
    speed,
    sweepFalloff,
    sweepSpeed,
    sweepWidth,
    vignette,
  ]);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
};

export { Scanner, type ScannerProps };
