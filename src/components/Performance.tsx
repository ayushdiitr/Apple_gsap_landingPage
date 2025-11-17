import { useMediaQuery } from "react-responsive";
import { performanceImages, performanceImgPositions } from "../constants";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const sectionRef = useRef(null);

  useGSAP(() => {
    const sectionEl = sectionRef.current;
    if(!sectionEl) return;

    gsap.fromTo(
        ".content p",
        {opacity:0, y: 10},
        {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
                trigger: '.content p',
                start: "top bottom",
                end: "top center",
                scrub:true,
                invalidateOnRefresh: true
            }
        }
    )
    if(isMobile) return;

    const tl = gsap.timeline({
        defaults: {duration: 2, ease: "power1.inOut", overwrite: "auto"},
        scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    performanceImgPositions.forEach((it) => {
        if(it.id === 'p5') return;

        const selector = `.${it.id}`;
        const vars: {
            left?: string,
            right?: string,
            bottom?: string,
            transform?: string
        } = {};

        if(typeof it.left === 'number') vars.left = `${it.left}%`;
        if(typeof it.right === 'number') vars.right = `${it.right}%`;
        if(typeof it.bottom === 'number') vars.bottom = `${it.bottom}%`;
        
        // if (it.transform) vars.transform = it.transform;
        tl.to(selector, vars, 0)
    });
  },{
    scope: sectionRef, dependencies:[isMobile]
  })

  return (
    <section id="performance" ref={sectionRef}>
      <h2> Next-level graphics performance, Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((img,idx) => {
          return <img src={img.src} className={img.id} key={img.id} 
                        alt={img.id || `Performance Image #${idx + 1}`}
           />;
        })}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
