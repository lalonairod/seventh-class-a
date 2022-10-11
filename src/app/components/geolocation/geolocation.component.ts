import { Component, OnInit } from '@angular/core';
import NavigatorHelper from '../../libs/helpers/navigator.helper';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  position : any = {};
  time : any = '';

  constructor() { }

  ngOnInit(): void {
  }

  getLocation(){
    NavigatorHelper.getLocation().then(pos => {
      console.log('Position: ',pos);
    }).catch(err => {
      console.log('Error: ',err);
    });
  }

  getLocationC(){
    NavigatorHelper.getLocationC(pos => {
      console.log(pos);
      this.position = {
        lat : pos.coords.latitude,
        lon : pos.coords.longitude
      }
      this.time = pos.timestamp;
      //this.time = new Date(pos.timestamp).toLocaleDateString();
    },
    err => {
      console.log(err);
    })
  }

  onSubmit(){
    console.log('Position: ',this.position, 'Time: ',this.time);

  }

  start(video : HTMLVideoElement, btn : HTMLElement){
    console.log('Video: ',video);
    NavigatorHelper.startRecord(video, btn);
    
  }

}
