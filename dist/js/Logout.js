import{_ as g,a as h,g as d,f as m,r as i,e as p,j as r}from"./index.js";import{d as v}from"./DisplayStatus.js";var j=function(){var n=g(h().mark(function s(){var t;return h().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d(),e.prev=1,e.next=4,m.signOut();case 4:return e.next=6,fetch("/wp-json/thfw/users/v1/logout",{method:"POST",headers:{"Content-Type":"application/json"}});case 6:return t=e.sent,e.abrupt("return",t.data);case 10:e.prev=10,e.t0=e.catch(1),console.error("Error:",e.t0.message);case 13:case"end":return e.stop()}},s,null,[[1,10]])}));return function(){return n.apply(this,arguments)}}();function y(){var n=i.useState(""),s=p(n,2),t=s[0],o=s[1],e=i.useState(""),c=p(e,2),a=c[0],l=c[1],f=function(){j().then(function(u){l(u),setTimeout(function(){window.location.href="/"},5e3)}).catch(function(u){console.error("Error occurred while logging out:",u),l("Error occurred while logging out."),o("error")})};return i.useEffect(function(){a!==""&&(v(a),o("error"))},[a]),r.jsx(r.Fragment,{children:r.jsxs("main",{className:"logout",children:[r.jsx("button",{onClick:f,children:r.jsx("h3",{children:"LOG OUT"})}),a!==""&&r.jsx("div",{className:"status-bar card ".concat(t),children:r.jsx("span",{children:a})})]})})}export{y as default};
//# sourceMappingURL=Logout.js.map