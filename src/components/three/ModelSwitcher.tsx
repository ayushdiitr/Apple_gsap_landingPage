import {
  PresentationControls,
  type PresentationControlProps,
} from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14";

const ModelSwitcher = ({
  isMobile,
  scale,
}: {
  isMobile: boolean;
  scale: number;
}) => {
  const smallMacbookRef = useRef(null);
  const lgMacbookRef = useRef(null);

  const animDrn = 1;
  const offsetDistance = 5;

  const fadeMeshes = (group: any, opacity: number) => {
    if (!group) return;

    group.traverse((child: any) => {
      if (child.isMesh) {
        child.material.transparent = true;
        gsap.to(child.material, { opacity, duration: animDrn });
      }
    });
  };

  const moveGroup = (group: any, x: number) => {
    if (!group) return;

    gsap.to(group.position, { x, duration: animDrn });
  };

  const controlsConfig: PresentationControlProps = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  const showLarge = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLarge) {
      moveGroup(smallMacbookRef.current, -offsetDistance);
      moveGroup(lgMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(lgMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(lgMacbookRef.current, offsetDistance);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(lgMacbookRef.current, 0);
    }
  }, [scale]);


  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={lgMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                <MacbookModel14  scale={isMobile ? 0.03 : 0.06}/>
                </group>
            </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
