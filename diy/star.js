(()=>{function t(t){a=window.innerWidth}function e(t){if(0<t.touches.length)for(var e=0;e<t.touches.length;e++)n(t.touches[e].clientX,t.touches[e].clientY,h[Math.floor(Math.random()*h.length)])}function i(t){l.x=t.clientX,l.y=t.clientY,n(l.x,l.y,h[Math.floor(Math.random()*h.length)])}function n(t,e,i){var n=new s;n.init(t,e,i),r.push(n)}function o(){requestAnimationFrame(o);for(var t=0;t<r.length;t++)r[t].update();for(t=r.length-1;0<=t;t--)r[t].lifeSpan<0&&(r[t].die(),r.splice(t,1))}function s(){this.character="*",this.lifeSpan=120,this.initialStyles={position:"fixed",top:"0",display:"block",pointerEvents:"none","z-index":"10000000",fontSize:"20px","will-change":"transform"},this.init=function(t,e,i){this.velocity={x:(Math.random()<.5?-1:1)*(Math.random()/2),y:1},this.position={x:t-10,y:e-20},this.initialStyles.color=i,console.log(i),this.element=document.createElement("span"),this.element.innerHTML=this.character;var n,o=this.element,s=this.initialStyles;for(n in s)o.style[n]=s[n];this.update(),document.body.appendChild(this.element)},this.update=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.lifeSpan--,this.element.style.transform="translate3d("+this.position.x+"px,"+this.position.y+"px,0) scale("+this.lifeSpan/120+")"},this.die=function(){this.element.parentNode.removeChild(this.element)}}var h=["#D61C59","#E7D84B","#1B8798"],a=window.innerWidth,l={x:a/2,y:a/2},r=[];document.addEventListener("mousemove",i),document.addEventListener("touchmove",e),document.addEventListener("touchstart",e),window.addEventListener("resize",t),o()})();