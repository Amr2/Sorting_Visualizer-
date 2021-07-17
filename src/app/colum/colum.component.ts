import { Component, OnInit } from '@angular/core';
import Animation from "../Animations/insertionSort";
import {Steps} from "../Animations/insertionSort";

@Component({
  selector: 'app-colum',
  templateUrl: './colum.component.html',
  styleUrls: ['./colum.component.css'],
})
export class ColumComponent implements OnInit {
  list   : Array<number>|any;
  test   : string | any;
  sorted : boolean = false ;
  res    : HTMLElement | null;
  constructor() {
    this.res = null;
  }

  ngOnInit(): void {
    this.generat();
    this.res = document.getElementById("res");
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
  insertionSort<T>(arr:T[]){
    if(this.sorted && this.res) {
      let tempelem = document.createElement("span");
      tempelem.innerHTML = " Sorted";
      tempelem.style.color = "red"
      this.res.append(tempelem);
      return
    }
    const gen  = <HTMLButtonElement>document.getElementById("gene");
    const sort = <HTMLButtonElement>document.getElementById("sort");
    if(gen && sort){ 
      gen.disabled=true;
      sort.disabled=true;
    }
    // sorry about what you will see now 
    const arrow = document.createElement("div");
    arrow.style.display="inline-block";
    arrow.style.border ="solid #d24949";
    arrow.style.padding="5px";
    arrow.style.borderWidth= "0px 3px 3px 0";
    arrow.style.position="absolute";
    arrow.style.top="-22px";
    arrow.style.left="25%";
    arrow.style.transform="rotate(45deg)";
    arrow.style.webkitTransform= "(rotate45deg)";

    let animate:Array<Steps>;
    animate = Animation(arr)[1];
    
    for(let steps = 0 ; steps <animate.length  ; steps++){

      if (animate[steps].state === "Pointer"){
        const elem =  document.getElementById(`${animate[steps].index}`);
        setTimeout(()=>{
          if(elem) elem.append(arrow);
          // console.log(elem,animate[steps].index)
        },1+steps*300)
      }

      if(animate[steps].state ==="sorted"){
        const elem = document.getElementById(`${animate[steps].index[1]}`);
        const elem2 = document.getElementById(`${animate[steps].index[0]}`);
        setTimeout(()=>{
          if (elem) elem.style.border="4px solid #f0ff6e";
          if (elem2) elem2.style.border="4px solid #f0ff6e";
          this.list[animate[steps].index[1]] = this.list[animate[steps].index[0]];
          // console.log(this.list)
          setTimeout(() => {
            if (elem) elem.style.border="none";
            if (elem2) elem2.style.border="none";
          }, 150);
        },1+steps*300)
      }
      
      if(animate[steps].state ==="unsorted"){
        // console.log(animate[steps])
        const elem = document.getElementById(`${animate[steps].index[0]}`);
        const elem2 = document.getElementById(`${animate[steps].index[1]}`);
        setTimeout(()=>{
          if (elem) elem.style.border="4px solid #7dd420";
          if (elem2) elem2.style.border="4px solid #7dd420";
          
          setTimeout(() => {
            this.list[animate[steps].index[1]] = animate[steps].index[2];
            // console.log(this.list)
            if (elem) elem.style.border="none";
            if (elem2) elem2.style.border="none";
          }, 150);

        }, 1+steps*300);
      }
      
    }
    setTimeout(()=>{
      arrow.remove();
      let temp = document.createElement("span");
      temp.innerHTML=`${Animation(arr)[0]}`;
      temp.style.color= "green";
      this.test +=` =>`;
      this.res?.append(temp);
      this.sorted = true;
      if(sort&&gen){
        gen.disabled=false;
        sort.disabled=false;
        // gen.style.pointerEvents="auto";
        // sort.style.pointerEvents="auto";
      }  
    },animate.length*300);
    
  }

  generat():void{

    while(document.getElementsByTagName("span").length>0){
      document.getElementsByTagName("span")[0].remove();
    }
    this.list = [];
    for(let i = 0 ; i < 20 ; i++){
      this.list.push(Math.floor(Math.random() * 60) + 10);
    }
    this.test = [...this.list].toString();
    if(this.sorted) this.sorted = !this.sorted;
  }

}
