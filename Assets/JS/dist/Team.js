import{u as m,r as n,n as i,j as r,L as c}from"./main.js";import{E as p}from"./ErrorComponent.js";import{G as u}from"./GroupMembers.js";import{u as f}from"./useDispatch.js";function h(){const{teamLoading:t,teamError:e,team:a}=m(o=>o.team),s=f();return n.useEffect(()=>{s(i())},[s]),t?r.jsx(c,{}):e?r.jsx(p,{error:e}):r.jsx(r.Fragment,{children:r.jsxs("section",{className:"team",children:[r.jsx("h4",{className:"title",children:"Team"}),r.jsx(u,{group:a})]})})}export{h as default};
//# sourceMappingURL=Team.js.map