import { Component,OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import 'firebase/storage'
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  arr: FirebaseListObservable<any[]>;
  public uploadTask: firebase.storage.UploadTask;
  constructor(public _database: AngularFireDatabase) {}
  ngOnInit() {
     this.arr = this._database.list('/products');
  }
  add(field,img,price) {
   this.arr.push({ pname: field.value, createdAt: new Date().toString(),price:price.value, likes: 0,image:img.src});
   
  }
  remove($key) {
    this.arr.remove($key);
  }
  like($key, like) {
    this.arr.update($key, { likes: like + 1 });
  }
  upload(f, img) {
    
    let storageReference = firebase.storage().ref('/images/' + f.files[0].name);
    this.uploadTask = storageReference.put(f.files[0]);
    this.uploadTask.on('state_changed', function (snapshot) {

      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      storageReference.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        img.src = url;
        
      });
 
    });
  }
}
