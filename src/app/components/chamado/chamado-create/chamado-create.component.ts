import { ToastrService } from 'ngx-toastr';
import { Chamado } from './../../../models/chamados';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    id: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
    observacoes: '',
    prioridade: '',
    status: '',
    tecnico:'',
    titulo:'',
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade:FormControl = new FormControl(null, Validators.required);
  status:FormControl = new FormControl(null, Validators.required);
  titulo:FormControl = new FormControl(null, Validators.required);
  observacoes:FormControl = new FormControl(null, Validators.required);
  tecnico:FormControl = new FormControl(null, Validators.required);
  cliente:FormControl = new FormControl(null, Validators.required);


  constructor(
    private chamadoService:ChamadoService,
    private clienteService:ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(){
    console.log('create');
    console.log(this.chamado);
    this.chamadoService.create(this.chamado).subscribe(resposta =>{
      this.toast.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  findAllClientes(){
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(){
    this.tecnicoService.findAll().subscribe(resposta =>{
      this.tecnicos = resposta;
    })
  }

  validaCampos():boolean{
    return this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacoes.valid &&
      this.tecnico.valid &&
      this.cliente.valid;
  }

}
