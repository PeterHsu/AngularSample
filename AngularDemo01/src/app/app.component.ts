import { Component, OnInit } from '@angular/core';
declare let PouchDB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  db;
  assets;
  constructor() {
    this.db = new PouchDB('Asset');
  }
  ngOnInit() {
    this.GetAll();
  }
  InsertWithID(id, name, owner) {
    this.db.put({ '_id': id, 'name': name, 'owner': owner }, { include_docs: true })
      .then((res) => {
        this.db.get(res.id).then((row) => {
          this.assets = [...this.assets, row];
        });
      }).catch((err) => {
        console.log(err);
      });
  }
  InsertWithoutID(name, owner) {
    this.db.post({ 'name': name, 'owner': owner }, { include_docs: true })
      .then((res) => {
        this.db.get(res.id).then((row) => {
          this.assets = [...this.assets, row];
        });
      }).catch((err) => {
        console.log(err);
      });
  }
  GetAll() {
    this.db.allDocs({ include_docs: true })
      .then((res) => {
        this.assets = [];
        res.rows.forEach((row) => {
          this.assets.push(row.doc);
        });
      }).catch((err) => {
        console.log(err);
      });
  }
  Delete(row) {
    row._deleted = true;
    this.db.put(row)
      .then((res) => {
        console.log(res);
        this.assets.splice(this.assets.indexOf(row), 1);
        this.assets = [...this.assets];
      }).catch((err) => {
        console.log(err);
      })
  }
  Update(row) {
    this.db.put(row)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
  }
}

