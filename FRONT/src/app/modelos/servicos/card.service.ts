import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/customizacoes/alertas/alert.service';
import { HttpGenericoService } from 'src/app/customizacoes/http/http-generico.service';
import { Card } from '../card';
import { TipoCard } from '../enums/tipo-card';

@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpGenericoService<Card> {

  private static readonly CARD_URL = "/cards";

  constructor(client: HttpClient, alert: AlertService){
    super(client, alert);
  }

  protected get novaInstancia(): Card {
    return {
      lista: TipoCard.ToDo
    } as Card;
  }

  criarCard(titulo: string, conteudo: string, sucesso: (card: Card) => void){
    this.post(CardService.CARD_URL, {titulo, conteudo}, sucesso);
  }
}
