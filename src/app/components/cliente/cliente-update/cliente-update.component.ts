import { Cliente } from '../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  nome:FormControl = new FormControl(null, Validators.minLength(3));
  cpf:FormControl = new FormControl(null, Validators.required);
  email:FormControl = new FormControl(null, Validators.email);
  senha:FormControl = new FormControl(null, Validators.minLength(3));

  cliente:Cliente = {
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
  }

  constructor(private clienteService:ClienteService, private toast:ToastrService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    return this.clienteService.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(() =>{
      this.toast.success('Cliente atualizado com sucesso', 'Update');
      this.router.navigate(['clientes']);
    }, ex => {
      console.log(ex);
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    }
    );
  }

  addPerfil(perfil:any){
    if( this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else{
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos():boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

}
