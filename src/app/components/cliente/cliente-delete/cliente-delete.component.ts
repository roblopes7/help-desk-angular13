import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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

  delete():void{
    this.clienteService.delete(this.cliente.id).subscribe(() =>{
      this.toast.success('Cliente removido com sucesso', 'Delete');
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

}
