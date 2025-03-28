#version 300 es
precision mediump float;

/**
* \file
* \author Deokwoo Seo
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsv2rgb(in vec3 c){
    vec3 rgb=clamp(
        abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,
        0.,
        1.
    );
    rgb=rgb*rgb*(3.-2.*rgb);
    return c.z*mix(vec3(1.),rgb,c.y);
}

out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/u_resolution.xy)*2.-1.;
    uv.x*=u_resolution.x/u_resolution.y;
    float angle=atan(uv.y,uv.x);
    float radius=length(uv);
    float twist=u_time*.5*radius;
    angle+=twist;
    float hue=(angle/TWO_PI)+.5;
    float saturation=abs(sin(u_time+radius*10.));
    float brightness=1.-smoothstep(0.,1.,radius);
    vec3 color=hsv2rgb(vec3(hue,saturation,brightness));
    fragColor=vec4(color,1.);
}
