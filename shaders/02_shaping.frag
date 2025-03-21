#version 300 es
precision mediump float;

/**
* \file
* \author Deokwoo Seo
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

out vec4 FragColor;
uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st,float pct){
    return smoothstep(pct-.02,pct,st.y)-smoothstep(pct,pct+.02,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float curve_pow=pow(st.x,2.);
    float pct_pow=plot(st,curve_pow);
    
    float curve_sin=.5+.5*sin(6.2831*st.x+u_time);
    float pct_sin=plot(st,curve_sin);
    
    float curve_step=step(.5,st.x);
    float pct_step=plot(st,curve_step);
    
    float curve_smooth=smoothstep(.2,.8,st.x);
    float pct_smooth=plot(st,curve_smooth);
    
    vec3 color=vec3(0.);
    color=mix(color,vec3(1.,0.,0.),pct_pow);
    color=mix(color,vec3(0.,1.,0.),pct_sin);
    color=mix(color,vec3(0.,0.,1.),pct_step);
    color=mix(color,vec3(curve_smooth),.5);
    
    FragColor=vec4(color,1.);
}
