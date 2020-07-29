/*
   _____ _                 _              
  / ____| |               (_)             
 | (___ | |__   __ _ _ __  _ _ __   __ _  
  \___ \| '_ \ / _` | '_ \| | '_ \ / _` | 
  ____) | | | | (_| | |_) | | | | | (_| | 
 |_____/|_| |_|\__,_| .__/|_|_| |_|\__, | 
 |  ____|           | || | (_)      __/ | 
 | |__ _   _ _ __   |_|| |_ _  ___ |___/  
 |  __| | | | '_ \ / __| __| |/ _ \| '_ \ 
 | |  | |_| | | | | (__| |_| | (_) | | | |
 |_|___\__,_|_|_|_|\___|\__|_|\___/|_| |_|
  / ____|     | | |                       
 | |  __  __ _| | | ___ _ __ _   _        
 | | |_ |/ _` | | |/ _ \ '__| | | |       
 | |__| | (_| | | |  __/ |  | |_| |       
  \_____|\__,_|_|_|\___|_|   \__, |       
                              __/ |       
                             |___/        

A gallery of GLSL shaping functions.
*/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897
#define DISPLAY_TIME_IN_SECONDS 6.
#define NUMBER_OF_FUNCTIONS 8 

uniform vec2 u_resolution;
uniform float u_time;

// Bitmap text rendering from: https://www.shadertoy.com/view/4dtGD2 
// Also see: https://www.shadertoy.com/view/4s3fzl

#define _f float
const lowp _f CH_A    = _f(0x69f99), CH_B    = _f(0x79797), CH_C    = _f(0xe111e),
       	  	  CH_D    = _f(0x79997), CH_E    = _f(0xf171f), CH_F    = _f(0xf1711),
		  	  CH_G    = _f(0xe1d96), CH_H    = _f(0x99f99), CH_I    = _f(0xf444f),
		  	  CH_J    = _f(0x88996), CH_K    = _f(0x95159), CH_L    = _f(0x1111f),
		  	  CH_M    = _f(0x9f999), CH_N    = _f(0x9bd99), CH_O    = _f(0x69996),
		  	  CH_P    = _f(0x79971), CH_Q    = _f(0x69b5a), CH_R    = _f(0x79759),
		  	  CH_S    = _f(0xe1687), CH_T    = _f(0xf4444), CH_U    = _f(0x99996),
		  	  CH_V    = _f(0x999a4), CH_W    = _f(0x999f9), CH_X    = _f(0x99699),
    	  	  CH_Y    = _f(0x99e8e), CH_Z    = _f(0xf843f), CH_0    = _f(0x6bd96),
		  	  CH_1    = _f(0x46444), CH_2    = _f(0x6942f), CH_3    = _f(0x69496),
		  	  CH_4    = _f(0x99f88), CH_5    = _f(0xf1687), CH_6    = _f(0x61796),
		  	  CH_7    = _f(0xf8421), CH_8    = _f(0x69696), CH_9    = _f(0x69e84),
		  	  CH_APST = _f(0x66400), CH_PI   = _f(0x0faa9), CH_UNDS = _f(0x0000f),
		  	  CH_HYPH = _f(0x00600), CH_TILD = _f(0x0a500), CH_PLUS = _f(0x02720),
		  	  CH_EQUL = _f(0x0f0f0), CH_SLSH = _f(0x08421), CH_EXCL = _f(0x33303),
		  	  CH_QUES = _f(0x69404), CH_COMM = _f(0x00032), CH_FSTP = _f(0x00002),
    	  	  CH_QUOT = _f(0x55000), CH_BLNK = _f(0x00000), CH_COLN = _f(0x00202),
			  CH_LPAR = _f(0x42224), CH_RPAR = _f(0x24442), CH_END  = _f(0x99999);

// Returns the status of a bit in a bitmap. See above URL for more details.
float getBit( in float map, in float index )
{
    return mod( floor( map*exp2(-index) ), 2.0 );
}

// Draws a character from it's bitmap. See above URL for more details.
float drawChar( in float char, in vec2 pos, in vec2 size, in vec2 uv )
{
    uv = (uv - pos) / size;
    float res = step(0.0,min(uv.x,uv.y)) - step(1.0,max(uv.x,uv.y));
    uv *= vec2(4,6);
    res *= getBit(char, 4.0*floor(uv.y) + floor(uv.x));
    return clamp(res,0.,1.);
}

// Given an array of bitmap floats, draw out the characters.
float textArray(in vec2 uv, in float[20] string) {
    const float spacing = 0.05;
    const vec2 charSize = vec2(spacing * .8, spacing * .8);
    vec2 charPos = vec2(0.04, 0.92);
    
    float chr = 0.0;
    
    for (int i = 0; i < 20; i++) {
    	chr += drawChar( string[i], charPos, charSize, uv); 
        charPos.x += spacing;
    }
    
    return chr;
}

// Which function are we currently displaying? Index from 0 to NUMBER_OF_FUNCTIONS-1
int functionIndexBasedOnTime() {
    return int(mod(u_time / DISPLAY_TIME_IN_SECONDS, float(NUMBER_OF_FUNCTIONS)));
}

// Pick and apply the indexed function.
float pickFunction(float x) {
    float y;    
    int index = functionIndexBasedOnTime();
    
    if (index == 0) {                // sin(pi/2 * x)
        y = sin(.5 * PI * x);
    } else if (index == 1) {         // 1/2 + (sin(2 * pi * x) / 2)
        y = sin(x * 2. * PI);
        y = .5 * y + .5;
    } else if (index == 2) {         // abs(sin(2 * pi * x))
        y = abs(sin(2. * PI * x));
    } else if (index == 3) {         // 1/2 + (tan((pi * x) - pi/2) / 10)
        y = tan(x * PI - (.5 * PI)); 
    	y = .1 * y + .5; 

        // Don't antialias the infinity that lies just beyond 0 and 1.
        if (x < 0.) { y = 0.0; }
        if (x > 1.) { y = 100.; }
    } else if (index == 4) {         // x^5
        y = pow(x, 5.);
    } else if (index == 5) {         // smoothstep(0.1, 0.9, x) 
        y = smoothstep(.1, .9, x);
    } else if (index == 6) {         // smoothstep(0.3, 0.5, x) - smoothstep(0.5, 0.7, x) 
        y = smoothstep(.3, .5, x) - smoothstep(.5, .7, x);
    } else if (index == 7) {         // Found: https://www.shadertoy.com/view/3sKSWc
        float time = mod(u_time, 100.);
        x *= 5.;
        y = sin(x * sin(time * .2)) * sin(6. * x + cos(time * time * .001)) * .5  + .5;
    }
    
    return y;
}

// Pick and display the text rendering of the indexed function.
float pickText( in vec2 uv )
{
    float s[20];
    int index = functionIndexBasedOnTime();
    
    // WebGL doesn't support an array literal constructor. So we have assign chars by index.
    if (index == 0) {          // sin(pi/2 * x)
        s[0] = CH_S; 
        s[1] = CH_I;
        s[2] = CH_N;
        s[3] = CH_LPAR;
        s[4] = CH_PI;
        s[5] = CH_SLSH;
        s[6] = CH_2;
        s[7] = CH_X;
        s[8] = CH_RPAR;   
    } if (index == 1) {        // 1/2 + (sin(2 * pi * x) / 2)
        s[0] = CH_1;
        s[1] = CH_SLSH;
        s[2] = CH_2;
        s[3] = CH_PLUS;
		s[4] = CH_S;
        s[5] = CH_I;
        s[6] = CH_N;
        s[7] = CH_LPAR;
        s[8] = CH_2;
        s[9] = CH_PI;
        s[10] = CH_X;
        s[11] = CH_RPAR;
        s[12] = CH_SLSH;
        s[13] = CH_2;
    } else if (index == 2) {   // abs(sin(2 * pi * x))
        s[0] = CH_A;
        s[1] = CH_B;
        s[2] = CH_S;
        s[3] = CH_LPAR;
		s[4] = CH_S;
        s[5] = CH_I;
        s[6] = CH_N;
        s[7] = CH_LPAR;
        s[8] = CH_2;
        s[9] = CH_PI;
        s[10] = CH_X;
        s[11] = CH_RPAR;
        s[12] = CH_RPAR;
    }  else if (index == 3) {   // 1/2 + (tan((pi * x) - pi/2) / 10)
        s[0] = CH_1;
        s[1] = CH_SLSH;
        s[2] = CH_2;
        s[3] = CH_PLUS;
        s[4] = CH_T;
        s[5] = CH_A;
        s[6] = CH_N;
        s[7] = CH_LPAR;
        s[8] = CH_PI;
        s[9] = CH_X;
        s[10] = CH_HYPH;
        s[11] = CH_PI;
        s[12] = CH_SLSH;
        s[13] = CH_2;
        s[14] = CH_RPAR;
        s[15] = CH_SLSH;
        s[16] = CH_1;
        s[17] = CH_0;
    } else if (index == 4) {   // x^5
        s[0] = CH_P;
        s[1] = CH_O;
        s[2] = CH_W;
        s[3] = CH_LPAR;
        s[4] = CH_X;
        s[5] = CH_COMM;
        s[6] = CH_5;
        s[7] = CH_RPAR;
    } else if (index == 5) {   // smoothstep(0.1, 0.9, x)
        s[0] = CH_S;
        s[1] = CH_M;
        s[2] = CH_O;
        s[3] = CH_O;
        s[4] = CH_T;
        s[5] = CH_H;
        s[6] = CH_S;
        s[7] = CH_T;
        s[8] = CH_E;
        s[9] = CH_P;
    } else if (index == 6) {   // // smoothstep(0.3, 0.5, x) - smoothstep(0.5, 0.7, x)
        s[0] = CH_QUOT;
        s[1] = CH_S;
        s[2] = CH_M;
        s[3] = CH_O;
        s[4] = CH_O;
        s[5] = CH_T;
        s[6] = CH_H;
        s[7] = CH_L;
        s[8] = CH_I;
        s[9] = CH_N;
        s[10] = CH_E;
        s[11] = CH_QUOT;
    } else if (index == 7) {   // See pickFunction above. :)
        s[0] = CH_S;
        s[1] = CH_E;
        s[2] = CH_E;
        s[3] = CH_BLNK;
        s[4] = CH_S;
        s[5] = CH_O;
        s[6] = CH_U;
        s[7] = CH_R;
        s[8] = CH_C;
        s[9] = CH_E;
        s[10] = CH_BLNK;
        s[11] = CH_COLN;
        s[12] = CH_RPAR;
    }

    return textArray(uv, s);
}

// Used for smooth function plotting see: https://www.shadertoy.com/view/3sKSWc
float distanceToLineSegment(vec2 p0, vec2 p1, vec2 p) {
    float distanceP0 = length(p0 - p);
    float distanceP1 = length(p1 - p);
    float l2 =pow(length(p0 - p1), 2.);
    float t = max(0., min(1., dot(p - p0, p1 - p0) / l2));
    vec2 projection = p0 + t * (p1 - p0); 
    float distanceToProjection = length(projection - p);
    
    return min(min(distanceP0, distanceP1), distanceToProjection);
}

// Used for smooth function plotting see: https://www.shadertoy.com/view/3sKSWc
float distanceToFunction(vec2 p, float xDelta) {
    float result = 100.;
    
    for (float i = -3.; i < 3.; i += 1.) {
        vec2 q = p;
        q.x += xDelta * i;
        
        vec2 p0 = vec2(q.x, pickFunction(q.x));
    	vec2 p1 = vec2(q.x + xDelta, pickFunction(q.x + xDelta));
        result = min(result, distanceToLineSegment(p0, p1, p));
    }

    return result;
}

// Used for smooth function plotting see: https://www.shadertoy.com/view/3sKSWc
float plotIt(vec2 st, float pct){ // (st = texture coordinates) (pct = % from 0.0 to 1.0)
  float width = 4.; 
  float distanceToPlot = distanceToFunction(st, 1. / u_resolution.x);
  return smoothstep(0., width, width - distanceToPlot * u_resolution.y);
}

// Draws a progress bar along the bottom of the texture.
float progressBar(vec2 st) {
    float width = 0.01;
    float seconds = mod(u_time, DISPLAY_TIME_IN_SECONDS) / DISPLAY_TIME_IN_SECONDS;

    return float(st.y < width && st.x < seconds);
}

// Signed distance circle with an offset. See: https://www.shadertoy.com/view/3ltSW2
float sdCircle(vec2 p, float r, vec2 offset)
{
    p.xy -= offset.xy;                      // Position the circle with an x/y offset.
    p.y *= u_resolution.y / u_resolution.x; // Unskew circle based on aspect ratio.
    return (1. - sign(length(p) - r)) / 2.; // Are we inside (1) or outside (0) the circle?
}

void main() {
  // Colours for our various on-screen components.
  const vec3 plotColour = vec3(0.46, 0.37, 0.74); 
  const vec3 textColour = vec3(.9, .15, .3);
  const vec3 progressColour = vec3(0., .33, .58);
  const vec3 circleColour = vec3(0.850,0.591,0.227);
    
  vec2 st = gl_FragCoord.xy / u_resolution.xy; // Normalize texture coords from 0.0 to 1.0.
  vec2 tt = gl_FragCoord.xy / u_resolution.yy; // Normalize based only on y resolution for text.

  float y = pickFunction(st.x);     // Pick and calculate a function.
  float text = pickText(tt);        // Pick and create the bitmapped text and offset shadow.
  float textShadow = pickText(tt + vec2(-.003, .004)); 
  float progress = progressBar(st); // Render the progress bar.
  float plot = plotIt(st, y);       // Smooth plot the function.

  // Plot the circle easing it's position by the selected function across three second intervals.
  float circle = sdCircle(st, 0.04, vec2(pickFunction(mod(u_time, 3.) / 3.)));
    
  float gradient  = min(y, 1.0);      // Black to white background gradient. 
        gradient *= (1. - plot);      // Remove gradient "below" where plot will be drawn.
        gradient *= (1. - progress);  // Remove gradient "below" where the progress bar will be drawn.
        gradient *= (1. - circle);    // Remove gradient "below" where the circle will be drawn.
        gradient *= (1. - text);      // Remove gradient "below" where text will be drawn.
        gradient *= (1. - textShadow);// Remove gradient to leave a text shadow.
        gradient  = max(gradient, 0.0); // Negative values become zero.
      
  // Putting everything together with colours.
  vec3 colour = vec3(gradient)
                 + vec3(plot) * plotColour
                 + vec3(text) * textColour
                 + vec3(progress) * progressColour
                 + vec3(circle) * circleColour;

  gl_FragColor = vec4(colour, 1.);  // Set pixel colour.
}

// Kyle Geske - stungeye.com - Unlicense 2020 - https://unlicense.org
// This is free and unencumbered software released into the public domain.