#version 300 es
precision mediump float;

/**
* \file
* \author Deokwoo Seo
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

uniform vec2 u_resolution;
uniform float u_time;

out vec4 FragColor;

float plot(vec2 st,float pct){
    return smoothstep(pct-.01,pct,st.y)-smoothstep(pct,pct+.01,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    float wave=.5+.5*sin(1.*st.x+u_time);
    float curve=pow(st.x,u_time+3.);
    float curve2=pow(st.x,u_time+.39);
    float curve3=pow(st.x,u_time+1.);
    float pulse=abs(sin(.1*st.x*5.+u_time));
    
    vec3 col=vec3(0.);
    float pct_wave=plot(st,wave);
    float pct_curve=plot(st,curve);
    float pct_curve2=plot(st,curve2);
    float pct_curve3=plot(st,curve3);
    float pct_pulse=plot(st,pulse);
    
    col=mix(col,vec3(1.,0.,0.),pct_wave);
    col=mix(col,vec3(0.,1.,0.),pct_curve);
    col=mix(col,vec3(0.,1.,0.),pct_curve2);
    col=mix(col,vec3(0.,1.,0.),pct_curve3);
    col=mix(col,vec3(0.,0.,1.),pct_pulse);
    
    FragColor=vec4(col,1.);
}
