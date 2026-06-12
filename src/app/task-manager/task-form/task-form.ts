import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task';
import { UserService } from '../user';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {

  today = new Date().toISOString().split('T')[0];
  editId: string | null = null;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    projectName: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required, this.notInPastValidator]),
  });

  constructor(
    public taskService: TaskService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.loadUsers();

    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.taskService.getTaskById(this.editId).subscribe(task => {
        this.taskForm.patchValue(task);
      });
    }
  }

  notInPastValidator(control: any) {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  }

  get title() { return this.taskForm.get('title'); }
  get projectName() { return this.taskForm.get('projectName'); }
  get assignedTo() { return this.taskForm.get('assignedTo'); }
  get status() { return this.taskForm.get('status'); }
  get dueDate() { return this.taskForm.get('dueDate'); }

  onSubmit() {
    if (this.taskForm.invalid) return;

    if (this.editId) {
      this.taskService.updateTask(this.editId, this.taskForm.value as any).subscribe(() => {
        this.router.navigate(['/admin/tasks']);
      });
    } else {
      this.taskService.addTask(this.taskForm.value as any).subscribe(() => {
        this.router.navigate(['/admin/tasks']);
      });
    }
  }
}