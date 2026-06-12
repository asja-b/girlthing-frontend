import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {

  editId: string | null = null;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.userService.getUserById(this.editId).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }
  }
  
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get role() { return this.userForm.get('role'); }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.editId) {
      this.userService.updateUser(this.editId, this.userForm.value as any).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    } else {
      this.userService.addUser(this.userForm.value as any).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    }
  }
}