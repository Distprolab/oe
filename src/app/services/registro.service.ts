import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFrom } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.prod';

const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  constructor(private http: HttpClient) {}

  getRegistro(formData: RegisterFrom) {
    return this.http.post(`${baseUrl}/api/procesos`, formData, this.headers);
  }
}
