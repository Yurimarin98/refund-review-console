import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { RefundReviewUsecase } from '../../../domain/usecases/refund-review.usecase';
import { RefundReview } from '../../../domain/models/refund-review/refund-review.model';
import { UserSession } from '../../../domain/models/auth/session.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consult-refund-review',
  imports: [CommonModule, FormsModule],
  templateUrl: './consult-refund-review.html',
  styleUrl: './consult-refund-review.scss',
})
export class ConsultRefundReview implements OnInit {

  refunds = signal<RefundReview[]>([]);
  session = signal<UserSession | null>({
    username: "Yuri",
    permissions: [
      "refund:decide"
    ]
  });
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  searchTerm = signal<string>('');
  selectedRisk = signal<string>('ALL');
  selectedStatus = signal<string>('ALL');

  currentPage = signal<number>(1);
  pageSize = signal<number>(5);

  constructor(
    public refundReviewUsecase: RefundReviewUsecase
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }
 
  loadData(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
 
    this.refundReviewUsecase.getRefundReview().subscribe({
      next: (res) => {
        this.refunds.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error de lectura al cargar las solicitudes de reembolso.');
        this.loading.set(false);
      }
    });
  }

  canDecide(): boolean {
    const user = this.session();
    return user ? user.permissions.includes('refund:decide') : false;
  }

  pendingSummary = computed(() => {
    const list = this.refunds();
    const pendingList = list.filter(r => r.status === 'PENDING' || r.status === 'UNDER_REVIEW');
    const totalAmount = pendingList.reduce((acc, curr) => acc + curr.amount, 0);
    
    return {
      pendingCount: list.filter(r => r.status === 'PENDING').length,
      underReviewCount: list.filter(r => r.status === 'UNDER_REVIEW').length,
      totalPendingAmount: totalAmount
    };
  });
 
  filteredRefunds = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const risk = this.selectedRisk();
    const status = this.selectedStatus();
 
    return this.refunds().filter(refund => {
      const matchesSearch =
        refund.id.toLowerCase().includes(term) ||
        refund.orderId.toLowerCase().includes(term) ||
        refund.customerName.toLowerCase().includes(term);
 
      const matchesRisk = risk === 'ALL' || refund.riskLevel === risk;
      const matchesStatus = status === 'ALL' || refund.status === status;
 
      return matchesSearch && matchesRisk && matchesStatus;
    });
  });
 
  paginatedRefunds = computed(() => {
    const list = this.filteredRefunds();
    const start = (this.currentPage() - 1) * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });
 
  totalPages = computed(() => {
    return Math.ceil(this.filteredRefunds().length / this.pageSize()) || 1;
  });
 
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
 
  onPageSizeChange(event: any): void {
    this.pageSize.set(Number(event.target.value));
    this.currentPage.set(1);
  }
}
