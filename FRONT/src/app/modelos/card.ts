import { Entidade } from "./entidade";
import { TipoCard } from "./enums/tipo-card";

export interface Card extends Entidade {
  titulo: string;
  conteudo: string;
  lista: TipoCard; // Todo é default
}
