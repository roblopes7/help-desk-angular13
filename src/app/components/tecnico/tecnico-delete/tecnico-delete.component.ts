import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from './../../../models/tecnico';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico:Tecnico = {
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
  }

  constructor(private tecnicoService:TecnicoService, private toast:ToastrService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    return this.tecnicoService.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  delete():void{
    this.tecnicoService.delete(this.tecnico.id).subscribe(() =>{
      this.toast.success('Técnico removido com sucesso', 'Delete');
      this.router.navigate(['tecnicos']);
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
