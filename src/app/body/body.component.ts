import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  all = true;
  active = false;
  completed = false;

  counter = 0;
  inputText: string;
  inputArray: any;
  count = [];
  itemsArray: any;
  selectedAll: any;
  itemArray = [];
  todoObj: any;
  activeItem =  [];
  completedItem = [];


  constructor() { }

  addItem() {
    this.itemsArray = window.localStorage.getItem('items') ? JSON.parse(window.localStorage.getItem('items')) : [];
    window.localStorage.setItem('items', JSON.stringify(this.itemsArray));

    if (this.inputText == null || this.inputText.trim() == "" ) {
      return;
    }

    this.todoObj = {
      data_item: this.inputText,
      completed: false
    };

    this.itemsArray.push(this.todoObj);
    window.localStorage.setItem('items', JSON.stringify(this.itemsArray));
    this.inputArray = JSON.parse(window.localStorage.getItem('items'));
    this.itemArray = this.inputArray;

    this.counter++;

    this.inputText = '';
  }
  ngOnInit() {

    this.inputArray = JSON.parse(window.localStorage.getItem('items'));

    this.itemArray = this.inputArray;
    console.log(this.count.length);

    this.counter = 0;
    for ( let i = (this.itemArray.length - 1 ); i > -1; i--) {
      this.counter += this.itemArray[i].completed ? 0 : 1;
    }
  }

  removeInput(id) {
    this.itemArray.splice(id, 1);
    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
    this.select();
    /*window.location.reload(true);*/
  }

  clearCompleted() {
    for ( let i = (this.itemArray.length - 1 ); i > -1; i--) {
      if (this.itemArray[i].completed) {
        this.itemArray.splice(i, 1);
      }
    }
    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
    this.counter = this.itemArray.length;
  }

  select() {


   /* for ( let i = (this.itemArray.length - 1 ); i > -1; i--) {
      if (this.itemArray[i].completed == true) {
        this.counter --;
      } else {
        this.counter = this.itemArray.length;
      }
    }*/

    this.counter = 0;
    for ( let i = (this.itemArray.length - 1 ); i > -1; i--) {
      this.counter += this.itemArray[i].completed ? 0 : 1;
    }

    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
  }

  selectActive(id) {

    for ( let i = (this.itemArray.length - 1 ); i > -1; i--) {
      if (this.itemArray[i].completed == true) {
        this.activeItem.splice(id, 1);
        this.select()
      } else {
        this.select();
      }
    }
    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
  }
  selectCompleted(id) {

    for ( let i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i].completed == true) {
        this.select();
      } else {
        this.completedItem.splice(id, 1);
        this.select();
      }
    }
    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
  }

  selectAll() {
    for ( let i = 0; i < this.itemArray.length; i++) {
      this.itemArray[i].completed = this.selectedAll;

      this.select();
      /*if (this.itemArray[i].completed == true) {
        this.counter = 0;
      } else {
        this.counter = this.itemArray.length;
      }*/
    }
    window.localStorage.setItem('items', JSON.stringify(this.itemArray));
  }

  getAll() {
    this.all = true;
    this.active = false;
    this.completed = false;
  }

  getActive() {
    this.active = true;
    this.completed = false;
    this.all = false;


    this.activeItem = [];

    this.inputArray = JSON.parse(window.localStorage.getItem('items'));
    this.itemArray = this.inputArray;
    for ( let i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i].completed == false) {
        this.activeItem.push(this.itemArray[i]);
      }
    }

  }

  getCompleted() {
    this.active = false;
    this.completed = true;
    this.all = false;

    this.completedItem = [];

    this.inputArray = JSON.parse(window.localStorage.getItem('items'));
    this.itemArray = this.inputArray;
    for ( let i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i].completed == true) {
        this.completedItem.push(this.itemArray[i]);
      }
    }

  }



}
