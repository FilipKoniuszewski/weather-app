import { useEffect, useRef } from 'react';

const MAX_PATHS = 90;
const MAX_THICKNESS = 4;
const STARTING_DISTANCE = 22;
const MAX_BRANCHES = 5;
const MIN_PAUSE_MS = 2200;
const MAX_PAUSE_MS = 4200;

const randomInt = (max: number) => Math.ceil(Math.random() * max);
const negOrPos = () => (Math.random() < 0.5 ? -1 : 1);

const drawLightning = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  branches: number,
  width: number,
  height: number,
) => {
  let x = startX;
  let y = startY;
  let thickness = MAX_THICKNESS;
  let distance = STARTING_DISTANCE;
  const pathCount = randomInt(MAX_PATHS / 3);

  ctx.strokeStyle = '#fff';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
  ctx.shadowBlur = 8;

  for (let i = 0; i < pathCount; i += 1) {
    ctx.beginPath();
    ctx.lineWidth = Math.max(1, randomInt(thickness));
    ctx.moveTo(x, y);

    const endX = x + randomInt(distance) * negOrPos();
    const endY = y + randomInt(distance * 1.6);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    x = endX;
    y = endY;
    thickness /= 1.2;
    distance /= 1.1;

    if (y >= height || x <= 0 || x >= width) break;

    if (branches < MAX_BRANCHES && randomInt(MAX_PATHS / 8) === 1) {
      drawLightning(ctx, x, y, branches + 1, width, height);
    }
  }
};

const Lightning = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);
  const timeoutIds = useRef<number[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay);
      timeoutIds.current.push(id);
      return id;
    };

    const strike = () => {
      const canvas = canvasRef.current;
      const flash = flashRef.current;
      const root = rootRef.current;
      if (!canvas || !flash || !root) return;

      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      drawLightning(
        ctx,
        randomInt(width * 0.7) + width * 0.15,
        randomInt(height * 0.25),
        0,
        width,
        height,
      );

      flash.classList.remove('lightning__flash--active');
      void flash.offsetWidth;
      flash.classList.add('lightning__flash--active');

      schedule(() => {
        ctx.clearRect(0, 0, width, height);
        flash.classList.remove('lightning__flash--active');
      }, 280);

      const pause = MIN_PAUSE_MS + Math.random() * (MAX_PAUSE_MS - MIN_PAUSE_MS);
      schedule(strike, pause);
    };

    schedule(strike, 900);

    return () => {
      timeoutIds.current.forEach((id) => window.clearTimeout(id));
      timeoutIds.current = [];
    };
  }, []);

  return (
    <div ref={rootRef} className="lightning" aria-hidden="true">
      <canvas ref={canvasRef} className="lightning__canvas" />
      <span ref={flashRef} className="lightning__flash" />
    </div>
  );
};

export default Lightning;
