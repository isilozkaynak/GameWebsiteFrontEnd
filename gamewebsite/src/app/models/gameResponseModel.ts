import { Game } from "./game";
import { ResponseModel } from "./responseModel";

export interface GameResponseModel extends ResponseModel{
  data : Game[];
}
