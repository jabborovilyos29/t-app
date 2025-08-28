import React, { useEffect, useRef } from "react";
import Effect from "./helpers/effect";

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const singleColor = "#0aff0a";
    let gradientColor = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradientColor.addColorStop(0, "red");
    gradientColor.addColorStop(0.2, "yellow");
    gradientColor.addColorStop(0.4, "green");
    gradientColor.addColorStop(0.6, "cyan");
    gradientColor.addColorStop(0.8, "blue");
    gradientColor.addColorStop(1, "magenta");

    let defaultColor: string | CanvasGradient = singleColor;

    const effect = new Effect(canvas.width, canvas.height);

    let lastTime = 0;
    const fps = 50;
    const nextFrame = 1000 / fps;
    let timer = 0;

    const animate = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      if (timer > nextFrame) {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = defaultColor;
        effect.symbols.forEach((symbol) => {
          symbol.draw(ctx);
          symbol.update();
        });

        timer = 0;
      } else {
        timer += deltaTime;
      }

      requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      effect.resize(canvas.width, canvas.height);

      gradientColor = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradientColor.addColorStop(0, "red");
      gradientColor.addColorStop(0.2, "yellow");
      gradientColor.addColorStop(0.4, "green");
      gradientColor.addColorStop(0.6, "cyan");
      gradientColor.addColorStop(0.8, "blue");
      gradientColor.addColorStop(1, "magenta");
    };

    const toggleColor = () => {
      defaultColor = defaultColor === singleColor ? gradientColor : singleColor;
    };

    let lastTouchEnd = 0;

    window.addEventListener("resize", handleResize);
    window.addEventListener("dblclick", toggleColor);
    window.addEventListener("touchend", () => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        toggleColor();
      }
      lastTouchEnd = now;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("dblclick", toggleColor);
      window.removeEventListener("touchend", toggleColor);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default MatrixRain;
