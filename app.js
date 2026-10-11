(function(){
var FIGURES=[
 {id:"funnel",name:"Sales funnel",desc:"Five slabs narrowing to the bottom. Touch a stage and it, with all it feeds, lifts away.",tags:["funnel","sales","stages"]},
 {id:"rack",name:"Server rack",desc:"Five server units in a stack. Touch one and it slides out toward you, its neighbours easing after.",tags:["rack","infra","units"]},
 {id:"layers",name:"App layers",desc:"Four layers of an app stack. Touch one and it lifts clear and slides aside.",tags:["stack","layers","architecture"]}
];
var root=document.documentElement,grid=document.getElementById("grid"),btn=document.getElementById("theme");
function theme(){return root.dataset.theme==="dark"?"dark":"light"}
function src(id){return "figures/"+id+".html?theme="+theme()}
var icon={dl:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>',ext:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'};
function card(f){
 var el=document.createElement("article");el.className="card";
 el.innerHTML='<div class="inner"><div class="stage"><div class="skel"></div><iframe title="'+f.name+' animation" loading="eager"></iframe></div><div class="meta"><h3>'+f.name+'</h3><p>'+f.desc+'</p><div class="tags">'+f.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join("")+'</div><div class="row"><a class="pill ghost" href="figures/'+f.id+'.html" target="_blank" rel="noopener">'+icon.ext+' Open</a><a class="pill ghost" href="figures/'+f.id+'.html" download="hairline-'+f.id+'.html">'+icon.dl+' HTML</a></div></div></div>';
 var st=el.querySelector(".stage"),fr=el.querySelector("iframe");
 fr.addEventListener("load",function(){st.classList.add("ready")});
 fr.dataset.id=f.id;
 return el}
FIGURES.forEach(function(f){var c=card(f);grid.appendChild(c);c.querySelector("iframe").src=src(f.id)});
grid.setAttribute("aria-busy","false");
document.getElementById("count").textContent=FIGURES.length+" figures";
function sync(){btn.setAttribute("aria-pressed",theme()==="dark")}
sync();
btn.addEventListener("click",function(){
 var t=theme()==="dark"?"light":"dark";root.dataset.theme=t;try{localStorage.setItem("hl-theme",t)}catch(e){}
 sync();document.querySelectorAll("iframe").forEach(function(fr){fr.parentNode.classList.remove("ready");fr.src=src(fr.dataset.id)});
 document.querySelector('meta[name=theme-color]').content=t==="dark"?"#0a0a0b":"#fafafa"});
})();
