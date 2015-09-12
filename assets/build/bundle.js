(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function dot(r,e){for(var t=0,n=r.length,c=0;n>c;++c)t+=r[c]*e[c];return t}function barycentricCircumcenter(r){var e=r.length;if(0===e)return[];var t=(r[0].length,dup([r.length+1,r.length+1],1)),n=dup([r.length+1],1);t[e][e]=0;for(var c=0;e>c;++c){for(var u=0;c>=u;++u)t[u][c]=t[c][u]=2*dot(r[c],r[u]);n[c]=dot(r[c],r[c])}for(var o=solve(t,n),i=0,a=o[e+1],c=0;c<a.length;++c)i+=a[c];for(var l=new Array(e),c=0;e>c;++c){for(var a=o[c],v=0,u=0;u<a.length;++u)v+=a[u];l[c]=v/i}return l}function circumcenter(r){if(0===r.length)return[];for(var e=r[0].length,t=dup([e]),n=barycentricCircumcenter(r),c=0;c<r.length;++c)for(var u=0;e>u;++u)t[u]+=r[c][u]*n[c];return t}var dup=require("dup"),solve=require("robust-linear-solve");circumcenter.barycenetric=barycentricCircumcenter,module.exports=circumcenter;


},{"dup":2,"robust-linear-solve":3}],2:[function(require,module,exports){
"use strict";function dupe_array(e,r,u){var n=0|e[u];if(0>=n)return[];var t,a=new Array(n);if(u===e.length-1)for(t=0;n>t;++t)a[t]=r;else for(t=0;n>t;++t)a[t]=dupe_array(e,r,u+1);return a}function dupe_number(e,r){var u,n;for(u=new Array(e),n=0;e>n;++n)u[n]=r;return u}function dupe(e,r){switch("undefined"==typeof r&&(r=0),typeof e){case"number":if(e>0)return dupe_number(0|e,r);break;case"object":if("number"==typeof e.length)return dupe_array(e,r,0)}return[]}module.exports=dupe;


},{}],3:[function(require,module,exports){
"use strict";function generateSolver(e){for(var r="robustLinearSolve"+e+"d",n=["function ",r,"(A,b){return ["],t=0;e>t;++t){n.push("det([");for(var u=0;e>u;++u){u>0&&n.push(","),n.push("[");for(var o=0;e>o;++o)o>0&&n.push(","),o===t?n.push("+b[",u,"]"):n.push("+A[",u,"][",o,"]");n.push("]")}n.push("]),")}n.push("det(A)]}return ",r);var s=new Function("det",n.join(""));return s(6>e?determinant[e]:determinant)}function robustLinearSolve0d(){return[0]}function robustLinearSolve1d(e,r){return[[r[0]],[e[0][0]]]}function generateDispatch(){for(;CACHE.length<NUM_EXPAND;)CACHE.push(generateSolver(CACHE.length));for(var e=[],r=["function dispatchLinearSolve(A,b){switch(A.length){"],n=0;NUM_EXPAND>n;++n)e.push("s"+n),r.push("case ",n,":return s",n,"(A,b);");r.push("}var s=CACHE[A.length];if(!s)s=CACHE[A.length]=g(A.length);return s(A,b)}return dispatchLinearSolve"),e.push("CACHE","g",r.join(""));var t=Function.apply(void 0,e);module.exports=t.apply(void 0,CACHE.concat([CACHE,generateSolver]));for(var n=0;NUM_EXPAND>n;++n)module.exports[n]=CACHE[n]}var determinant=require("robust-determinant"),NUM_EXPAND=6,CACHE=[robustLinearSolve0d,robustLinearSolve1d];generateDispatch();


},{"robust-determinant":9}],4:[function(require,module,exports){
"use strict";function compressExpansion(r){for(var n=r.length,e=r[r.length-1],o=n,s=n-2;s>=0;--s){var a=e,t=r[s];e=a+t;var v=e-a,p=t-v;p&&(r[--o]=e,e=p)}for(var c=0,s=o;n>s;++s){var a=r[s],t=e;e=a+t;var v=e-a,p=t-v;p&&(r[c++]=p)}return r[c++]=e,r.length=c,r}module.exports=compressExpansion;


},{}],5:[function(require,module,exports){
"use strict";function fastTwoSum(t,u,o){var r=t+u,s=r-t,e=r-s,a=u-s,f=t-e;return o?(o[0]=f+a,o[1]=r,o):[f+a,r]}module.exports=fastTwoSum;


},{}],6:[function(require,module,exports){
"use strict";function scaleLinearExpansion(r,t){var o=r.length;if(1===o){var e=twoProduct(r[0],t);return e[0]?e:[e[1]]}var u=new Array(2*o),a=[.1,.1],n=[.1,.1],c=0;twoProduct(r[0],t,a),a[0]&&(u[c++]=a[0]);for(var i=1;o>i;++i){twoProduct(r[i],t,n);var w=a[1];twoSum(w,n[0],a),a[0]&&(u[c++]=a[0]);var s=n[1],v=a[1],d=s+v,l=d-s,m=v-l;a[1]=d,m&&(u[c++]=m)}return a[1]&&(u[c++]=a[1]),0===c&&(u[c++]=0),u.length=c,u}var twoProduct=require("two-product"),twoSum=require("two-sum");module.exports=scaleLinearExpansion;


},{"two-product":8,"two-sum":5}],7:[function(require,module,exports){
"use strict";function scalarScalar(r,a){var n=r+a,e=n-r,t=n-e,l=a-e,o=r-t,u=o+l;return u?[u,n]:[n]}function linearExpansionSum(r,a){var n=0|r.length,e=0|a.length;if(1===n&&1===e)return scalarScalar(r[0],a[0]);var t,l,o=n+e,u=new Array(o),i=0,s=0,c=0,f=Math.abs,h=r[s],v=f(h),S=a[c],g=f(S);g>v?(l=h,s+=1,n>s&&(h=r[s],v=f(h))):(l=S,c+=1,e>c&&(S=a[c],g=f(S))),n>s&&g>v||c>=e?(t=h,s+=1,n>s&&(h=r[s],v=f(h))):(t=S,c+=1,e>c&&(S=a[c],g=f(S)));for(var m,p,x,E,b,d=t+l,w=d-t,y=l-w,A=y,M=d;n>s&&e>c;)g>v?(t=h,s+=1,n>s&&(h=r[s],v=f(h))):(t=S,c+=1,e>c&&(S=a[c],g=f(S))),l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m;for(;n>s;)t=h,l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m,s+=1,n>s&&(h=r[s]);for(;e>c;)t=S,l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m,c+=1,e>c&&(S=a[c]);return A&&(u[i++]=A),M&&(u[i++]=M),i||(u[i++]=0),u.length=i,u}module.exports=linearExpansionSum;


},{}],8:[function(require,module,exports){
"use strict";function twoProduct(t,o,r){var u=t*o,T=SPLITTER*t,P=T-t,c=T-P,e=t-c,a=SPLITTER*o,d=a-o,n=a-d,s=o-n,w=u-c*n,E=w-e*n,I=E-c*s,L=e*s-I;return r?(r[0]=L,r[1]=u,r):[L,u]}module.exports=twoProduct;var SPLITTER=+(Math.pow(2,27)+1);


},{}],9:[function(require,module,exports){
"use strict";function cofactor(r,e){for(var t=new Array(r.length-1),n=1;n<r.length;++n)for(var o=t[n-1]=new Array(r.length-1),u=0,i=0;u<r.length;++u)u!==e&&(o[i++]=r[n][u]);return t}function matrix(r){for(var e=new Array(r),t=0;r>t;++t){e[t]=new Array(r);for(var n=0;r>n;++n)e[t][n]=["m[",t,"][",n,"]"].join("")}return e}function sign(r){return 1&r?"-":""}function generateSum(r){if(1===r.length)return r[0];if(2===r.length)return["sum(",r[0],",",r[1],")"].join("");var e=r.length>>1;return["sum(",generateSum(r.slice(0,e)),",",generateSum(r.slice(e)),")"].join("")}function determinant(r){if(2===r.length)return["sum(prod(",r[0][0],",",r[1][1],"),prod(-",r[0][1],",",r[1][0],"))"].join("");for(var e=[],t=0;t<r.length;++t)e.push(["scale(",determinant(cofactor(r,t)),",",sign(t),r[0][t],")"].join(""));return generateSum(e)}function compileDeterminant(r){var e=new Function("sum","scale","prod","compress",["function robustDeterminant",r,"(m){return compress(",determinant(matrix(r)),")};return robustDeterminant",r].join(""));return e(robustSum,robustScale,twoProduct,compress)}function generateDispatch(){for(;CACHE.length<NUM_EXPANDED;)CACHE.push(compileDeterminant(CACHE.length));for(var r=[],e=["function robustDeterminant(m){switch(m.length){"],t=0;NUM_EXPANDED>t;++t)r.push("det"+t),e.push("case ",t,":return det",t,"(m);");e.push("}var det=CACHE[m.length];if(!det)det=CACHE[m.length]=gen(m.length);return det(m);}return robustDeterminant"),r.push("CACHE","gen",e.join(""));var n=Function.apply(void 0,r);module.exports=n.apply(void 0,CACHE.concat([CACHE,compileDeterminant]));for(var t=0;t<CACHE.length;++t)module.exports[t]=CACHE[t]}var twoProduct=require("two-product"),robustSum=require("robust-sum"),robustScale=require("robust-scale"),compress=require("robust-compress"),NUM_EXPANDED=6,CACHE=[function(){return[0]},function(r){return[r[0][0]]}];generateDispatch();


},{"robust-compress":4,"robust-scale":6,"robust-sum":7,"two-product":8}],10:[function(require,module,exports){
"use strict";function compareInt(e,t){return e-t}function Simplex(e,t,r){this.vertices=e,this.adjacent=t,this.boundary=r,this.lastVisited=-1}function GlueFacet(e,t,r){this.vertices=e,this.cell=t,this.index=r}function compareGlue(e,t){return compareCell(e.vertices,t.vertices)}function bakeOrient(e){for(var t=["function orient(){var tuple=this.tuple;return test("],r=0;e>=r;++r)r>0&&t.push(","),t.push("tuple[",r,"]");t.push(")}return orient");var i=new Function("test",t.join("")),n=orient[e+1];return n||(n=orient),i(n)}function Triangulation(e,t,r){this.dimension=e,this.vertices=t,this.simplices=r,this.interior=r.filter(function(e){return!e.boundary}),this.tuple=new Array(e+1);for(var i=0;e>=i;++i)this.tuple[i]=this.vertices[i];var n=BAKED[e];n||(n=BAKED[e]=bakeOrient(e)),this.orient=n}function incrementalConvexHull(e,t){var r=e.length;if(0===r)throw new Error("Must have at least d+1 points");var i=e[0].length;if(i>=r)throw new Error("Must input at least d+1 points");var n=e.slice(0,i+1),a=orient.apply(void 0,n);if(0===a)throw new Error("Input not in general position");for(var s=new Array(i+1),o=0;i>=o;++o)s[o]=o;0>a&&(s[0]=1,s[1]=0);for(var l=new Simplex(s,new Array(i+1),!1),v=l.adjacent,c=new Array(i+2),o=0;i>=o;++o){for(var h=s.slice(),u=0;i>=u;++u)u===o&&(h[u]=-1);var d=h[0];h[0]=h[1],h[1]=d;var f=new Simplex(h,new Array(i+1),!0);v[o]=f,c[o]=f}c[i+1]=l;for(var o=0;i>=o;++o)for(var h=v[o].vertices,p=v[o].adjacent,u=0;i>=u;++u){var m=h[u];if(0>m)p[u]=l;else for(var y=0;i>=y;++y)v[y].vertices.indexOf(m)<0&&(p[u]=v[y])}for(var w=new Triangulation(i,n,c),x=!!t,o=i+1;r>o;++o)w.insert(e[o],x);return w.boundary()}module.exports=incrementalConvexHull;var orient=require("robust-orientation"),compareCell=require("simplicial-complex").compareCells;Simplex.prototype.flip=function(){var e=this.vertices[0];this.vertices[0]=this.vertices[1],this.vertices[1]=e;var t=this.adjacent[0];this.adjacent[0]=this.adjacent[1],this.adjacent[1]=t};var BAKED=[],proto=Triangulation.prototype;proto.handleBoundaryDegeneracy=function(e,t){var r=this.dimension,i=this.vertices.length-1,n=this.tuple,a=this.vertices,s=[e];for(e.lastVisited=-i;s.length>0;){e=s.pop();for(var o=(e.vertices,e.adjacent),l=0;r>=l;++l){var v=o[l];if(v.boundary&&!(v.lastVisited<=-i)){for(var c=v.vertices,h=0;r>=h;++h){var u=c[h];0>u?n[h]=t:n[h]=a[u]}var d=this.orient();if(d>0)return v;v.lastVisited=-i,0===d&&s.push(v)}}}return null},proto.walk=function(e,t){var r=this.vertices.length-1,i=this.dimension,n=this.vertices,a=this.tuple,s=t?this.interior.length*Math.random()|0:this.interior.length-1,o=this.interior[s];e:for(;!o.boundary;){for(var l=o.vertices,v=o.adjacent,c=0;i>=c;++c)a[c]=n[l[c]];o.lastVisited=r;for(var c=0;i>=c;++c){var h=v[c];if(!(h.lastVisited>=r)){var u=a[c];a[c]=e;var d=this.orient();if(a[c]=u,0>d){o=h;continue e}h.boundary?h.lastVisited=-r:h.lastVisited=r}}return}return o},proto.addPeaks=function(e,t){var r=this.vertices.length-1,i=this.dimension,n=this.vertices,a=this.tuple,s=this.interior,o=this.simplices,l=[t];t.lastVisited=r,t.vertices[t.vertices.indexOf(-1)]=r,t.boundary=!1,s.push(t);for(var v=[];l.length>0;){var t=l.pop(),c=t.vertices,h=t.adjacent,u=c.indexOf(r);if(!(0>u))for(var d=0;i>=d;++d)if(d!==u){var f=h[d];if(f.boundary&&!(f.lastVisited>=r)){var p=f.vertices;if(f.lastVisited!==-r){for(var m=0,y=0;i>=y;++y)p[y]<0?(m=y,a[y]=e):a[y]=n[p[y]];var w=this.orient();if(w>0){p[m]=r,f.boundary=!1,s.push(f),l.push(f),f.lastVisited=r;continue}f.lastVisited=-r}var x=f.adjacent,g=c.slice(),b=h.slice(),j=new Simplex(g,b,!0);o.push(j);var V=x.indexOf(t);if(!(0>V)){x[V]=j,b[u]=f,g[d]=-1,b[d]=t,h[d]=j,j.flip();for(var y=0;i>=y;++y){var A=g[y];if(!(0>A||A===r)){for(var k=new Array(i-1),E=0,O=0;i>=O;++O){var B=g[O];0>B||O===y||(k[E++]=B)}v.push(new GlueFacet(k,j,y))}}}}}}v.sort(compareGlue);for(var d=0;d+1<v.length;d+=2){var C=v[d],D=v[d+1],S=C.index,G=D.index;0>S||0>G||(C.cell.adjacent[C.index]=D.cell,D.cell.adjacent[D.index]=C.cell)}},proto.insert=function(e,t){var r=this.vertices;r.push(e);var i=this.walk(e,t);if(i){for(var n=this.dimension,a=this.tuple,s=0;n>=s;++s){var o=i.vertices[s];0>o?a[s]=e:a[s]=r[o]}var l=this.orient(a);0>l||(0!==l||(i=this.handleBoundaryDegeneracy(i,e)))&&this.addPeaks(e,i)}},proto.boundary=function(){for(var e=this.dimension,t=[],r=this.simplices,i=r.length,n=0;i>n;++n){var a=r[n];if(a.boundary){for(var s=new Array(e),o=a.vertices,l=0,v=0,c=0;e>=c;++c)o[c]>=0?s[l++]=o[c]:v=1&c;if(v===(1&e)){var h=s[0];s[0]=s[1],s[1]=h}t.push(s)}}return t};


},{"robust-orientation":16,"simplicial-complex":19}],11:[function(require,module,exports){
"use strict";function fastTwoSum(t,u,o){var r=t+u,s=r-t,e=r-s,a=u-s,f=t-e;return o?(o[0]=f+a,o[1]=r,o):[f+a,r]}module.exports=fastTwoSum;


},{}],12:[function(require,module,exports){
"use strict";function scaleLinearExpansion(r,t){var o=r.length;if(1===o){var e=twoProduct(r[0],t);return e[0]?e:[e[1]]}var u=new Array(2*o),a=[.1,.1],n=[.1,.1],c=0;twoProduct(r[0],t,a),a[0]&&(u[c++]=a[0]);for(var i=1;o>i;++i){twoProduct(r[i],t,n);var w=a[1];twoSum(w,n[0],a),a[0]&&(u[c++]=a[0]);var s=n[1],v=a[1],d=s+v,l=d-s,m=v-l;a[1]=d,m&&(u[c++]=m)}return a[1]&&(u[c++]=a[1]),0===c&&(u[c++]=0),u.length=c,u}var twoProduct=require("two-product"),twoSum=require("two-sum");module.exports=scaleLinearExpansion;


},{"two-product":15,"two-sum":11}],13:[function(require,module,exports){
"use strict";function scalarScalar(r,t){var a=r+t,n=a-r,u=a-n,e=t-n,c=r-u,o=c+e;return o?[o,a]:[a]}function robustSubtract(r,t){var a=0|r.length,n=0|t.length;if(1===a&&1===n)return scalarScalar(r[0],-t[0]);var u,e,c=a+n,o=new Array(c),l=0,s=0,f=0,b=Math.abs,h=r[s],i=b(h),v=-t[f],S=b(v);S>i?(e=h,s+=1,a>s&&(h=r[s],i=b(h))):(e=v,f+=1,n>f&&(v=-t[f],S=b(v))),a>s&&S>i||f>=n?(u=h,s+=1,a>s&&(h=r[s],i=b(h))):(u=v,f+=1,n>f&&(v=-t[f],S=b(v)));for(var g,d,m,p,w,x=u+e,y=x-u,A=e-y,M=A,j=x;a>s&&n>f;)S>i?(u=h,s+=1,a>s&&(h=r[s],i=b(h))):(u=v,f+=1,n>f&&(v=-t[f],S=b(v))),e=M,x=u+e,y=x-u,A=e-y,A&&(o[l++]=A),g=j+x,d=g-j,m=g-d,p=x-d,w=j-m,M=w+p,j=g;for(;a>s;)u=h,e=M,x=u+e,y=x-u,A=e-y,A&&(o[l++]=A),g=j+x,d=g-j,m=g-d,p=x-d,w=j-m,M=w+p,j=g,s+=1,a>s&&(h=r[s]);for(;n>f;)u=v,e=M,x=u+e,y=x-u,A=e-y,A&&(o[l++]=A),g=j+x,d=g-j,m=g-d,p=x-d,w=j-m,M=w+p,j=g,f+=1,n>f&&(v=-t[f]);return M&&(o[l++]=M),j&&(o[l++]=j),l||(o[l++]=0),o.length=l,o}module.exports=robustSubtract;


},{}],14:[function(require,module,exports){
"use strict";function scalarScalar(r,a){var n=r+a,e=n-r,t=n-e,l=a-e,o=r-t,u=o+l;return u?[u,n]:[n]}function linearExpansionSum(r,a){var n=0|r.length,e=0|a.length;if(1===n&&1===e)return scalarScalar(r[0],a[0]);var t,l,o=n+e,u=new Array(o),i=0,s=0,c=0,f=Math.abs,h=r[s],v=f(h),S=a[c],g=f(S);g>v?(l=h,s+=1,n>s&&(h=r[s],v=f(h))):(l=S,c+=1,e>c&&(S=a[c],g=f(S))),n>s&&g>v||c>=e?(t=h,s+=1,n>s&&(h=r[s],v=f(h))):(t=S,c+=1,e>c&&(S=a[c],g=f(S)));for(var m,p,x,E,b,d=t+l,w=d-t,y=l-w,A=y,M=d;n>s&&e>c;)g>v?(t=h,s+=1,n>s&&(h=r[s],v=f(h))):(t=S,c+=1,e>c&&(S=a[c],g=f(S))),l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m;for(;n>s;)t=h,l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m,s+=1,n>s&&(h=r[s]);for(;e>c;)t=S,l=A,d=t+l,w=d-t,y=l-w,y&&(u[i++]=y),m=M+d,p=m-M,x=m-p,E=d-p,b=M-x,A=b+E,M=m,c+=1,e>c&&(S=a[c]);return A&&(u[i++]=A),M&&(u[i++]=M),i||(u[i++]=0),u.length=i,u}module.exports=linearExpansionSum;


},{}],15:[function(require,module,exports){
"use strict";function twoProduct(t,o,r){var u=t*o,T=SPLITTER*t,P=T-t,c=T-P,e=t-c,a=SPLITTER*o,d=a-o,n=a-d,s=o-n,w=u-c*n,E=w-e*n,I=E-c*s,L=e*s-I;return r?(r[0]=L,r[1]=u,r):[L,u]}module.exports=twoProduct;var SPLITTER=+(Math.pow(2,27)+1);


},{}],16:[function(require,module,exports){
"use strict";function cofactor(r,t){for(var n=new Array(r.length-1),e=1;e<r.length;++e)for(var o=n[e-1]=new Array(r.length-1),a=0,u=0;a<r.length;++a)a!==t&&(o[u++]=r[e][a]);return n}function matrix(r){for(var t=new Array(r),n=0;r>n;++n){t[n]=new Array(r);for(var e=0;r>e;++e)t[n][e]=["m",e,"[",r-n-1,"]"].join("")}return t}function sign(r){return 1&r?"-":""}function generateSum(r){if(1===r.length)return r[0];if(2===r.length)return["sum(",r[0],",",r[1],")"].join("");var t=r.length>>1;return["sum(",generateSum(r.slice(0,t)),",",generateSum(r.slice(t)),")"].join("")}function determinant(r){if(2===r.length)return[["sum(prod(",r[0][0],",",r[1][1],"),prod(-",r[0][1],",",r[1][0],"))"].join("")];for(var t=[],n=0;n<r.length;++n)t.push(["scale(",generateSum(determinant(cofactor(r,n))),",",sign(n),r[0][n],")"].join(""));return t}function orientation(r){for(var t=[],n=[],e=matrix(r),o=[],a=0;r>a;++a)0===(1&a)?t.push.apply(t,determinant(cofactor(e,a))):n.push.apply(n,determinant(cofactor(e,a))),o.push("m"+a);var u=generateSum(t),i=generateSum(n),s="orientation"+r+"Exact",c=["function ",s,"(",o.join(),"){var p=",u,",n=",i,",d=sub(p,n);return d[d.length-1];};return ",s].join(""),h=new Function("sum","prod","scale","sub",c);return h(robustSum,twoProduct,robustScale,robustSubtract)}function slowOrient(r){var t=CACHED[r.length];return t||(t=CACHED[r.length]=orientation(r.length)),t.apply(void 0,r)}function generateOrientationProc(){for(;CACHED.length<=NUM_EXPAND;)CACHED.push(orientation(CACHED.length));for(var r=[],t=["slow"],n=0;NUM_EXPAND>=n;++n)r.push("a"+n),t.push("o"+n);for(var e=["function getOrientation(",r.join(),"){switch(arguments.length){case 0:case 1:return 0;"],n=2;NUM_EXPAND>=n;++n)e.push("case ",n,":return o",n,"(",r.slice(0,n).join(),");");e.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation"),t.push(e.join(""));var o=Function.apply(void 0,t);module.exports=o.apply(void 0,[slowOrient].concat(CACHED));for(var n=0;NUM_EXPAND>=n;++n)module.exports[n]=CACHED[n]}var twoProduct=require("two-product"),robustSum=require("robust-sum"),robustScale=require("robust-scale"),robustSubtract=require("robust-subtract"),NUM_EXPAND=5,EPSILON=1.1102230246251565e-16,ERRBOUND3=(3+16*EPSILON)*EPSILON,ERRBOUND4=(7+56*EPSILON)*EPSILON,orientation3Exact=orientation(3),orientation4Exact=orientation(4),CACHED=[function(){return 0},function(){return 0},function(r,t){return t[0]-r[0]},function(r,t,n){var e,o=(r[1]-n[1])*(t[0]-n[0]),a=(r[0]-n[0])*(t[1]-n[1]),u=o-a;if(o>0){if(0>=a)return u;e=o+a}else{if(!(0>o))return u;if(a>=0)return u;e=-(o+a)}var i=ERRBOUND3*e;return u>=i||-i>=u?u:orientation3Exact(r,t,n)},function(r,t,n,e){var o=r[0]-e[0],a=t[0]-e[0],u=n[0]-e[0],i=r[1]-e[1],s=t[1]-e[1],c=n[1]-e[1],h=r[2]-e[2],l=t[2]-e[2],f=n[2]-e[2],g=a*c,p=u*s,m=u*i,E=o*c,b=o*s,v=a*i,N=h*(g-p)+l*(m-E)+f*(b-v),d=(Math.abs(g)+Math.abs(p))*Math.abs(h)+(Math.abs(m)+Math.abs(E))*Math.abs(l)+(Math.abs(b)+Math.abs(v))*Math.abs(f),A=ERRBOUND4*d;return N>A||-N>A?N:orientation4Exact(r,t,n,e)}];generateOrientationProc();


},{"robust-scale":12,"robust-subtract":13,"robust-sum":14,"two-product":15}],17:[function(require,module,exports){
"use strict";"use restrict";function countTrailingZeros(r){var n=32;return r&=-r,r&&n--,65535&r&&(n-=16),16711935&r&&(n-=8),252645135&r&&(n-=4),858993459&r&&(n-=2),1431655765&r&&(n-=1),n}var INT_BITS=32;exports.INT_BITS=INT_BITS,exports.INT_MAX=2147483647,exports.INT_MIN=-1<<INT_BITS-1,exports.sign=function(r){return(r>0)-(0>r)},exports.abs=function(r){var n=r>>INT_BITS-1;return(r^n)-n},exports.min=function(r,n){return n^(r^n)&-(n>r)},exports.max=function(r,n){return r^(r^n)&-(n>r)},exports.isPow2=function(r){return!(r&r-1||!r)},exports.log2=function(r){var n,t;return n=(r>65535)<<4,r>>>=n,t=(r>255)<<3,r>>>=t,n|=t,t=(r>15)<<2,r>>>=t,n|=t,t=(r>3)<<1,r>>>=t,n|=t,n|r>>1},exports.log10=function(r){return r>=1e9?9:r>=1e8?8:r>=1e7?7:r>=1e6?6:r>=1e5?5:r>=1e4?4:r>=1e3?3:r>=100?2:r>=10?1:0},exports.popCount=function(r){return r-=r>>>1&1431655765,r=(858993459&r)+(r>>>2&858993459),16843009*(r+(r>>>4)&252645135)>>>24},exports.countTrailingZeros=countTrailingZeros,exports.nextPow2=function(r){return r+=0===r,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1},exports.prevPow2=function(r){return r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r-(r>>>1)},exports.parity=function(r){return r^=r>>>16,r^=r>>>8,r^=r>>>4,r&=15,27030>>>r&1};var REVERSE_TABLE=new Array(256);!function(r){for(var n=0;256>n;++n){var t=n,e=n,o=7;for(t>>>=1;t;t>>>=1)e<<=1,e|=1&t,--o;r[n]=e<<o&255}}(REVERSE_TABLE),exports.reverse=function(r){return REVERSE_TABLE[255&r]<<24|REVERSE_TABLE[r>>>8&255]<<16|REVERSE_TABLE[r>>>16&255]<<8|REVERSE_TABLE[r>>>24&255]},exports.interleave2=function(r,n){return r&=65535,r=16711935&(r|r<<8),r=252645135&(r|r<<4),r=858993459&(r|r<<2),r=1431655765&(r|r<<1),n&=65535,n=16711935&(n|n<<8),n=252645135&(n|n<<4),n=858993459&(n|n<<2),n=1431655765&(n|n<<1),r|n<<1},exports.deinterleave2=function(r,n){return r=r>>>n&1431655765,r=858993459&(r|r>>>1),r=252645135&(r|r>>>2),r=16711935&(r|r>>>4),r=65535&(r|r>>>16),r<<16>>16},exports.interleave3=function(r,n,t){return r&=1023,r=4278190335&(r|r<<16),r=251719695&(r|r<<8),r=3272356035&(r|r<<4),r=1227133513&(r|r<<2),n&=1023,n=4278190335&(n|n<<16),n=251719695&(n|n<<8),n=3272356035&(n|n<<4),n=1227133513&(n|n<<2),r|=n<<1,t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),r|t<<2},exports.deinterleave3=function(r,n){return r=r>>>n&1227133513,r=3272356035&(r|r>>>2),r=251719695&(r|r>>>4),r=4278190335&(r|r>>>8),r=1023&(r|r>>>16),r<<22>>22},exports.nextCombination=function(r){var n=r|r-1;return n+1|(~n&-~n)-1>>>countTrailingZeros(r)+1};


},{}],18:[function(require,module,exports){
"use strict";"use restrict";function UnionFind(t){this.roots=new Array(t),this.ranks=new Array(t);for(var r=0;t>r;++r)this.roots[r]=r,this.ranks[r]=0}module.exports=UnionFind;var proto=UnionFind.prototype;Object.defineProperty(proto,"length",{get:function(){return this.roots.length}}),proto.makeSet=function(){var t=this.roots.length;return this.roots.push(t),this.ranks.push(0),t},proto.find=function(t){for(var r=t,o=this.roots;o[t]!==t;)t=o[t];for(;o[r]!==t;){var n=o[r];o[r]=t,r=n}return t},proto.link=function(t,r){var o=this.find(t),n=this.find(r);if(o!==n){var i=this.ranks,s=this.roots,e=i[o],h=i[n];h>e?s[o]=n:e>h?s[n]=o:(s[n]=o,++i[o])}};


},{}],19:[function(require,module,exports){
"use strict";"use restrict";function dimension(e){for(var n=0,r=Math.max,t=0,o=e.length;o>t;++t)n=r(n,e[t].length);return n-1}function countVertices(e){for(var n=-1,r=Math.max,t=0,o=e.length;o>t;++t)for(var l=e[t],i=0,a=l.length;a>i;++i)n=r(n,l[i]);return n+1}function cloneCells(e){for(var n=new Array(e.length),r=0,t=e.length;t>r;++r)n[r]=e[r].slice(0);return n}function compareCells(e,n){var r=e.length,t=e.length-n.length,o=Math.min;if(t)return t;switch(r){case 0:return 0;case 1:return e[0]-n[0];case 2:var l=e[0]+e[1]-n[0]-n[1];return l?l:o(e[0],e[1])-o(n[0],n[1]);case 3:var i=e[0]+e[1],a=n[0]+n[1];if(l=i+e[2]-(a+n[2]))return l;var s=o(e[0],e[1]),u=o(n[0],n[1]),l=o(s,e[2])-o(u,n[2]);return l?l:o(s+e[2],i)-o(u+n[2],a);default:var f=e.slice(0);f.sort();var c=n.slice(0);c.sort();for(var h=0;r>h;++h)if(t=f[h]-c[h])return t;return 0}}function compareZipped(e,n){return compareCells(e[0],n[0])}function normalize(e,n){if(n){for(var r=e.length,t=new Array(r),o=0;r>o;++o)t[o]=[e[o],n[o]];t.sort(compareZipped);for(var o=0;r>o;++o)e[o]=t[o][0],n[o]=t[o][1];return e}return e.sort(compareCells),e}function unique(e){if(0===e.length)return[];for(var n=1,r=e.length,t=1;r>t;++t){var o=e[t];if(compareCells(o,e[t-1])){if(t===n){n++;continue}e[n++]=o}}return e.length=n,e}function findCell(e,n){for(var r=0,t=e.length-1,o=-1;t>=r;){var l=r+t>>1,i=compareCells(e[l],n);0>=i?(0===i&&(o=l),r=l+1):i>0&&(t=l-1)}return o}function incidence(e,n){for(var r=new Array(e.length),t=0,o=r.length;o>t;++t)r[t]=[];for(var l=[],t=0,i=n.length;i>t;++t)for(var a=n[t],s=a.length,u=1,f=1<<s;f>u;++u){l.length=bits.popCount(u);for(var c=0,h=0;s>h;++h)u&1<<h&&(l[c++]=a[h]);var p=findCell(e,l);if(!(0>p))for(;;)if(r[p++].push(t),p>=e.length||0!==compareCells(e[p],l))break}return r}function dual(e,n){if(!n)return incidence(unique(skeleton(e,0)),e,0);for(var r=new Array(n),t=0;n>t;++t)r[t]=[];for(var t=0,o=e.length;o>t;++t)for(var l=e[t],i=0,a=l.length;a>i;++i)r[l[i]].push(t);return r}function explode(e){for(var n=[],r=0,t=e.length;t>r;++r)for(var o=e[r],l=0|o.length,i=1,a=1<<l;a>i;++i){for(var s=[],u=0;l>u;++u)i>>>u&1&&s.push(o[u]);n.push(s)}return normalize(n)}function skeleton(e,n){if(0>n)return[];for(var r=[],t=(1<<n+1)-1,o=0;o<e.length;++o)for(var l=e[o],i=t;i<1<<l.length;i=bits.nextCombination(i)){for(var a=new Array(n+1),s=0,u=0;u<l.length;++u)i&1<<u&&(a[s++]=l[u]);r.push(a)}return normalize(r)}function boundary(e){for(var n=[],r=0,t=e.length;t>r;++r)for(var o=e[r],l=0,i=o.length;i>l;++l){for(var a=new Array(o.length-1),s=0,u=0;i>s;++s)s!==l&&(a[u++]=o[s]);n.push(a)}return normalize(n)}function connectedComponents_dense(e,n){for(var r=new UnionFind(n),t=0;t<e.length;++t)for(var o=e[t],l=0;l<o.length;++l)for(var i=l+1;i<o.length;++i)r.link(o[l],o[i]);for(var a=[],s=r.ranks,t=0;t<s.length;++t)s[t]=-1;for(var t=0;t<e.length;++t){var u=r.find(e[t][0]);s[u]<0?(s[u]=a.length,a.push([e[t].slice(0)])):a[s[u]].push(e[t].slice(0))}return a}function connectedComponents_sparse(e){for(var n=unique(normalize(skeleton(e,0))),r=new UnionFind(n.length),t=0;t<e.length;++t)for(var o=e[t],l=0;l<o.length;++l)for(var i=findCell(n,[o[l]]),a=l+1;a<o.length;++a)r.link(i,findCell(n,[o[a]]));for(var s=[],u=r.ranks,t=0;t<u.length;++t)u[t]=-1;for(var t=0;t<e.length;++t){var f=r.find(findCell(n,[e[t][0]]));u[f]<0?(u[f]=s.length,s.push([e[t].slice(0)])):s[u[f]].push(e[t].slice(0))}return s}function connectedComponents(e,n){return n?connectedComponents_dense(e,n):connectedComponents_sparse(e)}var bits=require("bit-twiddle"),UnionFind=require("union-find");exports.dimension=dimension,exports.countVertices=countVertices,exports.cloneCells=cloneCells,exports.compareCells=compareCells,exports.normalize=normalize,exports.unique=unique,exports.findCell=findCell,exports.incidence=incidence,exports.dual=dual,exports.explode=explode,exports.skeleton=skeleton,exports.boundary=boundary,exports.connectedComponents=connectedComponents;


},{"bit-twiddle":17,"union-find":18}],20:[function(require,module,exports){
"use strict";function unique_pred(n,e){for(var u=1,t=n.length,i=n[0],r=n[0],o=1;t>o;++o)if(r=i,i=n[o],e(i,r)){if(o===u){u++;continue}n[u++]=i}return n.length=u,n}function unique_eq(n){for(var e=1,u=n.length,t=n[0],i=n[0],r=1;u>r;++r,i=t)if(i=t,t=n[r],t!==i){if(r===e){e++;continue}n[e++]=t}return n.length=e,n}function unique(n,e,u){return 0===n.length?n:e?(u||n.sort(e),unique_pred(n,e)):(u||n.sort(),unique_eq(n))}module.exports=unique;


},{}],21:[function(require,module,exports){
"use strict";function LiftedPoint(r,n){this.point=r,this.index=n}function compareLifted(r,n){for(var t=r.point,e=n.point,i=t.length,a=0;i>a;++a){var u=e[a]-t[a];if(u)return u}return 0}function triangulate1D(r,n,t){if(1===r)return t?[[-1,0]]:[];var e=n.map(function(r,n){return[r[0],n]});e.sort(function(r,n){return r[0]-n[0]});for(var i=new Array(r-1),a=1;r>a;++a){var u=e[a-1],f=e[a];i[a-1]=[u[1],f[1]]}return t&&i.push([-1,i[0][1]],[i[r-1][1],-1]),i}function triangulate(r,n){var t=r.length;if(0===t)return[];var e=r[0].length;if(1>e)return[];if(1===e)return triangulate1D(t,r,n);for(var i=new Array(t),a=1,u=0;t>u;++u){for(var f=r[u],o=new Array(e+1),v=0,c=0;e>c;++c){var l=f[c];o[c]=l,v+=l*l}o[e]=v,i[u]=new LiftedPoint(o,u),a=Math.max(v,a)}uniq(i,compareLifted),t=i.length;for(var h=new Array(t+e+1),g=new Array(t+e+1),p=(e+1)*(e+1)*a,s=new Array(e+1),u=0;e>=u;++u)s[u]=0;s[e]=p,h[0]=s.slice(),g[0]=-1;for(var u=0;e>=u;++u){var o=s.slice();o[u]=1,h[u+1]=o,g[u+1]=-1}for(var u=0;t>u;++u){var d=i[u];h[u+e+1]=d.point,g[u+e+1]=d.index}var w=ch(h,!1);if(w=n?w.filter(function(r){for(var n=0,t=0;e>=t;++t){var i=g[r[t]];if(0>i&&++n>=2)return!1;r[t]=i}return!0}):w.filter(function(r){for(var n=0;e>=n;++n){var t=g[r[n]];if(0>t)return!1;r[n]=t}return!0}),1&e)for(var u=0;u<w.length;++u){var d=w[u],o=d[0];d[0]=d[1],d[1]=o}return w}var ch=require("incremental-convex-hull"),uniq=require("uniq");module.exports=triangulate;


},{"incremental-convex-hull":10,"uniq":20}],22:[function(require,module,exports){
function _prepCanvasAndGetCtx(){function i(){e.width=window.innerWidth*devicePixelRatio,e.height=window.innerHeight*devicePixelRatio}var e=$("canvas")[0];return $(window).on("resize",i),i(),e.getContext("2d")}function _clickToCreatePoints(i,e){$("canvas").click(function(n){var t=n.pageX*devicePixelRatio,r=n.pageY*devicePixelRatio,o=[t,r];i.points.push(o),i.triangleIndices=CreateTriangles(i.points),i.triangles=i.triangleIndices.map(function(e){var n=i.points[e[0]],t=i.points[e[1]],r=i.points[e[2]];return[n,t,r]}),i.circumcenters=i.triangles.map(Circumcenter),e()})}function _drawTriangles(i,e,n,t){i.lineWidth=e.lineWidth*devicePixelRatio,i.strokeStyle=e.lineColor,i.beginPath(),n.forEach(function(e){i.moveTo(e[0][0],e[0][1]),i.lineTo(e[1][0],e[1][1]),i.moveTo(e[1][0],e[1][1]),i.lineTo(e[2][0],e[2][1]),i.moveTo(e[2][0],e[2][1]),i.lineTo(e[0][0],e[0][1])}),i.stroke(),i.closePath()}function _drawPoints(i,e,n){e.pointSize*devicePixelRatio,e.pointSize/2*devicePixelRatio;i.fillStyle=e.pointColor,n.forEach(function(n){i.beginPath(),i.arc(n[0],n[1],e.pointSize,0,TAU),i.fill()})}function _drawCircumcenters(i,e,n,t){i.strokeStyle=e.circumcenterColor,i.lineWidth=e.circumcenterLineWidth,n.forEach(function(e,n){var r=t[n][0],o=Math.sqrt(Math.pow(e[0]-r[0],2)+Math.pow(e[1]-r[1],2));i.beginPath(),i.arc(e[0],e[1],o,0,TAU),i.stroke()})}function _drawFn(i,e,n){return function(){i.clearRect(0,0,window.innerWidth*devicePixelRatio,window.innerHeight*devicePixelRatio),_drawTriangles(i,e,n.triangles,n.points),_drawPoints(i,e,n.points),_drawCircumcenters(i,e,n.circumcenters,n.triangles)}}function init(){var i=_prepCanvasAndGetCtx(),e={points:[],triangles:[]},n={pointSize:4,pointColor:"#fff",lineWidth:2,lineColor:"#208FF3",circumcenterColor:"rgba(30,255,30,0.15)",circumcenterLineWidth:2},t=_drawFn(i,n,e);$(window).on("resize",t),_clickToCreatePoints(e,t)}var CreateTriangles=require("delaunay-triangulate"),Circumcenter=require("circumcenter"),TAU=2*Math.PI;jQuery(init);


},{"circumcenter":1,"delaunay-triangulate":21}]},{},[22])
//# sourceMappingURL=bundle.js.map
