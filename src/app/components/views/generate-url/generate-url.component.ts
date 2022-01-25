import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-generate-url',
  templateUrl: './generate-url.component.html',
  styleUrls: ['./generate-url.component.scss']
})
export class GenerateUrlComponent implements OnInit {
  linkdata : Link = {
    redirectTo : "https://angular.io/tutorial/toh-pt1",
    name : "temp",
    customurl : "",
    status : true,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
