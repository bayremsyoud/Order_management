import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
item=6;
  currentUser = new User();




  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {}


  delsuccess: string='';
  blockSuccess: string='';
  unblockSuccess: string='';
  activeSuccess: string='';
  errUser?: string;
  errUser2?: string;
  users: User[] = [];
  userss: User[]=[];
  usersShow: User[] = [];
  userOne = new User();
  role = 'all';
  selected = 'all';



  blockUser(user:User, id:any) {
    this.userOne = user;
    this.userOne.isBlocked = !this.userOne.isBlocked;
    this.usersService.editUser(id, user).subscribe(user => {
      this.getUsers();
    });
  }

  activeUser(user:User, id:any) {
    this.userOne = user;
    if (!this.userOne.isConfirmed) {
      window.alert(`${this.errUser} ${this.userOne.fullName} ${this.errUser2}`);
    } else {
      this.userOne.isActive = !this.userOne.isActive;
      this.usersService.editUser(id, user).subscribe(user => {
        this.getUsers();

      });
    }
  }

  applyFull() {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].fullName = this.users[i].nomUser + ' ' + this.users[i].prenomUser;
      this.users[i].fullName = this.users[i].fullName.toLowerCase();
    }
  }

  getUsers() {
    this.usersService.getUsers().subscribe(result => {
      this.usersShow = result;
      this.specific();
    });
  }

  specific() {
    this.users = [];
    for (let i = 0; i < this.usersShow.length; i++) {
      if (!this.usersShow[i].isAdmin) {
        this.users.push(this.usersShow[i]);
      }
    }
    this.userss = this.users;
    this.selected = 'all';
    this.applyFull();
  }
  page: any;

  public onPageChanged(event:any) {
    this.page = event;
    this.getUsers();
  }




  openDialog(user: User, action: string): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { user: user, action: action },
    });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        if (action == 'del') {
          this.deleteUser(id);
        }
        if (action == 'block') {
          this.blockUser(user, id);
        }
      }
    });
  }

  openDialogView(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      console.log(res);
      if (res) {
        user.isAdmin = res;
        user.roleUser = 'Admin';
        this.usersService.editUser(user._id, user).subscribe(res => {
          this.getUsers();
        });
      }
    });
  }

  deleteUser(id:any) {
    this.checkPage();
    this.usersService.deleteUser(id).subscribe(result => {
      this.getUsers();
    });

    this.snackbar.open(this.delsuccess, '', {
      duration: 2000,
      panelClass: ['gradient-red'],
    });
  }



  checkPage() {
    let count = this.users.length / this.item;
    count = count - Math.floor(count);
    console.log(count.toFixed(2));
    if (count.toFixed(2) == '0.17') {
      this.page -= 1;
    } else if (count.toFixed(2) == '0.08') {
      this.page -= 1;
    } else if (count.toFixed(2) == '0.33') {
      this.page -= 1;
    }
  }


  checkRole(event:any) {
    this.role = event.value;
    let filter = event.value;
    this.selected = 'all';
    if (filter == 'manager') {
      this.users = this.userss.filter(t => t.roleUser.indexOf(filter) != -1);
    } else if (filter == 'controller') {
      this.users = this.userss.filter(t => t.roleUser.indexOf(filter) != -1);
    } else if (filter == 'maintainer') {
      this.users = this.userss.filter(t => t.roleUser.indexOf(filter) != -1);
    } else if (filter == 'editor') {
      this.users = this.userss.filter(t => t.roleUser.indexOf(filter) != -1);
    } else if (filter == 'other') {
      this.users = this.userss.filter(t => t.roleUser.indexOf(filter) != -1);
    } else {
      this.users = this.userss;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users = this.userss.filter(
      t => t.fullName.toLowerCase().indexOf(filterValue.toLowerCase()) != -1
    );
  }



  ngOnInit() {
    this.getUsers();
  }
}
