#include /src/shaders/functions.glsl;

varying vec2 vUv;
varying vec3 vCustomNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec3 vNormals2;
varying vec2 vNormal2D;

uniform float uLength;
uniform float uWidth;
uniform vec3 uColor;
uniform vec3 uColorPrevious;
uniform float uColorTransition;
uniform float uHeight;
uniform float uSteps;
uniform float uEdgeTransition;

void main(){
  vec4 diffuseMap = texture2D(map,vUv);

  vec3 color = diffuseMap.xyz;
  // Normalize the normals
  vec3 normalizedNormals = normalize(vCustomNormal);

  // Define the UV offset amount for sampling along the X-axis (you can tweak this for better results)
  float uvXOffset = 0.00001;  // Adjust this value based on the texture scaling

  // Check if the normal indicates it's part of a rounded corner
  // This checks for normals that point in a direction that would correspond to rounded geometry
  // if (abs(normalizedNormals.x) <0.7 && normalizedNormals.z == 0. && abs(normalizedNormals.y) < 0.99) {
  //     float percentage =abs(dot(normalizedNormals,vec3(1.,0.,0.)));
  //     percentage = smoothstep(0.,0.99,percentage);
  //     // percentage = remap(percentage, -1.,1.,0.,1.);

  //     vec2 offsetUv = vec2(vUv.y, -vUv.x);
      
  //     // Sample the texture at the offset UV coordinates
  //     vec4 offsetDiffuseMap = texture2D(map, offsetUv);

  //     // Use the color from the offset sample for the rounded edges
  //     color = mix(color,offsetDiffuseMap.xyz,percentage * uEdgeTransition);
  // }

  
  // if(vPosition.z < (uHeight / uSteps) *3.){
  //        color = vec3(0.,0.,0.);
  // }

// Center of the UV space (normalized between 0 and 1)
  float normalizedPosX = (vPosition.x + uLength/2.) / uLength; 
  float normalizedPosY = (vPosition.y + uWidth/2.) / uWidth; 
  normalizedPosX = remap(normalizedPosX,0.,1.,0.5,1.);
  float transition = 1. - smoothstep(uColorTransition , uColorTransition + 0.5, normalizedPosX);


  float circle = distance(vec2(normalizedPosX,normalizedPosY),vec2(0.));

  vec3 currentColor = uColor;
  vec3 previousColor = uColorPrevious;
  vec3 transitionColor = mix(uColorPrevious,uColor,transition);


  float edge0 = 0.75;    // Start of fade-out
  float edge1 = 5.;     // End of fade-out

  float alpha = smoothstep(edge1, edge0, abs(vWorldPosition.z));

  diffuseMap.xyz = color * transitionColor;
  diffuseMap.a = pow(alpha,8.);
  // diffuseMap.xyz = vec3(alpha);

  // diffuseMap.xyz = vec3(transition);

  csm_DiffuseColor = diffuseMap;
}