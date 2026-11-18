import {desk} from "@shared/desk";
import {wrap,rect,label,type Frame} from "@shared/surface";
const pitches=["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B"],major=[0,2,4,5,7,9,11],minor=[0,2,3,5,7,8,10];
type S={tonic:number;step:number;position:number;minor:boolean;edit:boolean};
desk<S>({name:"Scale Steps",accent:"#B695F0",motion:{enabled:false},initial:()=>({tonic:0,step:1,position:0,minor:false,edit:false}),render:s=>{
 const scale=s.minor?minor:major,degree=wrap(s.position*s.step,7),offset=Math.floor(s.position*s.step/7)*12+scale[degree],note=pitches[wrap(s.tonic+offset,12)]+(4+Math.floor((s.tonic+offset)/12));
 const art:Frame=[label("note",note,1,1,"#FFF2DCFF","front","small")];for(let i=0;i<7;i++)art.push(rect("r"+i,29+i*6,13-i,5,2,i===degree?"#B695F0"+"FF":"#3B454CFF"));
 return {title:"Degree "+(degree+1),value:note,art,lines:[pitches[s.tonic]+(s.minor?" natural minor":" major"),["","Seconds","Thirds","Fourths"][s.step]+" / degree "+(degree+1),note+"   ("+(s.position+1)+"/7)",s.edit?"Wheel: transpose":"Wheel: next note","Click: transpose / Start: step","Hold OK: major or minor"]};},
 action:(s,k)=>{if(k==="up"||k==="down"){const n=k==="up"?1:-1;if(s.edit)s.tonic=wrap(s.tonic+n,12);else s.position=wrap(s.position+n,7);}if(k==="ok")s.edit=!s.edit;
 if(k==="start"){s.step=s.step%3+1;s.position=0;}if(k==="hold-ok"){s.minor=!s.minor;s.position=0;}}});
