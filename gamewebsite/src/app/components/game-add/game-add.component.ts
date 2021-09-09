import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  gameAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private gameService: GameService, private toastrService: ToastrService) { }

    ngOnInit(): void {
      this.createGameAddForm();
    }

    createGameAddForm() {
      this.gameAddForm = this.formBuilder.group({
        gameName: ['', Validators.required],
        releaseDate: ['', Validators.required],
        descriptions: ['', Validators.required]
      });
    }

    add() {
      if (this.gameAddForm.valid) {
        let gameModel = Object.assign({}, this.gameAddForm.value);
        this.gameService.add(gameModel).subscribe(
          (response) => {
            console.log(response)
            this.toastrService.success(response.message, "Başarılı");
            //this.router.navigate(['/markalar']);
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      } else {
        this.toastrService.error('Formunuz eksik', 'Dikkat');
      }
    }
}
