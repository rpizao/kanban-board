import { HttpClient } from '@angular/common/http';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { Entidade } from 'src/app/modelos/entidade';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alertas/alert.service';

export abstract class HttpGenericoService<T extends Entidade> {

  protected useLoading: boolean = true;

  constructor(private client: HttpClient, private alert: AlertService){}

  protected abstract get novaInstancia(): T;

  protected getUrl():string{
    return environment.apiBaseUrl;
  }

  protected post(partialUrl: string, body: any, then:(result: T) => void, fail?:(error: any) => void): void {
    let completeBody = this.novaInstancia;
    completeBody = {...body};
    this.prepararRequest(this.client.post<T>(this.getUrl() + partialUrl, instanceToPlain(completeBody)), then, fail);
  }

  protected get(partialUrl: string, then:(result: T) => void, fail?:(error: any) => void): void {
    this.prepararRequest(this.client.get<T>(this.getUrl() + partialUrl), then, fail);
  }

  protected put(partialUrl: string, body: any, then:(result: T) => void, fail?:(error: any) => void): void {
    this.prepararRequest(this.client.put<T>(this.getUrl() + partialUrl, instanceToPlain(body)), then, fail);
  }

  private prepararRequest(observable: Observable<T>, then:(result: T) => void, fail?:(error: any) => void): void{
    this.chamarApi(observable, then, fail);
  }

  protected chamarApi<T>(observable: Observable<T>, then:(result: T) => void, fail?:(error: any) => void){
    observable.subscribe(
      (result: T) => {
        then(result);
      },
      error => {
        console.log(error);
        if(!fail) this.alert.warn("Ocorreu um erro!<br>Caso se repita, entre em contato com o responsável.")
        else fail(error);
      }
    );
  }
}
