#version 300 es
precision mediump float;

/**
* \file
* \author Rudy Castan
* \author Deokwoo Seo
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

out vec4 FragColor;
uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

float plot(vec2 st,float pct){
    return smoothstep(pct-.02,pct,st.y)-
    smoothstep(pct,pct+.02,st.y);
}

void main()
{
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    //float y=pow(st.x,.5);
    //float y=sqrt(st.x);
    //float y=cos(st.x);
    //float y=cos(st.x*PI*2.);
    // float y=step(.5,st.x);
    // y=smoothstep(.1,.9,st.x);
    // y=sin(u_time+st.x);
    float y = tan(u_time /  + st.x);
    vec3 color=vec3(y);
    
    float pct=plot(st,y);
    color=(1.-pct)*color+pct*vec3(0.,1.,0.);
    
    FragColor=vec4(color,1.);
}