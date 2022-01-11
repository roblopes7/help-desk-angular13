import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamados';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  update(){
    console.log(this.chamado);
    this.chamadoService.update(this.chamado).subscribe(resposta =>{
      this.toast.success('Chamado atualizado com sucesso', 'Update');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
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

  retornaStatus(status:any):string{
    if(status == 0) return 'ABERTO';
    if(status == 1) return 'EM ANDAMENTO';
    else return 'ENCERRADO';
  }

  retornaPrioridade(prioridade:any):string{
    if(prioridade == 0) return 'BAIXA';
    if(prioridade == 1) return 'MÉDIA';
    else return 'ALTA';
  }


}
