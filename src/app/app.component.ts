import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
      firebase.initializeApp({
        apiKey: 'AIzaSyCL0O5D5FecA-nWVuO0Q7Qy2Xe6he7D_sQ',
        authDomain: 'sree-angular-recipebook.firebaseapp.com'
      });
  }
}
