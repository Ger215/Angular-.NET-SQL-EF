import { Component } from '@angular/core';
import {NgForOf, UpperCasePipe} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TarjetaService} from "../../services/tarjeta.service";

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {
  listTarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id : number | undefined;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService : TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listTarjetas = data;
    }, error => {
      console.log(error);
    })
  }

  guardarTarjeta(){

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if(this.id == undefined) {
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Operacion exitosa', 'Tarjeta registrada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        console.log(error);
        this.toastr.error('Operacion fallida', 'Tarjeta no registrada');
      });
    }else{
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Operacion exitosa', 'Tarjeta actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      });
    }
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('Operacion exitosa', 'Tarjeta eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    });
  }

  editarTarjeta(tarjeta: any){
    this.accion = 'Editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
  }

}
