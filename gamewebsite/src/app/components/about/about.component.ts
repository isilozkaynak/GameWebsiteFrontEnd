import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  imgUrl ="https://localhost:44365/";
  aboutImage="images/about.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
