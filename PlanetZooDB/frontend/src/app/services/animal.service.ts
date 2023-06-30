import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  url = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/animal/add/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpClient.patch(this.url + '/animal/update/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getAnimals() {
    return this.httpClient.get(this.url + '/animal/get/');
  }

  updateStatus(data: any) {
    return this.httpClient.patch(this.url + '/animal/updateStatus/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + '/animal/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
