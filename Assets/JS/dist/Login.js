import{c as p,a as w,s as f,b as j,d as x,f as y,e as E,r as h,j as e}from"./main.js";import{N as S}from"./NavigationLogin.js";import{d as b,a as P}from"./DisplayStatus.js";import{u as T}from"./useDispatch.js";const v={loginLoading:!1,loginError:"",user_login:"",user_pass:"",user_email:"",first_name:"",last_name:"",user_id:""},c=p("login/signInEmailAndPassword",async a=>{try{const s=w(),r=a.email,i=a.password;await f(s,r,i),x(s,j);const t=y.currentUser;if(!t)throw new Error("User not found.",404);sessionStorage.setItem("email",r);const m={idToken:await t.getIdToken(),user_password:i},o=await fetch("/wp-json/seven-tech/v1/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)});if(!o.ok){const n=(await o.json()).message;throw new Error(n)}return await o.json()}catch(s){throw console.error(s),s}});E({name:"login",initialState:v,extraReducers:a=>{a.addCase(c.fulfilled,(s,r)=>{s.loginLoading=!1,s.loginError="",s.loginMessage=r.payload}).addMatcher(isAnyOf(c.pending),s=>{s.loginLoading=!0,s.loginError=null}).addMatcher(isAnyOf(c.rejected),(s,r)=>{s.loginLoading=!1,s.loginError=r.error.message})}});function I(){const[a,s]=h.useState({email:"",password:""}),[r,i]=h.useState(""),[t,u]=h.useState("Enter your email and password to log in."),m=T(),o=l=>{const{name:n,value:d}=l.target;s({...a,[n]:d})},g=async l=>{l.preventDefault(),m(c(a)).then(n=>{console.log(n),u(b(n)),i(P(n))}).then(()=>{const d=new URLSearchParams(window.location.search).get("redirectTo");setTimeout(()=>{d===null?window.location.href="/dashboard":window.location.href=d},5e3)})};return e.jsx(e.Fragment,{children:e.jsxs("main",{className:"login",children:[e.jsx(S,{}),e.jsx("div",{className:"login card",children:e.jsx("form",{onSubmit:g,children:e.jsxs("table",{children:[e.jsx("thead",{}),e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsx("td",{children:e.jsx("input",{type:"email",name:"email",placeholder:"Email",value:a.email,onChange:o,required:!0})})}),e.jsx("tr",{children:e.jsx("td",{children:e.jsx("input",{type:"password",name:"password",placeholder:"Password",value:a.password,onChange:o,required:!0})})})]}),e.jsx("tfoot",{children:e.jsx("tr",{children:e.jsx("td",{children:e.jsx("button",{type:"submit",children:e.jsx("h3",{children:"LOGIN"})})})})})]})})}),t!==""&&e.jsx("div",{className:`status-bar card ${r}`,children:e.jsx("span",{children:t})})]})})}export{I as default};
//# sourceMappingURL=Login.js.map