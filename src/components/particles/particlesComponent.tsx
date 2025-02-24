"use client";
import { useCallback, useRef } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

const ParticlesComponent = (props: {
  className: string;
  id: string;
  particlesOptions: object;
}) => {
  const { particlesOptions, className, id } = props;

  const isInitialized = useRef(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    if (!isInitialized.current) {
      await loadFull(engine);
      isInitialized.current = true;
    }
  }, []);

  const particlesLoaded = useCallback(async (container: unknown) => {
    await container;
  }, []);

  return (
    <Particles
      id={id}
      className={className}
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
  );
};

export default ParticlesComponent;
