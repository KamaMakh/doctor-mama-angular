import { Component, OnInit } from '@angular/core';
import {GeneralTableView} from '../GeneralTableView';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ContractService} from '../../dao/impl/contract/contract.service';
import {Contract, ContractResponse} from '../../model/contract/Contract';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent extends GeneralTableView<Contract> implements OnInit {

  statuses = {
    completed: 'Завершён',
    in_work: 'В работе',
    new: 'Новый '
  };

  constructor(
    private toastr: ToastrService,
    private contractService: ContractService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = ['userEmail', 'childName', 'contractType', 'consultantId', 'contractDate', 'contractStatus'];
    if (!this.items) {
      this.pageSize = 25;
      this.pageNumber = 0;
      this.getAllItems();
    }
  }

  getAllItems() {
    const request = this.contractService.findAll(this.pageNumber);
    request.subscribe(
      data => {
        this.totalElements = data.totalContractCount;
        this.items = data.contracts;
        this.assignTableSource();
      },
      error => {
        this.toastr.error(error.error?.message || error, 'Error');
      });
  }

  getOne() {
    this.contractService.getOne(1).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  openContract(contract: Contract) {
    this.router.navigate([`contracts/${contract.id}`]);
  }

}
