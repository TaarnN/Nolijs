let print=console.log;let range=(n,r=0,c=1)=>{let e=[];for(let t=r;t<n;t+=c)e.push(t);return e};
for( let i of range(10) ) {
    print(i + 1)
}