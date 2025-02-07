attribute vec3 normal2D;
attribute vec3 tangent2;


varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vNormal2D;

uniform float uLength;
uniform float uPreviousLength;
uniform float uLengthTransition;
uniform float uWidth;
uniform float uPreviousWidth;
uniform float uWidthTransition;
uniform bool uOval;
uniform float uHeight;
uniform float uSteps;
uniform float uInsetTop;
uniform float uInsetBottom;
uniform float uVerticalEdgeThickness;
uniform float uShift;
uniform float uCurrentEdge;
uniform float uPreviousEdge;
uniform float uEdgeTransition;

#include "/src/shaders/edges.glsl"
#include "/src/shaders/functions.glsl"

void main(){
  vUv = uv;
  vCustomNormal = normalize(normal);

  float lengthAnimation = mix(uPreviousLength,uLength,uLengthTransition) / 2.;
  float widthTransition = mix(uPreviousWidth,uWidth,uWidthTransition);

  if(uOval){
    float offset = (lengthAnimation - 1.);
    csm_Position.x += normalize(-normal2D.x) * offset;  
    csm_Position.y *= widthTransition;
    vUv.x += normalize(-normal2D.x) * offset;  
    vUv.y *= widthTransition;
  }else{
    csm_Position.x *= lengthAnimation;
    csm_Position.y *= widthTransition;
    vUv.x *= lengthAnimation;
    vUv.y *= widthTransition;
  }





  // scale inital shape but it streches the shape
  // csm_Position.xy -= normal2D.xy * vec2((uLength/2.)-1.,0.);

  // csm_Position = csm_Position * vec3((uLength/2.)-1., 1., 1.0);

  // csm_Position.xy -= normal2D.xy * vec2((uLength * ((uLength/2.)-1.) / 2.0) - 1.0, 0.0);
  // csm_Position.xy -= normal2D.xy * vec2((uLength * ((uLength/2.)-1.) / 2.0) - 1.0, 0.0);

  //new computed normals using neighbours technique
  vec3 biTangent = cross(normal, tangent2.xyz);
  float shift = uShift;
  // Adjust shift based on the sign of the normal's x or y component
  if (normal.x < -0.7 || normal.y > 0.7) {
    shift = -shift;
  }
  vec3 positionA = csm_Position + tangent2.xyz * shift;
  vec3 positionB = csm_Position + biTangent.xyz * shift;

  vec2 edgePositionTransition = mix(getOffsetPosition(csm_Position,uHeight,uSteps,uPreviousEdge),getOffsetPosition(csm_Position,uHeight,uSteps,uCurrentEdge),uEdgeTransition);
  vec2 vUvTransition = mix(alignUVsAfterOffset(vUv,vCustomNormal,uPreviousEdge),alignUVsAfterOffset(vUv,vCustomNormal,uCurrentEdge),uEdgeTransition);

  // create edge + align uv's again
  csm_Position.xy += edgePositionTransition;
  vUv = vUvTransition;

  // neighbours offset edge
  vec2 edgePositionATransition = mix(getOffsetPosition(positionA,uHeight,uSteps,uPreviousEdge),getOffsetPosition(positionA,uHeight,uSteps,uCurrentEdge),uEdgeTransition);
  vec2 edgePositionBTransition = mix(getOffsetPosition(positionB,uHeight,uSteps,uPreviousEdge),getOffsetPosition(positionB,uHeight,uSteps,uCurrentEdge),uEdgeTransition);

  positionA.xy += edgePositionATransition;
  positionB.xy += edgePositionBTransition;

  vPosition = position; 
  vNormal2D = normal2D.xy;

  vec3 toA = normalize(positionA -  csm_Position);
  vec3 toB = normalize(positionB -  csm_Position);
  csm_Normal = cross(toA,toB);
  vCustomNormal = csm_Normal;
  vWorldPosition = (modelMatrix * vec4(csm_Position,1.)).xyz;

}