import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './PixelBlast.css'

const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform float uEdgeFade;

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0,0,0), vec3(1,57,113)));
  float n100 = hash11(dot(ip + vec3(1,0,0), vec3(1,57,113)));
  float n010 = hash11(dot(ip + vec3(0,1,0), vec3(1,57,113)));
  float n110 = hash11(dot(ip + vec3(1,1,0), vec3(1,57,113)));
  float n001 = hash11(dot(ip + vec3(0,0,1), vec3(1,57,113)));
  float n101 = hash11(dot(ip + vec3(1,0,1), vec3(1,57,113)));
  float n011 = hash11(dot(ip + vec3(0,1,1), vec3(1,57,113)));
  float n111 = hash11(dot(ip + vec3(1,1,1), vec3(1,57,113)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float M = bw * jitterScale;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`

interface PixelBlastProps {
  pixelSize?: number
  color?: string
  className?: string
  style?: React.CSSProperties
  patternScale?: number
  patternDensity?: number
  pixelSizeJitter?: number
  edgeFade?: number
  speed?: number
}

export default function PixelBlast({
  pixelSize = 3,
  color = '#d6d3d1',
  className,
  style,
  patternScale = 2,
  patternDensity = 1,
  pixelSizeJitter = 0,
  edgeFade = 0.5,
  speed = 0.5,
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const threeRef = useRef<any>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (threeRef.current) {
      const t = threeRef.current
      t.uniforms.uColor.value.set(color)
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio()
      t.uniforms.uScale.value = patternScale
      t.uniforms.uDensity.value = patternDensity
      t.uniforms.uPixelJitter.value = pixelSizeJitter
      t.uniforms.uEdgeFade.value = edgeFade
      return
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearAlpha(0)
    container.appendChild(renderer.domElement)

    const uniforms = {
      uResolution: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEdgeFade: { value: edgeFade },
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SRC,
      fragmentShader: FRAGMENT_SRC,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)

    const clock = new THREE.Clock()
    const randomOffset = Math.random() * 1000

    const setSize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio()
    }
    setSize()

    const ro = new ResizeObserver(setSize)
    ro.observe(container)

    let raf = 0
    const animate = () => {
      uniforms.uTime.value = randomOffset + clock.getElapsedTime() * speed
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    threeRef.current = { renderer, material, uniforms, resizeObserver: ro, raf, quad }

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      quad.geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
      threeRef.current = null
    }
  }, [color, pixelSize, patternScale, patternDensity, pixelSizeJitter, edgeFade, speed])

  return (
    <div
      ref={containerRef}
      className={`pixel-blast-container ${className ?? ''}`}
      style={style}
      aria-hidden="true"
    />
  )
}
