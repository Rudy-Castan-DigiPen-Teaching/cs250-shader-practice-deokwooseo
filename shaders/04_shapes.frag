#version 300 es
precision mediump float;

/**
* \file 04_shapes.frag
* \author Deokwoo Seo
* \date 2025 Spring
* \par CS250 Computer Graphics II
* \copyright DigiPen Institute of Technology
*/

out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float u_time;

vec2 to_coord(vec2 pixel_point){
    vec2 c=pixel_point/u_resolution;
    if(u_resolution.x>u_resolution.y){
        c.x*=u_resolution.x/u_resolution.y;
        c.x+=(u_resolution.y-u_resolution.x)/u_resolution.x;
    }else{
        c.y*=u_resolution.y/u_resolution.x;
        c.y+=(u_resolution.x-u_resolution.y)/u_resolution.y;
    }
    return c;
}

float Circle(vec2 point,vec2 center,float radius){
    return step(0.,radius-distance(point,center));
}

float Square(vec2 point,vec2 center,vec2 size,float angle){
    vec2 q=point-center;
    float s=sin(angle),c=cos(angle);
    q=vec2(q.x*c-q.y*s,q.x*s+q.y*c);
    vec2 d=abs(q)-size;
    return step(0.,-max(d.x,d.y));
}

float Triangle(vec2 point,vec2 a,vec2 b,vec2 c){
    float w1=dot(point-a,b-a);
    float w2=dot(point-b,c-b);
    float w3=dot(point-c,a-c);
    return step(0.,w1)*step(0.,w2)*step(0.,w3);
}

void main(){
    vec2 uv=to_coord(gl_FragCoord.xy);
    
    float gradient=uv.y+.1*sin(u_time*.5+uv.x*5.);
    
    vec3 background=mix(vec3(.05,.05,.15),vec3(0.,0.,.1),gradient);
    vec3 colors=background;
    
    vec2 Norm=clamp(u_mouse/u_resolution,0.,1.);
    
    float speed=mix(.5,2.,Norm.x);
    float dir=mix(1.,-1.,step(.5,Norm.y));
    float t=u_time*speed*dir;
    
    vec2 c1=vec2(.5+.3*cos(t),.5+.3*sin(t));
    float r1=.15+.02*sin(t*2.);
    
    colors=mix(colors,vec3(1.,.5,.3),Circle(uv,c1,r1));
    vec2 c2=vec2(.5+.3*cos(t+2.),.5+.3*sin(t+2.));
    colors=mix(colors,vec3(.3,1.,.5),Square(uv,c2,vec2(.1),t));
    vec2 c3=vec2(.5+.3*cos(t+4.),.5+.3*sin(t+4.));
    
    float s=sin(t);
    float c=cos(t);
    
    vec2 o1=vec2(.12*cos(1.5708),.12*sin(1.5708));
    vec2 o2=vec2(.12*cos(3.6652),.12*sin(3.6652));
    vec2 o3=vec2(.12*cos(5.7596),.12*sin(5.7596));
    
    o1=vec2(o1.x*c-o1.y*s,o1.x*s+o1.y*c);
    o2=vec2(o2.x*c-o2.y*s,o2.x*s+o2.y*c);
    o3=vec2(o3.x*c-o3.y*s,o3.x*s+o3.y*c);
    
    vec2 v1=c3+o1;
    vec2 v2=c3+o2;
    vec2 v3=c3+o3;
    
    colors=mix(colors,vec3(.5,.3,1.),Triangle(uv,v1,v2,v3));
    colors*=.8+.2*sin(u_time+uv.x*10.);
    FragColor=vec4(colors,1.);
}
