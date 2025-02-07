/* eslint-disable react-hooks/exhaustive-deps */
import { useMaterial } from "@/hooks/useMaterial";
import fragment from "@/shaders/fragment.glsl";
import vertex from "@/shaders/vertex.glsl";
import { Color, MeshStandardMaterial, Uniform } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useTableStore } from "../../store/Tablestore";
import { FC, useEffect, useMemo } from "react";
import gsap from "gsap";

export const TabletopMaterial: FC<{ shape: string }> = ({ shape }) => {
  const maps = useMaterial();
  const {
    tableLength,
    tableLengthPrevious,
    tableWidth,
    tableWithPrevious,
    tableThickness,
    tableSteps,
    insetBottom,
    shift,
    tableColor,
    tableColorPrevious,
    currentEdge,
    previousEdge,
    verticalEdgeThickness,
    insetTop,
    wireframe,
    step,
  } = useTableStore();
  const uniforms = useMemo(
    () => ({
      uPreviousLength: new Uniform(tableLengthPrevious),
      uLength: new Uniform(tableLength),
      uPreviousWidth: new Uniform(tableWithPrevious),
      uWidth: new Uniform(tableWidth),
      uHeight: new Uniform(tableThickness),
      uSteps: new Uniform(tableSteps),
      uInsetBottom: new Uniform(insetBottom),
      uInsetTop: new Uniform(insetTop),
      uShift: new Uniform(shift),
      uColor: new Uniform(new Color(tableColor)),
      uColorPrevious: new Uniform(new Color(tableColorPrevious)),
      uColorTransition: new Uniform(0),
      uCurrentEdge: new Uniform(currentEdge),
      uPreviousEdge: new Uniform(previousEdge),
      uOval: new Uniform(shape === "oval"),
      uEdgeTransition: new Uniform(0),
      uLengthTransition: new Uniform(0),
      uWidthTransition: new Uniform(0),
      uShapeOpacity: new Uniform(0),
      uVerticalEdgeThickness: new Uniform(verticalEdgeThickness),
    }),
    []
  );

  useEffect(() => {
    uniforms.uHeight.value = tableThickness;
    uniforms.uSteps.value = tableSteps;
    uniforms.uInsetBottom.value = insetBottom;
    uniforms.uInsetTop.value = insetTop;
    uniforms.uShift.value = shift;
    uniforms.uColor.value = new Color(tableColor);
    uniforms.uColorPrevious.value = new Color(tableColorPrevious);
    uniforms.uCurrentEdge.value = currentEdge;
    uniforms.uPreviousEdge.value = previousEdge;
    uniforms.uVerticalEdgeThickness.value = verticalEdgeThickness;
  }, [tableThickness, tableSteps, insetBottom, insetTop, shift, tableColor, tableColorPrevious, currentEdge, previousEdge, verticalEdgeThickness]);

  useEffect(() => {
    gsap.fromTo(
      uniforms.uColorTransition,
      { value: 1 },
      {
        value: 1,
        duration: 1,
        ease: "linear",
      }
    );
  }, [tableColor]);

  useEffect(() => {
    uniforms.uPreviousLength.value = tableLengthPrevious;
    uniforms.uLength.value = tableLength;
    gsap.fromTo(
      uniforms.uLengthTransition,
      { value: 0 },
      {
        value: 1,
        duration: 0.6,
        ease: "linear",
      }
    );
  }, [tableLength]);

  useEffect(() => {
    uniforms.uPreviousWidth.value = tableWithPrevious;
    uniforms.uWidth.value = tableWidth;
    gsap.fromTo(
      uniforms.uWidthTransition,
      { value: 0 },
      {
        value: 1,
        duration: 0.6,
        ease: "linear",
      }
    );
  }, [tableWidth]);

  useEffect(() => {
    gsap.fromTo(
      uniforms.uEdgeTransition,
      { value: 0 },
      {
        value: 1,
        duration: 1,
        ease: "linear",
      }
    );
  }, [currentEdge]);

  useEffect(() => {
    if (step !== 0) {
      if (uniforms.uShapeOpacity.value === 0) {
        gsap.fromTo(
          uniforms.uShapeOpacity,
          { value: 0 },
          {
            value: 1,
            duration: 1,
            ease: "linear",
          }
        );
      }
    } else {
      if (uniforms.uShapeOpacity.value === 1) {
        gsap.fromTo(
          uniforms.uShapeOpacity,
          { value: 1 },
          {
            value: 0,
            duration: 1,
            ease: "linear",
          }
        );
      }
    }
  }, [step]);

  return (
    <ThreeCustomShaderMaterial
      baseMaterial={MeshStandardMaterial}
      transparent
      silent
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={uniforms}
      wireframe={wireframe}
      patchMap={{
        "*": {
          "#include <normal_fragment_maps>": `#ifdef USE_NORMALMAP_OBJECTSPACE
            normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals
            #ifdef FLIP_SIDED
            normal = - normal;
            #endif
            #ifdef DOUBLE_SIDED
            normal = normal * faceDirection;
            #endif
            normal = normalize( normalMatrix * normal );
            #elif defined( USE_NORMALMAP_TANGENTSPACE )
            vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
            mapN.xy *= normalScale;
            normal = normalize( tbn * mapN );
            #elif defined( USE_BUMPMAP )
            normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
            #endif
            `,
        },
      }}
      {...maps}
    />
  );
};
